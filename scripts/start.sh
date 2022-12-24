cp .env.example .env
yarn
docker-compose down
docker-compose up -d && yarn start
