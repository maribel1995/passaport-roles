require('dotenv').config();
const http = require('http');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const session = require("express-session");
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const logger       = require('morgan');
const path         = require('path');
const app = express();
const User = require('./models/user');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

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


//passport auth
app.use(session({
  secret: "our-passport-local-strategy-app",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if(err) {return done(err);
    }
    done(null, user)
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  //passReqToCallback:true
}, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    console.log("user")
    if (err) {
      console.log("Incorrect")
      return done(err);
    }
    if (!user) {
      console.log("Incorrect username")
      return done(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log("Incorrect password")

      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  });
}));


app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

//logado
app.use((req,res, next) => {
  if(req.isAuthenticated()){
    res.locals.currentUser = req.user;
  }

  next();
})

//Inject Route
const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth)



//Error
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