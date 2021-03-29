const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let RSRQ = new Schema({
   id: {
      type: String
   },
   time: {
      type: Date
   },
   cqi: {
      type: Number
   }
}, {
   collection: 'rsrq'
})

module.exports = mongoose.model('RSRQ', RSRQ)

