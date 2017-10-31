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
const request = require ('request');
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'));
app.use(session({ secret: 'yomomma', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/', postController.postRequest);

passport.use(new githubStrategy ({
  clientID: 'a6d93781fe295e2c9ce5',
  clientSecret: 'f0b48e47c452b696d88a709da6164d34f41c72b0',
  callbackURL: 'http://localhost:3000/auth/github/callback',
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick( () => done(null, profile));
  // console.log('THIS IS THE PROFILE', profile)
  // console.log('accessToken', accessToken)

  var options = { method: 'GET',
  url: `https://api.github.com/repos/CodesmithLLC/precourse-assessment/?access_token=${accessToken}`,
  headers: 
    {   
      'User-Agent': 'Project-Githug',
     } };
request(options, function (error, response, body) {
  if (error) throw new Error(error); 
  console.log(JSON.parse(body));
});
   

}))






app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/failure', successRedirect: '/success' }));

//Serialize the user for the session
//Determines which data of the user object should be stored in session
passport.serializeUser(function(user, done) {
  // console.log('THIS IS THE USER INSIDE SERIALIZE', user)
  //user.id is saved in session and later used to retrieve the whole object via deserialize function
  //user.id is attached to the session as 'req.session.passport.user = {id: user.id}
  done(null, user.id);
});
// //Deserialize the user for the session
// //first param is the key of the user user object that was given to done in serialize (user.id)
passport.deserializeUser(function(id, done) {
  //The user object is retrieved with the help of (user.id A.KA. id)
  //The id is matched with the database 
  // User.findById(id, (err, user) => {
    //fetch object attached to the request as req.user
      done(null, id); 
  // })
  
});

function ensureAuthenticated(req, res, next) {
  if(req.isAuthenticated()) return next();
  res.redirect('/failure');
};

app.get('/success', ensureAuthenticated, (req, res) => {
  res.status = 200;
  // console.log(res)
});
app.get('/failure', ensureAuthenticated, (req, res) => {
  res.rstatus = 401;
})

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

