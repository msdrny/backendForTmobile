const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Maximum = new Schema({
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
   collection: 'maximum'
})

module.exports = mongoose.model('Maximum', Maximum)

