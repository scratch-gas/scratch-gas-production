const request = require('request');

module.exports = {
  requestApi(accessToken) {
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
      console.log(JSON.parse(body));
    });
  },
};
