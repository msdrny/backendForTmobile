const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HIGUpload = new Schema({
   testid: {
      type: String
   },
   date: {
      type: Date
   },
   cellId: {
      type: String
   },
   rsrp: {
      type: Number
   },
   fltRsrp: {
      type: Number
   },
   rsrq: {
      type: Number
   },
   fltRsrq: {
      type: Number
   },
   instRSSI: {
      type: Number
   }
}, {
   collection: 'higUpload'
})

module.exports = mongoose.model('HIGUpload', HIGUpload)

