#!/bin/sh
files=`git diff --name-only -r HEAD^1 HEAD `
for file in $files; do
  echo $file
  if [[ $file == *"be/contracts/contractApi.sol"* ]]; then
     npx hardhat run scripts/deploy.js --network testnet
     network=testnet ./verify.sh
  fi
  if [[ $file == *"be/src/migrations"* ]]; then
     ./migrate.sh
  fi
done