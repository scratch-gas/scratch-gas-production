// will need to require in mongoose models 
// const Files = require('../model/FolderModel.js').fileSchema;
// const Folder = require('../model/FolderModel.js').folderSchema;
const request = require('request');
const rp = require('request-promise');

// first finish recursion solution -- console log all files/folders/files within 
// then focus on database after

const dataController = {};
dataController.startPoint = async (response, body) => {
  console.log('ROOT: >>>>>>>>>>>');
  const ALLTHEDATA = await dataController.parseBody(body);
  console.log('ALLLLLLTHEDATAAAAAAA >>>>>>>>>>> ', ALLTHEDATA);
}

// let bank = []; //bank where you get cache('CASH') GET IT? LOL
dataController.parseBody = (body, count = 0) => { 
  return new Promise(async (resolve, reject) => {
    //ignore: For database purposes later (maybe)
    // let bulkWriteArray = []; 
    // object with file names = contents 
    // push object to bulwriteArray
    const bank = [];
    for (var i = 0; i < body.length; i++) {

      if (body[i].type === 'dir') {
        if (count === 0) console.log('INSIDE >>>>>> ROOT >>>>>>    FOLDER:     ' + body[i].name.toUpperCase());
        else console.log('INSIDE >>>>>>>>>>>    FOLDER:     ' + body[i].name.toUpperCase())

        const options = {
          method: 'GET',
          url: body[i].url,
          headers: { 'User-Agent': 'Project-Githug' },
          json: true // automatically parses the JSON string in the response
        }

        const folderFiles = await rp(options)
        .then(async (files) => {
          return await dataController.parseBody(files, 1);
        }).catch(err => {
          console.log(err);
        });

        let folderProp = {
          name: body[i].name,
          sha: body[i].sha,
          type: body[i].url,
          files: folderFiles,
        };

        bank.push(folderProp);
      }

      if (body[i].type === 'file') {
        if (count === 0) console.log('INSIDE >>>>>> ROOT >>>>>>    FILE:     ' + body[i].name.toUpperCase())
        else console.log('INSIDE >>>>>>>>>>>    FILE:       ' + body[i].name.toUpperCase())
        let fileProp = {
          name: body[i].name,
          sha: body[i].sha,
          type: body[i].type,
          url: body[i].url,
          dependencies: await dataController.grabDependencies(body[i].url),
        };
        bank.push(fileProp);
      }
    }

    return resolve(bank);
  })
};

dataController.grabDependencies = (fileURL) => {
  // GET REQUEST USING FILEURL + SHA
  // WILL NEED TO GET BODY AND DECODE DAT SHIIIIIII
  return ['DEPENDENCIES', 'GO', 'HERE']; // for now to test flow
};

module.exports = dataController;