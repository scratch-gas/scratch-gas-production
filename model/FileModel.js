const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let fileSchema = {
  name: {type: String, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  dependencies: {type: Array},
}


let Files = mongoose.model('file', fileSchema);
module.exports = Files;