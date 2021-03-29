const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let RSRP = new Schema({
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
   collection: 'rsrp'
})

module.exports = mongoose.model('RSRP', RSRP)

