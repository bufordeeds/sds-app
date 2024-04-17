FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies by copying
# package.json AND package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
CMD ["node", "lib/index.js"]
