# the main images
FROM node:24-alpine

WORKDIR /app/

COPY package.json .


RUN npm install

# now copy everything else (src, server.js, etc.)
COPY . .

# last command in a dockerfile, a command that starts the application
CMD ["node", "server.js"]