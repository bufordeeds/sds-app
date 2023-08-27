"use strict";
var express = require('express')
var router = express.Router()
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const fs = require('fs');


const helpers = require('../../db/helpers.js');
const u_helpers = require('../../utilities/helpers.js');
// const authz = require('../utilities/authorization.js');

const {DateTime} = require('luxon');
const _ = require('lodash');

const bodyParser = require('body-parser');

const axios = require('axios');
// const auth_helpers = require('../handlers/auth');
const {ObjectId} = require('mongodb');


const stripe = require('stripe')(process.env.STRIPE_SECRET);


const Emailer =require('../../utilities/emails/Emailer');
const emailer = new Emailer();
const store = require('../store_common');

module.exports = router;



router.post('/checkout', bodyParser.raw({type: 'application/json'}), checkout);
async function checkout (req, res) {
    try {
        let body = req.body;
        const sig = req.headers['stripe-signature'];



        let event;
        let stripe_session
        try {
            let endpointSecret = process.env.STRIPE_WEBHOOK_SIGN_CHECKOUT;
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            stripe_session = event.data.object;
        }
        catch (err) {
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        console.log('\n\n\n\n')
        console.log('****************************wh_stripe webhook********************************************')
        console.log(event)
        console.log('*****************************************************************************************')
        console.log('\n\n\n\n')




        //close the cart (if it hasn't already been closed




        //check if there's an associated shopping cart
        // assume that normal order has client_reference_id = cart_id

        if(stripe_session.client_reference_id != null && stripe_session.client_reference_id.includes('cart')){
            let mld_cart = req.my_db.models['cart'];
            let cart = await mld_cart.collection.findOne({stripe_session_id: stripe_session.id});
            await store.create_order({cart, stripe_session, my_db: req.my_db});
        }
        else if (stripe_session.client_reference_id != null && stripe_session.client_reference_id.includes('userid')){

            let tmp = stripe_session.client_reference_id.split('_');
            let id = tmp[1];


            let user = null;
            if (id !== 'guest'){
                user = await req.my_db.models['user'].collection.findOne({_id: ObjectId(id)});
            }

            //note if user is null, then assumes user is a guest
            await store.create_donation({ stripe_session, my_db: req.my_db, user});

        }









        res.send('got it')

    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}




