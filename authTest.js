const githubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const oauthObj = require('./oauth.js');
const configure = require('./config.js');
const strategies = require('./strategies.js');
const serial = require('./serial.js');

app.use(session({ secret: 'yomomma', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new githubStrategy ({
    clientID: '665db1b034356213dab0',
    clientSecret: '7c591a716de4d335f82ecf4c250aa23757916970',
    callbackURL: 'http://localhost:3000/auth/github/callback',
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick( () => done(null, profile));
    console.log('THIS IS THE PROFILE', profile)
  }))


app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/failure', successRedirect: '/success' }));


app.get('/success', testAuth, (req, res) => {
  res.status = 200;
});
app.get('/failure', testAuth, (req, res) => {
  res.rstatus = 401;
})


passport.serializeUser(function(user, done) {
    // console.log('serialized user -->', user)
    done(null, user._id);
  });
  passport.deserializeUser(function(user, done) {
    // console.log('serialized user -->', user)
    done(null, user._id);
  });

  function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect('/failure');
  };