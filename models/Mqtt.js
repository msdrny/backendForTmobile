const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Mqtt = new Schema({
   Status: {
      type: String
   },
   ModuleCommand: {
      type: String
   },
   duration: new Schema({
      data: new Schema({
         pci  :{type:Number},
         rssi :{type:Number},
         rsrp :{type:Number},
         rsrq :{type:Number},
         sinr :{type:Number},
         srxlev :{type:Number},
         band :{type:Number},
         bandw :{type:Number},
         rxch :{type:Number},
         txch :{type:Number},
         cid :{type:Number},
         sband :{type:Number},
         sbw :{type:Number},
         sch :{type:Number}
      })
   })
      
   ,
   time: {
      type: Date
   }
}, {
   collection: 'mqtt'
})

module.exports = mongoose.model('Mqtt', Mqtt)