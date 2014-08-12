#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "methodhome.com" "*" "http://methodhome.com/category/all/" "#content" "100" "\/cleanhappy\/|\/blog\/" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
