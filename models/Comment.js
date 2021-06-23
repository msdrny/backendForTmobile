const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Calendar = new Schema({
   id: {
      type: Number
   },
   title: {
      type: String
   },
   color: new Schema({

      primary  :{type:String},
      secondary :{type:String}

   })
      
   ,
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
   collection: 'calendar'
})

module.exports = mongoose.model('Calendar', Calendar)

