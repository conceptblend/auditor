var spider = require('spider');

var output_separator	= "\t",
	g_domain			= process.argv[2] || "localhost:8888",
	g_scope				= process.argv[3] || "*",
	g_startPage			= process.argv[4] || "http://localhost:8888/anchor-test.html",
	container_selector	= process.argv[5] || "body",
	pages				= [],
	intTotalPages		= 0,
	g_maxPages			= process.argv[6] || 1000,
    g_urlFilterRegEx    = process.argv[7] ? new RegExp(process.argv[7], "gi") : null,
    usedAltText         = false; // used to identify if any H1s used image content with Alt Text

//console.log( process.argv );

// ==========================
//	MemoryCache object
// ==========================

function myMemoryCache () {
  this.cache = {};
}
myMemoryCache.prototype.get = function (_url, cb) {
  var url = _url.toLowerCase();
    //console.log ('cache:get - '+url);
  if (!this.cache[url]) return cb(null);
  cb({headers:this.cache[url].headers, body:this.cache[url].body.toString()});
}
myMemoryCache.prototype.set = function (_url, headers, body) {
  var url = _url.toLowerCase();
    //console.log ('cache:set - '+url);
  this.cache[url] = {headers:headers, body:new Buffer(body)};
}
myMemoryCache.prototype.getHeaders = function (_url, cb) {
  var url = _url.toLowerCase();
  if (!this.cache[url]) return cb(null);
  cb(this.cache[url].headers);
}

var g_spiderOpts = {
        maxConnections: 12,
        cache:          new myMemoryCache(),
        caseSensitive:  false
    };


// ==========================
//	/MemoryCache object
// ==========================

// ==========================
//	Output the results
// ==========================

function jsonify (val) {
	return JSON.stringify( val !== 'undefined' ? val : '' )
}

function trimSpaces (str) {
	return str.replace(/^ /gi, '').replace(/ $/gi, '');
}
function trimWhiteSpace (str) {
	return str.replace(/^[\t\n ]/gi, '').replace(/[\t\n ]$/gi, '');
}
function reduceToSpaces (str) {
    return trimWhiteSpace(str.replace(/[\r\n\t]/gi, ' ').replace(/[ ]+/gi,' '));
}
function wordCount (str) {
	return (str !== "") ? trimSpaces(str).split(' ').length : 0;
}

process.on('exit', function (){
    
    var strNotes = "Excludes non-html files.";
    if ( usedAltText ) {
        strNotes += " Some H1s used images as their content."
    }
    console.log( strNotes )
	
	console.log("Total pages: "+intTotalPages);

	// Output some column headings
	var headings = ["URL", "Title", "Title Word Count", "Title Length", "Description", "Description Word Count", "Description Length", "Keywords", "Keywords Count", "H1", "H1 Word Count", "H1 Length"];
	console.log( headings.join(output_separator) );
	
	pages.forEach(function (page){
		var csvLine = "";
		csvLine += jsonify( page.url/*.toLowerCase()*/ ) + output_separator;
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


spider(g_spiderOpts)
.route( g_domain, g_scope, function (window, $) {
	
	if (this.fromCache || (intTotalPages >= g_maxPages)) return;
	
	$(container_selector + ' a').filter(function(i){
		var self = $(this),
			href = self.attr('href');

        return !!href && (href.length > 0) && !!(href.search(/^mailto|javascript|tel/gi) == -1) && !(g_urlFilterRegEx !== null ? href.search(g_urlFilterRegEx) !== -1 : false);
	}).spider(g_spiderOpts);
	
	intTotalPages++;
	var output = [],
		el_pageTitle = $('head > title'),
		el_description = $('head > meta[name=description],head > meta[name=Description],'),
		el_keywords = $('head > meta[name=keywords],head > meta[name=Keywords]'),
		h1 = $('h1');

	var pageTitle_text = !!(el_pageTitle.length > 0) ? reduceToSpaces($(el_pageTitle).eq(0).text()) : "",
		description_content = !!(el_description.length > 0) ? reduceToSpaces($(el_description).eq(0).attr('content')) : "",
		keywords_content = !!(el_keywords.length > 0) ? reduceToSpaces($(el_keywords).eq(0).attr('content')) : "",
		h1_text = !!(h1.length > 0) ? reduceToSpaces(h1.eq(0).text()) : "";
    
        // A specific test for sites like apple.com that use images for H1s
        if (trimWhiteSpace(h1_text).length == 0) {
            var alt_text = "";
            h1.children('img').each(function(i){
                alt_text += $(this).prop("alt");
                usedAltText = true;
            });
            h1_text = alt_text;
        }
	
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
    
    /*
    var strOut = "";
    for (var p in page) {
        strOut += page[p] + ","   
    }
    console.log( strOut );
	*/
    
	pages.push( page );
	
})
.get( g_startPage )
.log( 'log' )
;