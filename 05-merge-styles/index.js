const fs = require('fs');
const path = require('path');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist', 'bundle.css');

function bundleStyles(srcPath, destPath) {
  const styles = [];

  try {
    const files = fs.readdirSync(srcPath);
    const stylesFiles = files.filter((file) => {
      const filePath = path.join(srcPath, file);
      const fileExt = path.extname(filePath);
      return fileExt === '.css';
    });

    stylesFiles.forEach((file) => {
      const filePath = path.join(srcPath, file);
      const fileData = fs.readFileSync(filePath);
      styles.push(fileData);
    });
    fs.writeFileSync(destPath, styles.join('\n'));
  } catch (err) {
    console.log(err.message);
  }
}

bundleStyles(srcPath, destPath);
module.exports = bundleStyles;
