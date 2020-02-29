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

function init() {
	page.cmd('certSelect', [[]])
	page.cmd('wrapperPermissionAdd', 'Merger:ZeroMe')
}

var flag, hub_list, data_list, profile_list, target_address, combined_data

async function start(arg) {
	flag = arg
	hub_list = []
	data_list = []
	profile_list = []
	target_address = target_input.value
	combined_data = {
		'next_post_id': 1,
		'next_comment_id': 1,
		'next_follow_id': 1,
		'avatar': 'jpg',
		'user_name': page.site_info.cert_user_id,
		'hub': target_address,
		'intro': '',
		'post': [],
		'post_like': {},
		'comment': [],
		'follow': []
	}

	btn1.disabled = true
	btn2.disabled = true
	hub_out.innerText = ''
	data_out.innerText = ''
	profile_out.innerText = ''

	id_out.innerText = page.site_info.auth_address + '\t' + page.site_info.cert_user_id
	await load_hub_list()
	await load_data_list()
	await load_profile_list()
	await load_combined_data()
	if (flag) await migrate()

	btn1.disabled = false
	btn2.disabled = false
}

async function load_hub_list() {
	var list = await page.cmdp('mergerSiteList', [])
	hub_list = Object.keys(list).filter(function (e) {
		return e !== '1UDbADib99KE9d3qZ87NqJF2QLTHmMkoV'
	})
	hub_out.innerText = hub_list.join('\n')
}

async function load_data_list() {
	for (let e of hub_list) {
		var file_list_in_hub = await page.cmdp('fileList', [`merged-ZeroMe/${e}/data/users/${page.site_info.auth_address}`])
		if (file_list_in_hub.indexOf('data.json') >= 0) data_list.push(e)
	}
	data_out.innerText = data_list.join('\n')
}

async function load_profile_list() {
	for (let e of data_list) {
		var data = await page.cmdp('fileGet', [`merged-ZeroMe/${e}/data/users/${page.site_info.auth_address}/data.json`])
		data = JSON.parse(data)
		if (data !== null && data.avatar !== undefined) profile_list.push(e)
	}
	profile_out.innerText = profile_list.join('\n')
}

async function load_combined_data() {
	for (let e of data_list) {
		var data = await page.cmdp('fileGet', [`merged-ZeroMe/${e}/data/users/${page.site_info.auth_address}/data.json`])
		data = JSON.parse(data)
		if (data.intro !== undefined)
			combined_data.intro = combined_data.intro.length > data.intro.length ? combined_data.intro : data.intro
		if (data.post !== undefined)
			combined_data.post = data.post.concat(combined_data.post)
		if (data.post_like !== undefined)
			combined_data.post_like = Object.assign(data.post_like, combined_data.post_like)
		if (data.comment !== undefined)
			combined_data.comment = data.comment.concat(combined_data.comment)
		if (data.follow !== undefined)
			combined_data.follow = data.follow.concat(combined_data.follow)
	}

	combined_data.next_post_id = combined_data.post.length * 10

	var i = 1
	for (let e of combined_data.comment) {
		e.comment_id = i
		i++
	}
	combined_data.next_comment_id = i

	var i = 1
	for (let e of combined_data.follow) {
		e.follow_id = i
		i++
	}
	combined_data.next_follow_id = i

	combined_out.innerText = JSON.stringify(combined_data, null, '\t')
}

async function migrate() {
	if (hub_list.indexOf(target_address) < 0) {
		return alert('The target address is not a ZeroMe hub.')
	}
	alert('Start to migrate. DO NOT close this window until I say "Migration finish". You can close this pop-up box now.')

	var data = btoa(unescape(encodeURIComponent(JSON.stringify(combined_data, null, '\t'))))
	var result = await page.cmdp('fileWrite', [`merged-ZeroMe/${target_address}/data/users/${page.site_info.auth_address}/data.json`, data])
	if (result === 'ok') {
		page.cmdp('sitePublish', {
			inner_path: `merged-ZeroMe/${target_address}/data/users/${page.site_info.auth_address}/content.json`
		})
		await clean()
		return alert('Migration finish.')
	} else {
		return alert('File written error, abort mairating. Error detail: ' + result)
	}
}

async function clean() {
	var list = data_list.filter(function (e) {
		return e !== target_address
	})
	for (let e of list) {
		await page.cmdp('fileDelete', [`merged-ZeroMe/${e}/data/users/${page.site_info.auth_address}/data.json`])
		page.cmdp('sitePublish', {
			inner_path: `merged-ZeroMe/${e}/data/users/${page.site_info.auth_address}/content.json`
		})
	}
}