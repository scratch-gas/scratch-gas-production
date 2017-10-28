const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const passport = require('./authentication/passport.js');
const bodyParser = require('body-parser');
const getController = require('./controller/getController');
const postController = require ('./controller/postController');
const testAuth = require('./authentication/testAuth.js');
const PORT = 3000;
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'));
app.use(session({ secret: 'yomomma', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/', postController.postRequest);

app.get('/home', (req, res) => res.sendFile(path.join(__dirname, '/static/index.html')));
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/', successRedirect: '/testAuth' }));
app.get('/testAuth', testAuth, (req, res) => {
  res.redirect('/home');
})

app.listen(PORT, (err)=> {
    if(err) {
        return console.log('Page not found', err);
    }
    console.log(`server is listening on ${PORT}`);
});

module.exports = app;



//route is a section of express code that associates HTTP verd(GET, POST, PUT, DELETE), 
// an url path/pattern, and a function that is called to handle the pattern