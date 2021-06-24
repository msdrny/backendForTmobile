const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Comment = new Schema({
   comment: {
      type: String
   },
   insertDate: {
      type: String
   },
   date: {
      type: Date
   }
}, {
   collection: 'comments'
})

module.exports = mongoose.model('Comment', Comment)

