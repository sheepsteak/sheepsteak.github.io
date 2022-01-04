FROM node:16.13.1-alpine

RUN apk add git

ENTRYPOINT yarn gh-pages -t -d $DIRECTORY -b master -u "$USER" -r https://sheepsteak:$PERSONAL_ACCESS_TOKEN@github.com/sheepsteak/sheepsteak.github.io.git --silent
