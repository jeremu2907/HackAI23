FROM node:alpine as ts-compiler
WORKDIR /home/container

COPY ./frontend/front-end .

RUN yarn install
RUN yarn run build

FROM node:alpine as ts-remover
WORKDIR /home/container

COPY --from=ts-compiler /home/container/package.json ./
COPY --from=ts-compiler /home/container/yarn.lock ./
COPY --from=ts-compiler /home/container/build ./
RUN yarn install --production

FROM node:alpine
WORKDIR /home/container
COPY --from=ts-remover /home/container/ ./