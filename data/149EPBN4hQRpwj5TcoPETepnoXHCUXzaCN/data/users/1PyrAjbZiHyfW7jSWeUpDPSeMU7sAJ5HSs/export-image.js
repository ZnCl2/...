let fs = require('fs')
let path = require('path')
let data_file = path.resolve('./data.json')
let data = require(data_file)

let username = path.basename(__dirname)
let user_dirname = 'data/users/' + username + '/'

let files = data.file
for (let name in files) {
  let file = files[name]
  let { title, image_link } = file
  if (!image_link || !image_link.includes('base64')) continue
  let parts = image_link.split(',')
  parts.shift()
  let base64 = parts.join(',')
  let buffer = Buffer.from(base64, 'base64')
  let mime = image_link.split(',')[0].split(':')[1].split(';')[0]
  let ext = mime.split('/')[1]
  let image_filename = title.replace('.mp4', '') + '.' + ext
  fs.writeFileSync(image_filename, buffer)
  file.image_link = user_dirname + image_filename
}
fs.writeFileSync(data_file, JSON.stringify(data, null, '\t'))
