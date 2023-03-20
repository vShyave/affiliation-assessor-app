#!/bin/bash

git clone --recurse-submodules -j8 https://github.com/getodk/central
cd central

# overwrite files from central-config to current folder
cp -r ../central-config/* .

docker-compose build
docker-compose up -d

sleep 30

source ../.env

echo $CENTRAL_USER_PASS | docker compose exec -T service odk-cmd --email $CENTRAL_USER_EMAIL user-create
docker compose exec service odk-cmd --email $CENTRAL_USER_EMAIL user-promote