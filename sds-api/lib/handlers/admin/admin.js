"use strict";
var express = require('express')
var router = express.Router()
const crypto = require('crypto');
const helpers = require('../../db/helpers.js');
const u_helpers = require('../../utilities/helpers.js');
const authz = require('../../utilities/authorization.js');

const {DateTime} = require('luxon');
const _ = require('lodash');

const {ObjectId} = require('mongodb');


const stripe = require('stripe')(process.env.STRIPE_SECRET);
const EasyPost = require('@easypost/api');
const easypost = new EasyPost(process.env.EASYPOST_API_KEY);




//require authentication for these routes
const auth_middleware = require('../../middleware/authentication');
router.use(auth_middleware.admin_auth);



// const fs = require('fs');

const fsp = require("fs").promises;
const ObjectsToCsv = require('objects-to-csv');
const admZip = require('adm-zip');



// creates an object that can interface with S3/Spaces service
const AWS = require("aws-sdk");//used to store files on digital ocean's spaces service
let s3_settings = {
    accessKeyId: process.env.DO_SPACES_ACCESS_KEY,
    secretAccessKey: process.env.DO_SPACES_ACCESS_SECRET,
    endpoint: process.env.DO_SPACES_ENDPOINT
}
const s3 = new AWS.S3(s3_settings);

















/**
 * Returns orders, sorted by creation date (most recent first)
 * @param n_results  : number, the max number of results to return per page.  default 100.  Max = 1,000
 * @param date_after : str, datetime. Used for pagination.  should be the date of the last record in the previous
 *                     page of results
 */
// router.post('/getOrders', getOrders);
// async function getOrders (req, res) {
//
//     try {
//         let body = req.body;
//
//         //********check param values************************************************
//         let params = ['query', 'n_results', 'date_before'];
//         let error_msg = helpers.check_params2(body, params, {res, });
//         if (error_msg !== null) {
//             return;
//         }
//
//
//         params = ['user_id', 'isOpen','date_range', 'status' ];
//         error_msg = helpers.check_params2(body.query, params, {res, });
//         if (error_msg !== null) {
//             return;
//         }
//
//         //************* get pagination parameters ********************
//         let n_results = body.n_results;
//         if (n_results == undefined){
//             n_results = 100;
//         }
//
//         if (n_results > 1000){
//             n_results = 1000;
//         }
//
//         let date_before = body.date_before;
//         if (date_before == undefined){
//             date_before = new Date();
//         }
//         else{
//             date_before = DateTime.fromISO(date_before).toJSDate();
//         }
//
//
//         //********form query***********************
//         let q = {
//             date_ordered : {$lte: date_before},
//         }
//
//         let query = _.get(body, 'query', {});
//
//
//
//         // let options = {limit: n_results, sort: {date_ordered: -1}};
//         // let orders = await req.my_db.models['order'].collection.find(q, options ).toArray();
//
//
//
//         let options = {
//             allowDiskUse: false
//         };
//
//         let pipeline = [
//             {"$match": q },
//             { $sort : {date_ordered: -1} }, //note make this preceds the limit stage to be efficient. see
//             { $limit : n_results },         //  https://docs.mongodb.com/manual/reference/operator/aggregation/limit/
//             {
//                 "$lookup": {
//                     "from": "users",
//                     "let": { "id": "$user_id"},
//                     "pipeline": [
//                         {"$match": {"$expr": {"$eq": ["$_id","$$id"] } } },
//                         {
//                             "$project": {
//                                 "name_first": 1.0,
//                                 "name_last": 1.0
//                             }
//                         }
//                     ],
//                     "as": "user_id_FR"
//                 }
//             },
//             {
//                 "$unwind": {
//                     "path": "$user_id_FR",
//                     "includeArrayIndex": "user_id_ix",
//                     "preserveNullAndEmptyArrays": true
//                 }
//             }
//         ];
//
//         let orders = await req.my_db.models['order'].collection.aggregate(pipeline, options).toArray();
//
//
//         res.send(orders);
//
//
//     } catch (err) {
//
//         res.log.error(err);
//         res.status(500);
//         // res.send(err.message)
//         res.send('There was an internal server error');
//
//     }
// }


/**
 *
 * @param db              : db
 * @param date_range      : object, {start, stop}
 *
 * @param cust_name_first : str, user rec name
 * @param cust_name_last  : str, user rec name
 * @param order_name      : str, cust name in order
 * @param dog_name        : str, dog's name
 * @param sds_number      :
 * @param status          : str, order status
 * @returns {Promise<*>}
 */
async function getOrdersFromDb(db, date_range,{ cust_name_first, cust_name_last, order_name, dog_name, sds_number, status}={}){

    if (date_range == null){
        throw Error('date_range must be specified');
    }


    let date_start = DateTime.fromISO(date_range.start).toJSDate();
    let date_stop = DateTime.fromISO(date_range.stop).endOf('day').toJSDate();

    let q_order = {};


    if (date_range.start != null && date_range.stop != null){
        q_order.date_ordered = {$gte: date_start, $lte: date_stop};
    }
    else{
        if (date_range.start != null){
            q_order.date_ordered = {$gte: date_start};
        }
        if (date_range.stop != null){
            q_order.date_ordered = {$gte: date_stop};
        }

    }



    if (dog_name != null){
        q_order['items.details.dog_name'] = {$regex: `.*${dog_name}.*`, $options: 'i' };
    }

    if (sds_number != null){
        q_order['items.details.dog_num'] = sds_number;
    }

    if (status != null){
        q_order.status = status;
    }


    if (order_name != null){
        q_order['customer_info.name'] = {$regex: `.*${order_name}.*`, $options: 'i' };
    }

    let q_user = {};


    if (cust_name_first != null){
        q_user.name_first = {$regex: `.*${cust_name_first}.*`, $options: 'i' };
    }

    if (cust_name_last != null){
        q_user.name_last = {$regex: `.*${cust_name_last}.*`, $options: 'i' };
    }






    let options = {
        allowDiskUse: false
    };

    let pipeline = [
        {"$match": q_order },
        { $sort : {date_ordered: -1} }, //note make this preceds the limit stage to be efficient. see
        // { $limit : n_results },         //  https://docs.mongodb.com/manual/reference/operator/aggregation/limit/



        //if search through user's record

        {
            "$lookup": {
                "from": "users",
                "let": { "id": "$user_id"},
                "pipeline": [
                    {"$match": {"$expr": {"$eq": ["$_id","$$id"] } } },
                    { "$match": q_user},
                    {
                        "$project": {
                            name_first: 1,
                            name_last: 1,
                            email: 1,
                        }
                    }
                ],
                "as": "user_id_FR"
            }
        },
        {
            "$unwind": {
                "path": "$user_id_FR",
                "preserveNullAndEmptyArrays": true
            }
        }
    ];

    let orders = await db.models['order'].collection.aggregate(pipeline, options).toArray();

    return orders;

}


router.post('/getOrders', getOrders);
async function getOrders (req, res) {

    try {
        let body = req.body;

        //********check param values************************************************
        let params = ['date_range', 'query', ];
        let error_msg = helpers.check_params2(body, params, {res, });
        if (error_msg !== null) {
            return;
        }


        params = ['cust_name_first', 'cust_name_last', 'order_name',  'dog_name', 'sds_number', 'status' ];
        error_msg = helpers.check_params2(body.query, params, {res, });
        if (error_msg !== null) {
            return;
        }


        let orders = await getOrdersFromDb(req.my_db, body.date_range, body.query);


        res.send(orders);


    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}





router.post('/downloadOrders', downloadOrders);
async function downloadOrders (req, res) {

    try {
        let body = req.body;

        //********check param values************************************************
        let params = ['date_range', 'query', ];
        let error_msg = helpers.check_params2(body, params, {res, });
        if (error_msg !== null) {
            return;
        }

        params = ['cust_name_first', 'cust_name_last', 'dog_name', 'sds_number', 'status' ];
        error_msg = helpers.check_params2(body.query, params, {res, });
        if (error_msg !== null) {
            return;
        }


        let q = {};
        // let orders = await req.my_db.models['order'].collection.find(q).toArray();

        let orders = await getOrdersFromDb(req.my_db, body.date_range, body.query);

        let date = DateTime.utc().toFormat('yyyyMMddHHmmssSSS');
        let folder_path = './' + process.env.TMP_FOLDER + '/'



        // fs.mkdir(folder_path, { recursive: true }, function(err) {
        //     if (err) {
        //         console.log(err)
        //     } else {
        //         console.log("New directory successfully created.")
        //     }
        // })


        await fsp.mkdir(folder_path, { recursive: true });



        var zip = new admZip();

        let data2 = [];



        //helper that returns a promise that resolves to the file or an error object, i.e. doesn't thrown an error
        // even if there is one when downloading the file.
        async function get_s3_file(image, order, item_ix, ){
            let s3_params = {
                Bucket: image.Bucket,
                Key : image.Key
            };

            //get name of file (extension)
            let tmp = image.Key.split('.');
            let ext = tmp[tmp.length-1];

            let rnd = crypto.randomBytes(3).toString('hex');

            let fname =  'sds-'+ order.items[item_ix].details.dog_num +'_' + rnd+ '.' + ext;

            let key = order._id.toString() +'_'+item_ix;

            try{

                let data = await s3.getObject(s3_params).promise();
                return {data, key, fname, error: null};
            }
            catch (e) {
                return {data: null, key, fname, error: e};
            }

        }



        //**********get files from spaces******************************
        let s3_files_p  = [];

        for (let order of  orders){
            if (order.items != null ) {
                for (let ix in order.items) {
                    let item = order.items[ix];

                    let image = _.get(item, 'details.kit_image', null);
                    if (image !== null){

                        //get file
                        let data = get_s3_file(image, order, ix, );
                        s3_files_p.push(data);
                    }
                }
            }
        }

        let s3_files = await Promise.all( s3_files_p);

        let s3_files_map = {};
        for (let f of s3_files){
            s3_files_map[f.key] = f;
        }



        //*********** create object to convert to csv **************************************
        for (let order of  orders){

            let addr = order.easypost.shipment.to_address;
            let rate = order.easypost.rate_selected;

            // let date_ordered;
            // if (order.date_ordered){
            //     date_ordered = order.date_ordered.toISOString();
            // }
            // else{
            //     date_ordered = ''
            // }
            //

            let order_line = {
                date: order.date_ordered.toISOString(),
                shipping_address: `${addr.name} ${addr.street1}, ${addr.street2}, ${addr.city}, ${addr.state} ${addr.zip}`,
                shipping_info: `${rate.carrier} ${rate.service}`,
                shipping_rate: `${rate.carrier} ${rate.service}, ${rate.rate} ${rate.currency}`,
                easypost_shipment_id: order.easypost.shipment.id,
                easypost_rate_id: rate.id,

                stripe_checkout_id: order.stripe_info.checkout_session.id,
                stripe_payment_intent_id: order.stripe_info.checkout_session.payment_intent,
            };

            if (order.items != null ){
                for (let ix in order.items){
                    let item = order.items[ix];

                    let item_line = _.cloneDeep(order_line);

                    item_line.item_name = item.name;
                    item_line.item_description = item.description;
                    item_line.item_price = item.price;
                    // item_line.item_number = item.number;
                    item_line.item_price = item.price;
                    item_line.item_handler_name = item.details.handler_name;
                    item_line.item_trainer_name = item.details.trainer_name;
                    item_line.item_dog_name = item.details.dog_name;
                    item_line.item_aide_name = item.details.aide_name;
                    item_line.item_expiration = item.details.expiration;
                    item_line.item_sds_num = item.details.dog_num;

                    let image = _.get(item, 'details.kit_image', null);
                    if (image !== null){
                        item_line.item_image_cloud = item.details.kit_image.Location;


                        //get downloaded file from s3 and add to archive
                        let key = order._id.toString() +'_'+ix;
                        let fname = s3_files_map[key].fname;

                        // await fsp.writeFile(folder_path + fname, s3_files_map[key].data.Body);

                        if (s3_files_map[key].error == null){
                            zip.addFile(fname, s3_files_map[key].data.Body, );
                            item_line.item_image_local = fname;


                        }else {
                            let msg = s3_files_map[key].error.toString();
                            let fname2 ='ERROR-'+fname+'.txt';
                            zip.addFile(fname2, Buffer.alloc(msg.length, msg) );
                            item_line.item_image_local = fname2;
                        }
                    }
                    data2.push(item_line);
                }
            }
        }


        //generate csv file

        let csv = new ObjectsToCsv(data2);
        let csvStr = await csv.toString(true, true);

        // await fsp.writeFile(folder_path + 'file.csv', csvStr);

        zip.addFile("ordered_items.csv", Buffer.alloc(csvStr.length, csvStr));
        // zip.writeZip(folder_path+'zipfile.zip');


        let ans = zip.toBuffer()

        // res.setHeader('Content-Disposition', 'attachment; filename=panda.pdf');
        res.setHeader('Content-Transfer-Encoding', 'binary');
        res.setHeader('Content-Type', 'application/octet-stream');
        res.send(new Buffer(ans, 'binary'))

        // res.send(ans);


    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}









router.post('/buyPostageForOrder', buyPostageForOrder);
async function buyPostageForOrder (req, res) {

    try {
        let body = req.body;

        //********check param values************************************************
        let params = ['order_id', 'action' ];
        let error_msg = helpers.check_params2(body, params, {res, required: params});
        if (error_msg !== null) {
            return;
        }


        if (body.action !== 'BUY_POSTAGE'){
            res.status(400).send('check param vals');
            return
        }

        /*
            1. get order
            2. create shipment object from order info
            3. purchase the selected rate from easypost
            4. update the order record
         */


        //get order
        let order = await req.my_db.models['order'].collection.findOne({_id: ObjectId(body.order_id)});
        let shipment = await easypost.Shipment.retrieve(order.easypost.shipment.id);

        await shipment.buy(order.easypost.rate_selected);
        await shipment.convertLabelFormat('PDF');

        let update = {
            _id: order._id,
            status: 'ReadyToShip',
            'easypost.shipment': shipment,
        }
        let order2 = await  helpers.update_db_record(update, req.my_db.models['order']);

        res.send(order2);


    } catch (err) {


        console.log('debug', err)


        res.log.error(err);
        res.status(500);

        //error format from easypost's api
        if (_.get(err, 'error.error.message', false)){
            res.send(err.error.error.message)
        }
        else{
            res.send('There was an internal server error');
        }

    }
}





router.post('/getUsers', getUsers);
async function getUsers (req, res) {

    try {
        let body = req.body;

        //********check param values************************************************
        let params = ['name_first', 'name_last', 'city', 'state', 'email', 'type', 'date_range'];
        let error_msg = helpers.check_params2(body, params, {res, required: ['type', ], anyOneOf: ['name_first', 'name_last', 'email', 'city', 'state']});
        if (error_msg !== null) {
            return;
        }



        let query_specified = false;
        let mld_user = req.my_db.models['user'];

        let match_and = [{account_type: body.type}];

        if (typeof body.name_first === 'string' && body.name_first !== ''){
            // match.name_first =  {$regex: `.*${body.name_first}.*`, $options: 'i' }; // any partial match

            match_and.push({ name_first: {$regex: `.*${body.name_first}.*`, $options: 'i' } });

            query_specified = true;
        }

        if (typeof body.name_last === 'string' && body.name_last !== ''){
            // match.name_last =  {$regex: `.*${body.name_last}.*`, $options: 'i' };
            match_and.push({
                name_last: {$regex: `.*${body.name_last}.*`, $options: 'i' } // any partial match
            })
            query_specified = true;
        }

        if (typeof body.email === 'string' && body.email !== ''){
            // match.email =  {$regex: `.*${body.email}.*`, $options: 'i' };
            match_and.push({
                email: {$regex: `.*${body.email}.*`, $options: 'i' } // any partial match
            })
            query_specified = true;
        }



        if (typeof body.city === 'string' && body.city !== ''){
            match_and.push({$or:[
                    { "private_info.address.city": {$regex: `.*${body.city}.*`, $options: 'i' },},
                    { "trainer_info_info.address.city": {$regex: `.*${body.city}.*`, $options: 'i' },},

                ]});
            query_specified = true;
        }


        if (typeof body.state === 'string' && body.state !== ''){
            match_and.push({$or:[
                    { "private_info.address.state": {$regex: `.*${body.state}.*`, $options: 'i' },},
                    { "trainer_info_info.address.state": {$regex: `.*${body.state}.*`, $options: 'i' },},

                ]});
            query_specified = true;
        }





        let date_range = body.date_range;

        if (date_range != null && !query_specified) {
            let date_start = DateTime.fromISO(date_range.start).toJSDate();
            let date_stop = DateTime.fromISO(date_range.stop).endOf('day').toJSDate();
            // match.date_updated = {$gte: date_start, $lte: date_stop};
            match_and.push({
                date_updated: {$gte: date_start, $lte: date_stop}
            })
        }

        let match = {$and: match_and};



        let options = {
            projection: {
                name_first: 1, name_last: 1, email: 1, account_type: 1, account_visibility: 1,
                account_status: 1,  profile_image: 1, setup: 1, deactivated: 1, admin: 1,

                // address: 1,phone: 1, trainer_info: 1, handler_info: 1,
            }};

        let ans = await mld_user.collection.find(match, options).toArray();


        res.send(ans);


    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}


router.post('/getUser', getUser);
async function getUser (req, res) {

    try {
        let body = req.body;

        //********check param values************************************************
        let params = ['user_id'];
        let error_msg = helpers.check_params2(body, params, {res, required: params, });
        if (error_msg !== null) {
            return;
        }

        let mld_user = req.my_db.models['user'];

        let options = {
            projection: {
                name_first: 1, name_last: 1, email: 1, account_type: 1, account_visibility: 1,
                account_status: 1,  profile_image: 1, setup: 1,
                address: 1,phone: 1, trainer_info: 1, handler_info: 1, private_info: 1,
                deactivated: 1, admin: 1,
            }};

        let ans = await mld_user.collection.findOne({_id: ObjectId(body.user_id)}, options);

        res.send(ans);


    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}








router.post('/updateUserProfile', updateUserProfile );
async function updateUserProfile(req, res) {
    try {
        let body = req.body;


        //********check param values************************************************
        let params = [ 'user'];
        let error_msg = helpers.check_params2(body, params, {res, required: params});
        if (error_msg !== null) {
            return;
        }



        // await authz.has_access(req, res, 'user', body.user._id);

        //things that the user shouldn't be able to change directly
        if (body.user){
            delete body.user.member_num;
            delete body.user.password;
            // delete body.user.email_change;
            // delete body.update.email;

            delete body.user.reset_password; //for legacy purposes (schema change)
            delete body.user.social_profiles;

            delete body.user.address;
            delete body.user.phone;


        }





        //*****check if update includes any address data and convert to lat/log****************
        // if (_.get(body, 'user.address', null) != null){
        //     //add/overwrite geo_info
        //     body.user.geo_info = await get_geo_info(body.user.address);
        // }

        if (_.get(body, 'update.trainer_info.address', null) !== null){
            body.user.trainer_info.address.geo_info = await u_helpers.get_geo_info(body.user.trainer_info.address);
        }



        //****check credentials against db******************************
        let mld_user = req.my_db.models['user'];
        // let user = await mld_user.collection.findOne({_id: ObjectId(body.user._id)});
        //
        // if (user == null){
        //     res.status(404);
        //     res.send("User Doesn't Exist");
        //     return;
        // }

        await helpers.update_db_record(body.user, mld_user, );
        res.send('update ran');
        return;

    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}








router.post('/updateDog', updateDog );
async function updateDog(req, res) {
    try {
        let body = req.body;


        //********check param values************************************************
        let params = [ 'dog'];
        let error_msg = helpers.check_params2(body, params, {res, required: params});
        if (error_msg !== null) {
            return;
        }



        // await authz.has_access(req, res, 'user', body.user._id);

        //things that the user shouldn't be able to change directly
        if (body.dog){
            delete body.dog.dog_num;
        }




        //****check credentials against db******************************


        await helpers.update_db_record(body.dog, req.my_db.models['dog'], );
        res.send('update ran');
        return;

    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}





router.post('/updateOrder', updateOrder );
async function updateOrder(req, res) {
    try {
        let body = req.body;


        //********check param values************************************************
        let params = [ 'order'];
        let error_msg = helpers.check_params2(body, params, {res, required: params});
        if (error_msg !== null) {
            return;
        }


        params = ['_id', 'status'];
        error_msg = helpers.check_params2(body.order, params, {res, required: ['_id'] });
        if (error_msg !== null) {
            return;
        }





        await helpers.update_db_record(body.order, req.my_db.models['order'], );
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
 * Basically a copy/paste from /public/getDogProfileAdvanced with some minor modifications
 */
router.post('/getDogProfileAdvanced', getDogProfileAdvanced );
async function getDogProfileAdvanced(req, res) {
    try {
        let body = req.body;


        //********check param values************************************************
        let params = ['handler_name_first', 'handler_name_last', 'handler_city', 'handler_state',
            'dog_name', 'sds_num', 'date_range'];
        let error_msg = helpers.check_params2(body, params, {res, anyOneOf: params, required: ['date_range']} );
        if (error_msg !== null) {
            return;
        }


        //figure out which info has been passed in
        let dog_info = false;
        let handler_info = false;
        // let user_match = {};
        let dog_match = {};


        // *************** create match query for handler ********************************************

        // user_match.account_type = 'HANDLER';
        let user_match_and = [];


        if (typeof body.handler_name_first === 'string' && body.handler_name_first !== ''){
            // user_match.name_first =  {$regex: `.*${body.handler_name_first}.*`, $options: 'i' }; // any partial match
            // user_match.name_first =  {$regex: `^${body.handler_name_first}$`, $options: 'i' }; //exact case insensitive match

            user_match_and.push({ name_first: {$regex: `.*${body.handler_name_first}.*`, $options: 'i' } });
            handler_info = true;
        }

        if (typeof body.handler_name_last === 'string' && body.handler_name_last !== ''){
            // user_match.name_last =  {$regex: `.*${body.handler_name_last}.*`, $options: 'i' };
            // user_match.name_last =  {$regex: `^${body.handler_name_last}$`, $options: 'i' };


            user_match_and.push({ name_first: {$regex: `.*${body.handler_name_last}.*`, $options: 'i' } });
            handler_info = true;
        }




        if (typeof body.handler_city === 'string' && body.handler_city !== ''){
            user_match_and.push({$or:[
                    { "private_info.address.city": {$regex: `.*${body.handler_city}.*`, $options: 'i' },},
                    { "trainer_info_info.address.city": {$regex: `.*${body.handler_city}.*`, $options: 'i' },},

                ]});
            handler_info = true;
        }


        if (typeof body.handler_state === 'string' && body.handler_state !== ''){
            user_match_and.push({$or:[
                    { "private_info.address.state": {$regex: `.*${body.handler_state}.*`, $options: 'i' },},
                    { "trainer_info_info.address.state": {$regex: `.*${body.handler_state}.*`, $options: 'i' },},

                ]});
            handler_info = true;
        }


        let user_match = {$and : user_match_and};





        // *************** create match query for dogs********************************************
        if (typeof body.dog_name === 'string' && body.dog_name !== ''){
            dog_match.name =  {$regex: `.*${body.dog_name}.*`, $options: 'i' };
            // dog_match.name =  {$regex: `^${body.dog_name}$`, $options: 'i' };
            dog_info = true;
        }



        if (typeof body.sds_num === 'string' && body.sds_num !== ''){
            // dog_match.name =  {$regex: `.*${body.dog_name}.*`, $options: 'i' };
            body.sds_num = body.sds_num.toLowerCase();
            body.sds_num = body.sds_num.replace('sds', '')
            body.sds_num = body.sds_num.replace('-', '')

            dog_match.dog_num =  body.sds_num;
            dog_info = true;
        }


        let date_range = body.date_range;
        let date_start, date_stop;

        if (date_range != null){
            date_start = DateTime.fromISO(date_range.start).toJSDate();
            date_stop = DateTime.fromISO(date_range.stop).endOf('day').toJSDate();
            dog_match.date_updated = {$gte: date_start, $lte: date_stop};
        }

        if (dog_info || handler_info){
            //only want to consider date range if no other query parameters have been passed in
            delete dog_match.date_updated;

        }











        // user_match.date_updated = {$gte: date_start, $lte: date_stop};





        // if (typeof body.dog_name === 'string' && body.dog_name !== ''){
        //     dog_info = true;
        // }
        //
        // if (typeof body.sds_num === 'string' && body.sds_num !== ''){
        //     dog_info = true;
        // }
        //
        // if (typeof body.handler_name_first === 'string' && body.handler_name_first !== ''){
        //     handler_info = true;
        // }
        //
        // if (typeof body.handler_name_last === 'string' && body.handler_name_last !== ''){
        //     handler_info = true;
        // }

        let ans = null;
        let mld_dog = req.my_db.models['dog'];
        let mld_user = req.my_db.models['user'];

        //handle error case
        if (!dog_info && !handler_info){
            // res.status(400).send('No search terms sent');

            if (date_range == null){
                throw Error('must specify date_range if no other query parameter is provided')
            }

            ans = await mld_dog.collection.find({date_updated: {$gte: date_start, $lte: date_stop}}).toArray();
        }




        //********** Case 1: only dog info ********************************************************************************
        if (dog_info && !handler_info){


            //todo: clean input string to ensure that can't be used in a cross-scripting attack
            // let q = {
            //     "name" : {$regex: `.*${body.dog_name}.*`, $options: 'i' },
            //     handler_id: {$ne: null}
            // };



            ans = await mld_dog.collection.find(dog_match).toArray();



        }//if only dog



        //********** Case 2: handler and dog info*************************************************************************
        if (handler_info && ans == null){


            //todo: clean input string to ensure that can 't be used in a cross-scripting attack

            //
            // let user_match ={};
            // // user_match.account_type = 'HANDLER';
            //
            // if (typeof body.handler_name_first === 'string' && body.handler_name_first !== ''){
            //     user_match.name_first =  {$regex: `.*${body.handler_name_first}.*`, $options: 'i' }; // any partial match
            //     // user_match.name_first =  {$regex: `^${body.handler_name_first}$`, $options: 'i' }; //exact case insensitive match
            // }
            //
            // if (typeof body.handler_name_last === 'string' && body.handler_name_last !== ''){
            //     user_match.name_last =  {$regex: `.*${body.handler_name_last}.*`, $options: 'i' };
            //     // user_match.name_last =  {$regex: `^${body.handler_name_last}$`, $options: 'i' };
            // }
            //
            //
            // // create match query for dogs
            // let dog_match = {};
            // if (typeof body.dog_name === 'string' && body.dog_name !== ''){
            //     // dog_match.name =  {$regex: `.*${body.dog_name}.*`, $options: 'i' };
            //     dog_match.name =  {$regex: `^${body.dog_name}$`, $options: 'i' };
            // }
            //
            // if (typeof body.sds_num === 'string' && body.sds_num !== ''){
            //     // dog_match.name =  {$regex: `.*${body.dog_name}.*`, $options: 'i' };
            //     dog_match.dog_num =  body.sds_num
            // }


            // create aggregation pipeline
            let pipeline = [
                {"$match": user_match},

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
        let projection = {name_first: 1, name_last: 1, trainer_info:1, handler_info: 1, profile_image: 1, email: 1, account_type: 1};
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








router.post('/getFlagReports', getFlagReports);
async function getFlagReports (req, res) {

    try {
        let body = req.body;

        //********check param values************************************************
        let params = ['date_range', 'query',];
        let error_msg = helpers.check_params2(body, params, {res,  });
        if (error_msg !== null) {
            return;
        }

        params = ['name_first', 'name_last', 'dog_name', 'sds_number', 'status' ];
        error_msg = helpers.check_params2(body.query, params, {res, });
        if (error_msg !== null) {
            return;
        }




        let date_range = body.date_range;
        let query = body.query;





        let date_start = DateTime.fromISO(date_range.start).toJSDate();
        let date_stop = DateTime.fromISO(date_range.stop).endOf('day').toJSDate();

        let q = {};


        if (date_range.start != null && date_range.stop != null){
            q.date_created = {$gte: date_start, $lte: date_stop};
        }
        else{
            if (date_range.start != null){
                q.date_created = {$gte: date_start};
            }
            if (date_range.stop != null){
                q.date_created = {$lte: date_stop};
            }

        }



        // if (dog_name != null){
        //     q_order['items.details.dog_name'] = {$regex: `.*${dog_name}.*`, $options: 'i' };
        // }
        //
        // if (sds_number != null){
        //     q_order['items.details.dog_num'] = sds_number;
        // }
        //
        if (query && query.status != null){
            q.status = query.status;
        }

        let q_user = {};


        if (query && query.name_first != null){
            q_user.name_first = {$regex: `.*${query.name_first}.*`, $options: 'i' };
        }

        if (query && query.name_last != null){
            q_user.name_last = {$regex: `.*${query.name_last}.*`, $options: 'i' };
        }






        let projection = {
            name_first: 1, name_last: 1, email: 1, account_type: 1, account_visibility: 1,
            account_status: 1,  profile_image: 1, setup: 1,
            address: 1,phone: 1, trainer_info: 1, handler_info: 1,
        }

        let options = {
            allowDiskUse: false
        };


        let pipeline = [
            {"$match": q },
            { $sort : {date_created: -1} }, //note make this preceds the limit stage to be efficient. see
            // { $limit : n_results },         //  https://docs.mongodb.com/manual/reference/operator/aggregation/limit/
            {
                "$lookup": {
                    "from": "users",
                    "let": { "id": "$user_id"},
                    "pipeline": [
                        {"$match": {"$expr": {"$eq": ["$_id","$$id"] } } },
                        { "$match": q_user},
                        { "$project": projection }
                    ],
                    "as": "user_id_FR"
                }
            },
            {
                "$unwind": {
                    "path": "$user_id_FR",
                    "preserveNullAndEmptyArrays": false
                }
            }
        ];

        let ans = await req.my_db.models['flag_report'].collection.aggregate(pipeline, options).toArray();








        //
        //
        // let mld_flag = req.my_db.models['flag_report'];
        //
        // let options = {
        //     projection: {
        //         name_first: 1, name_last: 1, email: 1, account_type: 1, account_visibility: 1,
        //         account_status: 1,  profile_image: 1, setup: 1,
        //         address: 1,phone: 1, trainer_info: 1, handler_info: 1,
        //     }};
        //
        //
        //
        //
        // let ans = await mld_flag.collection.find({}).toArray();

        //
        // let projection = {
        //     name_first: 1, name_last: 1, email: 1, trainer_info:1, "account_status.date_expiry": 1, handler_info: 1,
        //     account_type: 1,
        // }
        // await helpers.add_foreign_key_objects(ans, mld_flag.schema, ['user_id'], req.my_db, {projection});

        res.send(ans);


    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}

router.post('/updateFlag', updateFlag);
async function updateFlag (req, res) {

    try {
        let body = req.body;

        //********check param values************************************************
        let params = ['flag'];
        let error_msg = helpers.check_params2(body, params, {res, required: params, });
        if (error_msg !== null) {
            return;
        }

        let mld_flag = req.my_db.models['flag_report'];


        delete body.flag.user_id_FR;
        await helpers.update_db_record(body.flag, mld_flag);

        res.send('updated');


    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}








module.exports = router;