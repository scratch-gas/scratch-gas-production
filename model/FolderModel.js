const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Files = require('./FileModel.js')


let folderSchema = new Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  files: [ Files ],
  folders: [ {type: Schema.Types.ObjectId, ref: 'Folder'} ],
});

let Folder = mongoose.model('folder', folderSchema);
module.exports = Folder;