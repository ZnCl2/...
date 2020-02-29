'use strict';

var page = new ZeroFrame()
page.onRequest = function (cmd, message) {
	if (cmd === 'setSiteInfo') {
		page.site_info = message.params
	} else {
		this.log('Unknown incoming message:', cmd)
	}
}
page.cmd('siteInfo', [], function (siteInfo) {
	page.site_info = siteInfo
})

function submit() {
	var username = $('#username').val().toLowerCase()
	if (username === '') return
	if (confirm('Your username is ' + username + '\n\nThink twice!\nOnce sign up, you CAN NOT change your username.\n\nAre you sure to continue?') === false) return

	$.ajax({
		type: 'POST',
		url: 'https://elite-truck-183411.appspot.com/cert',
		xhrFields: {
			withCredentials: true
		},
		data: {
			username: username,
			address: page.site_info.auth_address
		},
		success: success,
		error: error
	})

	function success(data) {
		page.cmd('certAdd', ['peak.id', 'web', username, data], function (res) {
			if (res.error && res.error.startsWith('You already')) {
				return page.cmd('certSelect', [['peak.id']])
			} else if (res.error) {
				return page.cmd('wrapperNotification', ['error', 'Failed to add certificate: ' + res.error])
			} else {
				return page.cmd('certSelect', [['peak.id']])
			}
		})
	}

	function error(xhr, status, error) {
		page.cmd('wrapperNotification', ['error', 'Failed to sign up: ' + xhr.responseText])
	}
}