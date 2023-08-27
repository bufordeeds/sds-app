"use strict";
var express = require('express')
var router = express.Router()
// const crypto = require('crypto');
// const jwt = require('jsonwebtoken');
// const fs = require('fs');


const helpers = require('../../db/helpers.js');
const u_helpers = require('../../utilities/helpers.js');
// const authz = require('../utilities/authorization.js');

// const bodyParser = require('body-parser');
// const axios = require('axios');
// const auth_helpers = require('../handlers/auth');
// const stripe = require('stripe')(process.env.STRIPE_SECRET);


const {DateTime} = require('luxon');
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const Emailer =require('../../utilities/emails/Emailer');
const emailer = new Emailer();
module.exports = router;



router.post('/updates',  updates);
async function updates (req, res) {
    try {
        let body = req.body;

        console.log('\n\n\n\n')
        console.log('****************************EasyPost webhook********************************************')
        console.log(body)
        console.log('**************************************************************************************')
        console.log('\n\n\n\n')


        let ship_id = _.get(body, 'result.shipment_id');
        let filter = {
            'easypost.shipment.id': ship_id
        };


        let update = {
           'easypost.tracker': body.result,
        }


        //add status from tracker
        let ep_status = _.get(body, 'result.status');
        let status_map = {
            'in_transit': 'InTransit',
            'out_for_delivery': 'OutForDelivery',
            'delivered': 'Delivered',
        };
        let status = status_map[ep_status];
        if (status != null){
            update.status = status;
        }


        await helpers.update_db_record(update, req.my_db.models['order'], {filter});

        res.send('Got it, thanks');

    } catch (err) {

        res.log.error(err);
        res.status(500);
        // res.send(err.message)
        res.send('There was an internal server error');

    }
}




