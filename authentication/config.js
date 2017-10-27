module.exports = { 

  strategy: function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
    return done(null,profile);
  },

}