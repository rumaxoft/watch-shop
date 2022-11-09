FROM node:14-alpine

RUN mkdir -p /var/www/watch-shop/frontend
WORKDIR /var/www/watch-shop/frontend

COPY package*.json ./
RUN npm install

COPY . .

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=8080
