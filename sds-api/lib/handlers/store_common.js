
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const helpers = require('../db/helpers');
const Emailer = require('../utilities/emails/Emailer');
const emailer = new Emailer();
const {DateTime} = require('luxon');
const {ObjectId} = require('mongodb');
const _ = require('lodash');









/**
 * Helper function that creates a new order after a customer pays.  Designed to be called both from the frontend call
 * that happens after the user is redirected back to SDS from stripe, and also to be called from stripe webhook that
 * get's called when stripe calls it after the payment is processed.
 *
 * Checks to see if an order has been created, before executing so that duplicates are not created.
 *
 * @param cart         : object, cart object from db
 * @param strip_session: object, stripe checkout session object, passed in via strip's webhook or can be pulled
 *                          manually from stripe's api
 * @param my_db        : my_db object attached to req object in handler.
 * @returns {Promise<void>}
 */
module.exports.create_order = async function ({cart, stripe_session, my_db}){


    let mld_cart = my_db.models['cart'];
    // let cart = await mld_cart.collection.findOne({_id: cart_id});


    let email = cart.customer_info.email

    //*************Close Cart*****************************
    //close the cart (if it hasn't already been closed)
    if (cart.isActive){
        let validationParams = {required: [], additionalProperties: false};
        let update = {
            _id: cart._id,
            isActive: false,
            status: 'Purchased'
        }

        let c2 = await helpers.update_db_record(update, mld_cart, {validationParams});
    }


    //*************create order*****************************
    //***check if order already exists********
    let mld_order = my_db.models['order'];
    let order0 = await mld_order.collection.findOne({'stripe_info.checkout_session.id': stripe_session.id});
    if (order0 !== null){
        return order0;
    }

    const payment_intent = await stripe.paymentIntents.retrieve(
        stripe_session.payment_intent
    );



    let order = {
        user_id :  cart.user_id,
        cart_id :  cart._id,
        customer_info:{
            name: cart.customer_info.name,
            email: cart.customer_info.email,
            address:cart.customer_info.address,
        },

        status: 'Received',
        items: cart.items,
        order_total: stripe_session.amount_total/100, //note that stripe reports numbers in cents

        date_ordered: DateTime.fromMillis(payment_intent.created*1000).toJSDate(),
        //value in seconds
        stripe_info: {
            checkout_session: stripe_session,
            payment_intent: payment_intent,
        },

        easypost: cart.easypost,

    };

    let o2 = await helpers.update_db_record(order, mld_order, {});


    //update dog records

    //todo: need to change this logic
    let mld_dog = my_db.models['dog'];
    for (let item of order.items){
        if (item.item_key === 'sds_full_kit' && _.get(item, 'details.dog_id', null)!==null){
            let dog = await mld_dog.collection.findOne({_id: ObjectId(item.details.dog_id)});
            if (dog.registration_kit == null){
                let update = {
                    _id: dog._id,
                    registration_kit: {
                        order_id: o2._id,
                        kit_info: item,
                    }
                }

                let validationParams = {required: []};
                await helpers.update_db_record(update, mld_dog, {validationParams});
            }
        }

    }



    //create email
    let user = await my_db.models['user'].collection.findOne({_id: ObjectId(order.user_id)});
    emailer.send_order_confirmation({to: email, order: o2, user}).then(()=>{});

    return o2;
}






module.exports.create_donation = async function ({stripe_session, my_db, user}={}){


    //*************create order*****************************
    //***check if order already exists********
    let mld = my_db.models['donation'];
    let order0 = await mld.collection.findOne({'stripe_info.checkout_session.id': stripe_session.id});
    if (order0 !== null){
        return order0;
    }

    const payment_intent = await stripe.paymentIntents.retrieve(
        stripe_session.payment_intent
    );


    let email = stripe_session.customer_details.email;

    let donation = {
        user_id :  _.get(user, '_id', null),
        user_email: email,


        amount: stripe_session.amount_total/100, //note that stripe reports numbers in cents

        date: DateTime.fromMillis(payment_intent.created*1000).toJSDate(),


        stripe_info: {
            checkout_session: stripe_session,
            payment_intent: payment_intent,
        },



    };

    let o2 = await helpers.update_db_record(donation, mld, {});






    //create email

    // let email = user.email;
    //
    // if (email == null){
    //     let q = {
    //         _id: ObjectId(user.user_id),
    //     }
    //     let user2 = await my_db.models['user'].collection.findOne(q);
    //     email  = user2.email;
    // }



    await emailer.send_donation_confirmation({to: email, donation});

    return o2;
}