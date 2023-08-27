
const {ObjectId} = require('mongodb');
const _ = require('lodash')



function toString(x){
   if (x != null && x.toString != undefined){
      return x.toString()
   }
   else{
      return null;
   }
}


/**
 * check if user making request has access to user_id's data
 * @param req     : the request object,
 * @param record  : str, user | dog | image
 * @param id      : str, appropriate id of record (see id_type)
 * @param access  : read | write
 * @param id_type : objectId | sdsId
 * @param throwError: bool, if true, then an error is thrown if un authorized
 */

module.exports.has_access = async function (req, res, record, id,  { access='read', id_type='objectId', throwError=true} ={}){

//todo: kill ability to use sdsId.  Assume this will happen before calling this fn using the get_id() helper method in db/helpers

   let ans = false;

   if (record === 'user'){
      let user_id;
      if (id_type==='sdsId'){
         let user = await req.my_db.models['user'].collection.findOne({
            member_num: id},{projection: {_id: 1},

         });
         user_id = user._id.toString();
      }
      else{
         user_id = id.toString();
      }



      if (req.decoded_token.user_id === user_id){
         ans = true;
      }

      //check for delegated access
      if (!ans){
         let user = await req.my_db.models['user'].collection.findOne({_id: ObjectId(user_id)},{projection: {delegated_users: 1},  });
         let delegated_users = _.get(user, 'delegated_users', null);
         if (!Array.isArray(delegated_users)){
            delegated_users = []
         }
         for (let u of delegated_users){
            if (u.user_id.toString() === req.decoded_token.user_id){
               ans = true;
               break;
            }
         }
      }



      // if (req.decoded_token.acct_type === 'SDS-ADMIN'){
      //    ans = true;
      // }



   }

   if (record === 'dog'){
      if (id_type==='objectId'){
         //get dog and check if user is user, handler or trainer.
         let u_id = req.decoded_token.user_id.toString();
         let dog = await req.my_db.models['dog'].collection.findOne({_id: ObjectId(id)});
         if (dog != null && ([toString(dog.user_id), toString(dog.handler_id), toString(dog.trainer_id)].includes(u_id))){
            ans = true;
         }

         //check if handler has given delegated access
         if (!ans && dog != null){
            // let users = await req.my_db.models['user'].collection.find(
            //     {_id: {$in: [ObjectId(dog.handler_id), ObjectId(dog.user_id)] }},
            //     {projection: {delegated_users: 1},  }
            // ).toArray();

            let user = await req.my_db.models['user'].collection.findOne({_id: ObjectId(dog.handler_id)},{projection: {delegated_users: 1},  });

            let delegated_users = _.get(user, 'delegated_users', null);
            if (!Array.isArray(delegated_users)){
               delegated_users = []
            }
            for (let u of delegated_users){
               if (u.user_id.toString() === req.decoded_token.user_id){
                  ans = true;
                  break;
               }
            }
         }


      }

   }


   if (!ans){
      res.status(403);
      res.send("Not Authorized");

      if (throwError){
         throw Error('Unauthorized')
      }else
      {
         return false;
      }

   }
   else{
      return true;
   }



}



