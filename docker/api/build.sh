#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR}

echo ${DIR}

docker build --tag jasonh815/cardcounterz-api --file Dockerfile ../../api/
docker push jasonh815/cardcounterz-api
