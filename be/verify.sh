source .env

if [ -z "$network" ]; then
    network=localhost
else
    network=$network
fi

npx hardhat  verify --network $network ${CONTRACT_ADDRESS}
npx hardhat  verify --network $network ${RE_ADDRESS}