const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let speedTestHIG = new Schema({
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
   collection: 'speedTestHigUpload'
})

module.exports = mongoose.model('speedTestHIGUpload', speedTestHIG)

