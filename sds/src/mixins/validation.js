import {DateTime} from 'luxon';


// set of validators to be used with vuetifies' builtin validation of form/input elements



export default {
   data() {
      return {
      };
   },

   methods: {

      isRequired(x, name='Value', {disabled=false, nullOk=false}={}){
         if (!disabled){
            // let ans = (x  !==null && x !== undefined && ans !== '');
            let ans = !!x;

            if (nullOk && x === null){
               ans = true;
            }

            if (x === false || x === 0){
               ans = true;
            }
            if (Array.isArray((x))){
               if (x.length === 0)
                  ans = false;
            }
            return ans || `${name} is required`;
         }
         else
            return true;

      },

      isNumber(x, disabled=false){
         if (disabled)
            return true;

         if (x === '' || x == null)
            return true; //use isRequired for this

         // let regx = /[+-]?[0-9]+(\.[0-9]+)?([Ee][+-]?[0-9]+)?/;
         let regx = /^[0-9]*$/;
         return regx.test(x) || 'Must be a number';
      },

      isFloat(x, {disabled=false}={}){
         if (disabled)
            return true;

         if (x === '' || x == null)
            return true; //use isRequired for this


         let regx = /[+-]?[0-9]+(\.[0-9]+)?([Ee][+-]?[0-9]+)?/;
         return regx.test(x) || 'Must be a number';
      },

      isPhone(x, disabled=false){
         if (disabled)
            return true;

         if (x === '' || x == null)
            return true; //use isRequired for this

         // let regx = /^[0-9-]*$/;
         // return regx.test(x) || 'Please only include digits 0-9 and "-"';

         let regx = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;

         return regx.test(x) || 'Must be ###-###-####';
      },

      fmtPhone(x){
         let tmp = x;
         tmp = tmp.replace(/[-\(\)\.\s]/g, '');

         let regx = /^[0-9]{10}$/;
         if (regx.test(tmp)){
            return tmp.slice(0,3)+'-'+tmp.slice(3,6)+'-'+tmp.slice(6,11)
         }
         else{
            return x;
         }
      },


      isZip(x, disabled=false){
         if (disabled)
            return true;

         if (x === '' || x == null)
            return true; //use isRequired for this

         let regx = /^[0-9]{5}([- /]?[0-9]{4})?$/;

         return regx.test(x) || 'Must be #####-####';
      },

      isLessThan(x, y, msg='Check number'){
         if (typeof x ==='string')
            x = x.replace(/,/g, '');
         if (typeof y ==='string')
            y = y.replace(/,/g, '');

         let ans = Number(x) <= Number(y);
         console.log('less', ans, x, y)

         return ans || msg;
      },

      //deprecated.  use isEmail()
      checkEmail(x){
         if (x === '' || x == null)
            return true; //use isRequired for this

         //regex taken from https://emailregex.com/
         let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z0-9]{2,}))$/
         return regx.test(x) || 'Not valid email address';
      },

      isEmail(x){
         if (x === '' || x == null)
            return true; //use isRequired for this

         //regex taken from https://emailregex.com/
         let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z0-9]{2,}))$/
         return regx.test(x) || 'Not valid email address';
      },


      isTrainerURL(x){
         let regx = /^[0-9_a-zA-Z]*$/;
         return regx.test(x) || 'Not valid url';
      },

      isDate(x){
         if (x == null){
            return true;
         }

         console.log('debug isdate')
         let d = DateTime.fromFormat(x, 'M/d/yyyy');
         return (d.invalid === null) || 'Invalid date.  Must be "M/D/YYYY"';
      },

      isValidMonth(month) {
         if (!month || Number(month) <= 0 || Number(month) > 12) return 'Invalid month';

         return true;
      },

      isValidDayOfMonth(day, month) {
         const ERR_MESSAGE = 'Invalid day of month';

         if (!day || Number(day) <= 0) return ERR_MESSAGE;

         const monthsWith31Days = ["01", "03", "05", "07", "08", "10", "12"];
         const monthsWith30Days = ["04", "06", "09", "11"];

         if (monthsWith30Days.includes(month)) {
            if (Number(day) > 31) return ERR_MESSAGE;
         }

         if (monthsWith31Days.includes(month)) {
            if (Number(day) > 30) return ERR_MESSAGE;
         }

         if (month.toString() === "02") {
            if (Number(day) > 29) return ERR_MESSAGE;
         }

         return true;
      },

      isValidYear(year) {
         if (year.toString().length !== 4) return 'Invalid year';
         
         return true;
      },


      checkLength(x, n, {type='gte'}={}){


         if (x === '' || x == null)
            return true; //use isRequired for this

         if (type==='gte'){
            return (x != null && x.length >= n)  || `Must be ${n} chars or more`;
         }

         if (type==='lte'){
            return (x != null && x.length <= n)  || `Must be ${n} chars or less`;
         }

         if (type==='eq'){
            return (x != null && x.length === n)  || `Must be ${n} chars`;
         }

      },


      // checkLengthExact(x, n){
      //
      //    return (x != null && x.length 4)  || `Must be ${n} chars or more`;
      // },




      /**
       * converts a date into a luxon datetime obj
       * @param d - ISO str | object with {date, time, timezone} components
       */
      parseDate(d){

         if (typeof d === 'string'){
            return DateTime.fromISO(d)
         }
         else{
            let s = d.date;
            if (d.time != undefined && d.time !== '')
               s += ('T'+d.time);
            else
               s+= 'T00:00';

            if (d.timezone !== undefined && d.timezone !== '' && d.timezone !== null)
               return DateTime.fromISO(s, {zone: d.timezone});
            else
               return DateTime.fromISO(s);
         }

      },


      /**
       * returns true if d1 < d2
       * @param d1 - obj, {date, time, timezone}
       * @param d2 - obj, {date, time, timezone}
       *
       * assumes date has fmt yyyy-mm-dd
       * assumes time has fmt hh:mm:ss
       */
      isDateAfter(d1, d2, txt='Date'){

         d1 = this.parseDate(d1);
         d2 = this.parseDate(d2);

         return d1 < d2 || `${txt} not valid`;



      },

      checkRange(x, low, high, exceptions=[]){

         if (typeof x == 'string')
            x = Number(x);

         // console.log(x, exceptions)
         if (exceptions.includes(x)){
            return true;
         }

         return (x >= low && x <= high) || `Must be between ${low} and ${high}`
      },


      //validation for radio group
      checkRadioGroup(x){
         if (x === null || x === undefined)
            return 'Please select an answer';
         else
            return true;
      }

   }


};
