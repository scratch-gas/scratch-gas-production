const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const request = require('request');
const GithubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const bodyParser = require('body-parser');
const logger =require('morgan');
const API = require('./authentication/request.js');


const PORT = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index',
    {
      message: 'Hello world of EJS!'

  });

app.post('/data', (req,res) => {
  console.log(req.body)
  let options = { method: 'GET',
  url: 'https://api.github.com/users/cli53/repos',
  headers:
  {
    'User-Agent': 'Project-Githug',
  },
     };
  request(`https://api.github.com/zen`,options,  function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
})


});
app.get('/test', function (req, res) {
  res.json({why:'why'})
})


app.listen(PORT, (err) => {
  if (err) {
    return console.log('Page not found', err);
  }
  console.log(`server is listening on ${PORT}`);
});

module.exports = app;


