#!/bin/bash
jq -r '."encryption key" |= "adar"' config/default-config.json > config/default-config.json
cat config/default-config.json
node app.js