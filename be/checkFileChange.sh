#!/bin/sh
apt install git
files=`git diff --name-only -r HEAD^1 HEAD `
checkChangeDb=false
checkChangeSc=false
for file in $files; do
  echo $file
  if [[ $file == *"be/contracts/contractApi.sol"* ]]; then
     checkChangeDb = true
  fi
  if [[ $file == *"be/src/migrations"* ]]; then
     checkChangeSc = true
  fi
done

if [[ $checkChangeDb == true ]]; then
     npx hardhat run scripts/deploy.js --network testnet
     network=testnet ./verify.sh
fi

if [[ $checkChangeSc == true ]]; then
     ./migrate.sh
fi