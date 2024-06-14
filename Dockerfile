FROM ubuntu:22.04

# Install dependencies
RUN apt-get update && apt-get install -y curl gnupg build-essential

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash -
RUN apt-get install -y nodejs
RUN node --version
RUN npm install -g yarn

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN yarn

# Bundle app source
COPY . .

# Build the app
RUN yarn build

EXPOSE 8888

CMD [ "yarn", "start:prod" ]