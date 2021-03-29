const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let SpeedTestHIGDownload = new Schema({
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
   collection: 'speedTestHigDownload'
})

module.exports = mongoose.model('SpeedTestHIGDownload', SpeedTestHIGDownload)

