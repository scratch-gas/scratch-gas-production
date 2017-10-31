const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const githubStrategy = require('passport-github2').Strategy;
const data = require('./data.js');
const passport = require('passport');
const bodyParser = require('body-parser');
const getController = require('./controller/getController');
const postController = require ('./controller/postController');
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'));
app.use(session({ secret: 'yomomma', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/', postController.postRequest);

app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/failure', successRedirect: '/success' }));

passport.use(new githubStrategy ({
  clientID: '665db1b034356213dab0',
  clientSecret: '7c591a716de4d335f82ecf4c250aa23757916970',
  callbackURL: 'http://localhost:3000/auth/github/callback',
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick( () => done(null, profile));
  console.log('THIS IS THE PROFILE', profile)
}))


passport.serializeUser(function(user, done) {
  console.log('THIS IS THE USER INSIDE SERIALIZE', user)
  // console.log('serialized user -->', user)
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  // console.log('serialized user -->', user)
  done(null, user);
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/failure');
};

app.get('/success', ensureAuthenticated, (req, res) => {
  res.status = 200;
});
app.get('/failure', ensureAuthenticated, (req, res) => {
  res.rstatus = 401;
})
//test1
// app.get('/getAll', (req, res) => {
//   res.send(JSON.stringify(data.actual));
// }); 

// app.get('/getAllMock', (req, res) => {
//   res.send(JSON.stringify(data.mock));
// }); 

// ensures that all routes are to be handled by REACT
app.get('*', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(PORT, (err)=> {
    if(err) {
        return console.log('Page not found', err);
    }
    console.log(`server is listening on ${PORT}`);
});

module.exports = app;



//route is a section of express code that associates HTTP verd(GET, POST, PUT, DELETE), 
// an url path/pattern, and a function that is called to handle the pattern

