var express = require('express')
var router = express.Router()
const {ObjectId} = require('mongodb');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const helpers = require('../../db/helpers.js');
const u_helpers = require('../../utilities/helpers.js');

const _ = require('lodash');
const axios = require('axios');
const {DateTime} = require('luxon');

//xml parsing stuff
const xml2js = require('xml2js'); //for working with xml strings
const xmlParser  = new xml2js.Parser({trim: true, explicitArray: false, strict: false,
   normalizeTags: true, normalize: true,attrkey: '_attr', charkey: '_txt'});

const he = require('he'); //for encoding/decoding html strings

//**********stuff for file upload handling**************
const multer = require("multer"); //for file uploads
var storage = multer.memoryStorage();
const limits = {fileSize:2000*1000*1000}; //10mb
var upload = multer({ storage: storage, limits });

let s3_settings = {
   accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
   secretAccessKey: process.env.DO_SPACES_ACCESS_SECRET,
   endpoint: process.env.DO_SPACES_ENDPOINT
}
const AWS = require("aws-sdk");//used to store files on digital ocean's spaces service
const s3 = new AWS.S3(s3_settings);


//emailer stuff
const Emailer =require('../../utilities/emails/Emailer');
const emailer = new Emailer();





/**
 * generates an id for anonymous users
 */
router.post('/getSdsId', getSdsId );
async function getSdsId(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = [];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      let id = uuidv4();
      res.send(id);

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



/**
 * returns the public profile of a trainer
 */
router.post('/getTrainerProfile', getTrainerProfile );
async function getTrainerProfile(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['user_id', ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      let mld = req.my_db.models['user'];

      let options = {projection: {email: 1, name_first:1, name_last: 1, profile_image: 1, address: 1,
            trainer_info: 1, phone: 1}};


      let q = {
         account_type: 'TRAINER',
         deactivated:  {$ne: true}
      };

      try{
         q._id =  ObjectId(body.user_id);
      }
      catch (e) {
         q['trainer_info.custom_trainer_url'] =  body.user_id ;
      }

      q.account_visibility = 'Public';

      let ans = await mld.collection.findOne(q, options);

      res.send(ans);
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





router.post('/getUserProfile', getUserProfile );
async function getUserProfile(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['user_id', ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      let user_id = ObjectId(body.user_id);

      let mld = req.my_db.models['user'];

      let options = {projection: {account_type: 1, email: 1, name_first:1, name_last: 1, profile_image: 1, trainer_info: 1,
            handler_info: 1, aide_info: 1,
         }};

      let q = {
         _id: user_id,
         account_type: {$in: ['TRAINER', 'HANDLER', 'AIDE']},
         account_visibility: 'Public',
      };

      let user = await mld.collection.findOne(q, options);

      let q_dog = {
         deactivated: {$ne: true},
         $or: [
            {user_id },
            {trainer_id: user_id},
            {handler_id: user_id},
         ]
      }
      let dogs = await req.my_db.models['dog'].collection.findOne(q_dog, options);

      res.send({user, dogs});
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/getDogProfile', getDogProfile );
async function getDogProfile(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['dog_id', 'dog_num', 'just_get_id'];
      let error_msg = helpers.check_params2(body, params, {res, onlyOneOf: ['dog_id', 'dog_num', ]});
      if (error_msg !== null) {
         return;
      }


      if (body.dog_num != null){
         body.dog_num = body.dog_num.toLowerCase().replace('-', '');
         body.dog_num = body.dog_num.toLowerCase().replace('sds', '');
      }


      let just_get_id = body.just_get_id;
      if (just_get_id === undefined) just_get_id = false;

      let options = {projection: {handler_id: 1, name: 1, status: 1, trainer_id: 1, profile_image: 1, dog_num:1,
         num_pets: 1, microchip_num: 1, coat_color: 1, checks: 1}};

      let q;

      if (body.dog_id){
         q = {_id: ObjectId(body.dog_id)};
      }

      if (body.dog_num){
         q = {
            handler_id: { $ne: null},
            dog_num: body.dog_num
         };
      }




      let mld = req.my_db.models['dog'];
      let dog = await mld.collection.findOne(q, options);

      let projection = {deactivated: 1, account_visibility: 1,
         name_first: 1, name_last: 1, email: 1, trainer_info:1, "account_status.date_expiry": 1, handler_info: 1,
      }
      if (dog != null){
         await helpers.add_foreign_key_objects([dog], mld.schema, ['handler_id', 'trainer_id'], req.my_db, {projection});
      }



      if (dog == null || dog.status === 'Private' || dog.status === 'Washout'){
         res.send(null);
         return;
      }



      if (dog.handler_id_FR.deactivated === true || dog.handler_id_FR.account_visibility !== 'Public'){
         res.send(null);
         return;
      }
      else{
         res.send(dog);
         return;
      }


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


/**
 * returns dog profiles for the 'advanced search' on the home page
 */
router.post('/getDogProfileAdvanced', getDogProfileAdvanced );
async function getDogProfileAdvanced(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['handler_name_first', 'handler_name_last', 'dog_name'];
      let error_msg = helpers.check_params2(body, params, {res, anyOneOf: params});
      if (error_msg !== null) {
         return;
      }


      //figure out which info has been passed in
      let dog_info = false;
      let handler_info = false;

      if (typeof body.dog_name === 'string' && body.dog_name !== ''){
         dog_info = true;
      }

      if (typeof body.handler_name_first === 'string' && body.handler_name_first !== ''){
         handler_info = true;
      }

      if (typeof body.handler_name_last === 'string' && body.handler_name_last !== ''){
         handler_info = true;
      }


      //handle error case
      if (!dog_info && !handler_info){
         res.status(400).send('No search terms sent');
         return;
      }

      let ans;
      let mld_dog = req.my_db.models['dog'];
      let mld_user = req.my_db.models['user'];


      //********** Case 1: only dog info ********************************************************************************
      if (dog_info && !handler_info){


         //todo: clean input string to ensure that can't be used in a cross-scripting attack
         let q = {
            "name" : {$regex: `.*${body.dog_name}.*`, $options: 'i' },
            handler_id: {$ne: null}
         };
         ans = await mld_dog.collection.find(q).toArray();



      }//if only dog



      //********** Case 2: handler and dog info*************************************************************************
      if (handler_info){


         //todo: clean input string to ensure that can 't be used in a cross-scripting attack

         let match = {account_type: 'HANDLER', deactivated: {$ne: true}, account_visibility: 'Public'};
         if (typeof body.handler_name_first === 'string' && body.handler_name_first !== ''){
            // match.name_first =  {$regex: `.*${body.handler_name_first}.*`, $options: 'i' }; // any partial match
            match.name_first =  {$regex: `^${body.handler_name_first}$`, $options: 'i' }; //exact case insensitive match
         }

         if (typeof body.handler_name_last === 'string' && body.handler_name_last !== ''){
            // match.name_last =  {$regex: `.*${body.handler_name_last}.*`, $options: 'i' };
            match.name_last =  {$regex: `^${body.handler_name_last}$`, $options: 'i' };
         }


         // create match query for dogs
         let dog_match = {};
         if (typeof body.dog_name === 'string' && body.dog_name !== ''){
            // dog_match.name =  {$regex: `.*${body.dog_name}.*`, $options: 'i' };
            dog_match.name =  {$regex: `^${body.dog_name}$`, $options: 'i' };
         }


         // create aggregation pipeline
         let pipeline = [
            {"$match": match},

            {
               "$lookup": {
                  "from": "dogs",
                  "let": {
                     "handler_id": "$_id"
                  },
                  "pipeline": [
                     {
                        "$match": {"$expr": {"$eq": ["$handler_id", "$$handler_id"] } }
                     },
                     {
                        "$match": dog_match,
                     }
                  ],
                  "as": "dog"
               }
            },
            {
               "$unwind": {
                  "path": "$dog",
                  "preserveNullAndEmptyArrays": false
               }
            },
            {
               "$replaceRoot": {
                  "newRoot": "$dog"
               }
            }
         ];



         let options = {
            allowDiskUse: false
         };

         ans = await mld_user.collection.aggregate(pipeline, options).toArray();
      }




      //attach handler info
      let projection = {name_first: 1, name_last: 1, trainer_info:1, handler_info: 1, profile_image: 1};
      await helpers.add_foreign_key_objects(ans, mld_dog.schema, ['handler_id', ], req.my_db, {projection});


      res.send(ans);
         return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


/**
 * increments the pet count for this dog.
 * Returns the new pet count
 */
router.post('/petDog', petDog );
async function petDog(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['dog_id'];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      let mld = req.my_db.models['dog'];
      let update = {
         $inc: {'num_pets': 1}
      }
      let rec = await mld.collection.findOneAndUpdate({_id: ObjectId(body.dog_id)}, update, {returnOriginal: false});
      let dog = rec.value;




      if (dog.num_pets == undefined){
         update = {
            $set: {'num_pets': 1}
         }
         rec = await mld.collection.findOneAndUpdate({_id: ObjectId(body.dog_id)}, update, {returnOriginal: false});
         dog = rec.value;
      }

      res.send({num_pets: dog.num_pets});
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





















router.post('/searchUserByNumber', searchUserByNumber );
async function searchUserByNumber(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['member_num', ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      let mld = req.my_db.models['user'];
      let options = {projection: {_id: 1,}};

      let q = {
         member_num: body.member_num,
         account_type: {$in: ['TRAINER', 'HANDLER', 'AIDE']},
         account_visibility: 'Public',
         deactivated: {$ne: true}
      };

      let user = await mld.collection.findOne(q, options);


      res.send(user);
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





/**
 * returns users based on either location (lat/long) or an address (needs to be able to be parsed by geocodio)
 */
router.post('/getUsersByDistance', getUsersByDistance );
async function getUsersByDistance(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['location', 'address', 'miles' , 'will_travel', "will_transport", "have_facility"];
      let error_msg = helpers.check_params2(body, params, {res, required: ['miles'], onlyOneOf: ['location', 'address']});
      if (error_msg !== null) {
         return;
      }

      if (body.location){
         params = ['lat', 'long'];
         error_msg = helpers.check_params2(body.location, params, {required: params, passOnNull: true});
         if (error_msg !== null) {
            res.status(400);
            res.send('Check Parameters');
            return;
         }
      }



      // //todo: need to add more intelligent authorization
      // if (req.decoded_token.user_id !== body.user_id){
      //    res.status(403);
      //    res.send("Not Authorized");
      //    return;
      // }


      let location = body.location;


      let geo_info = null;
      if (location == null && body.address != null){
         let params = {
            api_key: process.env.GEOCODIO_API_KEY,
            q: body.address,
         }
         let geo_res = await axios.get('https://api.geocod.io/v1.6/geocode', {params});
         if (geo_res.data != undefined){
            let loc = geo_res.data.results;
            if (loc.length>0){
               loc = loc[0]; //get first result.

               location = {
                  lat: loc.location.lat,
                  long: loc.location.lng,
               }
               // //add/overwrite geo_info
               // body.update.geo_info = {
               //    location:{
               //       type: 'Point',
               //       coordinates: [loc.location.lng, loc.location.lat],
               //    },
               //    source: 'geocodio',
               //    raw_response:loc,
               // }
            }
         }
      } //end of getting geo info





      let METERS_PER_MILE = 1609.34;
      let miles = Number(body.miles)
      let geo_q = {
         account_type: 'TRAINER',
         account_visibility: 'Public',
         deactivated: {$ne: true},
         'trainer_info.address.geo_info.location': {
            $nearSphere: {
               $geometry: {
                  type: "Point",
                  coordinates: [location.long, location.lat]
               },
               $maxDistance: miles * METERS_PER_MILE
            }
         }
      };


      if (body.will_travel != null){
         geo_q['trainer_info.will_travel'] =  body.will_travel;
      }
      if (body.will_transport != null){
         geo_q['trainer_info.will_transport'] =  body.will_transport;
      }

      if (body.have_facility != null){
         geo_q['trainer_info.have_facility'] =  body.have_facility;
      }

      let mld = req.my_db.models['user'];
      let projection = {trainer_info:1, name_first: 1, name_last: 1, profile_image: 1, email: 1 }

      let users = await mld.collection.find(geo_q, {projection}).toArray();

      let ans = [];
      for (let u of users){
         let l = u.trainer_info.address.geo_info.location;
         ans.push({
            distance: u_helpers.haversine(location.lat, location.long, l.coordinates[1], l.coordinates[0]), //mongo stores [long, lat]
            user: u,
         })
      }



      res.send(ans);
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/getUserImages', getUserImages );
async function getUserImages(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['user_id', ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      let mld_image = req.my_db.models['image'];
      let ans = await mld_image.collection.find({user_id: ObjectId(body.user_id)}, {sort: {date_created: -1}}).toArray();

      res.send(ans);
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}




router.post('/getAnythingPawsableContent', getAnythingPawsableContent );
async function getAnythingPawsableContent(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = [ ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      let ap_data = await axios.get('https://www.anythingpawsable.com/feed');
      let rss = ap_data.data;
      let xml = await xmlParser.parseStringPromise(ap_data.data, {compact: true});


      let ans = [];

      //extract description for first three items

      let items = xml.rss.channel.item.slice(0, 3);
      for (let item of items){
         let desc = he.decode(item.description).trim();
         let tmp = await xmlParser.parseStringPromise(desc, {compact: true});

         //remove image tag from string
         desc = desc.replace( /(<([^>]+)>)/i, '');

         //trim to at most 500 chars.
         // see: https://stackoverflow.com/questions/5454235/shorten-string-without-cutting-words-in-javascript
         desc = desc.replace(/^(.{300}[^\s]*).*/, "$1");

         let article = {
            title: item.title,
            image: tmp.img._attr,
            description: desc,
            link: item.link,
            author: item['dc:creator'],
            date: DateTime.fromFormat(item['pubdate'], 'ccc, dd MMM yyyy HH:mm:ss ZZZ').toJSDate()
         };
         ans.push(article);
      }


      // let ans = xml.rss.channel.item[0]['content:encoded'];
      // let ans = xml.rss.channel.item;


      res.send(ans);
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



























/**
 * uploads a files to digital ocean spaces.
 * @param file        : the file object attached to the req object by the multer middleware
 * @param _id         : str, the ObjectId of the db record this file is related to
 * @param record_type : 'banner' | 'gallery' | 'profile' | 'dogProfile' | 'dogKit'
 *
 * @param fileType
 * @returns {Promise<{error: string}|ManagedUpload.SendData>}
 */
async function upload_to_spaces(file, _id, record_type,  {fileType= 'image'}={}){
   if (fileType === 'image' && !file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|)$/)){
      // res.status(400);
      // res.send('Image type not recognized');
      return {error: 'Image type not recognized'};
   }
   let tmp = file.originalname.split('.');
   let n = tmp.length;
   let ext='';
   if (n>1){
      ext = tmp[n-1];
   }


   let key = process.env.DO_SPACES_UPLOAD_PREFIX + '/' ;



   if (record_type === 'dogKit'){
      let d = DateTime.utc().toFormat('yyyyMMddHHmmssSSS');
      key += `kit_image/dog_${_id}/${d}.${ext}`
   }
   else{
      throw Error(`record_type="${record_type}" not recognized`)
   }


   let s3_params = {
      Bucket: process.env.DO_SPACES_BUCKET,
      Body : file.buffer,
      Key : key,
      ACL: 'public-read' //
   };
   let s3_res = await s3.upload(s3_params).promise();
   console.log("Uploaded to:", s3_res.Location);
   console.log("Uploaded to:", s3_res);

   return s3_res;
}


router.post('/uploadDogKitImage', upload.single('profile_pic'), uploadDogKitImage );
async function uploadDogKitImage(req, res, ) {
   try {
      let body = req.body;

      let file = req.file;

      //********check param values************************************************
      let params = ['file_key', 'dog_id',];
      let error_msg = helpers.check_params2(body, params, {res, required: [ 'dog_id']});
      if (error_msg !== null) {
         return;
      }

      let s3_res = await upload_to_spaces(file, body.dog_id, 'dogKit', )

      req.log.info("Uploaded to:", s3_res.Location);
      console.log("Uploaded to:", s3_res);


      //update dog profile with image
      let update = {
         _id: ObjectId(body.dog_id),
         kit_image: s3_res,
      };

      let mld_dog = req.my_db.models['dog'];
      await helpers.update_db_record(update, mld_dog);

      res.send(s3_res);
   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


router.post('/deleteDogKitImage', deleteDogKitImage );
async function deleteDogKitImage(req, res, ) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['dog_id', 's3_info' ];
      let error_msg = helpers.check_params2(body, params, {required: params} );
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }


      let s3_info = body.s3_info;

      //check if dog_num and the dog_id in the key match
      let split_key = s3_info.Key.split('/');

      if (split_key[2] !== 'dog_' + body.dog_id){
         res.status(403);
         res.send('Invalid Request: dog_id invalid');
         return;
      }


      if (! s3_info.Key.includes('/kit_image/') ){
         res.status(403);
         res.send('Invalid Request: Attempting to delete unauthorized image');
         return;
      }


      //delete file from spaces
      let s3_params = {
         Bucket: s3_info.Bucket,
         Key : s3_info.Key,
      };
      let s3_res = await s3.deleteObject(s3_params).promise();

      console.log(s3_res)

      //update dog rec

      let dog_update = {
         _id: ObjectId(body.dog_id),
         kit_image: null
      }

      let mld_dog = req.my_db.models['dog'];
      await helpers.update_db_record(dog_update, mld_dog);


      res.send('deleted');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/sendContactUs', sendContactUs );
async function sendContactUs(req, res) {
   try {
      let body = req.body;



      //********check param values************************************************
      let params = ['message', 'api_key' ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      params = ['first_name', 'last_name', 'email', 'phone', 'company', 'type', 'message' ];
      error_msg = helpers.check_params2(body.message, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      if (body.api_key !== process.env.API_KEY){
         res.status(403).send('api_key invalid');
         return;
      }


      let msg = body.message;
      if (msg.first_name == null || msg.last_name == null || msg.email == null || msg.type == null || msg.message == null){
         res.status(400).send('bad request.  Missing required params');
         return;
      }

      await emailer.contact_us_form(body.message);


      res.send('thanks');


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/submitFlagRequest', submitFlagRequest );
async function submitFlagRequest(req, res) {
   try {
      let body = req.body;



      //********check param values************************************************
      let params = ['flagged_user_id',  'message', 'api_key', 'dog_id', 'dog_num' ];
      let error_msg = helpers.check_params2(body, params, {res, required: ['flagged_user_id',  'message', 'api_key']});
      if (error_msg !== null) {
         return;
      }

      params = ['name', 'email',  'message' ];
      error_msg = helpers.check_params2(body.message, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      if (body.api_key !== process.env.API_KEY){
         res.status(403).send('api_key invalid');
         return;
      }


      let msg = body.message;
      if (msg.name == null || msg.email == null || msg.message == null ){
         res.status(400).send('bad request.  Missing required params');
         return;
      }


      let flag = {
         user_id: body.flagged_user_id,
         dog_id:body.dog_id, //might be undefined
         dog_num: body.dog_num,

         flag_request:{
            flagger_name: msg.name,
            flagger_email: msg.email,
            flagger_message:msg.message,
         },

         request_headers: req.headers,
      }


      await helpers.update_db_record(flag, req.my_db.models['flag_report']);


      let user = await req.my_db.models['user'].collection.findOne({_id: ObjectId(body.flagged_user_id)});
      let dog = {};

      if (body.dog_id != null){
         dog = await req.my_db.models['dog'].collection.findOne({_id: ObjectId(body.dog_id)});
      }

      let flag_data = {
         flagger_name: body.message.name,
         flagger_email: body.message.email,
         flagger_message: body.message.message,
         flagged_name: user.name_first + ' ' + user.name_last + ` (${user.account_type})`,
         flagged_sds_num: dog.dog_num ? dog.dog_num : 'N/A'
      }
      await emailer.flag_report(flag_data);


      res.send('thanks');


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}







router.post('/requestPassReset', requestPassReset );
async function requestPassReset(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['email', 'api_key'];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      if (body.api_key !== process.env.API_KEY){
         res.status(403).send('api_key invalid');
         return;
      }



      let mld_user = req.my_db.models['user'];
      let user = await mld_user.collection.findOne({email: body.email});

      if (user == null){
         res.send('ran');
         return;
      }

      let pw_code = crypto.randomBytes(16).toString('hex');

      let update = {
         _id: user._id,
         'setup.pw_reset_code': pw_code,
      }

      await helpers.update_db_record(update, mld_user);



      await emailer.reset_password({to: body.email, pw_code});


      res.send('thanks');


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}







module.exports = router
