/*
   Deprecated file.  Functionality has been moved to mixins/utilities.
   The reason being that non-mixin functions can't be accessed from template code, so mixing in utility functions
   it more flexible than importing as a stand-alone module.
 */



import {DateTime} from 'luxon';
export default {

   /**
    * Converts various date formats to a luxon DataTime
    * @param date
    */
   get_luxon_dt(date){
      let d; //datetime object


      if (typeof date === 'string'){
         // let s = date.slice(0, 10).split('-');
         // date = Date.UTC(s[0], s[1], s[2]);
         // date = new Date(date);

         d = DateTime.fromISO(date);
         //TODO: need to handle error if date is not a properly fmt'd srr
      }


      else if (Object.prototype.toString.call(date) === '[object Date]'){
         // is a native Date object

         // d = date.toIsoString();
         d = DateTime.fromJSDate(date);

      }

      else if (date instanceof DateTime){
         d = date;
      }

      return d;
   },




   /**
    * Simple helper function to get index of an object in an array based on a given property
    *
    * @param array - an array of objects
    * @param attr - str, name of property to search for
    * @param value - value to search for

    * @returns index of item or -1 if not found
    *
    * ref: https://stackoverflow.com/questions/7176908/how-to-get-index-of-object-by-its-property-in-javascript/54015295
    */

   findWithAttr(array, attr, value) {

      // console.log('array', array)
      for(let i = 0; i < array.length; i += 1) {
         let a = attr.split('.');
         let val;
         val = array[i][a[0]];


         // console.log('a', a)
         for (let j=1; j < a.length; j++) {

            val = val[a[j]];
         }

         // console.log('val', val, 'value', value)
         if(val === value) {
            return i;
         }
      }
      return -1;
   },


   /**
    * rounds
    * @param value     - value to round
    * @param precision - num of digits to round to
    * @returns {number}
    * Taken from: https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
    */
   round(value, precision) {
      let multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
   },


   // /**
   //  * simple helper to concat a user's first/last names and account for if value aren't defined
   //  * @param f_name : str, first name
   //  * @param l_name : str, last name
   //  */
   // get_name(f_name, l_name){
   //    let ans = '';
   //    if (f_name != null  && f_name !== ''){
   //       ans = f_name;
   //    }
   //
   //    if (l_name != null  && l_name !== ''){
   //       if (ans !== '') ans +=  ' ';
   //       ans += l_name;
   //    }
   //    return ans;
   // },
   //
   // get_name_user



}; // export


