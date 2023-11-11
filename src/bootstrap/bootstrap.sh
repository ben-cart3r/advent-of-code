#!/bin/bash
# USAGE: ./src/bootstrap/bootstrap.sh 2023

set -euo pipefail

if ! [ $# -eq 1 ]
  then
    echo "Exactly 1 argument is expected, received $#"
    exit 1
fi

if ! { [ ${#1} -eq 4 ] && [ "${1}" -gt 2015 ] && [ "${1}" -lt 2030 ]; }
  then
    echo "Expected a valid advent of code year, received ${1}"
    exit 1
fi

echo "Creating directory: ./src/${1}"
mkdir -p ./src/${1}

echo "Creating skeleton solutions and tests"
for i in $(seq -w 1 25)
do
    mkdir -p ./src/${1}/day${i}
    touch ./src/${1}/day${i}/input.txt
    touch ./src/${1}/day${i}/sample.txt
    cp ./src/bootstrap/template/index.ts ./src/${1}/day${i}/index.ts
    cp ./src/bootstrap/template/index.test.ts ./src/${1}/day${i}/index.test.ts
    sed -i "s/year-day/${1}-${i}/g" ./src/${1}/day${i}/index.test.ts
done

echo "Done!"