const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HigCQIDownload = new Schema({
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
   collection: 'higCqiDownload'
})

module.exports = mongoose.model('HigCQIDownload', HigCQIDownload)

