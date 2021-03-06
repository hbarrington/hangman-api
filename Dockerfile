# Dockerfile for hangman-api expressjs app
FROM node:latest

# Create app directory
RUN mkdir -p /home/app
WORKDIR /home/app

# Install app dependencies
COPY package.json /home/app/
RUN npm install

# Bundle app source
COPY . .

# TODO - do this better
RUN ./node_modules/webpack/bin/webpack.js

EXPOSE 8080

CMD [ "npm", "start" ]
