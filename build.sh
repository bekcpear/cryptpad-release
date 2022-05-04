#!/bin/bash
#

set -e

_L="${1}"

[[ -d ${_L} ]]

_P=${_L%%/}
_P=${_P%/*}

[[ -d ${_P} ]]

pushd "${_P}"

yarn add bower

cd "${_L}"

npm install --production

proxychains -q ../node_modules/bower/bin/bower install -p

popd


pushd $(realpath $0)
git checkout main
rm -rf node_modules www
cp -a ${_L}/{node_modules,www/bower_components} ./
mkdir www
mv bower_components www
popd
