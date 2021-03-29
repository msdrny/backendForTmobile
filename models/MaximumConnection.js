const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let MaximumConnection = new Schema({
   id: {
      type: String
   },
   startTime: {
      type: Number
   },
   endTime: {
      type: Number
   }
}, {
   collection: 'maximumConnection'
})

module.exports = mongoose.model('MaximumConnection', MaximumConnection)

