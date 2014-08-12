#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.bbc.com" "/news/*" "http://www.bbc.com/news/world/us_and_canada/" "#main-content" "100" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi