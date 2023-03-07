#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

nvm install v14.19.1
nvm install 16
nvm use 14

cd ./packages/enketo-core && npm i
cd ..
cd ./packages/enketo-express && docker run --name enketo-redis-main -p 6381:6379 -d redis && docker run --name enketo-redis-cache -p 6382:6379 -d redis && npm i && npm i -g grunt
cd ..
cd ./packages/form-manager && npm i
cd ..
cd app/wrapper && npm i