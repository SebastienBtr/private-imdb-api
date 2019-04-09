# Private IMDB api

## Description

This project is a Node.js api to create your own IMDB. Users are able to add movies, actors and reviews.

## Installation

* Run ```npm install```

* Run ```npm run rsa-keys```

* Create a MySQL database

* Create a .env file by copying the .sample.env file and complete the different fields

* Run ```npm run migration```

For database migrations the project uses sequelize : http://docs.sequelizejs.com/manual/tutorial/migrations.html

For user authentication the project uses json web tokens (with this package : https://github.com/auth0/express-jwt) and RS256 RSA keys to generate token.

## Project structure

```
api
├── config
│   ├── config.js //the config file for sequelize
│
├── controllers //contains all the controllers
│   ├── example.ctrl.js
│
├── documentation
│   ├── swagger.json //the swagger documentation file
│
├── logs //contain server logs
│   ├── jj-mm-aaaa.log
│
├── migrations //contain sequelize migrations
│
├── models //contain all the models
│
├── routes //contain all the routes
│
├── RSA-keys //contain the rsa keys to encrypt tokens
│
├── services //contain all the services
│   ├── example.srv.js
│
└── utils //contain some little functions/helpers

```

## Database shema

See db-schema.png

## Documentation

The documentation is made with swagger and can be find in the route "/api-documentation"