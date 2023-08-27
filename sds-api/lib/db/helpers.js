"use strict";
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const {DateTime} = require('luxon');

/**
 * checks if request.query contains at most one parameter which is in accepted_params list
 * @param {object} params - params object
 * @param {array} accepted_params - list of strs, names of parameters that are acceptable
 * returns: {
 *    err: null if no error, or a str with error message,
 *    key: if no err}
 */
module.exports.check_single_param = function (params, accepted_params) {
   let error_msg = null;
   let p=null, p_val=null;


   let keys = Object.keys(params);
   let param_n = keys.length;

   if (keys.length < 1) {
      // error_msg  = 'No parameters passed in';
   }
   else if (param_n === 1) {
      p = keys[0];
      p_val = params[p];
      if (!accepted_params.includes(p)) {
         error_msg = `Query parameter ${keys[0]} not recognized.  Parameter must one of ${accepted_params}`;
      }
   } else {
      error_msg = 'Only one way to query dealers may be passed in';
   }
   return {err: error_msg, key:p, val:p_val};
};








/**
 * just a wrapper to check_params() but with an object destructed interface.
 */
module.exports.check_params2 =
    function(params, accepted, {required=[], anyOneOf= [], onlyOneOf=[],passOnNull=false,
                                          printError=true, res=null}={}) {

   let err = module.exports.check_params(params, accepted, required, anyOneOf, onlyOneOf, passOnNull);
   if (printError)
      console.log(err);

   if (res !== null && err !== null){
      res.status(400);
      // res.send('Check Parameters');
      res.send(err);
   }
   return err;
};

/**
 * checks if request.query contains only parameters in an accepted list
 * @param {object} params -  object whose keys we want to check
 * @param {array} accepted_params - list of strs, names of parameters that are acceptable
 * @param {array} required_params - list of strs, names of parameters that are required
 * @param {array} one_of - list of strs, params must contain at least one of the items in this list
 * @param {array} only_one_of - [str] | [[str],...], must contain exactly one of the items in this list, if array of array,
 *                              each of the sub lists is processed for "only one of"
 * @param {bool} passOnNull - if true, then bypass check for null objects
 * returns: {
 *    err: null if no error, or a str with error message,
 *    key: if no err}
 */
module.exports.check_params =  function(params, accepted_params, required_params=[], one_of=[],
                                        only_one_of=[], passOnNull=false) {


   if (params == null && passOnNull)
      return null

   if (params == null)
      params = {};

   let keys = Object.keys(params);
   let param_n = keys.length;


   //****************check that only params in accepted_params are present ********************
   if (accepted_params !== null){
      for (let i = 0; i < param_n; i += 1) {
         if (!accepted_params.includes(keys[i])) {
            return `Query parameter "${keys[i]}" not recognized.  Parameter must one of ${accepted_params}`;
         }
      }
   }


   //****************check accepted_params ***********************
   for (let i = 0; i < required_params.length; i += 1) {
      if (!keys.includes(required_params[i])) {
         return `Required parameter "${required_params[i]}" was not found.  Required parameters are ${required_params}`;
      }
   }

   //************** check one_of list *****************************
   let atLeastOne = false;
   for (let x of one_of){
      if (keys.includes(x)){
         atLeastOne = true
      }
   }
   if (one_of.length===0) atLeastOne = true;

   if (!atLeastOne){
      return `Missing parameter from one_of = ${one_of}`;
   }




   //***************check only_one_of list *************************
   if (only_one_of.length > 0){

      //check if input is array or array of arrays
      if (!Array.isArray(only_one_of[0])){
         //turn into array of arrays
         only_one_of = [only_one_of];
      }

      for (let list of only_one_of){
         let moreThanOne = false;
         let atLeastOne = false;
         for (let p of list){
            if (keys.includes(p)){
               if (atLeastOne){
                  moreThanOne = true;
                  break;
               }
               atLeastOne = true;
            } //if
         }// for p
         if (moreThanOne){
            return `Contained more than param from = ${list}`;
         }
         if (!atLeastOne){
            return `Missing parameter from one_of = ${list}`;
         }
      }// for list
   }

   return null;
};


/**
 * get's a counter's value and then increments it in the db
 *
 * @param counter : 'member_num' | dog_num
 * @param db      : the my_db object appended to the route handler's req object.
 *
 * @returns current counter value
 */
module.exports.get_db_counter = get_db_counter;
async function get_db_counter(counter, db, {asString=false}={}){

   //make sure we're requesting a valid counter.
   let schema = db.models['counter'].schema;
   if (!schema.properties.name.cfk_values.includes(counter)){
      throw Error(`counter ="${counter}" not recognized.  counters must one of [${schema.properties.name.cfk_values}]`);
   }


   let q = {'name': counter};
   let ans;
   let rec = await db.models['counter'].collection.findOneAndUpdate(q, {$inc: {counter:1}},{upsert: false, });

   if (rec.value == null){
      let c0 = 1241784; //number marc requested

      await db.models['counter'].collection.findOneAndUpdate(q, {$set: {counter:c0}},{upsert: true, });
      ans = c0;
      // return c0
   }
   else{
      ans = rec.value.counter;
   }

   if (asString){
      ans = ans.toString();
   }

   return ans;


}


/**
 * simple function to convert a user or dog sds number id to a objectId
 * @param db   : my_db object off req
 * @param num  : str, the member/dog number
 * @param type : user | dog
 * @returns objectId
 */
module.exports.get_id = async function (db, num, type='user'){

   if (type === 'user'){
      let user = await db.models['user'].collection.findOne({member_num: num},{projection: {_id: 1}} )
      return  user._id;
   }

   else if (type === 'dog'){
      let dog = await db.models['dog'].collection.findOne({dog_num: num},{projection: {_id: 1}} )
      return  dog._id;
   }

   else{
      throw Error(`type="${type} not recognized`)
   }



}


//https://webbjocke.com/javascript-check-data-types/

// Returns if a value is an object
function isObject (value) {
   return value && typeof value === 'object' && value.constructor === Object;
}

// Returns if a value is an array
function isArray (value) {
   // return value && typeof value === 'object' && value.constructor === Array;
   return Array.isArray(value);
}

/**
 * checks all string inputs and removes trailing whitespace.  Note changes the objected passed in
 *
 * @param {Object}  rec : record to insert into mongo
 * @param {Boolean} replaceEmptyWithNull : if true then empty strings are replaced with null
 * @param {function} fn (str), returns cleaned string
 */
function clean_str_inputs(rec, {replaceEmptyWithNull=true, fn = (s) => s.trim()} ={}){
   let keys = Object.getOwnPropertyNames(rec);

   //check if key vals are strings
   for (let k of keys){
      if (typeof rec[k] === 'string') {
         rec[k] = fn(rec[k]);
         if (rec[k] === '' && replaceEmptyWithNull) rec[k] = null;
      }
      else if ( rec[k] !== null && (isArray(rec[k]) || isObject(rec[k])) ){
         clean_str_inputs(rec[k], {replaceEmptyWithNull, fn})
      }
   }
}
module.exports.clean_str_inputs = clean_str_inputs;



/**
 * function attempts to type cast a records values according to the cfk_type property in a schema object
 *
 * @param rec    : object, the object whose values we want to type cast
 * @param schema : object, the schema object of the db model
 */

function cast_values(rec, schema, counter=0){
   let schema2 = schema.properties;
   if (schema2 == undefined){
      return;
   }

   let keys_schema = Object.keys(schema2);


   //check if schema def has a cfk_type value specified
   for (let k of keys_schema){
      //check if the schema has a cfk_type field and the rec's value is an instance of it.
      if (schema2[k].cfk_type !== undefined && rec[k] != undefined && !(rec[k] instanceof schema2[k].cfk_type) ){

         //try to type case the rec's value
         try{
            if (schema2[k].cfk_type === ObjectId){
               rec[k] = ObjectId(rec[k]);
            }
            else if (schema2[k].cfk_type === Date){
               let tmp = DateTime.fromISO(rec[k]);
               if (tmp.invalid !== null){
                  throw Error('')
               }
               rec[k] = tmp.toJSDate();
            }
         }catch (e) {
            throw Error(`Attempt to type cast property ${k} failed`)
         }
      }

      if (schema2[k].properties !== undefined && rec[k] != undefined){
         cast_values(rec[k], schema2[k]);
      }

   }

}



function add_default_values(rec, schema, {db_rec=undefined}={}){
   let schema2 = schema.properties;
   if (schema2 == undefined){
      return;
   }
   let keys_schema = Object.keys(schema2);

   for (let k of keys_schema){
      //check if rec has this property
      let db_rec2={};

      if (db_rec != undefined){
         db_rec2 = db_rec;
      }else{
         db_rec2[k] = rec[k]; // if db_rec = undefined, then we only want to consider if rec[k] is defined or not
      }

      //set default val only if both rec and db_rec don't have a value set
      if (rec[k] === undefined && schema2[k].default !== undefined &&  db_rec2[k] === undefined){
         rec[k] = _.cloneDeep(schema2[k].default );
      }


      let db_rec3={};
      if (db_rec == undefined){
         db_rec3 = db_rec;
      }else{
         db_rec3 = db_rec[k]; // if db_rec = undefined, then we only want to consider if rec[k] is defined or not
      }

      if (schema2[k].properties !== undefined && rec[k] != undefined){
         add_default_values(rec[k], schema2[k], {db_rec: db_rec3});
      }

   }

}



/**
 *
 * @param val: some value
 * @param type : string/array, object|array|string|null.  the type value from the json-schema object for this val
 * @param path : full key path to val (only used to create error message)
 *
 * @param cfk_values: array of acceptable values for this property.
 * @param validMode : string, json-schema | custom, if json-schema then validates only strictly against json-schema spec (sort of)
 *                    if custom, then validates if either type or cfk_type is satisfied.  Note
 */
function check_val_vs_schema(val, types, path,{ cfk_values=null,  validMode='json-schema'}={}){

   if (!Array.isArray(types)){
      types = [types];
   }

   let valid = false;

   for (let t of types){
      if (t === 'string' && typeof val === 'string'){
         valid = true;
      }

      if (t === 'number' && typeof val === 'number'){
         valid = true;
      }

      if (t === 'array' &&  Array.isArray(val)){
         valid = true;
      }

      if (t === 'object' && val instanceof Object ){
         valid = true;
      }

      if (t === 'null' && val === null ){
         valid = true;
      }

      if (t === 'boolean' && typeof val === 'boolean' ){
         valid = true;
      }

      // custom type validations
      if (validMode === 'custom'){
        //todo: add this
      }

      if (valid && cfk_values == null){
         return null;
      }
   }//for t


   // against specific cfk_values if provided
   if (cfk_values != null){
      if (!cfk_values.includes(val)){
         throw Error(`val = "${val}" for path = "${path}" didn't match any accepted cfk_values = [${cfk_values}]`);
      }
   }


   if (!valid){
      throw Error(`val = "${val}"  for path = "${path}" didn't match any accepted types = "${types}"`);
   }

}//check_val_vs_schema()






/**
 * validates a single path key, i.e. one that has periods in it.
 * @param path    : array, e.g. ['path', 'to', 'val']
 * @parm val      : anything.  the value in the update record to validate.
 * @param schema : Object, json-schema object whose root corresponds to the root of 'path.to.val'
 *
 * Example
 * path = ['address', 'street1'], val = '123 street name',
 schema = {
      properties: {
         address : {
            type: 'object',
            properties: {
               street1: {type: 'string'}
            }
         }
      }
   }
 */
function validate_key_path(path, val, schema, ){

   let path2 = [];
   for (let k of path){
      path2.push('properties');
      path2.push(k)
   }

   let path3 = path2.join('.');
   let type = _.get(schema, path3+'.type', undefined);
   let cfk_values = _.get(schema, path3+'.cfk_values', null);

   if (type == null){
      throw Error(`Key "${path.join('.')}" not found in schema`)
   }

   check_val_vs_schema(val, type, path.join('.'), {cfk_values});
}




/**
 * validates rec where the keys can be standard nested objects, or key paths.
 *
 * @param rec    : object to validate
 * @param schema : object, json-schema object.
 *
 * @param key_path : string, used internally, to track full path of a validation error
 * @param counter : number, used internally
 *
 * todo: need to add required and additionalProperties logic
 *
 */
module.exports.validate_record = validate_record;
function validate_record(rec, schema,  key_path='', counter=0, ){

   try{
      let schema2 = schema.properties;
      let keys_rec = Object.keys(rec);



      //******* validate keys/values *********************************
      for (let k of keys_rec){
         let path = k.split('.');

         if (path.length === 1){
            //check like normal
            if (schema2[k] == undefined){
               throw Error(`Couldn't find schema def for key=${k}`);
            }

            let key_path_cur = key_path;
            if (key_path_cur !== '') key_path_cur += '.';
            key_path_cur += k;

            let cfk_values = schema2[k].cfk_values;

            check_val_vs_schema(rec[k], schema2[k].type, key_path_cur, {cfk_values});

            //handle case if array
            if (schema2[k].type === 'array' && schema2[k].items != null){
               for (let i in rec[k]){
                  let el = rec[k][i];
                  if (schema2[k].items.properties){
                     validate_record(el, schema2[k].items,key_path_cur+'.'+i );
                  }else{
                     check_val_vs_schema(el, schema2[k].items.type, key_path_cur+'.'+i, {cfk_values:schema2[k].items.cfk_values});
                  }

               }
            }

            if (schema2[k].properties != undefined && rec[k] != undefined){
               validate_record(rec[k], schema2[k], key_path_cur, counter+1);
            }
         }

         else{
            //validate path key
            validate_key_path(path, rec[k], schema);

         }
      }//for k
   }catch (e){
      console.log(`There was an error.  key_path="${key_path}"`);
      throw(e);
   }


}


/**
 * if record's _id's is found, then the record is updated, else a new record is created
 * @param record - record to update
 * @param mld    - instance of mongoose.model
 * @param filter - query that should return the existing document to update.  If more than one doc is return,
 *                 an error is thrown.
 *
 * @param validationParams : object, {required, additionalProperties }, use to over ride schema values
 * @param castVals         : bool, if true then tries to type cast record's values based on the schema def.
 * @returns {Promise<void>} the record that was saved to the db
 */


module.exports.update_db_record = update_db_record;
async function update_db_record(record, mld, {filter, validationParams={}, castVals=true, addDefaults=true}={}) {


   if (record._id){
      record._id = ObjectId(record._id)
   }


   delete record.date_created;
   delete record.date_updated;

   //remove trailing space from all string values.
   clean_str_inputs(record);

   if (castVals){
      cast_values(record, mld.schema);
   }

   //note that validate() will add default values.
   let rec2 = _.cloneDeep(record);


   //********** add default values ***************************************************************************
   let q = {};
   let db_rec;
   if (record._id !== undefined){
      q = {_id: record._id};
      db_rec = await mld.collection.findOne(q);
   }
   else if (filter !== undefined){
      q = filter;
      db_rec = await mld.collection.findOne(q);
   }



   //todo: there's a bug where if you pass in a non-existing key path (in both record and db) then add_default_values()
   // will add the default value in addition to the key path, giving you a conflicting update.
   if (addDefaults){
      if (db_rec != null){
         add_default_values(record, mld.schema, {db_rec});
      }
      else{
         add_default_values(record, mld.schema);
      }
   }




   //************* validation against schema ******************************************************************
   if (record._id == undefined && filter == undefined){
      //validate using third party validator (adds default value, sort of )

      let valid = mld.validate(rec2, validationParams);
      if (!valid.isValid){
         // console.log('validation error: ', valid.errors);
         let msg = 'Schema validation Failed. ';
         // for (let x of valid.errors){
         //    msg += '\n' + x.message + ': ' + JSON.stringify(x.params) ;
         // }

         msg +=  JSON.stringify(valid.errors, null, '  ');
         throw Error( msg)
      }
   }

   else{
      //validate using our own validation function
      validate_record(rec2, mld.schema);
   }





   //************* actual update ******************************************************************
   let collection = mld.collection;

   if (record.hasOwnProperty('_id')){
      let Q = {'_id': record['_id']};
      delete record._id;

      record.date_updated = new Date();
      var doc = await collection.findOneAndUpdate(Q, {$set: record}, {returnOriginal: false, upsert: false});

      if (doc === null){
         throw new Error('Could not find document to update')
      }
      return doc.value;
   }
   else if (filter !== undefined){
      let res = await collection.find(filter).toArray();
      if (res.length > 1){
         throw Error(`filter returned multiple documents.  filter=${filter}`)
      }

      record.date_updated = new Date();
      var doc = await collection.findOneAndUpdate(filter, {$set: record}, {returnOriginal: false, upsert: true});

      return doc.value;
   }

   else{
      clean_str_inputs(rec2);
      rec2.date_created = new Date();
      record.date_updated = rec2.date_created;
      var doc = await collection.insertOne(rec2);
      return doc.ops[0];
   }

}




/**
 * Simple function to standardize emails.  currently just lowercases the string.
 * @param email
 */
module.exports.clean_email = function(email){
   if (email == null){
      return null;
   }

   let ans = email.toLowerCase();
   ans = ans.trim();
   return ans;
}



/**
 * Simple function to standardize emails.  currently just lowercases the string.
 * @param email
 */
module.exports.clean_pass = function(pass){
   if (pass == null){
      return null;
   }

   let ans = pass.normalize();
   ans = ans.trim();

   return ans;
}





/**
 * get's a property's type info from a schema object.  Note doesn't work with json-schema definitions
 *
 * @param schema : Object representing a json schema
 * @param key    : dot separated path to a property
 */
function get_schema_property(schema, key){
   let path = key.split('.');

   let ans = schema;
   for (let p of path){
      ans = ans.properties[p];
   }

   return ans;
}






/**
 * simple function to replace a list of ObjectId's with the actual objects.  Basically a join.
 *
 * @param records     : array | Object, query results.  Basically the object(s) that we want enrich
 * @param schema      : schema object for records,
 * @param f_keys      : string | array of foreign keys, which maps to objectId of foreign records.
 * @param projection  : projection object to pass to mongo's find().  Used for all values in f_keys.
 * @param projections : object of projection filters indexed by f_key  e.g. {user_id: {email: 1}}
 *                      NOTES:
 *                         if both projection and projections is passed in, then projections takes precedence
 *                         and projection is ignored.
 *
 *                         At least one of projection and projections must be specified.  If the full record is desired,
 *                         pass projection='FULL_REC' or an empty object.
 *
 * @param db          : object returned from DBConnection.get_db()
 *
 * @param mode      : string, append | replace.  append adds a new property for each id field, replace replaces the
 *                    id_field with the actual foreign record.  for append, the property key =  id_key + '_full_rec'
 * @param inPlace : bool, if true then records is updated itself and a reference to the same object is returned.
 *                  if false, a deep copy of records is made and returned instead.
 *
 *
 * @returns {null|*}
 */

module.exports.add_foreign_key_objects = async function(records, schema, f_keys, db,
                                                        {projections, projection, mode='append', inPlace= true} ={}){

   /*
      For each id:
         1. get model that this key references from schema
         1. pull all records in foreign collection (f_recs)
         2. create map  of f_recs, indexed by objectId.toString()
         3. append data to records
    */

   let records2;



   //check if a deep or object copy should be made of input records
   if (inPlace){
      records2 = records;
   }
   else{
      records2 = _.cloneDeep(records);

   }


   //check that records is an array, else turn it into one
   if (!Array.isArray(records2)){
      records2 = [records2];
   }

   if (!Array.isArray(f_keys)){
      // let tmp =  {};
      // tmp[f_keys] =  projections;
      // projections = tmp;
      f_keys = [f_keys];
   }



   //safety check so that we don't inadvertently add the full record when we didn't mean to
   if (projection==undefined && projections == undefined){
      throw Error('At least one of projection or projections must be defined.')
   }
   if (projection === 'FULL_REC'){
      projection = {};
   }

   //figure out which projection object to use
   if (projections == undefined){
      projections = {};
      if (projection != undefined){
         //use projection for all f_keys
         for (let fk of f_keys){
            projections[fk] = projection;
         }
      }
   }


   //main loop.
   for (let fk of f_keys){

      //get ids to query for
      let fk_vals = [];
      for (let r of records2){
         if (r[fk] != null){

            if (Array.isArray(r[fk])){
               for (let el of r[fk]){
                  fk_vals.push(el);
               }
            }else{
               fk_vals.push(r[fk]);
            }

         }

      }

      let f_key = get_schema_property(schema, fk);
      let f_model_name;
      if (f_key.type === 'array' && f_key.items!=null){
         f_model_name = f_key.items.cfk_ref.model;
      }else{
         f_model_name = f_key.cfk_ref.model;
      }

      let projection = projections[fk];
      let f_recs = await db.models[f_model_name].collection.find({_id : {$in: fk_vals}}, {projection}).toArray();

      //create map of foreign records, indexed by _id
      let f_map = {};
      for (let r of f_recs){
         f_map[r._id.toString()] = r;
      }

      //append data to records
      for (let i in records2){

         let r = records2[i];


         let val = null;
         if (Array.isArray(r[fk])){
            val = [];
            for (let el of r[fk]){
               val.push(_.get(f_map, el.toString(), null));
            }

         }
         else{
            val = _.get(f_map, r[fk.toString()], null)
         }



         if (mode === 'append'){
            // append full record of joined object
            // records2[i][fk+'_FR'] = _.get(f_map, r[fk.toString()], null);
            records2[i][fk+'_FR'] = val;
         }
         else if (mode === 'replace'){
            // records2[i][fk] = _.get(f_map, r[fk.toString()], null);
            records2[i][fk] = val;
         }
         else{
            throw Error(`Parameter mode="${mode} not recognized.  must be one of append|replace`);
         }

      }

   }

   if (Array.isArray(records)){
      return records2;
   }
   else{
      return records2[0];
   }

}//add_foreign_key_objects()























