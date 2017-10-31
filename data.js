// this is an example of what the real data will looklike. Using our own file structure
let mock = {
  authentication: {
    files: [ 'config.js', 'oauth.js', 'passport.js', 'serial.js', 'strategies.js', 'testAuth.js' ]
  },
  client: {
    components: {
      files: [ 'Dir.js', 'File.js', 'Home.js', 'Login.js', 'PrivateRoute.js', 'RublicRepo.js', 'SingleRepo.js']
    },
    files: [ 'App.js' ]
  },
  controller: {
    files: [ 'getController.js', 'postController.js' ]
  },
  static: {
    files: [ 'index.html', 'webpack-bundle.js' ]
  },
  files: [ 'server.js', 'webpack.config.js', 'package.json', 'package-lock.json', 'data.js' ]
}

let actual = {}




module.exports = {
  mock: mock,
  actual: actual
}