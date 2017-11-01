const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CURRENTLY NOT USING FILEMODEL.JS -- IF DECIDE TO USE:
//          COMMENT BACK IN MODULE.EXPORTS

let fileSchema = new Schema ({
  name: {type: String, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  dependencies: {type: Array},
});

const Files = mongoose.model('Files', fileSchema);
// module.exports = Files;