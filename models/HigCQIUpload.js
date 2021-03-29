const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HigCQIUpload = new Schema({
   testid: {
      type: String
   },
   date: {
      type: Date
   },
   cwi0: {
      type: Number
   },
   cwi1: {
      type: Number
   }
}, {
   collection: 'higUploadCqi'
})

module.exports = mongoose.model('HigCQIUpload', HigCQIUpload)

