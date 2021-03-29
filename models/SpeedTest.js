const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let speedTest = new Schema({
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
   collection: 'speedTest'
})

module.exports = mongoose.model('speedTest', speedTest)

