var fs = require('fs');
var path = require('path');

var inDir = 'b/';
var outDir = 'source/';

var files = fs.readdirSync(inDir);

files
  .map(fname => fname.split('.')).map(f => {
    var name = f[0];
    var ext = f[1];
      if (ext == 'htm') {
        ext = 'html';
      };
      fs.writeFileSync(path.join(outDir, `${name}.${ext}`), fs.readFileSync(path.join(inDir, `${name}.${f[1]}`), 'utf-8'));
    })
