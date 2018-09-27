#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ${DIR}

docker pull jasonh815/cardcounterz-api
docker run --restart=always -d -p 3030:3030 --name cardcounterz jasonh815/cardcounterz-api
