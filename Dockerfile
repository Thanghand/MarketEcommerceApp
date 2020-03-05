FROM node:13-alpine

ARG app
ENV CONTAINER_PATH=/home/app
ENV APP=$app

RUN echo $APP

WORKDIR $CONTAINER_PATH
EXPOSE 3000 9229

ENTRYPOINT node --inspect=0.0.0.0 --harmony -r ts-node/register -r tsconfig-paths/register src/apps/$APP/main.js
