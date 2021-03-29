const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let RSSI = new Schema({

   datetime: {
      type: Date
   },
   interfaceName: {
      type: String
   }
   ,
   wifi: {
      type: String
   }
   ,
   SSID: {
      type: String
   }
   ,
   Signal: {
      type: String
   }
   ,
   Bitrate: {
      type: String
   }
   ,
   Frequency: {
      type: String
   }
}, {
   collection: 'rssi'
})

module.exports = mongoose.model('RSSI', RSSI)



