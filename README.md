auditor
=======

A basic web-crawler for auditing websites.

## Usage

To crawl all pages on _mysite.com_ – collecting links within the body – and output the results to _mysite.tsv_:

```
node main.js "mysite.com" "*" "http://mysite.com/" "body" > mysite.tsv
```

To crawl the _blog_ section on _mysite.com_ – collecting links within the div#main – and output the results to _mysite.tsv_:

```
node main.js "mysite.com" "/blog/*" "http://mysite.com/blog/" "#main" > mysite.tsv
```

### To create a reusable script:
No one likes typing out long sentences to the command line. Here is _mysite.sh_:

```sh
#!/bin/sh
if [ $1 ]; then
	echo "Beginning crawl..."
	node main.js "mysite.com" "/blog/*" "http://mysite.com/blog/" "#main" > mysite.tsv
	echo "Done."
else
	echo "Please specify an output file (e.g. myCrawl.tsv)."
fi
```

Don't forget to ```chmod u+x mysite.sh``` on your script file.

## To Do

1. ~~Accept command-line parameters.~~	
2. Write results directly to a file.
2. ~~Add better error checking for URLs.~~
3. Capture the Response Code (200, 301, 404, etc.).
4. Consider modifying the UserAgent string to represent this crawler.
5. Add progress indicator.
6. Consider JSON output instead of TSV.


