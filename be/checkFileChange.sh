#!/bin/bash
files=`git diff --name-only -r HEAD^1 HEAD `
checkChangeDb=false
checkChangeSc=false
changeBackend=false
for file in $files; do
  echo $file
  if [[ $file == *"be"* ]]; then
     echo "Dectect be changed"
     changeBackend=true
  fi
  if [[ $file == *"be/contracts/contractApi.sol"* ]]; then
     checkChangeSc=true
  fi
  if [[ $file == *"be/src/migrations"* ]]; then
     echo "Dectect migation changed"
     checkChangeDb=true
  fi
done

echo -n > "./jobNeedRun.sh"

if [[ $checkChangeSc == true ]]; then
     echo "Deploy and verify smart contract" 
     echo "npx hardhat run scripts/deploy.js --network testnet" >> "./jobNeedRun.sh"
     echo "network=testnet ./verify.sh" >> "./jobNeedRun.sh"
     
fi

if [[ $checkChangeDb == true ]]; then
     echo "Migrate and seed data"
     echo "./migrate.sh" >> "./jobNeedRun.sh"
fi

if [[ $changeBackend == true ]]; then
      echo "Restart backend"
      echo "docker compose down" >> "./jobNeedRun.sh"
      echo "docker compose up -d" >> "./jobNeedRun.sh"      
fi