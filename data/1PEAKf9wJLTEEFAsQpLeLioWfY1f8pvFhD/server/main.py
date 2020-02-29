'''
Copyright (C) 2017  Polar (Bitcoin:13aB79mzuRLgDYzQthn9wzycjw77WyDXh6)

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
'''


import webapp2
from google.appengine.api import users
from google.appengine.ext import ndb
import re
import CryptBitcoin

class Account(ndb.Model):
	username = ndb.StringProperty(indexed=True)
	address = ndb.StringProperty(indexed=False)

private_key = ''


class MainPage(webapp2.RequestHandler):
	def get(self):
		user = users.get_current_user()
		if user:
			user_id = user.user_id()
			logout_url = users.create_logout_url('/')
			greeting = 'Welcome, {}! (<a href="{}">Sign out</a>)'.format(user_id, logout_url)
		else:
			login_url = users.create_login_url('/')
			greeting = '<a href="{}">Sign in</a>'.format(login_url)
		self.response.write('<html><body>{}</body></html>'.format(greeting))


class Certificate(webapp2.RequestHandler):
	def post(self):
		try:
			origin = self.request.headers['origin']
		except KeyError:
			origin = '*'
		self.response.headers['Access-Control-Allow-Origin'] = origin
		self.response.headers['Access-Control-Allow-Methods'] = 'POST'
		self.response.headers['Access-Control-Allow-Headers'] = '*'
		self.response.headers['Access-Control-Allow-Credentials'] = 'true'

		user = users.get_current_user()
		if user == None:
			self.response.set_status(401)
			self.response.write('Not signed in. Go to https://elite-truck-183411.appspot.com and sign in.')
			return
		compressed_user_id = CryptBitcoin.str_base(int(user.user_id()))

		try:
			username = self.request.POST['username']
			address = self.request.POST['address']
		except KeyError:
			self.response.set_status(400)
			self.response.write('Missing parameter: ' + str(msg))
			return
		if re.match(r'^\w{1,30}$', username) == None:
			self.response.set_status(400)
			self.response.write('The username you requested is not valid. Only 1~30 length of [letter, number, underscore] are allowed.')
			return
		if CryptBitcoin.validate(address) == False:
			self.response.set_status(400)
			self.response.write('The address you requested is not a valid Bitcoin address.')
			return
		username = username.lower()

		try:
			entity = ndb.Key(Account, compressed_user_id).get()
		except BadRequestError:
			entity = None	

		if entity != None:
			if entity.username == username and entity.address == address: # Sometime network is bad and client fail to received certificate, allow retry
				self.response.write(CryptBitcoin.sign(address + '#web/' + entity.username, private_key))
			else:
				self.response.set_status(403)
				self.response.write('You previously signed up an PeakID address. You can\'t sign up twice.')
		elif entity == None:
			if not Account.query(Account.username == username).fetch():
				entity = Account(id=compressed_user_id, username=username, address=address)
				entity.put()
				self.response.write(CryptBitcoin.sign(address + '#web/' + username, private_key))
			else:
				self.response.set_status(403)
				self.response.write('The username you request is taken. Try another.')


app = webapp2.WSGIApplication([
	('/', MainPage),
	('/cert', Certificate)
], debug=True)
