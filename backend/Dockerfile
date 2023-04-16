FROM node:alpine as ts-compiler
WORKDIR /home/container

COPY . .

RUN yarn install
RUN yarn run build

FROM node:alpine as ts-remover
WORKDIR /home/container

COPY --from=ts-compiler /home/container/backend/package.json ./
COPY --from=ts-compiler /home/container/backend/yarn.lock ./
COPY --from=ts-compiler /home/container/backend/dist ./
RUN yarn install --production

FROM gcr.io/distroless/nodejs:16
WORKDIR /home/container
COPY --from=ts-remover /home/container/ ./
USER 1000
CMD ["src/main"]