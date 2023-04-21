#!/bin/bash

echo "$(jq -r --arg ENCRYPTION_KEY $ENCRYPTION_KEY '."encryption key" |= $ENCRYPTION_KEY' config/default-config.json)" > config/default-config.json
echo "$(jq -r --arg LESS_SECURE_ENCRYPTION_KEY $LESS_SECURE_ENCRYPTION_KEY '."less secure encryption key" |= $LESS_SECURE_ENCRYPTION_KEY' config/default-config.json)" > config/default-config.json
echo "$(jq -r --arg REDIS_MAIN_HOST $REDIS_MAIN_HOST '.redis.main.host |= $REDIS_MAIN_HOST' config/default-config.json)" > config/default-config.json
echo "$(jq -r --arg REDIS_MAIN_PORT $REDIS_MAIN_PORT '.redis.main.port |= $REDIS_MAIN_PORT' config/default-config.json)" > config/default-config.json
echo "$(jq -r --arg REDIS_CACHE_HOST $REDIS_CACHE_HOST '.redis.cache.host |= $REDIS_CACHE_HOST' config/default-config.json)" > config/default-config.json
echo "$(jq -r --arg REDIS_CACHE_PORT $REDIS_CACHE_PORT '.redis.cache.port |= $REDIS_CACHE_PORT' config/default-config.json)" > config/default-config.json
echo "$(jq -r --arg FORM_MANAGER_BASE_URI $FORM_MANAGER_BASE_URI '.formManagerBaseURI |= $FORM_MANAGER_BASE_URI' config/default-config.json)" > config/default-config.json

node app.js