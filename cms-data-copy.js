const fs = require("fs");

const src = `./src/cms_pages/blog.json`;
const dest = `./public/cms_pages/blog.json`;

fs.copyFileSync(src, dest, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("success!");
  }
});
