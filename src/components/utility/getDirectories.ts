const fs = require('fs')
export default function getDirectories(path: String) {
    return fs.readdirSync(path).filter(function (file: string) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
  }