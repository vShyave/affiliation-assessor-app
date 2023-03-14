#!/bin/bash

git clone --recurse-submodules -j8 https://github.com/getodk/central
cd central

# overwrite files from central-config to current folder
cp -r ../central-config/* .

docker-compose build
docker-compose up -d

sleep 30

echo "StrongPassword@1234" | docker compose exec -T service odk-cmd --email chakshu@samagragovernance.in user-create
docker compose exec service odk-cmd --email chakshu@samagragovernance.in user-promote