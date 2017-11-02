const request = require('request');


module.exports = {
    requestAPI(req, res, next){
        console.log(req.body.repo)
        let name = req.body.user
        let repos = req.body.repo
        let options = { method: 'GET',
        headers:
        {
          'User-Agent': 'Project-Githug',
        },
           };
        request(`https://api.github.com/repos/${name}/${repos}`,options,  function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //   console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
        next(body)
        });
        
    }
}