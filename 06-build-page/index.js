const path = require('path');
const fs = require('fs');
const copyDir = require('../04-copy-directory/index');
const bundleStyles = require('../05-merge-styles/index');

const templatePath = path.join(__dirname, 'template.html');
const assetsFolder = path.join(__dirname, 'assets');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const dest = path.join(__dirname, 'project-dist');

fs.mkdir(dest, () => {
  console.log('Dist folder created');
});

fs.readFile(templatePath, (err, mainData) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
  let replacedData = mainData.toString();
  const tagsRegex = /\{\{([^{}]+)}}/g;

  const tags = mainData.toString().match(tagsRegex) || [];
  tags.forEach((tag) => {
    const name = tag.slice(2, -2);
    const componentPath = path.join(componentsFolder, `${name}.html`);
    fs.readFile(componentPath, (err, componentData) => {
      if (err) {
        console.error(err.message);
      }
      replacedData = replacedData.replace(tag, componentData.toString());
      fs.writeFile(path.join(dest, 'index.html'), replacedData, () => {
        console.log(`${tag} replaced`);
      });
    });
  });
});

bundleStyles(stylesFolder, path.join(dest, 'style.css'));

fs.mkdir(path.join(dest, 'assets'), () => {
  console.log('Assets Folder created');
});

function copyAssets(src, dest) {
  fs.readdir(src, (err, files) => {
    if (err) {
      console.error(err.message);
    }
    fs.mkdir(dest, () => {});
    files.forEach((file) => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      fs.stat(srcPath, (err, stats) => {
        if (err) {
          console.error(err.message);
        }
        if (stats.isDirectory()) {
          copyAssets(srcPath, destPath);
        } else {
          fs.copyFile(srcPath, destPath, () => {});
        }
      });
    });
  });
}

copyAssets(assetsFolder, path.join(dest, 'assets'));
