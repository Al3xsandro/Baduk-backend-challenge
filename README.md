<h1 align="center">Project Baduk Back-end Jr</h1>

## Description 📖
 
  Simple Rest API designed for a backend challenge

## Routes

 - OpenAPI
    
    `[GET]` /docs

 - Customers

    `[POST]` /customers 
     - Create a new customer
    
    `[GET]` /customers
     - Get all customers
 
 - Products

    `[POST]` /products 
      - Create a new product
    
    `[GET]` /products
      - Get all customers

 - Orders
    
    `[POST]` /orders
      - Create a new order
    
    `[GET]` /orders
      - Get all orders
      

## Usage

```bash
# development
$ yarn start

# build
$ yarn build

# production mode
$ yarn start

# tests 
$ yarn test
```

## Database

 ```bash
 # Execute all migrations
 $ yarn typeorm migration:run

 # Run postgres
 $ docker-compose up -d
 ```
