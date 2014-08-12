#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	
    node main.js "www.apple.com" "/ca/*" "http://www.apple.com/ca/iphone/" "body" "100" > $1
    # node main.js "www.apple.com" "*" "http://www.apple.com/sitemap/" "#main" "100" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi