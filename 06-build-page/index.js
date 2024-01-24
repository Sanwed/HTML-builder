const path = require('path');
const fs = require('fs');

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

function copyAssets(src, dest) {
  fs.mkdir(path.join(dest), () => {});
  fs.readdir(src, (err, files) => {
    if (err) {
      console.error(err.message);
    }
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
          fs.readFile(srcPath, (err, data) => {
            if (err) {
              console.error(err.message);
            }
            fs.writeFile(destPath, data, () => {});
          });
        }
      });
    });
  });
}

copyAssets(assetsFolder, path.join(dest, 'assets'));

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

bundleStyles(stylesFolder, path.join(dest, 'style.css'));
