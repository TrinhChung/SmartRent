#!/bin/sh
if [ -e /home/db/smartrent/Users.ibd ]
then 
  echo "DB is ready"
else
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
fi