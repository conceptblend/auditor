#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.capp.ca" "*" "http://www.capp.ca/pages/sitemap.aspx" ".capp-Container" "2000" "getdoc|referrer" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
