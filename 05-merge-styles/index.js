const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');

function bundleStyles(srcPath, destPath) {
  const styles = [];
  fs.readdir(srcPath, (err, files) => {
    if (err) {
      console.error(err.message);
    }
    const stylesFiles = files.filter((file) => {
      const filePath = path.join(srcPath, file);
      const fileExt = path.extname(filePath);
      return fileExt === '.css';
    });

    stylesFiles.forEach((file) => {
      const filePath = path.join(srcPath, file);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(err.message);
        }
        styles.push(data.toString());
        fs.writeFile(destPath, styles.join('\n'), () => {});
      });
    });
  });
}

bundleStyles(srcPath, destPath);
module.exports = bundleStyles;
