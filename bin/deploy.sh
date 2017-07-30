#!/bin/bash

rm -rf dist
git clone https://labspace-blog.squarespace.com/template.git dist
npm run assemble
npm run scripts
cd dist
git add -A
git commit -m "Manual deploy"
cd ..