"use strict";
var express = require('express')
var router = express.Router()
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const fs = require('fs');


const helpers = require('../../db/helpers.js');
const u_helpers = require('../../utilities/helpers.js');
const authz = require('../../utilities/authorization.js');

const {DateTime} = require('luxon');
const _ = require('lodash');



const axios = require('axios');
const auth_helpers = require('./auth');
const {ObjectId} = require('mongodb');

const store = require('../store_common.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const EasyPost = require('@easypost/api');
const easypost = new EasyPost(process.env.EASYPOST_API_KEY);


// const paymentIntent = await stripe.paymentIntents.create({
//    amount: 1000,
//    currency: 'usd',
//    payment_method_types: ['card'],
//    receipt_email: 'jenny.rosen@example.com',
// });




//require authentication for these routes
const auth_middleware = require('../../middleware/authentication');
router.use(auth_middleware.DECODE_TOKEN_ONLY);




//test




// https://stripe.com/docs/api/checkout/sessions/list


/**
 * helper function which gets a user's cart based on whether they're logged in or not
 * @param req
 * @returns {Promise<void>}
 */
async function  getActiveCartHelper(req){
   let user_id = null;
   if (req.decoded_token){
      user_id = req.decoded_token.user_id;
      user_id = ObjectId(user_id);
   }

   let sds_guid = req.headers.sds_guid;

   let q;
   if (req.decoded_token){
      q = {user_id, isActive: true };
   }else{
      q = {sds_guid, isActive: true };

   }

   let mld_cart = req.my_db.models['cart'];
   let cart = await mld_cart.collection.findOne(q);
   return {cart, user_id, sds_guid};
}



/**
 * updates setup properties, intended to be called by frontend while user is progressing through the onboarding stepper
 */
router.post('/test', test );
async function test(req, res) {
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




      // using dot notation to only update desired nested fields which doesn't pass json-schema validator
      let validationParams = {required: [], additionalProperties: true};
      await helpers.update_db_record(update, mld_user, {validationParams});
      res.send('test');
      return;

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/createCheckoutSession', createCheckoutSession);
async function createCheckoutSession (req, res) {
   try {
      let body = req.body;

      let tax_rate = process.env.STRIPE_TAX_RATE_IL;

      //********check param values************************************************
      let params = ['cart_id', 'email', 'address', 'name'];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) {
         return;
      }


      let cart = await req.my_db.models['cart'].collection.findOne({_id: ObjectId(body.cart_id)});


      let line_items = [];

      for (let item of cart.items){
         line_items.push({
            price_data: {
               currency: 'usd',
               product_data: {
                  name: item.description,
               },
               unit_amount: item.price*100, //stripe deals with units of cents
            },
            quantity: item.number,
            tax_rates: [tax_rate],

         },)
      }


      //add shipping
      line_items.push({
         price_data: {
            currency: 'usd',
            product_data: {
               name: 'Shipping & Handling',
            },
            unit_amount: Number(cart.easypost.rate_selected.rate)*100,
         },
         quantity: 1,

      })


      let id = cart.stripe_session_id;


      const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items,
         mode: 'payment',
         // shipping_rates: ["shr_1IktHgKUDP5ukRlKJPcDkd1J"],
         client_reference_id: 'cart_' + body.cart_id,
         customer_email: body.email,
         success_url: process.env.WEB_APP_BASE_URL + '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
         cancel_url : process.env.WEB_APP_BASE_URL + '/checkout?session_id={CHECKOUT_SESSION_ID}',
      });

      let cart_update = {
         _id: ObjectId(body.cart_id),
         stripe_session_id: session.id,
         customer_info:{
            email: body.email,
            name: body.name,
            address: body.address,

         }
         // 'easypost.rate_selected':
      }

      let validationParams = {required: []};
      await helpers.update_db_record(cart_update, req.my_db.models['cart'], {validationParams});

      console.log('session', session)
      res.send({id: session.id});


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}




router.post('/createCheckoutSessionDonation', createCheckoutSessionDonation);
async function createCheckoutSessionDonation (req, res) {
   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['donation_amount',  'user_id', 'back_url'];
      let error_msg = helpers.check_params2(body, params, {required: ['donation_amount', 'back_url'], res});
      if (error_msg !== null) {
         return;
      }


      let user_id = _.get(body, 'user_id', 'guest');
      let email =  _.get(req, 'decoded_token.email', undefined);


      let line_items = [{
         price_data: {
            currency: 'usd',
            product_data: {
               name: 'Donation - Thank you',
            },
            unit_amount: Number(body.donation_amount)*100,
         },
         quantity: 1,
      }];




      const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         line_items,
         client_reference_id: 'userid_' + user_id,
         mode: 'payment',
         customer_email: email,
         success_url: process.env.WEB_APP_BASE_URL + '/donate/success?session_id={CHECKOUT_SESSION_ID}',
         cancel_url : process.env.WEB_APP_BASE_URL + body.back_url + '?session_id={CHECKOUT_SESSION_ID}',
      });


      console.log('session', session)

      res.send({id: session.id});


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}




router.post('/getStripeSession', getStripeSession);
async function getStripeSession (req, res) {

   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['stripe_session_id',];
      let error_msg = helpers.check_params2(body, params, {required: params});
      if (error_msg !== null) {
         res.status(400);
         res.send('Check Parameters');
         return;
      }


      // let session = await stripe.checkout.sessions.retrieve(body.stripe_session_id);

      let session = await stripe.checkout.sessions.list({
         limit: 100, //max limit is 100
      });


      res.json(session);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }


}













//******************* end points related to cart stuff ******************************************************



router.post('/updateCartItems', updateCartItems);
async function updateCartItems (req, res) {

   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['items'];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) {
         return;
      }


      // let user_id = null;
      // if (req.decoded_token){
      //    user_id = req.decoded_token.user_id;
      //    user_id = ObjectId(user_id);
      // }
      //
      // let sds_guid = req.headers.sds_guid;



      //******* map fields from payload to db schema ***************
      let items =[];
      for (let item of body.items){
         // let tmp = {
         //    name: item.name,
         //    item_key: item.item_key,
         //    description: item.description,
         //    details: item.item_details,
         // };

         if (item.details.user_id){
            item.details.user_id = ObjectId(item.details.user_id);
         }
         if (item.details.dog_id){
            item.details.dog_id = ObjectId(item.details.dog_id);
         }

         items.push(item);
      }



      //******check if user has active cart*********************************
      let mld_cart = req.my_db.models['cart'];
      // let q;
      // if (req.decoded_token){
      //    q = {user_id, isActive: true };
      // }else{
      //    q = {sds_guid, isActive: true };
      // }
      // let cart = await mld_cart.collection.findOne(q);


      let {user_id, sds_guid, cart} = await getActiveCartHelper(req);

      // let cart = await mld_cart.collection.findOne({user_id, isActive: true });

      let update;
      let newCart = false;
      let validationParams = {};

      if (cart == null){
         newCart = true;
         update = {
            user_id,
            sds_guid,
            items,
            status: 'Active',
            isActive: true
         }

      }
      else{
         validationParams = {required: [], additionalProperties: false};
         update = {
            _id: cart._id,
            items,

         }
      }


      let c2 = await helpers.update_db_record(update, mld_cart, {validationParams});

      if (newCart){
         res.send({newCart, cart:c2});
      }
      else{
         res.send({newCart, cart: null});
      }





   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/updateCartShipping', updateCartShipping);
async function updateCartShipping (req, res) {

   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['rate_selected', 'cart_id'];
      let error_msg = helpers.check_params2(body, params, {required: ['rate_selected'], res});
      if (error_msg !== null) {
         return;
      }

      // let user_id = req.decoded_token.user_id;
      // user_id = ObjectId(user_id);

      //check if user has active cart
      let mld_cart = req.my_db.models['cart'];
      // let cart = await mld_cart.collection.findOne({user_id, isActive: true });

      let {cart} = await getActiveCartHelper(req);

      if (cart == null){
         req.status(404).send('No cart found');
         return;
      }



      let validationParams = {required: [], additionalProperties: true};
      let update = {
         _id: cart._id,
         'easypost.rate_selected': body.rate_selected,
      }

      let c2 = await helpers.update_db_record(update, mld_cart, {validationParams});
      res.send('updated');

   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}













// async function closeCartAndCreateOrderHelper (stripe_session_id, {req, res}) {
//
//    let body = req.body;
//
//
//    //*************Close Cart*****************************
//    let mld_cart = req.my_db.models['cart'];
//    let cart = await mld_cart.collection.findOne({stripe_session_id});
//
//
//    if (cart.isActive){
//       let validationParams = {required: [], additionalProperties: false};
//       let update = {
//          _id: cart._id,
//          isActive: false,
//          status: 'Purchased'
//       }
//
//       let c2 = await helpers.update_db_record(update, mld_cart, {validationParams});
//    }
//
//
//    //*************create order*****************************
//    let mld_order = req.my_db.models['order'];
//    let order = await mld_order.collection.findOne({stripe_session_id});
//
//
//
//
// }//closeCartAndCreateOrderHelper()



router.post('/closeCartAndCreateOrder', closeCartAndCreateOrder);
async function closeCartAndCreateOrder (req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['stripe_session_id',];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) {
         return;
      }
      //
      // let user_id = null;
      // if (req.decoded_token){
      //    user_id = req.decoded_token.user_id;
      //    user_id = ObjectId(user_id);
      // }
      //
      //




      //*************create order*****************************
      let stripe_session =  await stripe.checkout.sessions.retrieve(body.stripe_session_id);


      let order;
      let donation;
      if(stripe_session.client_reference_id != null && stripe_session.client_reference_id.includes('cart')){

         //*************Close Cart*****************************
         let mld_cart = req.my_db.models['cart'];

         let cart = await mld_cart.collection.findOne({stripe_session_id: body.stripe_session_id});

         let validationParams = {required: [], additionalProperties: false};

         let update = {
            _id: cart._id,
            isActive: false,
            status: 'Purchased'
         }

         let c2 = await helpers.update_db_record(update, mld_cart, {validationParams});

         order = await store.create_order({cart, stripe_session, my_db: req.my_db});
         res.send({msg: 'order_created', order})
      }


      else if (stripe_session.client_reference_id != null && stripe_session.client_reference_id.includes('userid')){

         let tmp = stripe_session.client_reference_id.split('_');
         let id = tmp[1];

         if (id !== 'guest'){
            let user = await req.my_db.models['user'].collection.findOne({_id: ObjectId(id)});

            donation = await store.create_donation({ stripe_session: stripe_session, my_db: req.my_db, user});
            res.send({msg: 'donation_created', donation})
         }
         else{
            res.send({msg: 'donation_created', donation: null});
         }

      }







   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



router.post('/getActiveCart', getActiveCart);
async function getActiveCart (req, res) {

   try {
      let body = req.body;

      //********check param values************************************************
      let params = [];
      let error_msg = helpers.check_params2(body, params, { res});
      if (error_msg !== null) {
         return;
      }

      // let user_id = null;
      // if (req.decoded_token){
      //    user_id = req.decoded_token.user_id;
      //    user_id = ObjectId(user_id);
      // }
      //
      // let sds_guid = req.headers.sds_guid;
      //
      // let q;
      // if (req.decoded_token){
      //    q = {user_id, isActive: true };
      // }else{
      //    q = {sds_guid, isActive: true };
      //
      // }
      //
      // let mld_cart = req.my_db.models['cart'];
      // let cart = await mld_cart.collection.findOne(q);


      let {cart} = await getActiveCartHelper(req);

      res.send(cart);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





router.post('/getMyOrders', getMyOrders);
async function getMyOrders (req, res) {

   try {
      let body = req.body;

      //********check param values************************************************
      let params = [];
      let error_msg = helpers.check_params2(body, params, { res});
      if (error_msg !== null) {
         return;
      }

      let user_id = req.decoded_token.user_id;
      user_id = ObjectId(user_id);

      //check if user has active cart
      let orders = await req.my_db.models['order'].collection.find({user_id }, {sort: {date_ordered: -1}}).toArray();

      res.send(orders);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





//*********************************************************************************************************************
//                                   easypost related stuff                                                           *
//*********************************************************************************************************************



router.post('/verifyAddress', verifyAddress);
async function verifyAddress (req, res) {

   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['address'];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) { return; }

      params = ['name', 'street1', 'street2', 'city', 'state', 'zip'];
      error_msg = helpers.check_params2(body.address, params, {required: ['street1',  'city', 'state', 'zip'], res});
      if (error_msg !== null) { return; }

      let user_id = req.decoded_token.user_id;
      user_id = ObjectId(user_id);

      let address = body.address;

      const addressVerify = new easypost.Address({
         verify: ['delivery'],
         name: address.name,
         street1: address.street1,
         street2: address.street2,
         city: address.city,
         state: address.state,
         zip: address.zip,
      });

      await addressVerify.save();

      //check if user has active cart
      // let orders = await req.my_db.models['order'].collection.find({user_id }, {sort: {date_ordered: 1}}).toArray();

      res.send(addressVerify);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}


/**
 * creates a shipping label record in easypost and returns the easypost object
 */
router.post('/createShippingLabel', createShippingLabel);
async function createShippingLabel (req, res) {

   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['address'];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) { return; }

      params = ['name', 'street1', 'street2', 'city', 'state', 'zip'];
      error_msg = helpers.check_params2(body.address, params, { res});
      if (error_msg !== null) { return; }




      let address = body.address;

      const toAddress = new easypost.Address({
         verify: ['delivery'],
         name: address.name,
         street1: address.street1,
         street2: address.street2,
         city: address.city,
         state: address.state,
         zip: address.zip,
      });
      await toAddress.save();

      let sds_info = await req.my_db.models['sds_info'].collection.findOne({req_name: 'SDS_COMPANY_INFO'});
      let sds_address = sds_info.address_ship_from;

      let from_ep_id = sds_address.easypost_id;


      if (from_ep_id == undefined) {
         const fromAddress = new easypost.Address({
            verify: ['delivery'],
            name: sds_address.name,
            street1: sds_address.street1,
            city: sds_address.city,
            state: sds_address.state,
            zip: sds_address.zip,
            country: 'US',
         });
         await fromAddress.save();
         let update= {
            _id: sds_info._id,
            'address_ship_from.easypost_id': fromAddress.id,
         }
         let validationParams = {required: [], additionalProperties: true};
         await helpers.update_db_record(update,  req.my_db.models['sds_info'], {validationParams})
         from_ep_id = fromAddress.id;
      }


      const parcel = new easypost.Parcel({
         // length: 9,
         // width: 6,
         // height: 2,
         // predefined_package: 'FlatRateCardboardEnvelope',
         predefined_package: 'Flat',
         weight: 10, //in oz
      });

      await parcel.save();
      // console.log(parcel);


      const shipment = new easypost.Shipment({
         to_address: toAddress,
         from_address: from_ep_id,
         parcel: parcel
      });

      await shipment.save();
      console.log(shipment);
      let lowestRate = shipment.lowestRate(['USPS'], );


      let mld_cart = req.my_db.models['cart'];
      // let cart = await mld_cart.collection.findOne({user_id, isActive: true });
      let {cart} = await getActiveCartHelper(req);


      let cart_update = {
         _id: cart._id,
         easypost: {
            shipment,
         },
      }



      //only allow first class or priority
      let rates = [];

      for (let r of shipment.rates){
         if (['first', 'priority'].includes(r.service.toLowerCase())){
            rates.push(r);
         }
      }


          //note this sorts values in the shipment object
      rates.sort((a, b) => {
         return Number(a.rate) < Number(b.rate)? -1: 1;
      });





      //update cart with shipping info
      let validationParams = {required: [], additionalProperties: true};
      await helpers.update_db_record(cart_update, mld_cart, {validationParams});


      //todo: reduce info sent to client to bare min required
      res.send({rate_selected: lowestRate, toAddress, rates });


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}












/**
 * creates a shipping label record in easypost and returns the easypost object
 */
router.post('/getItems', getItems);
async function getItems (req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = [];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) { return; }



      let mld_item = req.my_db.models['item'];

      let items0 = await mld_item.collection.find().toArray();

      let items = {};
      for (let item of items0){
         items[item.item_key] = item;
      }


      res.send(items);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}

router.post('/getItem', getItem);
async function getItem (req, res) {
   try {
      let body = req.body;

      //********check param values************************************************
      let params = ['item_key'];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) { return; }


      let mld_item = req.my_db.models['item'];

      let item = await mld_item.collection.findOne({item_key: body.item_key});

      res.send(item);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}



































router.post('/test_get_payment', test_get_payment);
async function test_get_payment (req, res) {

   try {
      let body = req.body;

      //********check param values************************************************
      let params = [];
      let error_msg = helpers.check_params2(body, params, { res});
      if (error_msg !== null) {
         return;
      }




      const paymentMethod = await stripe.paymentIntents.retrieve(
          'pi_1HsetsKUDP5ukRlKCz5eUITp'
      );


      res.send(paymentMethod);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}























router.post('/template', tmp_fn);
async function tmp_fn (req, res) {

   try {
      let body = req.body;


      //********check param values************************************************
      let params = ['stripe_session_id',];
      let error_msg = helpers.check_params2(body, params, {required: params, res});
      if (error_msg !== null) {
         return;
      }





      res.send(session);


   } catch (err) {

      res.log.error(err);
      res.status(500);
      // res.send(err.message)
      res.send('There was an internal server error');

   }
}





module.exports = router;









