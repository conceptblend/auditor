#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "www.capp.ca" "*" "http://www.capp.ca/aboutus/contactus/pages/feedback.aspx?referrer=air" ".capp-Container" "1000" "\?" > $1
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi

# http://www.capp.ca/pages/sitemap.aspx
