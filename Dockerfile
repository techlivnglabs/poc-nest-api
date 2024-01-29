FROM node:18-alpine

WORKDIR /home/node/app


COPY . .
COPY .env.production .env
RUN rm -rf .env.production
RUN npm install


EXPOSE 3333

CMD ["npm","run","start:prod"]