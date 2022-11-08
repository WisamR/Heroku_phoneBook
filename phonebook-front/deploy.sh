#!/bin/sh
npm run build
rm -rf E:/FullStackCourse/heroku/phonebook-backend/build
cp -r build E:/FullStackCourse/heroku/phonebook-backend/
chmod u+x deploy.sh