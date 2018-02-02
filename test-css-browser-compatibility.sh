#!/bin/bash

# npm install --save-dev doiuse

echo ''
echo 'Testing for compatibility with the last 2 versions of the following browsers:'
echo ''
echo 'Chrome, ChromeAndroid, Firefox, FirefoxAndroid, Safari, iOS Safari, Edge'
echo ''

npx doiuse --browsers "last 2 Chrome versions, last 2 ChromeAndroid versions, last 2 Firefox versions, last 2 FirefoxAndroid versions, last 2 Safari versions, last 2 iOS versions, last 2 Edge versions" ./dist/bundle.css
