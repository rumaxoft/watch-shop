FROM node:14-alpine

RUN mkdir -p /var/www/watch-shop/backend
WORKDIR /var/www/watch-shop/backend

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5050

# CMD [ "/bin/bash", "-c", "echo npm run data:import && npm start"]
