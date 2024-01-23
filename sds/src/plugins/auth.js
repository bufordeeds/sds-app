//taken from https://auth0.com/docs/quickstart/spa/vuejs

import Vue from "vue";
import router from "../router";
import axios from 'axios';
import jwt from 'jsonwebtoken';
import {DateTime} from 'luxon';

import data_getters from '@/mixins/data_getters';

/** Define a default action to perform after authentication */
const DEFAULT_REDIRECT_CALLBACK = () =>
   window.history.replaceState({}, document.title, window.location.pathname);



//taken from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
   var name = cname + "=";
   var decodedCookie = decodeURIComponent(document.cookie);
   var ca = decodedCookie.split(';');
   for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
         c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
         return c.substring(name.length, c.length);
      }
   }
   return null;
}






let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/** Creates an instance of the Auth0 SDK. If one has already been created, it returns that instance */
export const createInstance = ({onRedirectCallback = DEFAULT_REDIRECT_CALLBACK, redirectUri = window.location.origin, ...options }) => {

   if (instance) return instance;

   // The 'instance' is simply a Vue object
   instance = new Vue({
      // mixins: [data_getters],
      data() {
         return {
            loading: true,
            authenticated: false,
            profile: {},
            token: null,
            popupOpen: false,
            error: null,

            requested_url: null,

            api_url_well_known: process.env.VUE_APP_BASE_URL_API + '/auth/well-known/public.rsa',
            api_url_get_id: process.env.VUE_APP_BASE_URL_API + '/public/getSdsId',

            sds_guid: null, //used to id non-logged in users_del (and still be able to save their cart items)

         };
      },
      /** Use this lifecycle method to instantiate the SDK client */
      async created() {

         try {

            await this.set_anonymous_id();
            console.log('auth ran');

         } catch (e) {
            this.error = e;

         } finally {
            this.loading = false;
         }
      },



      methods: {



         isAuthenticated(){
            return this.authenticated;
         },

         cache_url(url){
            this.requested_url = url;
         },


         /**
          * saves a session token to a local cookie.  also verifies the token against the public key
          *
          * will throw an error if the verification of the jwt fails
          *
          * @param token        : str, the jwt token received from the server
          * @returns {boolean}
          */
         async save_session_token(token){

            let pubKey = await axios.get(this.api_url_well_known);
            pubKey = pubKey.data;

            // could just decode, seeing as verification doesn't really do anything from a security perspective here.
            let decoded = jwt.verify(token, pubKey); //note this will throw an error if verification fails
            this.authenticated = true;
            this.profile = decoded;
            this.token = token; //save token in memory

            console.log(decoded)

            //save token to a cookie
            var d = new Date(decoded.exp*1000);
            var expires = "expires="+ d.toUTCString();
            document.cookie = 'sdsSession=' + token + ";" + expires + ";path=/";


            this.$emit('logged-in', true);


            let t = DateTime.fromJSDate(d).diff(DateTime.local()).as('milliseconds');
            setTimeout(()=>{
               this.logout();
            }, t)

            return true;
         },


         /**
          * checks if the current session cookie is still valid.  If so automatically logs user in.
          */
         async check_is_logged_in(){

            //get jwt session token from saved cookie
            let token = getCookie('sdsSession');

            try{

               //make sure the token hasn't been tampered with.
               // let url_base = process.env.VUE_APP_BASE_URL_API;
               // let pubKey = await axios.get(url_base + '/auth/well-known/public.rsa');
               let pubKey = await axios.get(this.api_url_well_known);
               pubKey = pubKey.data;
               // could just decode, seeing as verification doesn't really do anything from a security perspective here.
               let decoded = jwt.verify(token, pubKey); //note this will throw an error if verification fails

               // console.log(token)
               console.log('decoded', decoded)

               this.authenticated = true;
               this.profile = decoded;
               this.token = token; //save token in memory

               let headers = {authorization: 'Bearer ' + token};

               let url = process.env.VUE_APP_BASE_URL_API+'/auth/validateAndUpdateToken';
               let newToken = await axios.post(url, {}, {headers});
               newToken = newToken.data.token

               // console.log('new token', newToken)
               // console.log('new token', jwt.verify(newToken, pubKey));

               let s = await this.save_session_token(newToken);



               this.$emit('logged-in', true);

               if (this.requested_url != null){
                  await router.push(this.requested_url);
                  this.requested_url = null;
               }

               return true;


            }catch(e){

               this.authenticated = false;

               // throw e;
               console.log(e);
            }


         },


         async login(email, pass){
            let url_base = process.env.VUE_APP_BASE_URL_API;
            let payload = {
               email, password: pass
            };
            let res = await axios.post(url_base + '/auth/login', payload);
            let token = res.data.token;

            // let pubKey = await axios.get(url_base + '/auth/well-known/public.rsa');
            // pubKey = pubKey.data;


            console.log('debug')

            try{
               let s = await this.save_session_token(token);

               if (this.requested_url != null ){
                  await router.push(this.requested_url);
                  this.requested_url = null;
               }




               this.$emit('logged-in', true);

               return true;


            }catch(e){

               this.authenticated = false;

               throw e;
            }

         },


         /** Logs the user out and removes their session on the authorization server */
         async logout({emit=true}={}) {
            document.cookie = 'sdsSession=; path=/';
            this.authenticated = false;

            let url_base = process.env.VUE_APP_BASE_URL_API;
            let headers = {authorization: 'Bearer ' + this.token};
            await axios.post(url_base + '/auth/logout', {}, {headers});

            this.profile = {};
            this.token = null;
            if (emit){
               //see app.vue for listener for this event.  Used for post logout routing
               this.$emit('logged-out');
            }


         },






         //************functions related to anonymous id*****************************
         async set_anonymous_id(){
            try{

               let anonymous_id = getCookie('sdsId');

               if (anonymous_id === null){
                  anonymous_id = await axios.post(this.api_url_get_id, {});
                  anonymous_id = anonymous_id.data;
                  document.cookie = 'sdsId=' + anonymous_id + ";path=/";
               }
               console.log({anonymous_id})

               this.sds_guid = anonymous_id;

            }catch (e) {
               console.error(e);
            }

         },

         // get_anonymous_id(){
         //    return this.anonymous_id;
         // }






      }
   });

   return instance;
};














// Create a simple Vue plugin to expose the wrapper object throughout the application
export const AuthPlugin = {

   install(Vue) {

      let options = {
         // domain: process.env.VUE_APP_AUTH0_DOMAIN,
         // clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
         // audience: process.env.VUE_APP_AUTH0_AUDIENCE,
         onRedirectCallback: appState => {
            router.push(
               appState && appState.targetUrl
                  ? appState.targetUrl
                  : window.location.pathname
            )
         }
      };

      Vue.prototype.$auth = createInstance(options);
   }
};
