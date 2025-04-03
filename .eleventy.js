module.exports = function(eleventyConfig) {

	// Výchozí výstupní složka: _site

	// Zkopírovat images/ do _site/images
	eleventyConfig.addPassthroughCopy("images");

	// Zkopírovat css/ to _site/css/
	eleventyConfig.addPassthroughCopy("CSS");

  // Zkopirovat scripty do _site, aby fungovalo hamburger menu a hry
  eleventyConfig.addPassthroughCopy("script-menu.js");
  eleventyConfig.addPassthroughCopy("script.js");
  eleventyConfig.addPassthroughCopy("script-contact.js");

  // Zkopirovat script do _site, aby fungoval fslightbox na fotky
  eleventyConfig.addPassthroughCopy("fslightbox.js");

  // Poslani favicon - zatim jen testuji
  eleventyConfig.addPassthroughCopy("favicon.ico"); 

  return {
    // možné formáty šablon
    templateFormats: ["njk", "html", "md", "liquid"],

    // jako šablonovací jazyk zvolíme Nunjucks
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
  }
 
};