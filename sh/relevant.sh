#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.relevantmagazine.com" "/life*" "http://www.relevantmagazine.com/life" "#content-wrapper" "100" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi