#!/bin/bash
cp config/default-config.json tmp.json

jq -r --arg ENCRYPTION_KEY $ENCRYPTION_KEY '."encryption key" |= $ENCRYPTION_KEY' tmp.json > config/default-config.json
jq -r --arg LESS_SECURE_ENCRYPTION_KEY $LESS_SECURE_ENCRYPTION_KEY '."less secure encryption key" |= $LESS_SECURE_ENCRYPTION_KEY' config/default-config.json > config/default-config.json

jq -r --arg REDIS_MAIN_HOST $REDIS_MAIN_HOST '."redis.main.host" |= $REDIS_MAIN_HOST' tmp.json > config/default-config.json
jq -r --arg REDIS_MAIN_CACHE $REDIS_MAIN_PORT '."redis.main.port" |= $REDIS_MAIN_PORT' tmp.json > config/default-config.json

jq -r --arg REDIS_CACHE_HOST $REDIS_CACHE_HOST '."redis.cache.host" |= $REDIS_CACHE_HOST' tmp.json > config/default-config.json
jq -r --arg REDIS_CACHE_CACHE $REDIS_CACHE_PORT '."redis.cache.port" |= $REDIS_CACHE_PORT' tmp.json > config/default-config.json

rm tmp.json

node app.js