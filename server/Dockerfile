# the main images
FROM node:24-alpine

COPY /app/package.json
COPY /app/src/
COPY /app/server.js

WORKDIR /app

RUN npm install

# last command in a dockerfile, a command that starts the application
CMD ["node", "server.js"]