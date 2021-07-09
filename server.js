let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   dbConfig = require('./database/db');
   fs = require('fs');

// Connecting with mongo db
mongoose.Promise = global.Promise;
// mongoose.connect(dbConfig.db, {
//    useNewUrlParser: true
// }).then(() => {
//       console.log('Database sucessfully connected')
//    },
//    error => {
//       console.log('Database could not connected: ' + error)
//    }
// )

// Setting up port with express js
const testHouseRoute = require('../backendForTmobile/routes/inventroy.route')
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cors()); 
// app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
// app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', testHouseRoute)

var fullUrl = fs.readFileSync('url.txt', 'utf8');
var url = fullUrl.split(":")[0]
var portFromTxt = fullUrl.split(":")[1] 
// Create port
const port = process.env.PORT || portFromTxt;
global.__basedir = __dirname;
const server = app.listen(port,url, () => {
//   const server = app.listen(port,'10.0.0.99', () => {  
console.log('Connected to port ' + port)
})
//console.log(server)

// Find 404 and hand over to error handler
app.use((req, res, next) => {
   next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message); // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});