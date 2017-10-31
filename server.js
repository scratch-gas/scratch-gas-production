const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const GithubStrategy = require('passport-github2').Strategy;
// const data = require('./data.js');
const passport = require('passport');
const bodyParser = require('body-parser');
const API = require('./authentication/request.js');
const postController = require('./controller/postController');
// const request = require('request');

const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./static'));
app.use(session({ secret: 'yomomma', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/', postController.postRequest);

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/failure');
}

passport.use(new GithubStrategy({
  clientID: 'a6d93781fe295e2c9ce5',
  clientSecret: 'f0b48e47c452b696d88a709da6164d34f41c72b0',
  callbackURL: 'http://localhost:3000/auth/github/callback',
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile));

  API.requestApi(accessToken);
  // const options = {
  //   method: 'GET',
  //   url: `https://api.github.com/repos/cli53/scratch-gas-production/contents/?access_token=${accessToken}`,
  //   headers:
  //   {
  //     'User-Agent': 'Project-Githug',
  //   },
  // };
  // request(options, (error, response, body) => {
  //   if (error) throw new Error(error);
  //   console.log(JSON.parse(body));
  // });
}));


app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/failure', successRedirect: '/success' }),
  ensureAuthenticated,
  (req, res) => {
    res;
  },
);

// Serialize the user for the session
// Determines which data of the user object should be stored in session
passport.serializeUser((user, done) => {
  // console.log('THIS IS THE USER INSIDE SERIALIZE', user)
  //  user.id is saved in session and later used to retrieve the whole object via deserialize function
  //  user.id is attached to the session as 'req.session.passport.user = {id: user.id}
  done(null, user.id);
});
// //Deserialize the user for the session
// //first param is the key of the user user object that was given to done in serialize (user.id)
passport.deserializeUser((id, done) => {
  // The user object is retrieved with the help of (user.id A.KA. id)
  // The id is matched with the database
  // User.findById(id, (err, user) => {
  // fetch object attached to the request as req.user
  done(null, id);
  // })
});


app.get('/success', ensureAuthenticated, (req, res) => {
  res.json({ message: 'hello' });
  res.status = 200;
});
app.get('/failure', ensureAuthenticated, (req, res) => {
  res.rstatus = 401;
});

// app.get('/getAll', (req, res) => {
//   res.send(JSON.stringify(data.actual));
// });

// app.get('/getAllMock', (req, res) => {
//   res.send(JSON.stringify(data.mock));
// });

// ensures that all routes are to be handled by REACT
app.get('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    return console.log('Page not found', err);
  }
  console.log(`server is listening on ${PORT}`);
});

module.exports = app;


// route is a section of express code that associates HTTP verd(GET, POST, PUT, DELETE),
// an url path/pattern, and a function that is called to handle the pattern

