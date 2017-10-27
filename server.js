const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getController = require('./controller/getController');
const postController = require ('./controller/postController');
const port = 3000;
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./static'));
// app.get('/', getController.getRequest, (req, res)=> {
//   res.sendFile(path.join(__dirname, 'index.html'));
//     // res.render();
// });

app.post('/', postController.postRequest);

app.get('/auth/github', (req, res) => {
  res.send("hey");
});

app.listen(port, (err)=> {
    if(err) {
        return console.log('Page not found', err);
    }
    console.log(`server is listening on ${port}`);
});

module.exports = app;



//route is a section of express code that associates HTTP verd(GET, POST, PUT, DELETE), 
// an url path/pattern, and a function that is called to handle the pattern