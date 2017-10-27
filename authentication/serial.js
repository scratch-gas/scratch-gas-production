module.exports = {
  storeUser: function (user, done) {
    done(null,user);
  },
  attachUser: function (obj, done) {
    done(null, obj);
  }
};