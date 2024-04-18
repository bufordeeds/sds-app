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
const auth_helpers = require('../public/auth');
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




//decode token if it exists
const auth_middleware = require('../../middleware/authentication');
router.use(auth_middleware.decodeTokenOnly);

















module.exports = router;