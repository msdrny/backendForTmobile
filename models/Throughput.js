const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Throughput = new Schema({
   id: {
      type: String
   },
   time: {
      type: Number
   },
   l1w0: {
      type: Number
   },
   l1w1: {
      type: Number
   },
   l1w2: {
      type: Number
   }
   ,
   l1w3: {
      type: Number
   }
   ,
   l1w4: {
      type: Number
   }
   ,
   l1w5: {
      type: Number
   }
   ,
   l1w6: {
      type: Number
   }
   ,
   l1w7: {
      type: Number
   }
   ,
   l2w0: {
      type: Number
   }
   ,
   l2w1: {
      type: Number
   }
   ,
   l2w2: {
      type: Number
   }
   ,
   l2w3: {
      type: Number
   }
   ,
   l2w4: {
      type: Number
   }
   ,
   l2w5: {
      type: Number
   }
   ,
   l2w6: {
      type: Number
   }
   ,
   l2w7: {
      type: Number
   }
   ,
   l3w0: {
      type: Number
   }
   ,
   l3w1: {
      type: Number
   }
   ,
   l3w2: {
      type: Number
   }
   ,
   l3w3: {
      type: Number
   }
   ,
   l3w4: {
      type: Number
   }
   ,
   l3w5: {
      type: Number
   }
   ,
   l3w7: {
      type: Number
   }
   ,
   l3w7: {
      type: Number
   }
   ,
   connectedClients: {
      type: Number
   }
}, {
   collection: 'throughput'
})

module.exports = mongoose.model('Throughput', Throughput)



 
 

 
 