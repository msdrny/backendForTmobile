const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Backhaul = new Schema({
   testID: {
      type: String
   },
   host: {
      type: String
   },
   usage: {
      type: Number
   },
   duration: {
      type: Number
   },
   port: {
      type: Number
   },
   date: {
      type: Date
   }
}, {
   collection: 'backhaul'
})

module.exports = mongoose.model('Backhaul', Backhaul)