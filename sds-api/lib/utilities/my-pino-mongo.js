/** ********************************************************************************************************************
 * note this code is copied from the npm package pino-mongodb
 * We have the starting point for this is that package but there are a few changes we wanted that it was just
 * easier to copy and past the project and then edit it locally
 **********************************************************************************************************************/

console.log('Child Started');


const env2 = require('env2');
const carrier = require('carrier');
const program = require('commander');
const MongoClient = require('mongodb').MongoClient;
const parseMongoUrl = require('muri');
const EOL = require('os').EOL;

//to test output
let fs = require('fs');
let logfile = fs.createWriteStream('local_log.log', {flags: 'a'});
// childProcess.stdout.pipe(myFile);





// const log = require('./lib/log')
// const pkg = require('./package.json')
// const makeInsert = require('./lib/makeInsert')

program
   .arguments('[mongo-url]')
   .option('-c, --collection <name>', 'database collection', 'logs')
   .option('-o, --stdout', 'output inserted documents into stdout', true)
   .option('-e, --errors', 'output insertion errors into stderr', false)
   .parse(process.argv)




// get database connection info***********************************
let connect_str;
//load correct env vars
if (process.env.NODE_ENV === "production"){
   env2('.env-prod');
   let user = process.env.MONGODB_USER;
   let pass = process.env.MONGODB_PASSWORD;
   let host = process.env.MONGODB_SERVER;
   let db = process.env.MONGODB_LOGS_DATABASE;
   let port = process.env.MONGODB_PORT;
   connect_str = `mongodb://${user}:${pass}@${host}:${port}/${db}`;

}
else {
   env2('.env-dev');

   let host = process.env.MONGODB_SERVER;
   let db = process.env.MONGODB_LOGS_DATABASE;
   let port = process.env.MONGODB_PORT;
   connect_str = `mongodb://${host}:${port}/${db}`;
}

const mongoUrl = (program.args[0] || connect_str);


//see: https://getpino.io/#/docs/api?id=levels
const levels = {
   labels: {
      '10': 'TRACE',
      '20': 'DEBUG',
      '30': 'INFO',
      '40': 'WARN',
      '50': 'ERROR',
      '60': 'FATAL'
   },
   // values: {
   //    fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10
   // }
};

function parseLog (data, get_str=true) {
   let log

   try {
      log = JSON.parse(data)

      if (log.time) {
         log.time = new Date(log.time)
      }

      if (log.level in levels.labels) {
         log.label = levels.labels[log.level];
      }
   } catch (e) {
      // log = {
      //    msg: data,
      //    time: new Date(),
      // }

      log = null;
   }


   let log_str = null;
   if (log !== null && get_str){
      log_str = `${log.label}: ${log.time}, ${log.msg}`;

      if (log.req != undefined){
         log_str += `, ${log.req.url}, from  ${log.req.remoteAddress}; ${log.req.headers.referer}`;
      }


      if (log.err != undefined){
         // log_str += `\n   ${log.err.message}`;
         log_str += `\n   ${log.err.stack}\n`;
      }
   }

   return {log, log_str};
}



const options = {
   forceServerObjectId: true
};

let callback = function (e, result) {
   if (e) {
      console.error(e);
   }
};

function insert (collection, line) {
   let {log, log_str} = parseLog(line, program.stdout);

   if (log === null){
      process.stdout.write(line + EOL)
   }
   else{

      if (log.level >=40){
         logfile.write(line + EOL);
         logfile.write(log_str + EOL);
      }

      collection.insertOne(log, options,callback);
      if (program.stdout){
         process.stdout.write(log_str + EOL)
      }
   }
}



function handleConnection (e, mClient) {
   if (e) {
      throw e
   }

   const dbName = parseMongoUrl(mongoUrl).db;

   const db = mClient.db(dbName);
   const emitter = carrier.carry(process.stdin);
   const collection = db.collection(process.env.MONGODB_LOGS_COLLECTION);
   // const insert = makeInsert(program.errors, program.stdout);

   emitter.on('line', (line) => {
      insert(collection, line)
   });

   process.on('SIGINT', () => {
      mClient.close(process.exit)
   })

   logfile.write('Initialized')
}

MongoClient.connect(
   mongoUrl,
   { useNewUrlParser: true, useUnifiedTopology: true  },
   handleConnection
);







