FROM node:8-wheezy
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --no-bin-links
COPY . .
EXPOSE 3000
CMD [ "node", "app.js" ]
