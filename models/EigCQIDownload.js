const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let EigCQIDownload = new Schema({
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
   collection: 'eigCqiDownload'
})

module.exports = mongoose.model('EigCQIDownload', EigCQIDownload)

