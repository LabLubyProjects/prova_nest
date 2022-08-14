FROM node:lts-alpine

WORKDIR /api

COPY . .

RUN yarn