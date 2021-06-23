const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Comment = new Schema({
   id: {
      type: Number
   },
   title: {
      type: String
   },
   start: {
      type: Date
   },
   draggable: {
      type: Boolean
   },
   
   allDay: {
      type: Boolean
   },
}, {
   collection: 'comments'
})

module.exports = mongoose.model('Comment', Comment)

