const express = require('express');
const app = express();
const inventoryRoute = express.Router();
var SSH = require('simple-ssh');
// Inventory model
let Inventory = require('../models/Inventory');
let Maximum = require('../models/Maximum');
let Throughput = require('../models/Throughput');
let Mqtt = require('../models/Mqtt');
let rsrq =require('../models/RSRQ');
let rsrp =require('../models/RSRP');
let cqi =require('../models/CQI');
let speedTest =require('../models/SpeedTest');
let TreeViewItem = require('../models/TreeViewItem');
let Users = require('../models/Users');
let Secondary = require('../models/Secondry');
let EIGUpload = require('../models/EIGUpload')
let EigCQIUpload = require('../models/EigCQIUpload')
let SpeedTestEIGUpload =require('../models/SpeedTestEIGUpload')
let EIGDownload = require('../models/EIGDownload')
let EigCQIDownload = require('../models/EigCQIDownload')
let SpeedTestEIGDownload =require('../models/SpeedTestEIGDownload')
let HIGUpload = require('../models/HIGUpload')
let HigCQIUpload = require('../models/HigCQIUpload')
let SpeedTestHIGUpload =require('../models/SpeedTestHIGUpload')
let HIGDownload = require('../models/HIGDownload')
let HigCQIDownload = require('../models/HigCQIDownload')
let SpeedTestHIGDownload =require('../models/SpeedTestHIGDownload')
let EigAcs =require('../models/EigAcs');
let HigAcs =require('../models/HigAcs');
let Readable = require('stream').Readable;
let MaximumConnection = require('../models/MaximumConnection');
let Backhaul = require('../models/Backhaul');
let Heatmap = require('../models/Heatmap');
let RSSI = require('../models/RSSI');
let JSONStream = require('JSONStream')
const sleep = require ("await-sleep")
const { login } = require("tplink-cloud-api");
const uuidV4 = require("uuid/v4");
const { consoleTestResultHandler } = require('tslint/lib/test');
const TPLINK_USER = "mesut@iointel.com";
const TPLINK_PASS = "Iointel2021";
const TPLINK_TERM = "term";
let Calendar = require('../models/Calendar')

// var request = require('request')
// , JSONStream = require('JSONStream')
// , es = require('event-stream');
// const { getLocaleWeekEndRange } = require('@angular/common');



async function main() {
  // log in to cloud, return a connected tplink object
try{  let tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM);
  let dl = await tplink.getDeviceList();
  return dl}
catch(err){
  return err
}

}

async function toggle(alias) {

   
  try{    const tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM);
    const dl = await tplink.getDeviceList();
    let myPlug = tplink.getHS100(alias);
    let myPlugForHub
    try{ myPlugForHub = tplink.getHS100(alias+"H");}catch{myPlugForHub = null}
    
    let powerStatus=await myPlug.getRelayState()
    let response
    if(powerStatus == 1){
      response= await  myPlug.powerOff()
      if(myPlugForHub){await myPlugForHub.powerOff()}
      
    }
    else{
      await sleep(3000);
      response= await  myPlug.powerOn()
      await sleep(10000);
      if(myPlugForHub){await myPlugForHub.powerOn()}
    
    }
   
    //console.log("myPlug:", myPlug);
    // let response = await myPlug.toggle();
  return response}
  catch(err){
    throw err
  }

}


inventoryRoute.get("/deviceList", async (request, response,next) => {

 try{    
   
  const tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM);
  //console.log("current auth token is", tplink.getToken());
  var json=[]
  let dl = await tplink.getDeviceList();
  
  for (const [i, plug] of dl.entries()) {  
    var alias=plug.alias
   
    if(alias.includes("H")==false){
       console.log(alias.includes("H") +"is for "+alias)
    
    var myPlug = tplink.getHS100(plug.alias); 
    if(plug.status == 0){
      plug.powerStatus=0
    }
    else{
      let powerStatus=await myPlug.getRelayState()
   plug.powerStatus=powerStatus
    }
    json.push(plug)
  
  }

 
 
   } 

   if(json){
    json.sort(function(a, b) {

    return a.alias.localeCompare(b.alias)
});
}
  response.send(json) 


}
  catch(error){ response.send(error)}


});

inventoryRoute.post("/toggleSmartPlug", async (request, response) => {
  try{
  alias=request.body.params.updates[0].value
  res=await toggle(alias)
  console.log(res)
  response.status(200).send(res)
  }  catch(error){ 
    console.log(error)
    response.status(500).send(error.message)}
  

});


inventoryRoute.post("/onPlug/:alias", async (request, response) => {
  try{
    const tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM);
    let dl = await tplink.getDeviceList();
  alias=request.params.alias
  let myPlug = tplink.getHS100(alias);
  res= await  myPlug.powerOn()
  console.log(res)
  response.status(200).send(res)
  }  catch(error){ 
    console.log("hjghjghjgjyg")
    response.status(500).send(error.message)}
  

});

inventoryRoute.post("/offPlug/:alias", async (request, response) => {
  try{
    const tplink = await login(TPLINK_USER, TPLINK_PASS, TPLINK_TERM);
    let dl = await tplink.getDeviceList();
   alias=request.params.alias
   console.log(alias)
  let myPlug = tplink.getHS100(alias);
  res= await  myPlug.powerOff()
  console.log(res)
  response.status(200).send(res)
  }  catch(error){ 
    console.log("hjghjghjgjyg")
    response.status(500).send(error.message)}
  

});




////////Start HeatMap
inventoryRoute.route('/rssi').get((req, res) => {
  
  RSSI.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
////////End HeatMap




////////Start HeatMap
inventoryRoute.route('/heatmap/:id').get((req, res) => {
  
  Heatmap.find({id:req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})
////////End HeatMap



////////Start Maximum Connection 

inventoryRoute.route('/maximumConnection/').get((req, res) => {
  
  MaximumConnection.distinct('id',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/maximumConnection/:id').get((req, res) => {
  
  MaximumConnection.find({'id':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({time:1})
})
////////End Maximum Connection 



//Start HIG Download


inventoryRoute.route('/higAcsDownload/:id').get((req, res) => {
  
  HigAcs.find({'testId':req.params.id,time:{$gte: new Date("2020-07-31T07:23:33.000Z") , $lt: new Date("2020-07-31T07:38:40.000Z")}},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({time:1})
})


inventoryRoute.route('/speedTestHigDownload/:id').get((req, res) => {
  
  SpeedTestHIGDownload.find({'id':req.params.id,time:{$gte: new Date("2020-07-31T07:23:33.000Z") , $lt: new Date("2020-07-31T07:38:40.000Z")}},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/distinct/higDownload/').get((req, res) => {
  HIGDownload.distinct('testid',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/higCqiDownload/:id').get((req, res) => {
  HigCQIDownload.find({'testid':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/higDownload/:id').get((req, res) => {
  
  HIGDownload.find({'testid':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      
    }
  })
})

//End HIG Download



//Start HIG Upload


inventoryRoute.route('/higAcs/:id').get((req, res) => {
  
  HigAcs.find({'testId':req.params.id,time:{$gte: new Date("2020-07-31T06:18:44.000Z") , $lt: new Date("2020-07-31T06:35:40.000Z")}},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({time:1})
})


inventoryRoute.route('/speedTesthigUpload/:id').get((req, res) => {
  
  SpeedTestHIGUpload.find({'id':req.params.id,time:{$gte: new Date("2020-07-31T06:18:44.000Z") , $lt: new Date("2020-07-31T06:35:40.000Z")}},(error, data) => {
    if (error) {
      console.log(error)
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/distinct/higUpload/').get((req, res) => {
  HIGUpload.distinct('testid',{date:{$gte: new Date("2020-07-31T06:18:44.000Z") , $lt: new Date("2020-07-31T06:35:40.000Z")}},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/higcqiUpload/:id').get((req, res) => {
  HigCQIUpload.find({'testid':req.params.id,date:{$gte: new Date("2020-07-31T06:18:44.000Z") , $lt: new Date("2020-07-31T06:35:40.000Z")}},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/higUpload/:id').get((req, res) => {
  var rs = Readable();
  
  HIGUpload.find({'testid':req.params.id,date:{$gte: new Date("2020-07-31T06:18:44.000Z") , $lt: new Date("2020-07-31T06:35:40.000Z")}},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)



    


    }
  })
})
//End HIG Upload





//Start EIG Download

inventoryRoute.route('/eigAcsDownload/:id').get((req, res) => {
  
  EigAcs.find({'testId':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({time:1})
})

inventoryRoute.route('/speedTestEigDownload/:id').get((req, res) => {
  var rs = Readable();
  
  SpeedTestEIGDownload.find({'id':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/distinct/eigDownload/').get((req, res) => {
  EIGDownload.distinct('testid',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/eigCqiDownload/:id').get((req, res) => {
  EigCQIDownload.find({'testid':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/eigDownload/:id').get((req, res) => {
  var rs = Readable();
  
  EIGDownload.find({'testid':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      
    }
  })
})

//End EIG Download



//Start EIG Upload

inventoryRoute.route('/eigAcs/:id').get((req, res) => {
  
  EigAcs.find({'testId':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({time:1})
})
inventoryRoute.route('/speedTestEigUpload/:id').get((req, res) => {
  var rs = Readable();
  
  SpeedTestEIGUpload.find({'id':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/distinct/eigUpload/').get((req, res) => {
  EIGUpload.distinct('testid',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/eigcqiUpload/:id').get((req, res) => {
  EigCQIUpload.find({'testid':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/eigUpload/:id').get((req, res) => {
  var rs = Readable();
  
  EIGUpload.find({'testid':req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)



    


    }
  })
})
//End EIG Upload


inventoryRoute.route('/secondry/distinct/testid').get((req, res) => {
  Secondary.distinct('id',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/secondary/distinctByHost/:id').get((req, res) => {
  Secondary.distinct('host',{id:req.params.id },(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/secondary/distinctByPort/:id/:host').get((req, res) => {
  Secondary.distinct('port',{id:req.params.id,host:req.params.host},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/secondary/port/:id/:host/:port').get((req, res) => {
  var integer = parseInt(req.params.port)
  Secondary.find({id: req.params.id,host:req.params.host,port:integer},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/secondary/:id').get((req, res) => {
  Secondary.find({id: req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/user/:mail/:password').get((req, res) => {
  Users.find({mail: req.params.mail,password: req.params.password},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/sidebar/').get((req, res) => {
  TreeViewItem.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/rsrq/').get((req, res) => {
  rsrq.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/rsrp/').get((req, res) => {
  rsrp.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/cqi/').get((req, res) => {
  cqi.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/speedTest/').get((req, res) => {
  speedTest.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/mqtt/').get((req, res) => {
  Mqtt.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/ssh').get((req, res) => {
  
//return res; 
  var ssh = new SSH({
      host: '192.168.0.133',
      user: 'ansible',
      pass: 'test2020'
  });
   
   ssh.exec('ansible-playbook /home/ansible/playbooks/maxthrpttest.yml', {
      out: function(stdout) {
          console.log(stdout);
         
      }
  }).start();
  res.json("Your Request sent it successfully")
  res.send('Your Request sent it successfully');
  
})

inventoryRoute.route('/getHackrfStatus').get((req, res) => {
  

	
	var SSH = require('simple-ssh');
//var command="echo $(stat --format=%Y /proc/$(ps ax  |grep hackrf  | awk '{ print $1; exit }'))"
var command="sh getStatus.sh"
var ssh = new SSH({
    host: '192.168.10.62',
    user: 'vpn',
    pass: 'testhouse2021'
});

ssh.exec(command, {
    out:  function(stdout) {
     //console.log(stdout)
      res.status(200).json(stdout)
    }


}).start();
ssh.on('error', function(err) {
    console.log('Oops, something went wrong.');
    console.log(err);
    ssh.end();
});


    
  })

    inventoryRoute.post("/startHackrfLoad",  (req, res,next) => {

       percantage=req.body.params.updates[0].value
       frequency=req.body.params.updates[1].value
       console.log(percantage,frequency)
    var SSH = require('simple-ssh');
    var command="nohup hackrf_transfer -c 127  -f "+frequency+"000000 -R -s 20000000 -a 1 -x 47 -l 40 -g 62 >/dev/null 2>&1 &  echo finish"
    var ssh = new SSH({
        host: '192.168.10.62',
        user: 'vpn',
        pass: 'testhouse2021'
    });
    
    ssh.exec(command, {
      out:  function(stdout) {
        ssh.end();
        res.status(200).json("Your request is implemented  successfully")
      }
  
  
  }).start();
  ssh.on('error', function(err) {
      console.log('Oops, something went wrong.');
      console.log(err);
      ssh.end();
  });
  
    
  // await  res.status(200).json("Your request is implemented  successfully")

      
    })

    inventoryRoute.route('/stopHackrfLoad').get((req, res) => {
  
      var command="pkill -9 hackrf ;hackrf_spiflash -R; echo finish"
      var ssh = new SSH({
          host: '192.168.10.62',
          user: 'vpn',
          pass: 'testhouse2021'
      });
      
      



      ssh.exec(command, {
        out:  function(stdout) {
          
          ssh.end();
          res.status(200).json("Your request is implemented  successfully")
        }
    
    
    }).start();
    ssh.on('error', function(err) {
        console.log('Oops, something went wrong.');
        res.status(400).json(err)
        console.log(err);
        ssh.end();
    });
      

        
      })

inventoryRoute.route('/distinctThroughput/').get((req, res) => {
  Throughput.distinct('id',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/throughput/:id').get((req, res) => {

  Throughput.find({id: req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/distinctMaximum/:id').get((req, res) => {
  Maximum.distinct(req.params.id,(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/distinctMaximumById/:id/:brand').get((req, res) => {
  Maximum.distinct(req.params.id,{id:req.params.brand },(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/brand/:id').get((req, res) => {

  Maximum.find({brand: req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/count/:id').get((req, res) => {

  Maximum.count({brand: req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



// Add Inventory
inventoryRoute.route('/create').post((req, res, next) => {
  Inventory.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Inventorys
inventoryRoute.route('/').get((req, res) => {
  Inventory.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Get All Inventorys
inventoryRoute.route('/distinct/:id').get((req, res) => {
  Inventory.distinct(req.params.id,(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


//Backhaul//

inventoryRoute.route('/backhaulTestId').get((req, res) => {
  Backhaul.distinct('testId',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/backhaulHost/:testId').get((req, res) => {
  Backhaul.distinct('host',{testId: req.params.testId},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/backhaulPort/:id/:host/:testId').get((req, res) => {
  Backhaul.distinct(req.params.id,{host:req.params.host,testId: req.params.testId},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/backhaul/:port/:id/:testId').get((req, res) => {
  var integer = parseInt(req.params.id)
  Backhaul.find({host:req.params.port,port: integer,testId:req.params.testId},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//Backhaul

inventoryRoute.route('/host/:id/:host').get((req, res) => {
  var cursor=Inventory.find({testId:req.params.id,host: req.params.host}).lean().stream()
  .pipe(JSONStream.stringify())
  .pipe(res.type('json'))

  
})

inventoryRoute.route('/host/:id/').get((req, res) => {


  Inventory.find({testId:req.params.id}).lean().cursor()
  .pipe(JSONStream.stringify())
  .pipe(res.type('json'))



  // Inventory.find({testId:req.params.id}).lean().stream();
  // stream.on('data', function (doc) {
  //   res.write(JSON.stringify(doc));
  // });
  // stream.on('end', function() {
  //   res.end();
  // });


 })


inventoryRoute.route('/distinctTestId/').get((req, res) => {
  Inventory.distinct('testId',(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.route('/testId/:id').get((req, res) => {
  Inventory.distinct('host',{testId:req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort()
})

inventoryRoute.route('/testId/:id').get((req, res) => {
  Inventory.distinct('host',{testId:req.params.id},(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort()
})

inventoryRoute.route('/aggregatedSum/:id').get((req, res) => {
  Inventory.aggregate([ {$match:{testId:req.params.id}},{$group:{"_id":{time:"$time"},total:{"$sum":"$bits_per_second"}}},{$sort:{"_id.time":1}} ],(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/aggregatedConnection/:id').get((req, res) => {
  Inventory.aggregate([ {$match:{testId:req.params.id}},{$group:{"_id":{time:"$time"},total:{"$sum":1}}},{$sort:{"_id.time":1}}],(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


inventoryRoute.route('/aggregatedAvg/:id').get((req, res) => {
  Inventory.aggregate([ {$match:{testId:req.params.id}},{$group:{"_id":"$host",total:{"$sum":1}}}],(error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})








// Get single Inventory
inventoryRoute.route('/read/:id').get((req, res) => {
  Inventory.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Inventory
inventoryRoute.route('/update/:id').put((req, res, next) => {
  Inventory.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Inventory
inventoryRoute.route('/delete/:id').delete((req, res, next) => {
  Inventory.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})
module.exports = inventoryRoute;


 function start() {
    
   Inventory.find({testId:"testForTime",host:"192.168.12.249"},(error, data) => {
      console.log("Hello")
      if (error) {
          console.log(error)
        return next(error)
        
      } else {
          console.log("hello")
      }
    }).lean()
}

inventoryRoute.route('/getAllCalendarList').get((req, res) => {
  Calendar.find((error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
})

inventoryRoute.post("/mesud",  (request, response) => {

  alias=request.body
  // console.log(alias)
  Calendar.insertMany(alias,(error, data) => {
    if (error) {
      response.status(500).json(error.message)
    } else {
      response.send("Successfully inserted into database")
    }
  })
 

  

});


inventoryRoute.post("/deleteMesud",  (request, response) => {

  alias=request.body
  console.log(alias)
  Calendar.deleteMany(alias,(error, data) => {
    if (error) {
      console.log(error)
      response.status(500).json(error.message)
    } else {
      console.log("Successfully deleted into database")
      response.send("Successfully deleted into database")
    }
  })
 

  

});

