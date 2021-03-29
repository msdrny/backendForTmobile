const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let EigCQIUpload = new Schema({
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
   collection: 'eigUploadCqi'
})

module.exports = mongoose.model('EigCQIUpload', EigCQIUpload)

