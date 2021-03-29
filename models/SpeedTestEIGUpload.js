const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let speedTestEig = new Schema({
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
   collection: 'speedTestEigUpload'
})

module.exports = mongoose.model('speedTestEigUpload', speedTestEig)

