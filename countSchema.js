const mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var countSchema = new Schema({
  name:String,
  studid :Number
 });
module.exports = countSchema;