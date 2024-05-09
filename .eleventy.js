module.exports = function(eleventyConfig) {

	// Výchozí výstupní složka: _site

	// Zkopírovat images/ do _site/images
	eleventyConfig.addPassthroughCopy("images");

	// Zkopírovat css/ to _site/css/
	eleventyConfig.addPassthroughCopy("CSS");

  // Zkopirovat script do _site, aby fungovalo hamburger menu
  eleventyConfig.addPassthroughCopy("script-menu.js");

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