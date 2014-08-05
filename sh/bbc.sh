#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.bbc.com" "/news/world-*" "http://www.bbc.com/news/world-us-canada-28631777" "#main-content" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi