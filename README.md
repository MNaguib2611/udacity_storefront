# Yonsify Image Processing App

A simple Express application for the APIs of creating a store front for udacity Project.

## Project set up

- ` git clone  https://github.com/MNaguib2611/udacity_storefront.git`
- ` cd udacity_storefront`
- `./scripts/start.sh`
- the ```.env.example ```is prefilled with env variables for convenience Only
- the application will be running on `http://localhost:3000/`

## Scripts

- `yarn run start ` start dev server
- `yarn run build ` compile ts to js
- `yarn run jasmine ` run jasmine on dist folder
- `yarn run test ` run build & jasmine scripts
- `yarn run lint ` run linter
- `yarn run prettier ` check prettier
- `yarn run format:verify ` prettier verify format
- `yarn run format ` write prettier formate

## Endpints

### Products

- List products get`/products` requires NO token
- Show product by id get`/products/:id` requires NO token
- Top 5 popular products get`/popular` requires NO token
- Create products post`/products` requires A token

### Users

- List users get`/users` requires A token
- Show user by id get`/users/:id` requires A token
- Create a user post`/users` requires A token
- Authenticate a user post`/authenticate` requires NO token

### Orders

- List orders get`/orders` requires A token & user_id / status
- Show specific order get`/orders/id` requires A token
- Create an order post`/orders` requires A token
- Complete an order put`/orders/:id` requires A token

## Endpints Notes

- get`/products` accepts `category` parameter to filter products
- get`/popular` gets the most popular products based on placed quantity in orders
- get`/orders` accepts user_id[required] & status [optional:active/complete]

## Libraries used

- NodeJS using TypeScript
- ExpressJS
- pg
- db-migrate
- Jasmine
- SuperTest
- Jasonwebtoken
- Bcrypt
- Prettier
- Lint
