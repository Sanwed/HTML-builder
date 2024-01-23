const fs = require('fs');
const path = require('path');

const srcFolder = path.join(__dirname, 'files');
const destFolder = path.join(__dirname, 'files-copy');

fs.mkdir(destFolder, () => {
  console.log('Folder created');
});

function clearDir(srcFolder) {
  fs.readdir(srcFolder, (err, files) => {
    if (err) {
      console.error(err.message);
    }
    files.forEach((file) => {
      fs.unlink(path.join(srcFolder, file), (err) => {
        if (err) {
          console.error(err.message);
        }
      });
    });
  });
}

function copyDir(srcFolder, destFolder) {
  clearDir(destFolder);
  fs.readdir(srcFolder, (err, files) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
    }
    files.forEach((file) => {
      fs.stat(path.join(__dirname, 'files', file), (err, stat) => {
        if (err) {
          console.error(err.message);
          return;
        }
        if (stat.isFile()) {
          fs.copyFile(
            path.join(srcFolder, file),
            path.join(destFolder, file),
            () => {
              console.log(`File ${file} copied`);
            },
          );
        }
      });
    });
  });
}

copyDir(srcFolder, destFolder);
module.exports = copyDir;
