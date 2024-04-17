"use strict";
var express = require('express')
var router = express.Router()
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const helpers = require('../../db/helpers.js');
const u_helpers = require('../../utilities/helpers.js');
const authz = require('../../utilities/authorization.js');

const {DateTime} = require('luxon');
const _ = require('lodash');
const sizeOf = require('image-size'); //used to check size of an image


const Emailer =require('../../utilities/emails/Emailer');
const emailer = new Emailer();


//**********stuff for file upload handling**************
const multer = require("multer"); //for file uploads
var storage = multer.memoryStorage();
const limits = {fileSize:2000*1000*1000}; //10mb
var upload = multer({ storage: storage, limits });


//*****stuff for geocodio integration********************
// const Geocodio = require('geocodio-library-node');
// const geocoder = new Geocodio(process.env.GEOCODIO_API_KEY);

const axios = require('axios');


const auth_helpers = require('../public/auth');


const {ObjectId} = require('mongodb');



// creates an object that can interface with S3/Spaces service
const AWS = require("aws-sdk");//used to store files on digital ocean's spaces service
let s3_settings = {
   accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
   secretAccessKey: process.env.DO_SPACES_ACCESS_SECRET,
   endpoint: process.env.DO_SPACES_ENDPOINT
}
const s3 = new AWS.S3(s3_settings);



//require authentication for these routes
const auth_middleware = require('../../middleware/authentication');
router.use(auth_middleware.auth);






router.post('/test', async (req, res) => {

   // let collection = req.db.collection('users');
   //
   // let data = await collection.find({}).toArray();

   let data = [];

   res.send(data);
});








/**
 * updates setup properties, intended to be called by frontend while user is progressing through the onboarding stepper
 */
router.post('/updateSetup', updateSetup );
async function updateSetup(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['email', 'terms', 'basic_info', 'additional_info', 'behaviors'];
      let error_msg = helpers.check_params(body, params, );
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }


      //****check credentials against db*****************
      let mld_user = req.my_db.models['user'];
      let user = await mld_user.collection.findOne({email: body.email});

      if (user == null){
         res.status(404);
         res.send("User Doesn't Exist");
         return;
      }


      //************create update object************************
      let update = {_id: user._id};

      if (body.terms === 'USER_AGREED'){
         update['setup.confirmed_terms_conditions'] = true;
      }

      if (body.basic_info === 'USER_UPDATED'){
         update['setup.basic_info_passed'] = true;
      }

      if (body.additional_info === 'USER_SAW'){
         update['setup.additional_info_passed'] = true;
      }

      if (body.behaviors === 'USER_AGREED'){
         // update['setup.confirmed_behavior_standards'] = true;

         let now = DateTime.utc();
         update['account_status.date_accepted'] = now.toJSDate() ;
         update['account_status.date_expiry'] = now.plus({years: 4}).toJSDate() ;
      }

      // using dot notation to only update desired nested fields which doesn't pass json-schema validator
      let validationParams = {required: [], additionalProperties: true};
      await helpers.update_db_record(update, mld_user, {validationParams});
      res.send('updated ran');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/getMyProfile', getMyProfile );
async function getMyProfile(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************

      let user_id = req.decoded_token.user_id;
      if (user_id == null){
         res.status(403);
         res.send("Not Authorized");
         return;
      }


      let mld = req.my_db.models['user'];

      let options = {projection: {password: 0, setup: 0, delegated_users:0}};
      let ans = await mld.collection.findOne({_id: ObjectId(user_id)}, options);

      if (ans.trainer_info && ans.trainer_info.address == null){
         ans.trainer_info.address = {};
      }

      if (ans.handler_info && ans.handler_info.address == null){
         ans.handler_info.address = {};
      }

      //user model changed 2/6/20201
      if (ans.private_info == null){
         ans.private_info = {address: {}};
      }

      if (ans.private_info.address == null){
         ans.private_info.address = {};
      }


      res.send(ans);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}




router.post('/getProfile', getProfile );
async function getProfile(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['user_id', 'member_num'];
      let error_msg = helpers.check_params2(body, params, {onlyOneOf: params, res});
      if (error_msg !== null) {
         return;
      }

      let user_id;
      if (body.member_num !== undefined){
         user_id = await helpers.get_id(req.my_db, body.member_num, );
      }
      else{
         user_id = body.user_id;
      }

      await authz.has_access(req, res, 'user', user_id);

      let mld = req.my_db.models['user'];
      let options = {projection: {password: 0, setup: 0, delegated_users:0, account_status: 0, }};
      let ans = await mld.collection.findOne({_id: ObjectId(user_id)}, options);

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
 * returns only a trainer's business properties
 */
// router.post('/getMyProfileTrainer', getMyProfileTrainer );
router.post('/getProfilePublicInfo', getProfilePublicInfo );
async function getProfilePublicInfo(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      // let params = ['email', 'terms', 'basic_info', 'additional_info', 'behaviors'];
      // let error_msg = helpers.check_params(body, params, );
      // if (error_msg !== null) {
      //    res.status(400);
      //    res.send('Check Parameters');
      //    return;
      // }


      let user_id = req.decoded_token.user_id;
      if (user_id == null){
         res.status(403);
         res.send("Not Authorized");
         return;
      }


      let mld = req.my_db.models['user'];

      let options = {projection: {account_type: 1,  trainer_info:1,  handler_info:1,  aide_info:1}};
      let ans = await mld.collection.findOne({_id: ObjectId(user_id)}, options);

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
 * returns users that I've given access to my account
 */
router.post('/getMyDelegatedUsers', get_my_delegated_users );
async function get_my_delegated_users(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************

      let user_id = req.decoded_token.user_id;
      if (user_id == null){
         res.status(403);
         res.send("Not Authorized");
         return;
      }


      let mld = req.my_db.models['user'];


      //get my user record
      let options = {projection: {delegated_users:1}};
      let user = await mld.collection.findOne({_id: ObjectId(user_id)}, options);

      if (user.delegated_users == null) user.delegated_users = [];
      //get user records of user I've given access and return select fields
      options = {projection: {name_first: 1, name_last: 1, email: 1, membership_id: 1, profile_image: 1}};
      let delegate_ids = user.delegated_users.map(x => x.user_id);
      let delegates = await  mld.collection.find({_id: {$in: delegate_ids}}, options ).toArray();

      let ans = [];
      let map = {}
      for (let x of user.delegated_users){
         map[x.user_id.toString()] = x;
      }

      for (let x of delegates){
         ans.push({
            ...map[x._id.toString()],
            user: x
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


/**
 * returns users who have given me access to their account
 */
router.post('/getDelegatedAccounts', getDelegatedAccounts );
async function getDelegatedAccounts(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = [ 'include_dogs'];
      let error_msg = helpers.check_params2(body, params, {required: []});
      if (error_msg !== null ) {
         console.log('Warning: ', error_msg);
         res.status(400);
         res.send('Check Parameters');
         return;
      }


      let include_dogs = body.include_dogs === true;

      let user_id = req.decoded_token.user_id;
      if (user_id == null){
         res.status(403);
         res.send("Not Authorized");
         return;
      }


      let mld = req.my_db.models['user'];
      let mld_dog = req.my_db.models['dog'];

      // let options = {projection: {delegated_users:1}};
      // options = {projection: {
      //       name_first: 1, name_last: 1, email: 1, delegated_users: 1, profile_image: 1,
      //       account_type:1
      //
      //    }
      // };
      // let users = await  mld.collection.find({'delegated_users.user_id': ObjectId(user_id)}, options ).toArray();

      let pipeline =     [
         {
            "$match" : {
               'delegated_users.user_id' : ObjectId(user_id)
            }
         },
         {
            "$project" : {
               "name_first" : 1.0,
               "name_last" : 1.0,
               "email" : 1.0,
               "delegated_users" : 1.0,
               "profile_image" : 1.0,
               "account_type" : 1.0
            }
         },
         {
            "$lookup" : {
               "from" : "dogs",
               "let" : {
                  "user_id" : "$_id"
               },
               "pipeline" : [
                  {
                     "$match" : {
                        "$expr" : {
                           "$eq" : [
                              "$handler_id",
                              "$$user_id"
                           ]
                        }
                     }
                  },
                  // {
                  //    "$project" : {
                  //       "name" : 1.0,
                  //       "breed" : 1.0,
                  //       "handler_id" : 1.0,
                  //       "trainer_id" : 1.0,
                  //       "dog_num" : 1.0,
                  //       "status" : 1.0,
                  //       "profile_image" : 1.0
                  //    }
                  // }
               ],
               "as" : "dogs"
            }
         }
      ];

      let options = {
         "allowDiskUse" : false
      }
      let users = await  mld.collection.aggregate(pipeline, options ).toArray();

      let ans = [];

      //need to combine access_level info from delegated_users array

      //for each user that has given me access
      for (let u of users){
         let d_users = u.delegated_users;
         // if (d_users == null) d_users = [];

         //get my info from their list of delegated_users
         let ix = u_helpers.findWithAttr(d_users, 'user_id', user_id.toString(),{convertToStr: true});

         let u2 = _.cloneDeep(u);
         delete u2.delegated_users;

         //get this user's dogs
         let dogs;
         if (include_dogs){
            dogs = await mld_dog.collection.find({user_id: u._id}).toArray();
         }

         ans.push({
            user: u2,
            access_level: d_users[ix].access_level,
            access_status: d_users[ix].access_status,
            dogs,//note this will be undefined if include_dogs is false

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


/**
 * returns users who have given me access to their account
 */
router.post('/getUserBySearch', getUserBySearch );
async function getUserBySearch(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['email', 'user_id', 'member_id'];
      let error_msg = helpers.check_params2(body, params, {onlyOneOf:params});
      if (error_msg !== null ) {
         console.log('Warning: ', error_msg);
         res.status(400);
         res.send('Check Parameters');
         return;
      }



      // let user_id = req.decoded_token.user_id;
      // if (user_id == null){
      //    res.status(403);
      //    res.send("Not Authorized");
      //    return;
      // }

      let Q = {};

      //note that we're guaranteed exactly one of the params have been included in body, so shouldn't get a null
      // query that returns everyone
      if (body.email !== undefined){
         Q.email = helpers.clean_email(body.email);


      }

      if (body.user_id  !== undefined){
         Q._id = ObjectId(body.user_id);
      }

      if (body.member_id  !== undefined){
         Q.membership_id = body.member_id;
      }


      let mld = req.my_db.models['user'];
      let options = {projection: {name_first: 1, name_last: 1, email: 1, member_num: 1, profile_image: 1, account_status: 1, account_type: 1}};
      let ans = await  mld.collection.findOne(Q, options );

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
 * this handler either adds or updates a delegated user.  If the delegate's email
 */
router.post('/updateDelegatedUser', updateDelegatedUser );
async function updateDelegatedUser(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['user_id', 'delegate', 'access_level'];
      let error_msg = helpers.check_params(body, params, params);
      if (error_msg !== null) {
         console.log(error_msg);
         res.status(400);
         res.send('Check Parameters');
         return;
      }

      params = [ 'email', 'name', ];
      error_msg = helpers.check_params(body.delegate, params, params);
      if (error_msg !== null) {
         console.log(error_msg);
         res.status(400);
         res.send('Check Parameters');
         return;
      }


      //check that user_id either belongs to the requester, or has admin access to that account
      await authz.has_access(req, res, 'user', body.user_id);

      /*
         step 1: check if email is in db
            if not, then create a db entry with just email and name (need the _id value)

         step 2: add _id of delegate to user_id's delegated_users's array
       */
      //


      //check if email is in db
      let mld_user = req.my_db.models['user'];
      body.delegate.email = helpers.clean_email(body.delegate.email);
      let delegate = await mld_user.collection.findOne({email: body.delegate.email});

      if (delegate === null) {
         let pass = crypto.randomBytes(16).toString('hex');
         let tmp =  body.delegate.name;

         let name_first, name_last;
         if (tmp !== undefined){
            tmp = tmp.split(' ')
            name_first =tmp[0]
            name_last =tmp[1]
         }

         delegate = await auth_helpers.create_user_db_record(body.delegate.email, pass, req.my_db, {name_first, name_last});
         console.log(delegate)
      }




      //step 2: give access

      //check if delegate has already been given access
      let user = await mld_user.collection.findOne({_id: ObjectId(body.user_id)});
      let delegated_users = user.delegated_users;
      if (delegated_users == null) delegated_users = [];
      let ix = u_helpers.findWithAttr(delegated_users, 'user_id', delegate._id.toString(), {convertToStr:true});

      if (ix === -1){
         delegated_users.push({
            user_id: delegate._id,
            access_level: body.access_level,
            // invite_status: 'Invited Pending'
            access_status: 'Granted'
         })
      }
      else{
         delegated_users[ix].access_level = body.access_level;
      }


      let update = {
         _id: user._id,
         delegated_users,
      }
      let validationParams = {required: [], };
      await helpers.update_db_record(update, mld_user, {validationParams});


      emailer.send_notify_delegated_access({to:delegate.email, inviter_email: user.email, inviter_name: `${user.name_first} ${user.name_last}`})
          .catch(e=>{
             res.log.error(e)
          })

      res.send('Invited/updated');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





/**
 * this handler removes a delegated user from a profile
 * body.user_id     : _id of user of user account to modify
 * body.delegate_id : _id of delegate to remove
 */
router.post('/removeDelegatedUser', removeDelegatedUser );
async function removeDelegatedUser(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['user_id', 'delegate_id',];
      let error_msg = helpers.check_params(body, params, params);
      if (error_msg !== null) {
         console.log(error_msg);
         res.status(400);
         res.send('Check Parameters');
         return;
      }

      //todo: check that user_id either belongs to the requester, or has admin access to that account

      //get user's delegated_users array
      let mld_user = req.my_db.models['user'];
      let user = await mld_user.collection.findOne({_id: ObjectId(body.user_id)});

      let delegates = user.delegated_users;
      if (delegates == null) delegates = [];

      let ix = u_helpers.findWithAttr(delegates, 'user_id', body.delegate_id, {convertToStr:true});

      if (ix > -1){
         //update record
         delegates.splice(ix, 1);
         let update = {
            _id: user._id,
            delegated_users: delegates,
         }
         let validationParams = {required: [], };
         await helpers.update_db_record(update, mld_user, {validationParams});
      }

      res.send('Success');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}
















/**
 * invites a user to be a dog's trainer or handler
 *
 * body:
 *    dog_id    : str, objectId of dog
 *    email     : str, email of user to invite
 *    user_type : str, TRAINER | HANDLER
 */
router.post('/inviteTrainerHandler', inviteTrainerHandler );
async function inviteTrainerHandler(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['dog_id', 'email', 'access_type', 'name_last', 'name_first'];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) {
         return;
      }


      let dog = await req.my_db.models['dog'].collection.findOne({_id: ObjectId(body.dog_id)});

      if (dog.trainer_id != null && body.access_type === 'TRAINER'){
         let tmp =  await req.my_db.models['user'].collection.findOne({_id: ObjectId(body.trainer_id)});
         if (tmp !== null){
            res.status(400);
            res.send('dog already has trainer')
            return
         }

      }

      if (dog.handler_id != null && body.access_type === 'HANDLER'){
         let tmp =  await req.my_db.models['user'].collection.findOne({_id: ObjectId(body.handler_id)});
         if (tmp !== null){
            res.status(400);
            res.send('dog already has handler')
            return;
         }

      }


      let invite_type;

      if (body.access_type === 'TRAINER'){
         invite_type = 'Trainer';
      }
      else if (body.access_type === 'HANDLER'){
         invite_type = 'Handler';
      }
      else{
         throw Error(`access_type "${body.access_type}" not recognized`)
      }


      let inviter_email =  req.decoded_token.email;

      let inviter_name = _.get(req.decoded_token, 'name_first', '');
      inviter_name += ' ' + _.get(req.decoded_token, 'name_last', '');
      inviter_name = inviter_name.trim();


      //check if email is in db
      let mld_user = req.my_db.models['user'];

      let email = helpers.clean_email(body.email);
      let invited_user = await mld_user.collection.findOne({email});


      //create new user
      if (invited_user === null) {
         let pass = crypto.randomBytes(16).toString('hex');



         invited_user = await auth_helpers.create_user_db_record(email, pass, req.my_db, {
            forceReset:true, invited:true, acct_type: body.access_type,
            name_last: body.name_last, name_first: body.name_first,
         });
         let email_code = invited_user.setup.email_code;
         let pw_code = invited_user.setup.pw_reset_code;


         let email_info = {
            to: email, email_code, pw_code, inviter_email, inviter_name, invite_type,
            // dog_id: body.dog_id
         };

         await emailer.send_invite_new_user(email_info);


         console.log(invited_user);
      }



      //step 2: give access

      let update = {
         _id:  dog._id
      };



      if (body.access_type === 'TRAINER'){
         update.trainer_id = invited_user._id;
         update.confirmed_trainer = false;
      }
      else if (body.access_type === 'HANDLER'){
         update.handler_id = invited_user._id;
         update.confirmed_handler = false;
      }
      else{
         throw Error(`access_type "${body.access_type}" not recognized`)
      }

      // let validationParams = {required: [], };
      await helpers.update_db_record(update, req.my_db.models['dog'], );



      await emailer.send_invite_existing_user({
         to: email,
         inviter_email: req.decoded_token.email,
         inviter_name,
         invite_type,
         dog_name: dog.name,
         dog_id:dog._id.toString(),
      });




      res.send('Invited/updated');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}









router.post('/acceptDog', acceptDog );
async function acceptDog(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['dog_id', ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      //todo: add authorization check


      let mld_dog = req.my_db.models['dog'];

      let dog = await mld_dog.collection.findOne({_id: ObjectId(body.dog_id)});

      let user_id = req.decoded_token.user_id;
      let acct_type = req.decoded_token.acct_type;









      let update;
      let already_accepted = false;
      if (acct_type === 'TRAINER'  ){
         if (dog.trainer_id.toString() === user_id){

            if (dog.confirmed_trainer === false) {
               update = {
                  _id: dog._id,
                  confirmed_trainer: true,
               }
            }

            if (dog.confirmed_trainer === true){
               already_accepted = true;
            }
         }
         else{
            res.status(400).send('user_not_matched');
            return
         }
      }


      else if (acct_type === 'HANDLER'  ){
         if (dog.handler_id.toString() === user_id){

            if (dog.confirmed_handler === false) {
               update = {
                  _id: dog._id,
                  confirmed_handler: true,
                  user_id, //transfer user_id to handler
               }
            }
            if (dog.confirmed_handler === true){
               already_accepted = true;
            }
         }
         else{
            res.status(400).send('user_not_matched');
            return;
         }
      }


      // if (acct_type === 'HANDLER' && dog.handler_id.toString() === user_id && dog.confirmed_handler === false){
      //    update = {
      //       _id: dog._id,
      //       confirmed_handler: true,
      //       user_id, //transfer user_id to handler
      //    }
      //
      // }



      // run update
      if (update !== undefined){
         await helpers.update_db_record(update, mld_dog);
         let dog2 = {
            _id: dog._id,
            name: dog.name,
         }

         res.send({msg: 'accepted', dog: dog2});
         return;
      }


      else{
         if (already_accepted){
            res.send({msg: 'already_accepted'});
         }
         else{
            res.status(400).send('There was an issue')
         }


      }






   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}















/**
 * invites a user to be a dog's trainer or handler
 *
 * body:
 *    dog_id    : str, objectId of dog
 *    email     : str, email of user to invite
 *
 *
 * Basic algo
 *    Check if transfer is valid
 *       can only transfer a dog if I am the owner and handler, i.e. my user_id must dog.handler_id/user_id
 *
 *    update handler_id and user_id on dog
 */
router.post('/transferDog', transferDog );
async function transferDog(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['dog_id', 'user_id',];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) {
         return;
      }


      let dog = await req.my_db.models['dog'].collection.findOne({_id: ObjectId(body.dog_id)});


      if (dog.user_id.toString() !==   req.decoded_token.user_id){
         res.status(400);
         res.send('You are not the owner of this dog')
         return;
      }



      //check if email is in db
      let mld_user = req.my_db.models['user'];

      let email = helpers.clean_email(body.email);
      let invited_user = await mld_user.collection.findOne({email});



      //step 2: give access

      let update = {
         _id:  dog._id,
         handler_id: ObjectId(body.user_id),
         user_id: ObjectId(body.user_id),
      };


      // let validationParams = {required: [], };
      await helpers.update_db_record(update, req.my_db.models['dog'], );


      //
      // await emailer.send_invite_existing_user({
      //    to: email,
      //    inviter_email: req.decoded_token.email,
      //    inviter_name,
      //    invite_type,
      //    dog_name: dog.name,
      //    dog_id:dog._id.toString(),
      // });




      res.send('Invited/updated');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}







/**
 * add a client to trainer's account
 *
 * body:
 *    email     : str, email of user to invite
 */
router.post('/addClient', addClient );
async function addClient(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = [ 'email',  'name_last', 'name_first'];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) {
         return;
      }

      let mld_user = req.my_db.models['user'];

      let inviter_user = await mld_user.collection.findOne({_id: ObjectId(req.decoded_token.user_id)});

      let inviter_email =  req.decoded_token.email;

      let inviter_name = _.get(inviter_user, 'name_first', '');
      inviter_name += ' ' + _.get(inviter_user, 'name_last', '');
      inviter_name = inviter_name.trim();


      //check if email is in db


      let email = helpers.clean_email(body.email);
      let invited_user = await mld_user.collection.findOne({email});


      let invite_type = 'HANDLER';

      //create new user
      if (invited_user === null) {
         let pass = crypto.randomBytes(16).toString('hex');

         invited_user = await auth_helpers.create_user_db_record(email, pass, req.my_db, {
            forceReset:true, invited:true, acct_type: 'HANDLER',
            name_last: body.name_last, name_first: body.name_first,
         });
         let email_code = invited_user.setup.email_code;
         let pw_code = invited_user.setup.pw_reset_code;


         let email_info = {
            to: email, email_code, pw_code, inviter_email, inviter_name, invite_type,
            // dog_id: body.dog_id
         };

         await emailer.send_invite_new_user(email_info);


         console.log(invited_user);
      }



      //step 2: add user client's array

      let update = {
         $push: {clients: invited_user._id}
      };


      // let validationParams = {required: [], };

      await mld_user.collection.findOneAndUpdate({_id: inviter_user._id}, update)




      // await emailer.send_invite_existing_user({
      //    to: email,
      //    inviter_email: req.decoded_token.email,
      //    inviter_name,
      //    invite_type,
      //    dog_name: dog.name,
      //    dog_id:dog._id.toString(),
      // });




      res.send('Invited/updated');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}







// async function get_geo_info(address){
//    try{
//       let geo_info = null;
//       let params = {
//          api_key: process.env.GEOCODIO_API_KEY,
//          street: _.get(address, 'street1', ''),
//          city: _.get(address, 'city', ''),
//          state: _.get(address, 'state', ''),
//          postal_code: _.get(address, 'zip', ''),
//       }
//       let geo_res = await axios.get('https://api.geocod.io/v1.6/geocode', {params});
//       if (geo_res.data != undefined){
//          let loc = geo_res.data.results;
//          if (loc.length>0){
//             loc = loc[0]; //get first result.
//
//             geo_info = {
//                location:{
//                   type: 'Point',
//                   coordinates: [loc.location.lng, loc.location.lat],
//                },
//                source: 'geocodio',
//                raw_response:loc,
//             }
//          }
//       }
//       return geo_info;
//    }catch (e) {
//       return null;
//    }
//
// }


/**
 * user_id      : str
 * update       : object, first level properties to update
 * nestedUpdate : Object, nested props to update. e.g.  {'setup.invited_user': false}
 */

router.post('/updateUserProfile', updateUserProfile );
async function updateUserProfile(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['user_id', 'update', 'nestedUpdate'];
      let error_msg = helpers.check_params2(body, params, {res, anyOneOf:['update', 'nestedUpdate']});
      if (error_msg !== null) {
         return;
      }

      // params = ['name_first', 'name_last', 'address1', 'address2', 'city', 'state', 'zip', 'phone', 'social_profiles',
      //           'census_info', '_id', 'member_num'];
      // error_msg = helpers.check_params2(body.update, params, {res});
      // if (error_msg !== null) {
      //    return;
      // }


      //NOTE dont' need this anymore, as schema validation will error if the data doesn't match schema

      // params = [ '_id', 'trainer_info.about', 'trainer_info.business_name', 'trainer_info.tagline', 'trainer_info.services',
      //    'trainer_info.certifications', 'trainer_info.awards', 'trainer_info.breeds', 'trainer_info.groups',
      //    'trainer_info.social','trainer_info.address', 'address.street1', 'address.street2', 'address.city',
      //    'address.state', 'address.zip'];
      // error_msg = helpers.check_params2(body.nestedUpdate, params, {res});
      // if (error_msg !== null) {
      //    return;
      // }


      console.log(body)

      // await authz.has_access(req, res, 'user', body.update._id);
      await authz.has_access(req, res, 'user', body.user_id);

      //things that the user shouldn't be able to change directly
      if (body.update){
         delete body.update.member_num;
         delete body.update.password;
         delete body.update.email_change;
         delete body.update.email;
         delete body.update.deactivated;

         delete body.update.reset_password; //for legacy purposes (schema change)
         delete body.update.social_profiles;

         // delete body.update.account_type;
         // delete body.update.account_activated;
      }



      //convert clients to object ids (they'll be strings coming in)...need a more generic way to solve this issue
      if (body.update && Array.isArray(body.update.clients)){
         for (let i=0; i<body.update.clients.length; i++){
            body.update.clients[i] = ObjectId(body.update.clients[i]);
         }
      }


      //*****check if update includes any address data and convert to lat/log****************
      let geo_error=null

      function check_for_address(address){
         let ans = false;
         if (address.street1) ans = true;
         if (address.city) ans = true;
         if (address.state) ans = true;
         if (address.zip) ans = true;

         return ans;
      }



      let address = _.get(body, 'update.private_info.address', {});
      if (check_for_address(address)){
         //add/overwrite geo_info

         try{
            body.update.private_info.address.geo_info = await u_helpers.get_geo_info(body.update.private_info.address);
         }
         catch (e) {
            body.update.private_info.address.geo_info = null;
            geo_error = e;
         }
      }
      else{
         if (_.get(body, 'update.private_info.address') != undefined){
            body.update.private_info.address.geo_info = null;
         }

      }






      address = _.get(body, 'update.trainer_info.address', {});
      if (check_for_address(address)){

         try{
            body.update.trainer_info.address.geo_info = await u_helpers.get_geo_info(body.update.trainer_info.address);
         }
         catch (e) {
            body.update.trainer_info.address.geo_info = null;
            geo_error = e;
         }
      }else{
         if (_.get(body, 'update.trainer_info.address') != undefined){
            body.update.trainer_info.address.geo_info = null;
         }

      }




      let user_id = req.decoded_token.user_id;
      //todo: deal with passed in user_id

      // if (req.decoded_token.user_id !== body.user_id){
      //    res.status(403);
      //    res.send("Not Authorized");
      //    return;
      // }


      //****check credentials against db******************************
      let mld_user = req.my_db.models['user'];
      let user = await mld_user.collection.findOne({_id: ObjectId(user_id)});

      if (user == null){
         res.status(404);
         res.send("User Doesn't Exist");
         return;
      }




      //************create update object************************
      let update = {_id: ObjectId(user_id)};
      let validationParams = {required: [], additionalProperties: false};

      let keys;
      if (body.update != null){
         keys = Object.keys(body.update);
         for (let k of keys){
            update[k] = body.update[k];
         }
      }


      if (body.nestedUpdate != null){
         keys = Object.keys(body.nestedUpdate);
         for (let k of keys){
            update[k] = body.nestedUpdate[k];
         }
         validationParams = {required: [], additionalProperties: true};
      }

      //TODO: get rid of this later, using to handle schema change
      delete update.membership_status;
      delete update.account_activated;


      //schema change
      delete update.phone;
      delete update.address;
      delete update.census_info;


      let miles = _.get(update, 'trainer_info.max_travel_miles', null)
      if (typeof miles === 'string'){
         miles = parseFloat(miles)
         update.trainer_info.max_travel_miles = miles;
      }

      await helpers.update_db_record(update, mld_user, );

      if (geo_error===null){
         res.send('update successful');
      }
      else{
         res.status(211).send('geo error');
      }


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/changeEmail', changeEmail );
async function changeEmail(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['new_email', 'password'];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      let email_old = req.decoded_token.email;
      let user_id = req.decoded_token.user_id;

      let email_new = helpers.clean_email(body.new_email);
      let pass = helpers.clean_pass(body.password);

      let mld_user = req.my_db.models['user'];


      //*******check no account exist with new email***************
      let user_check = await mld_user.collection.findOne({email: email_new});
      if (user_check !== null){
         res.status(400);
         res.send({response: 'email_exists'});
         return;
      }



      let user = await mld_user.collection.findOne({_id: ObjectId(user_id)});




      //*******check that password is valid************************
      let hash_n = parseInt(process.env.PASSWORD_HASH_LENGTH);
      let salt = user.password.salt;
      let hash = crypto.scryptSync(pass, salt, hash_n).toString('hex');


      if (user.password.hash !== hash){
         res.status(403);
         res.send({response: 'password_invalid'});
         return;
      }



      //save new email as temp
      let confirm_code = crypto.randomBytes(16).toString('hex');

      let update = {
         _id: user._id,
         email_change: {
            new_email: email_new,
            confirm_code,
         },
      }
      await helpers.update_db_record(update, mld_user);


      //send confirmation email
      let email_data = {
         to: user.email,
         new_email: email_new,
         code: confirm_code,
         user_id: user._id.toString(),
      }
      await emailer.send_email_change_confirmation(email_data);



      let response = 'updated';

      res.send({response});
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


router.post('/changeTrainerUrl', checkTrainerUrl );
async function checkTrainerUrl(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['trainer_url'];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      let user = await req.my_db.models.user.collection.findOne({
         'trainer_info.custom_trainer_url': body.trainer_url,
         _id: {$ne: ObjectId(req.decoded_token.user_id)}
      });

      if (user !== null){
         res.status(409).send('already_taken');
         return;
      }

      //****change the url***************
      else{
         let url =  body.trainer_url.toLowerCase();
         let update = {
            _id: ObjectId(req.decoded_token.user_id),
            'trainer_info.custom_trainer_url': url
         }

         await helpers.update_db_record(update, req.my_db.models.user);
         res.send(url);
      }



   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/getFile', get_file );
async function get_file(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['file_key'];
      let error_msg = helpers.check_params(body, params, params);
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }



      let s3_params = {
         Bucket: process.env.DO_SPACES_BUCKET,
         key : 'sds-dev-testing.nyc3.digitaloceanspaces.com/page%201.png'
      };


      console.log(s3_params)

      let tmp = await s3.listBuckets().promise();
      console.log(tmp)

      let data = await s3.getObject(s3_params).promise();



      res.send('l');
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
   let rnd = crypto.randomBytes(6).toString('hex');

   if (record_type === 'profile'){
      key += `user/${_id}/profile_${rnd}.${ext}`
   }
   else if (record_type === 'banner'){
      key += `user/${_id}/banner_${rnd}.${ext}`
   }
   else if (record_type === 'gallery'){
      let d = DateTime.utc().toFormat('yyyyMMddHHmmssSSS');


      key += `user/${_id}/gallery/${d}_${rnd}.${ext}`
   }

   else if (record_type === 'dogProfile'){
      key += `dog/${_id}/profile_${rnd}.${ext}`
   }

   // moved to public version
   // else if (record_type === 'dogKit'){
   //    let d = DateTime.utc().toFormat('yyyyMMddHHmmssSSS');
   //    key += `dog/${_id}/kit_image/${d}.${ext}`
   // }
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




router.post('/uploadProfileImage', upload.single('profile_pic'), uploadProfileImage );
async function uploadProfileImage(req, res, ) {
   try {
      let body = req.body;

      let file = req.file;

      //********check param values************************************************
      let params = ['file_key', 'user_id', 'dog_id',];
      let error_msg = helpers.check_params2(body, params, {onlyOneOf: ['user_id', 'dog_id']});
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }




      let user_id = req.decoded_token.user_id;

      if (body.user_id != undefined){
         user_id = body.user_id
      }


      // check for existing image
      let image;
      if (body.dog_id !== undefined){
         image = await  req.my_db.models['dog'].collection.findOne({_id: ObjectId(body.dog_id)});
      }
      else if  (body.user_id !== undefined){
         image = await  req.my_db.models['user'].collection.findOne({_id: ObjectId(body.user_id)});
      }

      // delete file from spaces
      if (image != null && image.profile_image != null){
         let s3_params = {
            Bucket: image.profile_image.Bucket,
            Key : image.profile_image.Key,
         };
         let s3_res_del = await s3.deleteObject(s3_params).promise();
      }



      //upload image
      let s3_res;
      if (body.dog_id != undefined){
         s3_res= await upload_to_spaces(file, body.dog_id, 'dogProfile', )
      }
      else{
         s3_res= await upload_to_spaces(file, user_id, 'profile', )
      }


      console.log("Uploaded to:", s3_res.Location);
      console.log("Uploaded to:", s3_res);




      //update user profile with image
      let update = {
         profile_image: s3_res,
      };
      let validationParams = {required: [], additionalProperties: false};

      if (body.dog_id == undefined){
         update._id = ObjectId(user_id);
         let mld_user = req.my_db.models['user'];
         await helpers.update_db_record(update, mld_user, {validationParams});
      }
      else{
         update._id = ObjectId(body.dog_id);
         let mld_dog = req.my_db.models['dog'];
         await helpers.update_db_record(update, mld_dog, {validationParams});
      }


      // res.send('uploaded');
      res.send(s3_res);
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}




router.post('/uploadUserBanner', upload.single('profile_pic'), uploadUserBanner );
async function uploadUserBanner(req, res, ) {
   try {
      let body = req.body;

      let file = req.file;

      //********check param values************************************************
      // let params = ['file_key',  ];
      // let error_msg = helpers.check_params2(body, params, {required: params});
      // if (error_msg !== null) {
      //    res.status(400);
      //    res.send('Check Parameters');
      //    return;
      // }

      let user_id = req.decoded_token.user_id;

      if (body.user_id != undefined){
         user_id = body.user_id
      }


      let mld_user = req.my_db.models['user'];
      let user = await mld_user.collection.findOne({_id: ObjectId(user_id)});
      if (user === null){
         res.status(404);
         res.send('User not found');
      }
      else{


         // delete file from spaces

         let image = _.get(user, 'trainer_info.banner_image', null);
         if (image != null){
            let s3_params = {
               Bucket: image.Bucket,
               Key : image.Key,
            };
            let s3_res_del = await s3.deleteObject(s3_params).promise();
         }

      }

      let s3_res = await upload_to_spaces(file, user_id, 'banner', )


      let update;

      //update user profile with image
      if (req.decoded_token.acct_type === 'TRAINER'){
         update = {
            _id: ObjectId(user_id),
            'trainer_info.banner_image': s3_res,
         };
      }
      else if (req.decoded_token.acct_type === 'HANDLER'){
         update = {
            _id: ObjectId(user_id),
            'handler_info.banner_image': s3_res,
         };
      }
      else if (req.decoded_token.acct_type === 'AIDE'){
         update = {
            _id: ObjectId(user_id),
            'aide_info.banner_image': s3_res,
         };
      }

      let validationParams = {required: [], additionalProperties: true};
      await helpers.update_db_record(update, mld_user, {validationParams});

      // res.send('uploaded');
      res.send(s3_res);

      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


router.post('/uploadGalleryImage', upload.single('profile_pic'), uploadGalleryImage );
async function uploadGalleryImage(req, res, ) {
   try {
      let body = req.body;

      let file = req.file;

      //********check param values************************************************
      let params = ['file_key','comments' , 'user_id' ];
      let error_msg = helpers.check_params2(body, params, );
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }

      let user_id = req.decoded_token.user_id;


      let mld_user = req.my_db.models['user'];
      let user = await mld_user.collection.findOne({_id: ObjectId(user_id)});
      if (user === null){
         res.status(404);
         res.send('User not found');
      }

      let s3_res = await upload_to_spaces(file, user_id, 'gallery', )


      //update user profile with image
      let update = {
         user_id: ObjectId(user_id),
         image_data: s3_res,
         comments: body.comments,
      };
      // let validationParams = {required: [], additionalProperties: true};

      let mld_image = req.my_db.models['image'];
      let validationParams = {};
      await helpers.update_db_record(update, mld_image, {validationParams});

      // res.send('uploaded');
      res.send(s3_res);
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


router.post('/deleteGalleryImage', deleteGalleryImage );
async function deleteGalleryImage(req, res, ) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['image_id' ];
      let error_msg = helpers.check_params2(body, params, {required: params} );
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }

      let user_id = req.decoded_token.user_id;

      let mld_user = req.my_db.models['user'];
      let mld_image = req.my_db.models['image'];


      let image = await mld_image.collection.findOne({_id: ObjectId(body.image_id)});
      if (image === null){
         res.status(404);
         res.send('Image not found');
         return ;
      }

      if (user_id !== image.user_id.toString()){
         res.status(403);
         res.send('Unauthorized');
         return ;
      }


      //delete file from spaces
      let s3_params = {
         Bucket: image.image_data.Bucket,
         Key : image.image_data.Key,
      };
      let s3_res = await s3.deleteObject(s3_params).promise();

      //delete db record
      let mongo_res = await mld_image.collection.deleteOne({_id: image._id});


      res.send('deleted');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


// router.post('/uploadDogKitImage', upload.single('profile_pic'), uploadDogKitImage );
// async function uploadDogKitImage(req, res, ) {
//    try {
//       let body = req.body;
//
//       let file = req.file;
//
//       //********check param values************************************************
//       let params = ['file_key', 'dog_id',];
//       let error_msg = helpers.check_params2(body, params, {res, required: [ 'dog_id']});
//       if (error_msg !== null) {
//          return;
//       }
//
//       let user_id = req.decoded_token.user_id;
//
//       if (body.user_id != undefined){
//          user_id = body.user_id
//       }
//
//
//
//       let s3_res;
//
//       s3_res= await upload_to_spaces(file, body.dog_id, 'dogKit', )
//
//
//       req.log.info("Uploaded to:", s3_res.Location);
//       console.log("Uploaded to:", s3_res);
//
//
//
//       //update dog profile with image
//       let update = {
//          _id: ObjectId(body.dog_id),
//          kit_image: s3_res,
//       };
//
//       let mld_dog = req.my_db.models['dog'];
//       await helpers.update_db_record(update, mld_dog);
//
//       res.send(s3_res);
//
//
//       return;
//
//    } catch (err) {
//
//       res.log.error(err);
//       res.status(500);
//       // res.send(err.message)
//       res.send('There was an internal server error');
//
//    }
// }
//
//
// router.post('/deleteDogKitImage', deleteDogKitImage );
// async function deleteDogKitImage(req, res, ) {
//    try {
//       let body = req.body;
//
//
//       //********check param values************************************************
//       let params = ['dog_id', 's3_info' ];
//       let error_msg = helpers.check_params2(body, params, {required: params} );
//       if (error_msg !== null) {
//          res.status(400);
//          res.send('Check Parameters');
//          return;
//       }
//
//
//       let s3_info = body.s3_info;
//
//       //check if dog_id and the dog_id in the key match
//       let split_key = s3_info.Key.split('/');
//
//       if (split_key[2] !== body.dog_id){
//          res.status(403);
//          res.send('Invalid Request: dog_id invalid');
//          return;
//       }
//
//
//       if (! s3_info.Key.includes('/kit_image/') ){
//          res.status(403);
//          res.send('Invalid Request: Attempting to delete unauthorized image');
//          return;
//       }
//
//
//       //delete file from spaces
//       let s3_params = {
//          Bucket: s3_info.Bucket,
//          Key : s3_info.Key,
//       };
//       let s3_res = await s3.deleteObject(s3_params).promise();
//
//       console.log(s3_res)
//
//       //update dog rec
//
//       let dog_update = {
//          _id: ObjectId(body.dog_id),
//          kit_image: null
//       }
//
//       let mld_dog = req.my_db.models['dog'];
//       await helpers.update_db_record(dog_update, mld_dog);
//
//
//       res.send('deleted');
//       return;
//
//    } catch (err) {
//
//       res.log.error(err);
//       res.status(500);
//       // res.send(err.message)
//       res.send('There was an internal server error');
//
//    }
// }

router.post('/updateDog', updateDog );
async function updateDog(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['user_id', 'dog'];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }

      let dog = body.dog;

      //todo: need to add more intelligent authorization

      // if (req.decoded_token.user_id !== body.user_id){
      //    res.status(403);
      //    res.send("Not Authorized");
      //    return;
      // }

      if (body.user_id != null){
         await authz.has_access(req, res, 'user', body.user_id);

      }

      await authz.has_access(req, res, 'dog', dog._id);



      let mld_dog = req.my_db.models['dog'];
      let mld_user = req.my_db.models['user'];

      let validationParams = {};

      //check if new or existing
      if (dog._id === undefined){
         dog.dog_num  = await helpers.get_db_counter('global', req.my_db, {asString: true});
      }

      else{

         //don't want user to be able to change these
         delete dog.dog_num;
         delete dog.profile_image; //should only be updated via the upload module
         // validationParams = {required: []};
      }

      //if user_id not explicitly set, then connect to requesting user
      if (dog.user_id == null){
         dog.user_id = body.user_id;
      }
      dog.user_id = ObjectId(dog.user_id);

      if (dog.trainer_id != null){
         dog.trainer_id = ObjectId(dog.trainer_id);
      }

      if (dog.handler_id != null){
         dog.handler_id = ObjectId(dog.handler_id);
      }

      delete dog.trainer_id_FR;
      delete dog.handler_id_FR;
      delete dog.user_id_FR;


      //get user and add as handler/trainer based on user's type

      let user = await  mld_user.collection.findOne({_id: ObjectId(dog.user_id)}, );

      if (user.account_type === 'TRAINER'){
         dog.trainer_id = dog.user_id;
         dog.handler_id = dog.user_id;
      }

      if (user.account_type === 'HANDLER'){
         dog.handler_id = dog.user_id;
      }



      await helpers.update_db_record(dog, mld_dog, );
      res.send('update ran');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





/**
 * special function to just to update the dog's modals
 */
router.post('/updateDogChecks', updateDogChecks );
async function updateDogChecks(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['dog_id', 'update'];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      //todo: check if user is dog's owner

      let mld_dog = req.my_db.models['dog'];

      let update = {
         _id: body.dog_id,
      };

      let keys = Object.keys(body.update)
      for (let k of keys){
         update['checks.'+k] = body.update[k];
      }


      await helpers.update_db_record(update, mld_dog, {addDefaults: false});
      //todo: turning defaults off because if you pass in a non-existing key path, i.e. checks.key, and checks doesn't
      //exist, then you'll get both the default and the specified value.

      res.send('update ran');
   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



/**
 * special function to just to update the handler user's checks
 */
router.post('/updateHandlerChecks', updateHandlerChecks );
async function updateHandlerChecks(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['user_id', 'update'];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      //todo: check if user is dog's owner

      let mld_user = req.my_db.models['user'];

      let update = {
         _id: body.user_id,
      };

      let keys = Object.keys(body.update)
      for (let k of keys){
         update['handler_info.checks.'+k] = body.update[k];
      }


      await helpers.update_db_record(update, mld_user, );

      res.send('update ran');
   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





/**
 * body.user_id    : str, id of user.  if specified returns array of this user's dogs
 * body.member_num : str, number of usr.  if specified returns array of this user's dogs
 *
 * body.dog_id : str, if specified, returns record corresponding to the _id.  Note that this takes precidence over user_id
 *               if both are specified
 */
router.post('/getDogs', getDogs );
async function getDogs(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['user_id', 'trainer_id', 'handler_id',  'member_num', 'dog_id', 'options', 'search'];
      let tmp = ['user_id', 'trainer_id', 'handler_id',  'member_num', 'dog_id'];
      let error_msg = helpers.check_params2(body, params, {res, onlyOneOf: tmp});
      if (error_msg !== null) {
         return;
      }

      params = ['excludeSelf'];
      error_msg = helpers.check_params2(body.options, params, {res});
      if (error_msg !== null) {
         return;
      }

      params = ['search_txt', 'search_field'];
      error_msg = helpers.check_params2(body.search, params, {res, required: params, passOnNull: true});
      if (error_msg !== null) {
         return;
      }

      let excludeSelf = _.get(body, 'options.excludeSelf', false);



      // let dog = body.dog;
      let mld_dog = req.my_db.models['dog'];
      let q={};


      //add search params if needed
      if (body.search != null && body.search.search_field === 'dog_name'){
         q.name =  {$regex: `.*${body.search.search_txt}.*`, $options: 'i' };
      }




      let ans;
      if (body.dog_id != undefined){

         if (! (await authz.has_access(req, res, 'dog', body.dog_id)) ) return;

         ans = await mld_dog.collection.findOne({_id: ObjectId(body.dog_id)});
      }
      else if (body.user_id !== undefined) {
         if (! (await authz.has_access(req, res, 'user', body.user_id) )) return;

         q.user_id = ObjectId(body.user_id);
         ans = await mld_dog.collection.find(q).toArray();
         // ans = await mld_dog.collection.find({user_id: ObjectId(body.user_id)}).toArray();

      }

      else if (body.member_num !== undefined) {

         let user_id = await  helpers.get_id(req.my_db, body.member_num, 'user')
         if (! (await authz.has_access(req, res, 'user', user_id  )) ) return;

         // ans = await mld_dog.collection.find({user_id: user_id}).toArray();
         q.user_id = user_id;
         ans = await mld_dog.collection.find(q).toArray();

      }

      else if (body.trainer_id !== undefined) {
         //todo: figure out auth check

         // q = {trainer_id: ObjectId(body.trainer_id)};
         q.trainer_id =  ObjectId(body.trainer_id);
         if (excludeSelf){
            q.user_id = {$ne: ObjectId(req.decoded_token.user_id)};
         }
         ans = await mld_dog.collection.find(q).toArray();
      }

      else if (body.handler_id !== undefined) {
         //todo: figure out auth check

         // q = {handler_id: ObjectId(body.handler_id)};
         q.handler_id =  ObjectId(body.handler_id);
         if (excludeSelf){
            q.user_id = {$ne: ObjectId(req.decoded_token.user_id)};
         }
         ans = await mld_dog.collection.find(q).toArray();
      }




      let filter = {email:1, name_first:1, name_last:1, profile_image:1, 'account_status.date_expiry': 1, 'trainer_info.custom_trainer_url': 1};
      ans = await helpers.add_foreign_key_objects(ans, mld_dog.schema, ['user_id', 'trainer_id', 'handler_id'],
          req.my_db,  {projection: filter});
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
 * Used to group dogs by user/trainer/handler id.  Mainly used by trainer to group by their clients
 *
 * Note at present this function only supports a trainer grouping by handlers.  i.e.
 * TODO: add support for other combinations
 */
router.post('/getDogsGroupedByUser', getDogsByUser );
async function getDogsByUser(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['filterBy', 'groupBy', 'search', 'options', 'excludeSelf'];
      let error_msg = helpers.check_params2(body, params, {res, required: ['filterBy', 'groupBy',]});
      if (error_msg !== null) {
         return;
      }

      params = ['user_id', 'user_type'];
      error_msg = helpers.check_params2(body.filterBy, params, {res, required: ['user_id', 'user_type']});
      if (error_msg !== null) {
         return;
      }

      params = ['search_txt', 'search_field'];
      error_msg = helpers.check_params2(body.search, params, {res, required: params, passOnNull: true});
      if (error_msg !== null) {
         return;
      }

      let excludeSelf = _.get(body, 'excludeSelf',true);

      //
      // params = ['excludeSelf'];
      // error_msg = helpers.check_params2(body.options, params, {res});
      // if (error_msg !== null) {
      //    return;
      // }
      //
      // let excludeSelf = _.get(body, 'options.excludeSelf', false);
      //


      //simple authz check
      if (req.decoded_token.user_id !== body.filterBy.user_id){
         res.status(403).send("You don't have access");
         return;
      }



      let match;
      //********** check filter params *********************
      let filter_key = 'trainer_id';
      let filter_id = ObjectId(body.filterBy.user_id);

      match = {
         'trainer_id': ObjectId(body.filterBy.user_id),
      }

      if (body.filterBy.user_type !== 'TRAINER'){
         res.status(400).send('must be trainer to call this for now');
         return;
      }


      //*******add search params if needed********************************

      let handler_match = null;
      if (body.search != null ){
         if ( body.search.search_field === 'dog_name'){
            match.name =  {$regex: `.*${body.search.search_txt}.*`, $options: 'i' };
         }
         else if ( body.search.search_field === 'handler_name'){
            handler_match = {$or: []};
            let txts = body.search.search_txt.split(' ');
            for (let t of txts){
               handler_match.$or.push({'name_first': {$regex: `.*${t}.*`, $options: 'i' }});
               handler_match.$or.push({'name_last': {$regex: `.*${t}.*`, $options: 'i' }});
            }
         }

      }






      //********** check groupBy param *********************

      let groupBy_key = 'handler_id';

      match['confirmed_handler'] = {$ne: false};


      if (body.groupBy !== 'HANDLER'){
         res.status(400).send('must be trainer to call this for now');
         return;
      }




      let pipeline =  [
         {
            "$match" : match
         },

          // join handler info
         {
            "$lookup" : {
               "from" : "users",
               "let" : {
                  // "handler_id" : "$handler_id",
                  [groupBy_key] : "$"+groupBy_key
               },
               "pipeline" : [
                  {
                     "$match" : {
                        "$expr" : {
                           "$eq" : [
                              "$_id",
                              // "$$handler_id"
                               "$$"+groupBy_key
                           ]
                        }
                     }
                  },
                  {
                     "$project" : {
                        "name_first" : 1.0,
                        "name_last" : 1.0,
                        "profile_image" : 1.0,
                        "email": 1,
                        "account_status.date_expiry": 1,
                     }
                  }
               ],
               // "as" : "handler_id_FR"
               "as" : groupBy_key+"_FR"
            }
         },
         {
            "$unwind" : {
               "path" : "$handler_id_FR",
               "preserveNullAndEmptyArrays" : false
            }
         },

         // join Trainer info
         {
            "$lookup" : {
               "from" : "users",
               "let" : {
                  "trainer_id" : "$trainer_id",
               },
               "pipeline" : [
                  {
                     "$match" : {
                        "$expr" : {
                           "$eq" : [
                              "$_id",
                              "$$trainer_id"
                           ]
                        }
                     }
                  },
                  {
                     "$project" : {
                        "name_first" : 1.0,
                        "name_last" : 1.0,
                        "profile_image" : 1.0,
                        "email": 1,
                        "account_status.date_expiry": 1,
                     }
                  }
               ],
               "as" : "trainer_id_FR"
            }
         },
         {
            "$unwind" : {
               "path" : "$trainer_id_FR",
               "preserveNullAndEmptyArrays" : false
            }
         },




          //**** group results by handler ***************
         {
            "$group" : {
               "_id" : {
                  // "handler_id": "$handler_id",
                  [groupBy_key] : "$"+groupBy_key
               },
               "dogs" : {
                  "$addToSet" : "$$ROOT"
               }
            }
         },
         {
            "$replaceRoot" : {
               "newRoot" : {
                  // "handler_id" : "$_id.handler_id",
                  [groupBy_key] : "$_id."+groupBy_key,
                  "dogs" : "$dogs"
               }
            }
         },
         {
            "$project" : {
               "_id" : 0.0
            }
         },



          //**** sort results *************

         {
            $sort: {
               [groupBy_key+'_FR.name_last'] : 1,
               [groupBy_key+'_FR.name_first'] : 1,
            }
         }
      ];


      if (handler_match != null){
         pipeline[1].$lookup.pipeline.splice(1, 0, {$match: handler_match});
      }



      let options = {
         allowDiskUse: true
      };
      let mld_dog = req.my_db.models['dog'];
      let ans = await mld_dog.collection.aggregate(pipeline, options).toArray();


      //copy handler info to root of grouped records

      let del_ix = null;
      let clients_set = new Set();
      for (let i in ans){

         if (ans[i].dogs[0]){
            ans[i].handler_id_FR = ans[i].dogs[0].handler_id_FR;
            clients_set.add(ans[i].handler_id.toString());
            //sort dogs by name
            ans[i].dogs.sort((a, b) => a.name > b.name ? 1 : -1)

            if (ans[i].handler_id_FR._id.toString() === req.decoded_token.user_id){
               del_ix = i;
            }
         }

      }



      if (excludeSelf && del_ix !== null){
         ans.splice(del_ix, 1);
      }




      //***** add user records in user's clients property

      let mld_user = req.my_db.models['user'];
      let projection = {
         "name_first" : 1.0,
         "name_last" : 1.0,
         "profile_image" : 1.0,
         "email": 1,
         "account_status.date_expiry": 1,
      };
      let trainer = await mld_user.collection.findOne({_id: ObjectId(req.decoded_token.user_id)}, {projection: {clients:1}});

      let client_ids = [];

      for (let c of trainer.clients){
         if (!clients_set.has(c.toString())){
            client_ids.push(c)
         }
      }

      let clients = [];
      if (client_ids.length > 0){
         clients = await mld_user.collection.find({_id: {$in:client_ids}}, {projection}).toArray();
      }


      for (let c of clients){
         ans.push({
            handler_id: c._id,
            handler_id_FR: c,
            dogs: [],
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








/**
 * returns the expiration of a user's standards agreement
 */
router.post('/getUserAgreementExpiration', getUserAgreementExpiration );
async function getUserAgreementExpiration(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['user_id', ];
      let error_msg = helpers.check_params(body, params, params);
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }


      //todo: need to add more intelligent authorization
      // if (req.decoded_token.user_id !== body.user_id){
      //    res.status(403);
      //    res.send("Not Authorized");
      //    return;
      // }


      let options = {
         projection: {account_status: 1}
      }
      let user = await req.my_db.models['user'].collection.findOne({_id: ObjectId(body.user_id)}, options);


      let ans;
      if (user !== null){
         ans = {
            _id: user._id,
            agreement_expiry: user.account_status.date_expiry
         }
      }
      else{
         ans = null;
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








/**
 * get's users who have give this user_id delegated access to their account.
 */
router.post('/getDelegatedUsers', get_delegated_users );
async function get_delegated_users(req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['user_id', ];
      let error_msg = helpers.check_params(body, params, params);
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }

      let dog = body.dog;

      //todo: need to add more intelligent authorization
      if (req.decoded_token.user_id !== body.user_id){
         res.status(403);
         res.send("Not Authorized");
         return;
      }


      let mld_dog = req.my_db.models['dog'];

      let ans = await mld_dog.collection.find({user_id: ObjectId(body.user_id)}).toArray();

      //todo: handle case if array of user_id's

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
 * Helper function to create digital passes on passkit.com
 * @return {Promise<void>}
 * @private
 */
async function _create_passkit_sds_pass({fname, lname, user_email, user_id, sds_num, dog_img_url, dog_name,qr_url,
                                         qr_url_human, expiration}){
   let key        = process.env.PASSKIT_COM_API_KEY;
   let secret     = process.env.PASSKIT_COM_API_SECRET;
   let tier_id    = process.env.PASSKIT_COM_TIER_ID;
   let program_id = process.env.PASSKIT_COM_PROGRAM_ID;


   //create auth jwt for passkit.com
   let data = {'uid': key}
   let token =  jwt.sign(data, secret, {algorithm: 'HS256', expiresIn: '100s' });
   let decoded = jwt.verify(token, secret, {algorithm: 'HS256',  })
   // console.log(decoded)


   // let expiration = DateTime.fromISO('2023-01-01').toJSDate();


   //enrol new member
   let handler_name =  fname + ' ' + lname;
   let payload = {
      externalId: sds_num,
      programId: program_id,
      tierId: tier_id,
      // status: null,
      optOut: true,
      "profileImage": dog_img_url,
      expiryDate:  DateTime.fromJSDate(expiration).toJSDate(),
      metaData: {
         nameHandler: handler_name,
         nameDog: dog_name,
         QR_Url: qr_url,
         QR_Url_Human: qr_url_human,
         expiryString: DateTime.fromJSDate(expiration).toFormat('MMM yyyy'),

      },
      person: {
         "forename": fname,
         "surname": lname,
         "displayName": handler_name,
         "emailAddress": "motoi@espy.ai", //todo: change this to actual email
         // "mobileNumber": "string",
         externalId: user_id,
         // "externalIds": {}
      },

   }


   let url = 'https://api.pub1.passkit.io/members/member';
   let headers = {
      'Authorization': token
   }

   let res = await axios.post(url, payload, {headers})
   console.log(res.data)

}

/**
 * endpoint to create member record on passkit.com
 */
router.post('/createDigitalSDSPass', createDigitalSDSPass );
async function createDigitalSDSPass(req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['dog_id', ];
      let error_msg = helpers.check_params2(body, params, {res, required: params});
      if (error_msg !== null) {
         return;
      }


      //todo: check if user is dog's owner

      let mld_dog = req.my_db.models['dog'];
      let mld_user = req.my_db.models['user'];



      let dog = await mld_dog.collection.findOne({_id: ObjectId(body.dog_id)});


      let options = {projection: {account_type: 1, handler_info:1, name_last: 1, name_first: 1,  account_status: 1}};
      let handler = await mld_user.collection.findOne({_id: dog.handler_id}, options);

      //get image and check dimension as passkit will error if image is less then 320px x 320px
      let img_url = _.get(dog, 'profile_image.Location', null);
      if (img_url != null){
         let img = await axios.get(img_url, {
            responseType: 'arraybuffer'
         });

         let img_size = sizeOf(img.data);
         if (img_size.height < 320 || img_size.width < 320 ){
            img_url = undefined;
         }
         console.log('debug')
      }




      let pass_settings = {
         lname: handler.name_last,
         fname: handler.name_first,
         user_id: handler._id.toString(),
         sds_num: 'SDS-'+dog.dog_num,
         dog_img_url: img_url,
         dog_name: dog.name,
         qr_url: `https://servicedogstandards.org/team/${dog.dog_num}`,
         qr_url_human: `ServiceDogStandards.org/team/${dog.dog_num}`,
         expiration: handler.account_status.date_expiry,
      }


      await _create_passkit_sds_pass(pass_settings);






      let update = {
         _id: body.dog_id,
      };






      await helpers.update_db_record(update, mld_dog, {addDefaults: false});
      //todo: turning defaults off because if you pass in a non-existing key path, i.e. checks.key, and checks doesn't
      //exist, then you'll get both the default and the specified value.

      res.send('Pass created');
   } catch (err) {

      let err_msg = err.message;
      let msg2 = _.get(err, 'response.data.error', '');
      err_msg += ', ' + msg2;

      res.log.error(err);
      res.status(500);
      res.send(err_msg)
      // res.send('There was an internal server error');

   }
}




module.exports = router
