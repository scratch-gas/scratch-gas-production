const request = require('request');
const data = require('../controller/dataController.js')

module.exports = {
  requestApi: function(accessToken) {
    const options = {
      method: 'GET',
      url: `https://api.github.com/repos/cli53/scratch-gas-production/contents/?access_token=${accessToken}`,
      headers:
        {
          'User-Agent': 'Project-Githug',
        },
    };
    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      return data.startPoint(response, JSON.parse(body));
    });
  },
};
