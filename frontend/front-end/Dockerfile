FROM node:alpine as ts-compiler
WORKDIR /home/container

ENV PATH /home/container/node_modules/.bin:$PATH

COPY package.json ./

RUN npm i
RUN npm i -g react-scripts
COPY . ./

CMD ["PORT=3003", "react-scripts", "start"]
