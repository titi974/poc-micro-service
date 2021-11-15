FROM node:14-alpine

COPY /src /src
COPY package*.json /
COPY tsconfig*.json /
COPY nest-cli.json /
EXPOSE 3003
RUN yarn install
RUN yarn build
CMD ["yarn","start:prod"]

