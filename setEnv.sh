if [ "$env" == "test" ]; then
    node ./be/scripts/setEnvTest.js
else
    node ./be/scripts/setEnvTestNet.js
fi