const request = require('request');
const dataMagic = require('../controller/dataMagicController.js')

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
      return dataMagic.startPoint(JSON.parse(body));
    });
  },

  // requestFolder: function(option) {
  //   console.log('IN REQUESTFOLDER!!!!! >>>>>>');
  //   request(options, (error, response, body) => {
  //     if (error) throw new Error(error);
  //     return dataMagic.parseBody(JSON.parse(body));
  //   });
  // },
};
