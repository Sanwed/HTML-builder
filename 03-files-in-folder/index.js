const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }

  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (statErr, stats) => {
      if (statErr) {
        console.error(statErr.message);
        return;
      }

      if (stats.isFile()) {
        const fileSize = stats.size / 1024;
        console.log(
          `${path.basename(file)}-${path
            .extname(file)
            .slice(1)}-${fileSize.toFixed(3)}kb`,
        );
      }
    });
  });
});
