#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "fivethirtyeight.com" "*" "http://fivethirtyeight.com/" "#content" "100" "" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
