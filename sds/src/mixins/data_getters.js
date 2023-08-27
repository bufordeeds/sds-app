'use strict';
import axios from 'axios';
import _ from "lodash";









/**
 * flattens an error object and exacts any keys
 * @param err        : error object
 * @param searchKeys : array of strings to match flattened keys against
 * @param getArray  : bool, if true then an array is returned, else an object with the flattened keys is returned
 */
function parseError(err, {searchKeys=['message'], getOneStr=false} = {}){


   // err = JSON.parse(JSON.stringify(err));

   try{
      let err2 = {};


      //note need this as otherwise won't get all of the error object's keys
      let keys = Object.getOwnPropertyNames(err);
      keys.forEach(x => {
         err2[x] = err[x];
      });


      let tmp = flat.flatten(err2);
      keys = Object.keys(tmp);
      let ans = {};


      console.log('flattened error', tmp)
      for (let k of keys){
         if (searchKeys.some(v => k.toLowerCase().includes(v))) {
            ans[k] = tmp[k];
         }
      }

      let ans2  = {full_error: err = JSON.parse(JSON.stringify(err2)) };
      if (getOneStr){
         let vals = Object.values(ans);
         ans2.ans =  vals.join('; ');

      }
      else{
         ans2.ans =  ans;
      }

      return ans2;
   }
   catch(error2){
      console.log('parseError(): had error', error2)
      console.log('parseError(): original', err)
      throw error2;

   }

}




class RequestError {
   constructor(message = '', {response={}, error=null} = {}) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor


      // Maintains proper stack trace for where our error was thrown (only available on V8)
      // if (Error.captureStackTrace) {
      //    Error.captureStackTrace(this, RequestError)
      // }

      // if (typeof Error.captureStackTrace === 'function') {
      //    Error.captureStackTrace(this, this.constructor);
      // } else {
      //    this.stack = (new Error(message)).stack;
      // }



      // if (error !== null)
      //    this.stack = (new Error(message)).stack;
      // else
      //    this.stack = error.stack;


      if (error === null)
         error = new Error(message);

      this.stack = error.stack;
      this.message = message;
      this.name = 'RequestError';
      this.response = response;
      this.status = response.status;
      this.statusText = response.statusText;

      // this.parsedError = parseError(error);



      // this.message = message;
      // this.stack


   }

   toString(){
      let ans = '';
      ans += this.message + '\n';
      ans += this.stack;

      return ans;
   }
}


export default {
   data() {
      return {
         dialog_show_error: false,
         show_error_obj: null,

         RequestError: RequestError,

      };
   },

   watch: {
      show_error_obj(newVal, oldVal){
         if ( newVal !== null){

            this.dialog_show_error = true;
         }

      },

      dialog_show_error(newVal, oldVal){
         if (newVal === false && oldVal === true){
            this.show_error_obj = null;
         }
      }
   },


   methods: {
      /**
       * Intended to be used an
       * @param error - error object,
       *
       * @returns
       */
      show_error_details(error, info=''){

         let error2 = {};

         try{
            let msg = error.message;
            if (error.response !== undefined){
               if (error.response.data !== undefined){
                  if (error.response.data.message !== undefined){
                     msg = error.response.data.message;
                  }
                  else{
                     msg = error.response.data;
                  }
               }
            }

            let keys = Object.getOwnPropertyNames(error);
            keys.forEach(x => {
               error2[x] = error[x];
            });

            this.show_error_obj = {
               URL: window.location.href,
               CONTEXT_INFO: info,
               ERROR: error2,
               // USER: this.$auth.profile,
               USER: {},
               msg: msg,
            };

            console.error('Error Message: ', msg);
            console.error('Full Error Object: ', error2 );

            return 'An error occurred: ' + msg;
         }
         catch (e) {
            console.error('Had an error while trying to process another error.');
            console.log('Original Error: ', error2.message);
            console.log('Second Error: ', e);
         }
      },




      /**
       * Simple wrapper around axios which handles http response codes in a not retarded way.  Namely it doesn't
       * throw a runtime error on a response code other than 200.
       * @param url     : url fragment after base url, should be formatted as '/relative/path'
       * @param payload : object, the payload of a POST call
       * @param headers : object, the headers for the request.  Note that Authorization is automatically added
       * @param type    : GET | POST
       * @param url_base: str, the base url.  if none, the default is read from the appropriate .env file
       * @param authenticate : bool, if true attaches auth token, default is to attach if logged in
       * @param throwHTTPError : bool.  If true then an error is thrown if http response isn't 200
       * @param responseType :
       * @param getRawResponse : bool, if true then return the raw axios response object.
       * @returns {Promise}
       */
      async make_request(url, payload={}, {headers={}, type='POST', url_base, authenticate=true,
         throwHTTPError=true, responseType, getRawResponse=false}={}){


         if (authenticate && this.$auth.isAuthenticated()){
            const token = await this.$auth.token;
            headers.authorization = `Bearer ${token}` ;   // send the access token through the 'Authorization' header
         }

         headers.sds_guid= this.$auth.sds_guid;

         // console.log('debug')

         if (url_base === undefined){
            url_base = process.env.VUE_APP_BASE_URL_API;
         }

         let path = url_base + url;


         let params = {};

         if (url == undefined){
            throw new RequestError('url not defined', {error: new Error()} )
            // throw new Error('url not defined');
         }



         let axiosInstance = axios.create({
            validateStatus: function (status) {
               return status >= 200 && status <= 503;
            },
         });

         let res;
         try{
            if (type ==='POST'){
               res = await axiosInstance.post(path, payload, {headers, params, responseType });
            }
            else if (type ==='GET'){
               res = await axiosInstance.get(path, {headers, params, responseType});
            }
            else{
               throw Error(`type=${type} not recognized`)
            }

         }catch (err) {
            throw new RequestError(err.message, {error:err} )
         }




         if (getRawResponse){
            return res;
         }


         if (res.status === 200 || !throwHTTPError){
            let ans = res.data
            if (ans === '') ans = null;// if db returns null, get's converted to '' due to json encoding
            return ans;
         }
         else {
            let msg = res.status.toString() + ': ';
            if (typeof res.data === 'string')
               msg += res.data;
            else
               msg += res.statusText;

            throw new RequestError(msg, {response: res} )


         }



      },


      parseError: parseError,


      //***************Main data getter functions******************************************************* */


      // async add_item_to_cart(item, {path= '/cart'}={}){
      //
      //    console.log({item})
      //
      //    let items  = _.cloneDeep( this.$store.state.cart.items)
      //
      //    items.push(item);
      //
      //    let res = await this.make_request('/store/updateCartItems', {items});
      //
      //    if (res.newCart){
      //       //copy new cart with _id property over
      //       this.$store.commit('set_cart', res.cart);
      //    }else{
      //       this.$store.commit('add_cart_item', item);
      //    }
      //
      //    await this.$router.push({path});
      //
      //
      // },
      //
      //
      // /**
      //  *
      //  * @param address = {street1, street2, city, state, zip}
      //  * @returns
      //  */
      // async verify_address(address){
      //
      //
      //    try{
      //
      //       let data =  await this.make_request('/store/verifyAddress', {address});
      //
      //       let success = data.verifications.delivery.success;
      //       console.log({data})
      //
      //
      //       let suggestion =null, error_msg=null;
      //       if (success){
      //          suggestion = {
      //             street1: data.street1,
      //             street2: data.street2,
      //             city: data.city,
      //             state: data.state,
      //             zip: data.zip
      //          }
      //       }
      //       else{
      //          error_msg = '';
      //          for (let e of data.verifications.delivery.errors){
      //             if (error_msg != ''){
      //                error_msg += ', '
      //             }
      //             error_msg += e.message;
      //
      //          }
      //       }
      //
      //
      //
      //       return {
      //          suggestion, success, error_msg,
      //
      //       }
      //
      //    }catch (e) {
      //       console.error(e)
      //    }
      // }









   }//methods


};// export
