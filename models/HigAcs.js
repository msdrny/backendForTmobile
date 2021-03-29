const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let HigAcs = new Schema({
   testId: {
      type: String
   },
   time: {
      type: Date
   },
   cqi: {
      type: Number
   },
   bandwith: {
      type: Number
   },
   band: {
      type: Number
   },
   rsrp: {
      type: Number
   },
   rsrq: {
      type: Number
   },
   rssi: {
      type: Number
   }
   ,
   cellId: {
      type: Number
   }
}, {
   collection: 'higACS'
})

module.exports = mongoose.model('HigAcs', HigAcs)

