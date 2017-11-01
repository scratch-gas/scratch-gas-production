const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let fileSchema = new Schema ({
  name: {type: String, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  dependencies: {type: Array},
});

let Files = mongoose.model('files', fileSchema);
module.exports = Files;