// will need to require in mongoose models 
const Files = require('../model/FileModel.js');
const Folder = require('../model/FolderModel.js');

const dataMagicController = {};
dataMagicController.parseBody = (body) => {
  // console.log(body);
  let fileProp;
  for (var i = 0; i < body.length; i++) {
    if (body[i].type === 'file') {
      fileProp = {
        name: body[i].name,
        sha: body[i].sha,
        type: body[i].type,
        url: body[i].url,
        dependencies: dataMagicController.grabDependencies(body[i].url),
      };
      // will save fileProp object to database! 
      console.log(fileProp);
    }

    if (body[i].type === 'folder') {
      return dataMagicController.parseBody(body[i]);
    }




  }
}

dataMagicController.grabDependencies = (fileURL) => {
  return [fileURL]; // for now to test flow -- will fix to send array of dependencies
};

// properties to grab in file: 
  // name, sha, url, type

// Iterate through body array -- 
  // Check if body[i].type === 'file' or 'dir'
    // if file -----> grab properties + save to DB + get request to grab dependencies (?)
    //                      let dependencies = grabDependencies(file);

    // if dir ------> will to do get request to access folder + then send that request.body
    //                back into parseBody(); recursively 


module.exports = dataMagicController;