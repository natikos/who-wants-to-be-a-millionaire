FROM node:14.16.1-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 3000

COPY . ./

CMD ["npm", "start"]