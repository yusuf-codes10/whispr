FROM node:24-alpine

COPY /app/package.json
COPY /app/src/
COPY /app/server.js

WORKDIR /app

RUN npm install