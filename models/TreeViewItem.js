const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Sidebar = new Schema({
   text: {
      type: String
   }
}, {
   collection: 'sidebar'
})



module.exports = mongoose.model('Sidebar', Sidebar)

