var fetch = require("node-fetch");
const blogJson = require("./src/cms_pages/blog.json");
const extraPageJson = require("./src/cms_pages/page.json");

// Settings blogs dynamic urls
var blogURIs = [];
var extraPageURIs = [];
blogJson["blog_data"].map((item) => blogURIs.push(item["url"]));
extraPageJson["page_content"].map((item) => extraPageURIs.push(item["url"]));

// Update Sitemap
const generateSitemap = async () => {
  const response = await fetch(`https://api.hubshub.in/generate/sitemap`, {
    method: "POST",
    body: JSON.stringify({
      blog_slugs: blogURIs,
      extra_page_slugs: extraPageURIs,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjb20uaHVic2h1Yi5wb3J0YWwiLCJpYXQiOjE2MDY1NDIxMzEsInRva2VuX3R5cGUiOiJmcm9udGVuZCJ9.tLgzAuU5cRtvcIk4LV7h-W6Rk4eVvPkiy6XN22uTbOQ`,
    },
  });

  return response;
};

generateSitemap()
  .then((response) => {
    console.log(response.status);
    if (response.status === 200) console.log("Sitemap Successfully Generated");
    else throw "Some Error Occured While Generating Sitemap";
  })
  .catch((err) => console.log(err));
