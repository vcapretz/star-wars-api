FROM node:8.4.0-alpine

MAINTAINER Vítor Capretz <capretzvitor@gmail.com>

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
RUN npm i

COPY . /app

CMD ["npm", "start"]