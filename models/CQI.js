const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let CQI = new Schema({
   id: {
      type: String
   },
   brand: {
      type: String
   },
   clientCounts: {
      type: Number
   },
   connectedClients: {
      type: Number
   },
   disconnectedClients: {
      type: Number
   }
}, {
   collection: 'cqi'
})

module.exports = mongoose.model('CQI', CQI)

