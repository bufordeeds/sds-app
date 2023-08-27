"use strict";

const env2 = require('env2');
const {spawn} = require('child_process');


if (process.env.NODE_ENV === "production"){
   env2('.env-prod');
}
else {
   env2('.env-dev');
}




const express = require('express');
const bodyParser = require('body-parser');  // middle ware to parse the request body
const sanitize = require('mongo-sanitize'); //cleans user input when making db queries

const cors = require('cors');

const auth_routes = require('./handlers/public/auth');
const public_routes = require('./handlers/public/public');
const store_routes = require('./handlers/public/store');
// const store_routes_public = require('./handlers/public/store_del');

const private_routes = require('./handlers/private/private');
const admin_routes = require('./handlers/admin/admin');


const stripe_webhooks = require('./handlers/webhooks/stripe');
const easypost_webhooks = require('./handlers/webhooks/easypost');

const DBConnection = require('./db/DBConnection');




// const pino = require('pino'); //logger
// const pinoExpress = require('express-pino-logger');
// const logger = pinoExpress({
//    logger: pino({
//       prettyPrint: process.env.NODE_ENV === 'production'? false : true,
//       redact: ['req.headers.authorization'],
//    }),
// });


const pinoExpress = require('express-pino-logger');
const logger = pinoExpress({
   // prettyPrint: process.env.NODE_ENV === 'production'? false : true,
   prettyPrint: true,
   redact: ['req.headers.authorization'],
});


// process.on('exit', function(e){
//    console.log('test', e)
//    process.exit(0);
//    // await logger.logger.info('Server shutting down')
// })


/**
 * main function to configure and start express server
 */
async function main(){

   const app = express();


   let dbc = new DBConnection();
   await dbc.connect();


   //*******************************************************************************************************************
   //******************************** add middleware *******************************************************************
   //*******************************************************************************************************************

   app.disable('x-powered-by');

   //** add cors config******
   // https://expressjs.com/en/resources/middleware/cors.html#configuring-cors-w-dynamic-origin
   var corsOptions = {
      origin: [
         'http://localhost:5300',
         'https://servicedogstandards.org',
         'https://testing.servicedogstandards.org',
         'https://espy-test-app.ngrok.io',
      ]
   }

   app.use(cors(corsOptions)) //enables cors for all normal requests
   app.options('*', cors(corsOptions)) // enables pre-flight request for OPTIONS request type


   //add pino logging
   app.use(logger); //adds 'log' to req object

   // app.use((req, res, next) =>{
   //    req.log.info('Beginning of request');
   //    console.log('blablablablablabla debugging')
   //    next();
   // })

   //decorate request with db object
   app.use((req, res, next) =>{
      req.my_db = dbc.get_db();
      next();
   })



   // note stripe needs use a raw parser so need to define this before adding the normal parsers
   app.use('/stripe', stripe_webhooks);


   // add body-parser: adds the "body" property to the req object

   // parse application/x-www-form-urlencoded
   app.use(bodyParser.urlencoded({ extended: false }));
   // app.use(bodyParser.json({ type: 'application/*+json' }));
   app.use(bodyParser.json()); //note this seems to adding 'null's to the console.  not sure why...



   //sanitize body
   app.use((req, res, next) =>{
      req.body = sanitize(req.body);
      next();
   })



   // app.use(express.static('static_serve'));



   //*******************************************************************************************************************
   //**************************** define routes ************************************************************************
   //*******************************************************************************************************************


   //Routes that don't require authentication
   app.use('/auth', auth_routes.router);
   app.use('/public', public_routes);
   app.use('/easypost', easypost_webhooks);
   // app.use('/stripe', stripe_webhooks); moved to before we add the body parser
   // app.use('/storePublic', store_routes_public);
   app.use('/store', store_routes);



   //routes that require authentication
   app.use('/private', private_routes);
   app.use('/admin', admin_routes);




   // app.get('/', async (req, res) => {
   //
   //    // let collection = req.db.collection('users');
   //    //
   //    // let data = await collection.find({}).toArray();
   //
   //    let data = [];
   //
   //    res.send(data);
   // });
   //
   //
   // app.get('/', async (req, res) => {
   //
   //    // let collection = req.db.collection('users');
   //    //
   //    // let data = await collection.find({}).toArray();
   //
   //    let data = [];
   //
   //    res.send(data);
   // });


//    app.get('/storeStripeSuccessRedirect', stripeSuccessRedirect);
//    async function stripeSuccessRedirect (req, res) {
// //success_url: process.env.WEB_APP_BASE_URL + '/store/success?session_id={CHECKOUT_SESSION_ID}',
//
//       res.redirect(process.env.WEB_APP_BASE_URL + '/store/success')
//       // res.send('test')
//    }
//
//






   //*******************************************************************************************************************
   //************************************** start server ***************************************************************
   //*******************************************************************************************************************
   const port = process.env.PORT;
   let server = app.listen(port, () => {
      logger.logger.info(`Server Started on port ${port}!`);
      // console.log(`Hello world app listening on port ${port}!`)
   });

   // https://www.derpturkey.com/increase-request-timeout-for-express-4/
   server.timeout = 240000;


}//main()



process.on('unhandledRejection', (err) => {

   console.log(err);
   process.exit(1);
});



// /**********************************************************************************************************************
//  *                                               Adding pino transporter as a subprocess
//  *
//  * https://stackoverflow.com/questions/32719923/redirecting-stdout-to-file-nodejs
//  *********************************************************************************************************************/
// if (process.env.NODE_ENV === "production" || true ){
//
//    console.log('Adding Child process for logging and redirecting output')
//
//    const childProcess = spawn('node', ['lib/utilities/my-pino-mongo.js']);
//
//    // process.stdout.write  = childProcess.stdin.write.bind(childProcess.stdin);
//
//    // to test output
//    let fs = require('fs');
//    let myFile = fs.createWriteStream('local_log.log', {flags: 'a'});
//    // childProcess.stdout.pipe(myFile);
//
//
//    process.__defineGetter__('stdout', function() { return myFile });
//
// }
//
// /**********************************************************************************************************************
//  *                                                   End of logging coding                                           */







main();
