#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.chamber.ca" "*" "http://www.chamber.ca/sitemap/" "#content_form" "100" "\?" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
