FROM node:alpine as ts-compiler
WORKDIR /home/container

ENV PATH /home/container/node_modules/.bin:$PATH

COPY frontend/front-end/package.json ./

RUN npm i
RUN npm i -g react-scripts
COPY frontend/front-end. ./

CMD ["PORT=3003", "react-scripts", "start"]
