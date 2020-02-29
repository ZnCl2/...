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
	var username = $('#username').val()
	if (username === '')
		return

	$.ajax({
		type: 'POST',
		url: 'https://divine-voice-183411.appspot.com/cert',
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
		page.cmd('certAdd', ['polar.id', 'web', username, data], function (res) {
			if (res.error && res.error.startsWith('You already')) {
				return page.cmd('certSelect', [['polar.id']])
			} else if (res.error) {
				return page.cmd('wrapperNotification', ['error', 'Failed to add certificate: ' + res.error])
			} else {
				return page.cmd('certSelect', [['polar.id']])
			}
		})
	}

	function error(xhr, status, error) {
		page.cmd('wrapperNotification', ['error', 'Failed to sign up: ' + xhr.responseText])
	}
}