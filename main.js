var spider = require('spider');

var output_separator	= "\t",
	g_domain			= process.argv[2] || "localhost:8888",
	g_scope				= process.argv[3] || "*",
	g_startPage			= process.argv[4] || "http://localhost:8888/anchor-test.html",
	container_selector	= process.argv[5] || "body",
	pages				= [],
	intTotalPages		= 0,
	g_maxPages			= process.argv[6] || 1000;

//console.log( process.argv );

// ==========================
//	MemoryCache object
// ==========================

function MemoryCache () {
  this.cache = {};
}
MemoryCache.prototype.get = function (_url, cb) {
  var url = _url.toLowerCase();
  if (!this.cache[url]) return cb(null);
  cb({headers:this.cache[url].headers, body:this.cache[url].body.toString()});
}
MemoryCache.prototype.set = function (_url, headers, body) {
  var url = _url.toLowerCase();
  this.cache[url] = {headers:headers, body:new Buffer(body)};
}
MemoryCache.prototype.getHeaders = function (_url, cb) {
  var url = _url.toLowerCase();
  if (!this.cache[url]) return cb(null);
  cb(this.cache[url].headers);
}

var cache = new MemoryCache();

// ==========================
//	/MemoryCache object
// ==========================

console.log("Excludes non-html files.")

// ==========================
//	Output the results
// ==========================

function jsonify (val) {
	return JSON.stringify( val !== 'undefined' ? val : '' )
}

function trimSpaces (str) {
	return str.replace(/^ /gi, '').replace(/ $/gi, '');
}

function wordCount (str) {
	return (str !== "") ? trimSpaces(str).split(' ').length : 0;
}

process.on('exit', function (){
	
	console.log("Total pages: "+intTotalPages);

	// Output some column headings
	var headings = ["URL", "Title", "Title Word Count", "Title Length", "Description", "Description Word Count", "Description Length", "Keywords", "Keywords Count", "H1", "H1 Word Count", "H1 Length"];
	console.log( headings.join(output_separator) );
	
	pages.forEach(function (page){
		var csvLine = "";
		csvLine += jsonify( page.url ) + output_separator;
		csvLine += jsonify( page.title ) + output_separator;
		csvLine += jsonify( page.titleWordLength ) + output_separator;
		csvLine += jsonify( page.titleLength ) + output_separator;
		csvLine += jsonify( page.description ) + output_separator;
		csvLine += jsonify( page.descriptionWordLength ) + output_separator;
		csvLine += jsonify( page.descriptionLength ) + output_separator;
		csvLine += jsonify( page.keywords ) + output_separator;
		csvLine += jsonify( page.keywordsCount ) + output_separator;
		csvLine += jsonify( page.h1 ) + output_separator;
		csvLine += jsonify( page.h1WordLength ) + output_separator;
		csvLine += jsonify( page.h1Length );
		
		console.log( csvLine );
	});
	
});

// ==========================
//	Output the results
// ==========================


spider({
	maxConnections: 12,
	cache: cache
})
.route( g_domain, g_scope, function (window, $) {
	
	if (this.fromCache || (intTotalPages >= g_maxPages)) return;
	
	$(container_selector + ' a').filter(function(i){
		var self = $(this),
			href = self.attr('href');
		return !!href && (href.length > 0) && !!(href.search(/^mailto|javascript|tel/gi) == -1) && !!(href.search(/referrer/gi) == -1);
		//return !!href && (href.length > 0) && !!(href.search(/^mailto|javascript|tel/gi) == -1) && !!(href.indexOf("getdoc.aspx") == -1);
		//return !!href && (href.indexOf('http') == 0);
	}).spider();
	
	intTotalPages++;
	var output = [],
		el_pageTitle = $('head > title'),
		el_description = $('head > meta[name=description]'),
		el_keywords = $('head > meta[name=keywords]'),
		h1 = $('h1');

	var pageTitle_text = !!(el_pageTitle.length > 0) ? $(el_pageTitle).eq(0).text() : "",
		description_content = !!(el_description.length > 0) ? $(el_description).eq(0).attr('content') : "",
		keywords_content = !!(el_keywords.length > 0) ? $(el_keywords).eq(0).attr('content') : "",
		h1_text = !!(h1.length > 0) ? h1.eq(0).text() : "";
	
	var page = {
		url						: this.url.href,
		title					: pageTitle_text,
		titleWordLength			: wordCount(pageTitle_text),
		titleLength				: pageTitle_text.length,
		description				: description_content,
		descriptionWordLength	: wordCount(description_content),
		descriptionLength		: description_content.length,
		keywords 				: keywords_content,
		keywordsCount			: wordCount(keywords_content),
		h1						: h1_text,
		h1WordLength			: wordCount(h1_text),
		h1Length				: h1_text.length
	};
	
	pages.push( page );
	
})
.get( g_startPage )
.log( 'log' )
;