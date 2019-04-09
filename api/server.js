const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const expressJwt = require('express-jwt');
const fs = require('fs');
const winston = require('winston');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./documentation/swagger.json');

const routes = require('./routes/routes.module');

require('dotenv').config();

// Configure winston, a logging library
winston.remove(winston.transports.Console);
winston.add(require('winston-daily-rotate-file'), { filename: './logs/%DATE%.log', datePattern: 'DD-MM-YYYY' });

winston.add(winston.transports.Console, { timestamp: true, level: 'info' });

// Check if logs directory exist or not
const checkDirectorySync = (directory) => {
  try {
    fs.statSync(directory);
  } catch (e) {
    fs.mkdirSync(directory);
  }
};

// Check the directory for logs files
checkDirectorySync('./logs');

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // To the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

// Add socket.io to the request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(bodyParser.json());

// API Documentation
app.use('/api-documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const RSA_PUBLIC_KEY = fs.readFileSync(process.env.RSA_PUBLIC_KEY_PATH);

// Apply authentification middleware
app.use(expressJwt({ secret: RSA_PUBLIC_KEY }).unless({ path: ['/auth/login', '/users/create-user'] }));

// Register our routes
app.use(routes);

const port = process.env.SERVER_PORT;

// Start the server
server.listen(port, () => {
  winston.info(`Server is running on port ${port}`);
});
