FROM nikolaik/python-nodejs:python3.10-nodejs18 As development
RUN apt update && apt install build-essential
WORKDIR /usr/src/app
RUN npm i -g pnpm
COPY package*.json ./
COPY keys ./keys/
COPY pnpm-lock.yaml ./
RUN pnpm i

FROM node:18-alpine As build
RUN npm i -g pnpm
WORKDIR /usr/src/app
COPY --chown=node:node keys ./keys/
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN pnpm i -P && pnpm store prune
USER node

FROM node:18-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/keys ./keys

EXPOSE 3006
CMD [ "node", "dist/main.js" ]