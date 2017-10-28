module.exports = { 

  strategy: function (accessToken, refreshToken, profile, done) {
    process.nextTick( () => done(null, profile));
  }

}