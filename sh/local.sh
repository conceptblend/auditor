#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "localhost:8888" "*" "http://localhost:8888/page2.html" "body" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi