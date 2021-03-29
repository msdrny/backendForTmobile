const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HIGDownload = new Schema({
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
   collection: 'higDownload'
})

module.exports = mongoose.model('HIGDownload', HIGDownload)

