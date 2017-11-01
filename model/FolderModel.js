const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Files = require('./FileModel.js');

let fileSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true },
  dependencies: { type: Array },
});

let folderSchema = new Schema({
  name: {type: String, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  files: [ fileSchema ],
  folders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
});

// folders: [{type: Schema.Types.ObjectId, ref: 'Folder'}]

let File = mongoose.model('file', fileSchema);
let Folder = mongoose.model('folder', folderSchema);