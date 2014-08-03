var spider = require('../main');

var container_selector	= "#page",
	output_separator	= "\t",
	g_domain			= "capp.ca",
	g_scope				= "/rce/*",
	g_startPage			= "http://capp.ca/rce/";
	
// ==========================
//	MemoryCache object
// ==========================

function MemoryCache () {
  this.cache = {};
}
MemoryCache.prototype.get = function (url, cb) {
  if (!this.cache[url]) return cb(null);
  cb({headers:this.cache[url].headers, body:this.cache[url].body.toString()});
}
MemoryCache.prototype.set = function (url, headers, body) {
  this.cache[url] = {headers:headers, body:new Buffer(body)};
}
MemoryCache.prototype.getHeaders = function (url, cb) {
  if (!this.cache[url]) return cb(null);
  cb(this.cache[url].headers);
}

var cache = new MemoryCache();

// ==========================
//	/MemoryCache object
// ==========================

// Output some column headings
var headings = ["URL", "Title", "Title Length", "Description", "Description Length", "Keywords", "Keywords Count", "H1", "H1 Length"];
console.log( headings.join(output_separator));

spider({
	maxConnections: 6,
	cache: cache
})
.route( g_domain, g_scope, function (window, $) {
	
	if (this.fromCache) return;
	
	$(container_selector + ' a:not([href^=javascript])').filter(function(i){
		return !!$(this).attr('href')
	}).spider();
	
	
	var output = [],
		el_pageTitle = $('head > title'),
		el_description = $('head meta[name=description]'),
		el_keywords = $('head meta[name=keywords]'),
		h1 = $('h1'),
		h1Text = "";

	// URL
	output.push(this.url.href);
	
	// Page Title
	var pageTitle_text = !!el_pageTitle ? $(el_pageTitle).eq(0).text() : ""
	output.push( pageTitle_text );
	
	// Page Title Length
	output.push( !!pageTitle_text ? pageTitle_text.length : 0 );
	
	// Page Meta Description
	var description_content = !!el_description ? $(el_description).eq(0).attr('content') : "";
	output.push( description_content );
	
	// Page Meta Description Length
	output.push( !!description_content ? description_content.length : 0 );
	
	// Page Meta Keywords
	var keywords_content = !!el_keywords ? $(el_keywords).eq(0).attr('content') : "";
	output.push( keywords_content );
	
	// Page Meta Keywords Length
	output.push( !!keywords_content ? keywords_content.split(',').length : 0 );
	
	// H1
	output.push( !!h1 ? h1.text() : "" );
	
	// H1 length
	output.push( !!h1 ? h1.text().length : 0 );
	
	console.log( output.join(output_separator) );
	
})
.get( g_startPage )
.log( 'info' )
;
/*

.route('travel.nytimes.com', '*', function (window, $) {
  $('a').spider();
  if (this.fromCache) return;

  var article = { title: $('nyt_headline').text(), articleBody: '', photos: [] }
  article.body = '' 
  $('div.articleBody').each(function () {
    article.body += this.outerHTML;
  })
  $('div#abColumn img').each(function () {
    var p = $(this).attr('src');
    if (p.indexOf('ADS') === -1) {
      article.photos.push(p);
    }
  })
  console.log(article);
})
.route('dinersjournal.blogs.nytimes.com', '*', function (window, $) {
  var article = {title: $('h1.entry-title').text()}
  console.log($('div.entry-content').html())
})

*/