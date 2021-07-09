const fs = require("fs");
const toPdf = require('mso-pdf')
var url = fs.readFileSync('./url.txt', 'utf8');
const baseUrl = "http://"+url+"/api/files/";
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];
        files.forEach((file) => {
      var d= new Date(fs.statSync(directoryPath + file).mtime.getTime())
      
      fileInfos.push({
        name: file,
        url: baseUrl + file, 
        date: d.toLocaleDateString() +" "+d.toLocaleTimeString()
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const uploadFile = require("../middleware/upload");

const upload = async (req, res) => {
 
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    var docName=req.file.originalname

    if(!docName.includes(".pdf")){
      await convertToPdf(docName,res)
    }
    else{
    res.status(200).send({
      message: "Uploaded the file successfully " 
    });
    }
  




  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file:  ${err}`,
    });
  }
};


 async function  convertToPdf(docName,res){

  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  if(docName){

    try {
      var source 		= directoryPath+docName
      console.log(source)
      var originalname= docName.split(".")[0]
      var destination	= directoryPath+originalname+".pdf"
      toPdf.convert(source,destination,function(errors){
          if(errors){console.log(errors)} 
          else{
            res.status(200).send({
              message: "Uploaded the file successfully" 
            });
console.log(destination + " converted")
          }
          
      })

  
      
    } catch (error) {
      res.status(500).send({
        message: `Could not upload the file:  ${error}`,
      });
    }

    
  
  }



}

module.exports = {
  getListFiles,
  download,
  upload
};