'use strict';

const Ajv = require('ajv');
let ajv = new Ajv({ useDefaults: true });
const _ = require('lodash');
const {DateTime} = require('luxon');
const {ObjectId} = require('mongodb');




const schemaVersion = "http://json-schema.org/draft/2019-09/schema#";

/*
 NOTES:
 1. these models are intended to be consumed by the DBConnection class, which adds a collection property
 which is just the collection specified by the collection_name property

 2. In addition, the validate() function is used in conjunction with update_db_record() function in the helper.js file
 (also in this folder)

 3. schema properties prefixed with 'cfk_' are Custom Key Fields that are not part of the standard json-schema
 and are intended to be used by our own helper functions (see helpers.js in this folder).  Custom keys we've
 introduced are

   cfk_ref : used to indicate a property is a foreign key and is used by db/helpers.add_foreign_key_objects()
             Expected value of this property is something like: "cfk_ref: {model: 'dog', key: '_id'}", where
                  model: name of the model that it's referencing
                  key  : field name that it's referencing

   cfk_type: used to indicate a JS class type.  This value is used to type cast values before saving.
             used by helper.cast_values(). Note that value should be the class/function constructor object,
             as matching is done via instanceof.
             At present, only Date and ObjectId are supported.  See db/helper.cast_values() for details.

   cfk_values: an array, used to define specific values that a field may take.  e.g. cfk_values = ['one', 'two'].
               note can be used in conjunction with or in place of type validation, e.g. cfk_values = ['one', 2],
               should allow the field to accept either the string 'one' or the number 2.
               Comparison is via Array.prototype.includes(). Intended use case is to provide an array of strings.
*/




/**
 * function factory the generates the validator function
 * @param schema
 * @returns {function(*=, {additionalProperties?: *, required?: *}=): {isValid: boolean | PromiseLike<any>, errors: Array<ajv.ErrorObject> | null | undefined}}
 */
function get_validator(schema){



   let validate =  function (data, {additionalProperties=false, required=null}={}){
      let schema2 = _.cloneDeep(schema);

      schema2.additionalProperties = additionalProperties;

      if (required !== null ){
         schema2.required= required;
      }
      let validator = ajv.compile(schema2);
      let valid = validator(data);

      return {isValid: valid, errors: validator.errors};
   }

   return validate;
}



/** *****************************************************************************************************************
 *                                                 max_numbers
 *******************************************************************************************************************/
module.exports.counters = function (){

   let schema = {
      // "$schema": schemaVersion,
      "type": "object",
      "additionalProperties": false,
      "required": [ 'name', 'counter', ],
      "properties": {
         _id :  {type: 'object'}, //objectId
         // name:  {type: 'String', cfk_values: ['member_num', 'dog_num', 'global']},
         name:  {type: 'String', cfk_values: [ 'global', 'order']},
         counter :  {type: 'number'},
      },
   };

   let validate = get_validator(schema);

   return {name: 'counter',  collection_name: 'counters', schema, validate};
};



/** *****************************************************************************************************************
 *                                           User Model
 *******************************************************************************************************************/
let ADDRESS = {
   type: 'object',
   default: {},
   properties: {
      street1: {"type": ["string", "null"], default: null},
      street2: {"type": ["string", "null"], default: null},
      city: {"type": ["string", "null"], default: null},
      state: {"type": ["string", "null"], default: null},
      zip: {"type": ["string", "null"], default: null},
      geo_info: {"type": ["object", "null"], default: null}, // object from geocodio
   }
};

let DELEGATED_USER =  {
   "type": "object",
   "required": [ "user_id", "access_level" ],
   "properties": {
      "user_id": {"type": "object",},
      "access_level": {"type": "string",},
      "access_status": {"type": "string",},
   }
};

module.exports.user = function (){

   let schema = {
      // "$schema": schemaVersion,
      type: "object",
      additionalProperties: false,
      required: [ "email", 'password', 'member_num', ],
      properties: {
         _id: {type: 'object'},
         email: {"type": "string"},
         password: {
            type: "object",
            properties: {
               salt: {type: 'string' }, //base64 string
               hash: {type: 'string' } //hex string
            }
         },
         member_num: {type: 'string'},

         // reset_password: {type: 'boolean', default: false},// used to indicate if a user's account needs to be reset


         // used to temporarily store a new email, till the user has confirmed the new email
         email_change:  {
            type: ["object", "null"],
            default: null,
            properties: {
               new_email: {"type": "string" },
               confirm_code: {"type": "string" },
            }
         },

         // membership_status: {type: 'string', default: 'Active'},// set by the user in the
         // account_activated: {type: 'boolean', default: false}, //

         account_visibility: {type: 'string', default: 'Public', cfk_values: ['Public', 'Private']},// Set by user in profile, used to determine if the profile is searchable
         account_type: {type: 'string', cfk_values: ['TRAINER', 'HANDLER', 'AIDE', 'SDS-ADMIN']},
         account_status:{
            type: 'object',
            properties: {
               isActive: {type: 'boolean', default: false}, // used
               date_accepted: {type: ["object", 'null'], default: null, cfk_type: Date}, //date standards were accepted
               date_expiry:  {type: ["object", 'null'], default: null, cfk_type: Date}, //date when user needs renew standards


            }
         },


         // delegated_users:  {"type": "array",   "items": { "$ref": "#/definitions/delegated_user" }, default: []},
         delegated_users:  {"type": "array",   "items": DELEGATED_USER, default: []},

         clients:  {type: "array", default: [], //used by trainers
            items: {
               type: "object",
               cfk_type: ObjectId, cfk_ref: {model: 'user', key: '_id'},

               // properties: {
               //    user_id: {"type": "object", cfk_type: ObjectId, cfk_ref: {model: 'user', key: '_id'}},
               //
               // }
            },
         },

         name_first: {"type": ["string", "null"], default: null},
         name_last: {"type": ["string", "null"], default: null},
         name_middle: {"type": ["string", "null"], default: null},
         // address: ADDRESS,
         // phone: {"type": ["string", "null"], default: null},
         profile_image: {"type": ["object", "null"], default: null}, //response object from spaces upload


         // social_profiles: {"type": ["object", "null"], default: null}, // do we still need this?


         private_info: {
            type: ["object", "null"],
            default: {},
            properties:{
               address: ADDRESS,
               phone: {"type": ["string", "null"], default: null},
               phone2: {"type": ["string", "null"], default: null},
               email2: {"type": ["string", "null"], default: null},


               gender: {"type": ["string", "null"], default: null},
               dob: {"type": ["string", "null"], default: null}, //format should be yyyy-mm-dd


               // ec_name_first: {"type": ["string", "null"], default: null}, //emergency contact
               // ec_name_last: {"type": ["string", "null"], default: null},
               // ec_relationship: {"type": ["string", "null"], default: null},
               // ec_phone: {"type": ["string", "null"], default: null},
               // ec_email: {"type": ["string", "null"], default: null},



               disability: {
                  type: ["object", "null"],
                  default: {},
                  properties:{
                     primary: {"type": ["string", "null"], default: null},
                     secondary: {"type": ["string", "null"], default: null},
                     primary_other: {"type": ["string", "null"], default: null}, //use if disability = "Not Listed"
                     secondary_other: {"type": ["string", "null"], default: null},
                  }
               },

               aide: {
                  type: ["object", "null"],
                  default: null,
                  properties:{
                     name_first: {"type": ["string", "null"], default: null},
                     name_last: {"type": ["string", "null"], default: null},
                     email: {"type": ["string", "null"], default: null},
                     phone:  {"type": ["string", "null"], default: null},
                     relationship:  {"type": ["string", "null"], default: null},
                  }
               },

               emergency_contact: {
                  type: ["object", "null"],
                  default: {},
                  properties:{
                     name_first: {"type": ["string", "null"], default: null},
                     name_last: {"type": ["string", "null"], default: null},
                     email: {"type": ["string", "null"], default: null},
                     phone:  {"type": ["string", "null"], default: null},
                     relationship:  {"type": ["string", "null"], default: null},
                  }
               },

               census: {
                  "type": ["object", "null"],
                  default: null,
                  properties:{
                     race: {"type": ["string", "null"], default: null},
                     education: {"type": ["string", "null"], default: null},
                     income: {"type": ["string", "null"], default: null},
                     isVeteran: {"type": ["boolean", "null"], default: null},
                     isCivilianContractor: {"type": ["boolean", "null"], default: null},
                     wartimeInjury: {"type": ["boolean", "null"], default: null},
                  }
               },
            }
         },

         trainer_info: {
            type: ["object", "null"],
            // default: {},
            properties:{
               business_name: {"type": ["string", "null"], default: null},
               website: {"type": ["string", "null"], default: null},
               tagline:  {"type": ["string", "null"], default: null},
               phone:  {"type": ["string", "null"], default: null},
               email: {"type": ["string", "null"], default: null},
               address: ADDRESS,
               hours_str: {"type": ["string", "null"], default: null},

               about: {"type": ["string", "null"], default: null},
               services: {"type": ["array"], default: []},
               certifications: {"type": ["array", "null"], default: []},
               awards: {"type": ["array", "null"], default: []},
               breeds: {"type": ["array", "null"], default: []},
               groups: {"type": ["array", "null"], default: []},
               social: {"type": ["array", "null"], default: []},

               section_skip_checks: {
                  "type": ["object", "null"],
                  properties:{
                     about: {"type": ["boolean", "null"], },
                     services: {"type": ["boolean", "null"], },
                     certifications: {"type": ["boolean", "null"], },
                     awards: {"type": ["boolean", "null"], },
                     breeds: {"type": ["boolean", "null"], },
                     groups: {"type": ["boolean", "null"], },
                     social: {"type": ["boolean", "null"], },
                     gallery: {"type": ["boolean", "null"], },
                  }

               },

               banner_image: {"type": ["object", "null"], default: null}, //response object from spaces upload


               will_travel: {type: ['boolean','null'], default: null },
               will_transport: {type: ['boolean','null'], default: null },
               max_travel_miles:  {type: ['number','null'], default: null },
               have_facility: {type: ['boolean','null'], default: null },

               custom_trainer_url: {"type": ["string", "null"], default: null},//used to give a trainer a custom url like /trainer/this_is_my_url
               gallery_caption: {"type": ["string", "null"], default: null},
            }
         },

         handler_info: {
            type: ["object", "null"],
            // default: {},
            properties:{
               email: {"type": ["string", "null"], default: null},
               phone:  {"type": ["string", "null"], default: null},
               address: ADDRESS,
               about: {"type": ["string", "null"], default: null},
               social: {"type": ["array", "null"], default: []},
               banner_image: {"type": ["object", "null"], default: null}, //response object from spaces upload

               checks: {
                  type: 'object',
                  default: {},
                  properties: {
                     have_rec_letter: {type: ['boolean','null'], default: null },//used to indicate what panes to show on
                     have_doc_letter: {type: ['boolean','null'], default: null }, // team page
                  }
               },
            }
         },



         aide_info: {
            type: ["object", "null"],
            // default: {},
            properties:{
               email: {"type": ["string", "null"], default: null},
               phone:  {"type": ["string", "null"], default: null},
               address: ADDRESS,
               about: {"type": ["string", "null"], default: null},
               social: {"type": ["array", "null"], default: []},
               banner_image: {"type": ["object", "null"], default: null}, //response object from spaces upload
            }
         },

         // census_info: {
         //    "type": ["object", "null"], default: null,
         //    properties:{
         //       race: {"type": ["string", "null"], default: null},
         //       education: {"type": ["string", "null"], default: null},
         //       income: {"type": ["string", "null"], default: null},
         //       isVeteran: {"type": ["boolean", "null"], default: null},
         //       isCivilianContractor: {"type": ["boolean", "null"], default: null},
         //       wartimeInjury: {"type": ["boolean", "null"], default: null},
         //    }
         // },

         // dogs: {"type": ["array"], default: []}, //ObjectId of dog collection

         //see user onboarding stepper in front end
         setup: {
            type: 'object',
            "additionalProperties": false,
            properties: {
               confirmed_email:  {type: "boolean", default: false},
               email_code: {type: ["string", "null"], default: null},
               confirmed_terms_conditions: {type: "boolean", default: false},
               confirmed_behavior_standards: {type: "boolean", default: false},
               basic_info_passed:  {type: "boolean", default: false},
               additional_info_passed:  {type: "boolean", default: false},
               invited_user:  {type: "boolean", default: false}, //used to indicate if the account was created via an invite

               pw_reset_code:  {"type": ["string", "null"], default: null}, //password reset code

               // admin_comment: {type:  ["string", "null"], default: null},

            }
         },

         // deactivated: {
         //    type: ['object', 'null'],
         //    default: null,
         //    additionalProperties: false,
         //    properties: {
         //       date:  {type: "object", cfk_type: Date},
         //       reason: {type: ["string", "null"], default: null},
         //       flag_id: {type: ['object', 'null'], cfk_type: ObjectId, cfk_ref: {model: 'flag_report', key: '_id'}, default: null},
         //    }
         // },


         admin: {
            type: 'object',
            properties:{
               comment: {type:  ["string", "null"], default: null},
               // deactivated: {
               //    type: ['boolean', 'null'],
               //    default: null,
               // },
            }
         },

         deactivated: {
            type: ['boolean', 'null'],
            default: null,
         },

         date_created: {"type": "object"},
         date_updated: {"type": "object"},
      },

      "definitions": {
         "delegated_user": {
            "type": "object",
            "required": [ "user_id", "access_level" ],
            "properties": {
               "user_id": {"type": "object",},
               "access_level": {"type": "string",},
               "invite_status": {"type": "string",},
            }
         }
      }
   };

   let validate = new get_validator(schema);

   return {name: 'user',  collection_name: 'users', schema, validate};
};




/** *****************************************************************************************************************
 *                                                 Session Model
 *******************************************************************************************************************/
module.exports.session = function (){

   let schema = {
      // "$schema": schemaVersion,
      "type": "object",
      "additionalProperties": false,
      "required": [ "session_id" , 'user_id', 'user_email', 'created', 'expiry'],
      "properties": {
         _id :  {type: 'object'}, //objectId
         "session_id": {type: 'string'},
         "user_id" :  {type: 'object'},
         "user_email": {type: 'string'},
         "created": {type: 'object'},
         "expiry": {type: 'object'},
      },


   };

   let validate = new get_validator(schema);

   return {name: 'session',  collection_name: 'sessions', schema, validate};
};




/** *****************************************************************************************************************
 *                                                 Dog Model
 *******************************************************************************************************************/
module.exports.dog = function (){

   let schema = {
      // "$schema": schemaVersion,
      "type": "object",
      "additionalProperties": false,
      "required": [ 'user_id',  'dog_num', ],
      "properties": {
         _id :  {type: 'object', cfk_type: ObjectId}, //objectId
         user_id :  {type: 'object', cfk_ref: {model: 'user', key: '_id'}, cfk_type: ObjectId}, //objectId of user who registered the dog

         dog_num: {type: 'string'},
         name: {type: 'string'},
         status: {type: 'string', cfk_values: ['InTraining', 'FullyTrained', 'Retired', 'InMemoriam', 'Washout', 'Private']},
         microchip_num: {type: ['string', 'null'], default: null},
         coat_color: {type: ['string', 'null'], default: null},
         breed: {type: ['string', 'null'], default: null},
         gender: {type: ['string', 'null'], default: null},
         size: {type: ['string', 'null'], default: null},


         birth_year: {type: ['string', 'null'], default: null},

         // born: {type: ['object', 'null'], cfk_type: Date, default: null},
         died: {type: ['object', 'null'], cfk_type: Date, default: null},

         checks: {
            type: 'object',
            default: {},
            properties: {
               is_adi_graduate: {type: ['boolean','null'], default: null },
               have_training_logs: {type: ['boolean','null'], default: null },
               took_obedience_class: {type: ['boolean','null'], default: null },
               have_trainer: {type: ['boolean','null'], default: null },
               passed_cgc: {type: ['boolean','null'], default: null },
               passed_public_access: {type: ['boolean','null'], default: null },
               have_vet_records: {type: ['boolean','null'], default: null },
            }
         },

         num_pets: {type: 'number', default: 0},

         trainer_id :  {type: ['object', 'null'], default: null, cfk_ref: {model: 'user', key: '_id'}, cfk_type: ObjectId}, //objectId of trainer
         handler_id: {type: ['object', 'null'], default: null, cfk_ref: {model: 'user', key: '_id'}, cfk_type: ObjectId}, //objectId of handler user

         profile_image: {"type": ["object", "null"], default: null}, //response object from spaces upload
         kit_image    : {"type": ["object", "null"], default: null}, //response object from spaces upload

         confirmed_trainer:  {type: ['boolean', 'null'], default: null}, //used to indicate if an invited user has accepted.  Note trainer_id is set on the invite request
         confirmed_handler:  {type: ['boolean', 'null'], default: null},


         registration_kit:{
            type: ['object', 'null'],
            default: null,
            properties:{
               order_id: {type: ['object', 'null'], default: null, cfk_ref: {model: 'order', key: '_id'}, cfk_type: ObjectId}, //order object_id
               kit_info: {type: 'object'},
               // date_purchased: {type: 'object'},
               // date_expiry: {type: 'object'},
               // details: {type: 'object'}
            }
         },

         admin: {
            type: 'object',
            properties:{
               comment: {type:  ["string", "null"], default: null},
               // deactivated: {
               //    type: ['boolean', 'null'],
               //    default: null,
               // },
            }
         },
      },


   };

   let validate = new get_validator(schema);


   return {name: 'dog',  collection_name: 'dogs', schema, validate};
};

// module.exports.dog_pet = function (){
//
//    let schema = {
//       // "$schema": schemaVersion,
//       "type": "object",
//       "additionalProperties": false,
//       "required": [ 'user_id', 'dog_id', 'member_num', 'dog_num'],
//       "properties": {
//          _id :  {type: 'object', cfk_type: ObjectId},
//          user_id :  {type: 'object',  cfk_type: ObjectId, cfk_ref: {model: 'user', key: '_id'} },
//          dog_id:    {type: 'object',  cfk_type: ObjectId, cfk_ref: {model: 'dog', key: '_id'} },
//          user_num:  {type: 'string',  cfk_ref: {model: 'user', key: 'member_num'} },
//          dog_num:  {type: 'string',  cfk_ref: {model: 'dog', key: 'member_num'} },
//       },
//
//    };
//
//    let validate = new get_validator(schema);
//
//
//    return {name: 'dog_pet',  collection_name: 'dog_pets', schema, validate};
// };


/** *****************************************************************************************************************
 *                                                 Image (gallery)
 *******************************************************************************************************************/
module.exports.image = function (){

   let schema = {
      // "$schema": schemaVersion,
      "type": "object",
      "additionalProperties": false,
      "required": [ 'user_id', 'image_data', ],
      "properties": {
         _id :  {type: 'object'}, //objectId
         user_id :  {type: 'object'}, //objectId of user
         comments: {type: ['string', 'null'], default: null},
         image_data: {
            type: 'object',
            additionalProperties: true,
            properties: {
               Location: {type: 'string'},
               Bucket: {type: 'string'},
               Key: {type: 'string'},
               ETag: {type: 'string'},
            }
         }

      },
   };

   let validate = new get_validator(schema);

   return {name: 'image',  collection_name: 'images', schema, validate};
};









/** *****************************************************************************************************************
 *                                                 Item
 *******************************************************************************************************************/

const ITEM_PROPERTIES = {
   _id :  {type: 'object'}, //objectId
   item_key: {type: 'string'}, //unique key for item, basically it primary key.  should have a unique index on it.

   name: {type: 'string'}, //name of item
   description: {type: 'string'}, //string to be shown to user in frontend.
   description_full: {type: 'string'}, //product description for item

   price: {type: 'number'},     //price of item
   images: {type: 'array', items: {type: 'string'}, default: []}, //name of image in the products/

   shipping_info: {
      type: 'object',
      properties: {
         weight_lb: {type: 'number'},
         length_in: {type: 'number'},
         width_in: {type: 'number'},
         height_in: {type: 'number'},
         predefined_package: {type: 'string'},
      }
   },

   //used for actual purchases
   // serial_key: {type: 'string'}, //unique key for item, used to connect an item to a dog at the moment
   details: {type: 'object'},  //item specific info
   number: {type: 'number'},   //number of the item purchased
};

// const ITEMS = {
//    type: 'array',
//    items: {
//       type: 'object',
//       properties: ITEM_PROPERTIES
//    }
// };



module.exports.item = function (){

   let schema = {
      // "$schema": schemaVersion,
      "type": "object",
      "additionalProperties": false,
      "required": [ 'name', 'sku', 'price', ],
      "properties": ITEM_PROPERTIES,
   };

   let validate = new get_validator(schema);

   return {name: 'item',  collection_name: 'store_items', schema, validate};
};








/** *****************************************************************************************************************
 *                                                 Cart
 *******************************************************************************************************************/



// const ITEMS = {
//    type: 'array',
//    items: {
//       type: 'object',
//       properties:{
//          _id :  {type: 'object'}, //objectId
//          name: {type: 'string'},
//          item_key:{type: 'string'},
//          description: {type: 'string'},
//          details: {type: 'object'},
//          price: {type: 'number'},
//       }
//    }
// };

let ITEMS = {
   type: 'array',
   items: {
      type: 'object',
      properties: ITEM_PROPERTIES
   }
};


module.exports.cart = function (){

   let schema = {
      // "$schema": schemaVersion,
      type: "object",
      additionalProperties: false,
      required: [ 'user_id', 'sds_guid', 'status', ],
      properties: {
         _id :  {type: 'object'}, //objectId
         user_id :  {type: ['object', 'null']}, //objectId of user
         sds_guid: {type: 'string',}, //anonymous guid created for all users when they first come to the site (see auth in front end)
         status: {type: 'string'},  //Active|CheckedOut|Purchased|Abandoned
         isActive: {type: 'boolean'}, //inactive if purchased or Abandoned (cart cleared)
         items: ITEMS,
         // total_cost: {type: 'number'},

         customer_info:{
            type: 'object',
            properties:{
               email: {type: 'string'},
               name: {type: 'string'},
               address: {type: ['object', 'null']}
            }

         },

         stripe_session_id: {type: ['string', 'null'], default: null},
         easypost: {
            type: 'object',
            properties:{
               shipment: {type: ['object', 'null'], default: null},
               rate_selected: {type: ['object', 'null'], default: null},
            }
         },
         checked_out: {type: ['array', 'null'], default: null}, //used to track how many times a user checkout before actually purchasing
      },
   };

   let validate = new get_validator(schema);

   return {name: 'cart',  collection_name: 'store_carts', schema, validate};
};



/** *****************************************************************************************************************
 *                                                 Order
 *******************************************************************************************************************/



module.exports.order = function (){

   let order_status = [
      'Received', 'Purchased', 'Printed', 'ReadyToShip', 'Shipped', 'InTransit',
      'OutForDelivery', 'Delivered'
   ];

   let schema = {
      // "$schema": schemaVersion,
      type: "object",
      additionalProperties: false,
      required: [ 'user_id', 'status', 'items', 'customer_info'],
      properties: {
         _id :  {type: 'object', cfk_type: ObjectId}, //objectId
         user_id :  {type: ['object', 'null'], cfk_type: ObjectId, cfk_ref: {model: 'user', key: '_id'} },
         cart_id :  {type: 'object', cfk_type: ObjectId, cfk_ref: {model: 'cart', key: '_id'} },

         customer_info: {
            type: 'object',
            properties:{
               name: {type: 'string'},
               address: ADDRESS,
               email: {type: 'string'},
            }
         },//added so can be consistent across logged in and non-logged in orders.

         status: {type: 'string', cfk_values:order_status},
         status_history: {type: 'array', default: []}, //tracks history status,data, user

         items: ITEMS,

         order_total: {type: 'number'}, //total including shipping = items_total + shipping_cost
         items_total:  {type: 'number'}, //total of just items
         shipping_cost:  {type: 'number'}, //shipping cost

         discounts: {type: ['object', 'null'], default: null},

         date_ordered  : {type: ['object', 'null'], default: null},
         date_shipped  : {type: ['object', 'null'], default: null},
         date_delivered: {type: ['object', 'null'], default: null},

         comments: {type: ['string', 'null'], default: null},

         delivery_address:{
            type: 'object'
         },

         billing_address:{
            type: 'object'
         },



         //note that stripe reports price amounts in cents
         stripe_info:{
            type: 'object',
            "additionalProperties": false,
            required: ['checkout_session'],
            properties:{
               checkout_session: {type: 'object'},
               payment_intent: {type: 'object'},


            }
         },

         easypost: {
            type: 'object',
            properties:{
               shipment: {type: ['object', 'null'], default: null},
               rate_selected: {type: ['object', 'null'], default: null},
               tracker:  {type: ['object', 'null'], default: null},
            }
         },

         shipping_info: {
            type: 'object',
            default: null,
            properties:{
               tracking_code: {type: 'string'}
            }
         },



      },
   };

   let validate = new get_validator(schema);

   return {name: 'order',  collection_name: 'store_orders', schema, validate};
};





module.exports.donation = function (){

   let schema = {
      // "$schema": schemaVersion,
      type: "object",
      additionalProperties: false,
      required: ['user_email',  'amount', 'date'],
      properties: {
         _id :  {type: 'object', cfk_type: ObjectId, },
         user_id :  {type: ['object', 'null'], cfk_type: ObjectId, cfk_ref: {model: 'user', key: '_id'}, default: null },
         user_email :  {type: 'string'},

         amount: {type: 'number'}, //total including shipping = items_total + shipping_cost
         date  : {type: 'object'},

         //note that stripe reports price amounts in cents
         stripe_info:{
            type: 'object',
            additionalProperties: false,
            required: ['checkout_session'],
            properties:{
               checkout_session: {type: 'object'},
               payment_intent: {type: 'object'},
            }
         },

      },
   };

   let validate = new get_validator(schema);

   return {name: 'donation',  collection_name: 'donations', schema, validate};
};





/** *****************************************************************************************************************
 *                                                 flagged users
 *******************************************************************************************************************/
module.exports.flag_report = function (){

   let schema = {
      // "$schema": schemaVersion,
      "type": "object",
      additionalProperties: false,
      required: [ 'user_id',  ],
      properties: {
         _id :  {type: 'object'}, //objectId
         user_id :  {type: 'object', cfk_type: ObjectId, cfk_ref: {model: 'user', key: '_id'}}, //objectId of flagged user
         dog_id:   {type: ['object', 'null'], cfk_type: ObjectId, cfk_ref: {model: 'dog', key: '_id'}}, //objectId of flagged dog
         dog_num: {type: ['string', 'null'], default: null},

         // reviewed: {type: 'boolean', default: false},
         status: {type: 'string',  default: 'Received', cfk_values: ['Received', 'InReview', 'Resolved', 'UserSuspended', 'UserCleared']},
         comments: {type: ['string', 'null'], default: null},

         //info from submitted flag request
         flag_request: {
            type: 'object',
            properties: {
               flagger_name: {type: 'string'},
               flagger_email: {type: 'string'},
               flagger_message: {type: 'string'},

            }
         },

         request_headers: {
            type: 'object',
         }

      },
   };

   let validate = new get_validator(schema);

   return {name: 'flag_report',  collection_name: 'flag_reports', schema, validate};
};










/** *****************************************************************************************************************
 *                                                 Admin Info
 *******************************************************************************************************************/



module.exports.sds_info = function (){

   let schema = {
      // "$schema": schemaVersion,
      "type": "object",
      "additionalProperties": false,
      "required": [ 'address_ship_from', 'company_name',  ],
      "properties": {
         _id :  {type: 'object', cfk_type: ObjectId}, //objectId

         rec_name: {type: 'string'},
         company_name: {type: 'string'},
         address_ship_from: {
            type: 'object',
            properties: {
               street1: {"type": ["string", "null"], default: null},
               street2: {"type": ["string", "null"], default: null},
               city: {"type": ["string", "null"], default: null},
               state: {"type": ["string", "null"], default: null},
               zip: {"type": ["string", "null"], default: null},
               geo_info: {"type": ["object", "null"], default: null}, // object from geocodio
               easypost_id: {type: "string"},
            }
         },


      },
   };

   let validate = new get_validator(schema);

   return {name: 'sds_info',  collection_name: 'sds_info', schema, validate};
};
