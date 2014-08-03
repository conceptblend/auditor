auditor
=======

A basic web-crawler for auditing websites.

## Usage

To crawl CAPP.ca:

```
node capp_ca.js
```

To crawl CAPP.ca/rce

```
node rce.js
```

To crawl others, duplicate capp_ca.js and adjust these parameters:

```
var container_selector	= ".capp-Container",
	output_separator	= "\t",
	g_domain			= "www.capp.ca",
	g_scope				= "*",
	g_startPage			= "http://www.capp.ca/Pages/SiteMap.aspx";
```


## To Do

1. Accept command-line parameters.
2. Write results directly to a file.
2. Add better error checking for URLs.
3. Capture the Response Code (200, 301, 404, etc.).
4. Consider modifying the UserAgent string to represent this crawler.
5. Add progress indicator.
6. Consider JSON output instead of TSV.


