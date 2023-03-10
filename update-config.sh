#!/bin/bash

formManagerBaseURI=${GITPOD_WORKSPACE_URL:8}
echo "$( jq '."formManagerBaseURI" = "'"https://3006-$formManagerBaseURI"'"' default-config.json )" > default-config.json   