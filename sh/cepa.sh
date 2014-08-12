#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.cepa.com" "*" "http://www.cepa.com/sitemap" "div.wrapbg" "100" "\/fr\/" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
