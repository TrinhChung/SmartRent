files=`git diff --name-only -r HEAD^1 HEAD `
checkChangeDb=false
checkChangeSc=false
changeBackend=false
for file in $files; do
  echo $file
  if [[ $file == *"be"* ]]; then
     $changeBackend = true
  fi
  if [[ $file == *"be/contracts/contractApi.sol"* ]]; then
     $checkChangeDb = true
  fi
  if [[ $file == *"be/src/migrations"* ]]; then
     $checkChangeSc = true
  fi
done

if [[ $checkChangeSc == true ]]; then
     echo "Deploy and verify smart contract"
     npx hardhat run scripts/deploy.js --network testnet
     network=testnet ./verify.sh
fi

if [[ $checkChangeDb == true ]]; then
     echo "Migrate and seed data"
     ./migrate.sh
fi

if [[ $changeBackend == true ]]; then
      echo "Restart backend"
      docker compose down
      docker compose up -d
fi