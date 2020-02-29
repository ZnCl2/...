let fs = require('fs')
let path = require('path')
let data_file = path.resolve('./data.json')
let data = require(data_file)

let username = path.basename(__dirname)
let user_dirname = 'data/users/' + username + '/'

let files = data.file
let image_files = []
for (let name in files) {
  let file = files[name]
  let { image_link } = file
  if (!image_link || image_link.includes('base64')) continue
  let image_filename = image_link.replace(user_dirname, '')
  let buffer = fs.readFileSync(image_filename)
  let base64 = buffer.toString('base64')
  let ext = path.extname(image_filename).replace('.', '')
  if (ext == 'jpg') {
    ext = 'jpeg'
  }
  file.image_link = 'data:image/' + ext + ';base64,' + base64
  image_files.push(image_filename)
}
fs.writeFileSync(data_file, JSON.stringify(data, null, '\t'))
image_files.forEach(file => fs.unlinkSync(file))
