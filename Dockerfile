FROM node:lts

RUN npm i -g pm2

RUN mkdir -p /concord

WORKDIR /concord

EXPOSE 7890

CMD npm i && pm2 start server.js --watch && pm2 logs server