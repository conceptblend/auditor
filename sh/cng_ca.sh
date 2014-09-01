#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.canadiannaturalgas.ca" "*" "http://www.canadiannaturalgas.ca/site-map" "div.content" "100" "\?" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
