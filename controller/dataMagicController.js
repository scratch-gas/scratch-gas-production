// will need to require in mongoose models 
const Files = require('../model/FileModel.js');
const Folder = require('../model/FolderModel.js');

const dataMagicController = {};
dataMagic.parseBody = (body) => {
  // console.log(body);
  for (var i = 0; i < body.length; i++) {
    if (body[i].type === 'file') {
      console.log(body[i]);
    }
  }
}

// properties to grab in file: 
  // name, sha, url, type

// Iterate through body array -- 
  // Check if body[i].type === 'file' or 'dir'
    // if file -----> grab properties + get request to grab dependencies (?)
    //                      let dependencies = grabDependencies(file);

    // if dir ------> will to do get request to access folder + then send that request.body
    //                back into parseBody(); recursively 


module.exports = dataMagicController;