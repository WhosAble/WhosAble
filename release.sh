#!/bin/bash

mix deps.clean
mix deps.get
mix deps.compile exrm
MIX_ENV=prod mix phoenix.digest
MIX_ENV=prod mix release
rel/whos_able/bin/whos_able stop
rel/whos_able/bin/whos_able start
npm install
node_modules/brunch/bin/brunch build --production
