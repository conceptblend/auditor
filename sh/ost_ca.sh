#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.oilsandstoday.ca" "*" "http://www.oilsandstoday.ca/" "body" "1000" "\?" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
