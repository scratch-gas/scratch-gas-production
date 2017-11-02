const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Files = require('./FileModel.js'); // not using

let fileSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  url: { type: String, required: true },
  dependencies: { type: Array },
});

let folderSchema = new Schema({
  name: {type: String, required: true},
  type: { type: String, required: true },
  url: {type: String, required: true},
  folders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
  files: [ fileSchema ],
});


const Files = mongoose.model('File', fileSchema);
const Folder = mongoose.model('Folder', folderSchema);

module.exports = {fileSchema: Files, folderSchema: Folder};
