#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "moz.com" "/blog*" "http://moz.com/blog" ".container" "10" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi