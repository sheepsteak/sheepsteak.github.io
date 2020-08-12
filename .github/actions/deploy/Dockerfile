FROM node:12.18.3-alpine

RUN apk add git

ENTRYPOINT yarn gh-pages -t -d $DIRECTORY -b master -u "$USER" -r https://sheepsteak:$PERSONAL_ACCESS_TOKEN@github.com/sheepsteak/sheepsteak.github.io.git --silent
