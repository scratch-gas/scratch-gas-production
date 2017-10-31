const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Files = require('Files')


let folderSchema = {
  name: {type: String, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  files: [Files],
  folders: [folderSchema],

}




let Folder = mongoose.model('folder', folderSchema);
module.exports = Folder;