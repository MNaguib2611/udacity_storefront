# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `http://localhost:3000/products` : `GET`
- Show `http://localhost:3000/products/:id` : `GET`
- Create `http://localhost:3000/products/` : `POST` [token required]
- popular `http://localhost:3000/popular` : `GET`
- Products by category `http://localhost:3000/products?category=:category` : `GET`

#### Users

- Index `http://localhost:3000/users` : `GET` [token required]
- Show `http://localhost:3000/users/:id` : `GET` [token required]
- Create `http://localhost:3000/users` : `POST` NO[token required]
- Auth `http://localhost:3000/authenticate` : `POST` NO[token required]

#### Orders

- Index `http://localhost:3000/orders?user_id=:user_id` : `GET` [token required]
- Show `http://localhost:3000/orders/:id` : `GET` [token required]
- Create `http://localhost:3000/orders` : `POST` [token required]
- complete `http://localhost:3000/orders` : `POST` [token required]
- completed Orders `http://localhost:3000/orders?user_id=:user_id` : `POST` [token required]

## Data Shapes

#### Products table

- id SERIAL PRIMARY KEY
- name `VARCHAR(100) UNIQUE`
- price `INTEGER`
- category `VARCHAR(100)`

#### Users table

- id `SERIAL PRIMARY KEY`
- firstName `VARCHAR(100) `
- lastName `VARCHAR(100) `
- username `VARCHAR(100) UNIQUE`
- password `VARCHAR(255)`

#### Orders table

- id `SERIAL PRIMARY KEY`
- user_id `FOREIGN KEY REFERENCES users(id)`
- status of order `ENUM ('active','complete')`

#### Order_Product (Many to Many pivot Table) table

- order_id `FOREIGN KEY REFERENCES orders(id)`
- product_id `FOREIGN KEY REFERENCES products(id)`
- quantity `INTEGER` based on which I decide the most popular product
