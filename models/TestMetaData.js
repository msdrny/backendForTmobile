const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let TestMetaData = new Schema({
   id: {
      type: String
   },
   hardware_version: {
      type: String
   },
   software_version: {
      type: String
   },
   start_time: {
      type: String
   },
   estimated_end_time: {
      type: String
   },
   end_time: {
      type: String
   },
   test_name: {
      type: String
   },
   test_name_short: {
      type: String
   }
}, {
   collection: 'test-metadata'
})

module.exports = mongoose.model('TestMetaData', TestMetaData)