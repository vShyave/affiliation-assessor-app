#!/bin/bash

git clone --recurse-submodules -j8 https://github.com/getodk/central
cd central

# overwrite files from central-config to current folder
cp -r ../central-config/* .

docker-compose build
docker-compose up -d

sleep 30

docker compose exec service odk-cmd --email chakshu@samagragovernance.in user-create
docker compose exec service odk-cmd --email chakshu@samagragovernance.in user-promote