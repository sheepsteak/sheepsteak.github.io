FROM node:12.7.0-alpine

RUN apk add git

ENTRYPOINT yarn gh-pages -d $DIRECTORY -b master -u "$USER" -r https://sheepsteak:$PERSONAL_ACCESS_TOKEN@github.com/sheepsteak/sheepsteak.github.io.git --silent
