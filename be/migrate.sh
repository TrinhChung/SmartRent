#!/bin/sh
rm -rf /home/db/*
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
