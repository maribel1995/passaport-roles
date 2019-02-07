require('dotenv').config();
const http = require('http');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const app = express();

mongoose
  .connect('mongodb://localhost/passaport-roles', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);



// Middleware Setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
    

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

const index = require('./routes/index');
app.use('/', index);


app.use((req, res, next) => {
    res.status(404);
    res.render('not-found');
});

app.use((err, req, res, next) => {
    // always log the error
    console.error('ERROR', req.method, req.path, err);
  
    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      res.status(500);
      res.render('error');
    }
  });

  let server = http.createServer(app);

  server.on('error', error => {
    if (error.syscall !== 'listen') { throw error }
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${process.env.PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${process.env.PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
  
  server.listen(3000, () => {
    console.log(`Listening on http://localhost:${3000}`);
  });

  module.exports = app;