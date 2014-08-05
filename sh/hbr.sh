#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "blogs.hbr.org" "/2014/08/*" "http://blogs.hbr.org/" "body" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi