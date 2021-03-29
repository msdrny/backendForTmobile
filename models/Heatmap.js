const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Heatmap = new Schema({
   testID: {
      type: String
   },
   wlan: {
      type: String
   },
   bedroom1_1: {
      type: Number
   },
   bedroom1_2: {
      type: Number
   },
   bedroom2: {
      type: Number
   },
   kitchen1: {
      type: Number
   }
   ,
   kitchen2: {
      type: Number
   }
   ,
   wintergarden: {
      type: Number
   }
   ,
   livingroom1: {
      type: Number
   }
   ,
   livingroom2: {
      type: Number
   }
   ,
   livingroom3: {
      type: Number
   }
}, {
   collection: 'heatmap'
})

module.exports = mongoose.model('Heatmap', Heatmap)



