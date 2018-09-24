#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd ../../${DIR}

docker pull mongo:4
docker run --rm -ti -p 27017:27017 -v $(pwd)/api/data/mongo:/data/db --name mongo mongo:4
