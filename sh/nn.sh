#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.nngroup.com" "/articles/*" "http://www.nngroup.com/articles/breaking-web-conventions/" "article" "100" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi