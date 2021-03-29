const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let SpeedTestEIGDownload = new Schema({
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
   collection: 'speedTestEigDownload'
})

module.exports = mongoose.model('SpeedTestEIGDownload', SpeedTestEIGDownload)

