#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "anga.us" "*" "http://anga.us/issues-and-policy" "body" "100" "\?" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
