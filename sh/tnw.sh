#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "thenextweb.com" "/2014/07/*" "http://thenextweb.com/lifehacks/" ".l-content" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi