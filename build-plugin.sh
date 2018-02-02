#!/bin/bash

# Create basic JS wordpress plugin for uploading

cp -t ./natural-expression-generator-plugin ./dist/bundle.js ./dist/bundle.css ./src/ne-calc.php

zip -r natural-expression-generator-plugin.zip natural-expression-generator-plugin