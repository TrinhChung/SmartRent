rm -rf /home/db/smartrent/*
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
