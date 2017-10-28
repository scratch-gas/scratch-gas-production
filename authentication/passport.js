const passport = require('passport');
const oauthObj = require('./oauth.js');
const configure = require('./config.js');
const strategies = require('./strategies.js');
const serial = require('./serial.js');

passport.serializeUser(serial.storeUser);
passport.deserializeUser(serial.attachUser);
passport.use(new strategies.github(oauthObj.github, configure.strategy));

module.exports = passport;