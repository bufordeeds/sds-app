
import {DateTime} from 'luxon';
export default {

   methods: {

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

      fmt_date(d, {fmt='LLL d, yyyy'}={}){
         if (d == null || d === ''){
            return '';
         }

         // console.log('d', d)
         let d2 =this.get_luxon_dt(d);

         // return d2.toLocaleString(DateTime.DATE_SHORT); //{month: 'long', year: 'numeric', 'day': '2-digit'})
         return d2.toFormat(fmt); //{month: 'long', year: 'numeric', 'day': '2-digit'})
      },



      fmt_datetime(d){
         if (d == null || d === '')   return '';

         let d2 =this.get_luxon_dt(d);
         // return d2.toLocaleString(DateTime.DATETIME_SHORT);
         return d2.toFormat('MM/dd/yyyy, hh:mm a ZZZZ');
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

      /**
       * helper fn to format numbers into dollars string
       * @param val    - number
       * @param places - number, the decimals to return, default 0
       * @returns {*}
       *
       * see: https://stackoverflow.com/questions/721304/insert-commas-into-number-string
       *
       */
      fmt_number(val, {places=0, prefix='', suffix='', add_commas=true}){
         let val2=val;
         try{

            if (typeof val === 'string'){
               val2 = parseFloat(val);
            }

            let sign = val2 < 0 ? '-' : '';
            val2 = Math.abs(val2)

            if (add_commas){
               val2 =  val2.toFixed(places).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
               let tmp = val2.split('.');
               if (tmp.length>1){
                  val2 = tmp[0] + '.' +tmp[1].replace(/,/g, '');
               }
            }else{
               val2 =  val2.toFixed(places);
            }

            // return prefix+ val2.toFixed(places).replace(/\B(?=(\d{3})+(?!\d))/g, ","); //note this will add commas after the decimal too.


            return sign + prefix + val2 + suffix;
         }catch (e) {
            console.log(e)
            return val;
         }
      },//fmt_number()


      numberWithCommas(x, ) {
         let digits=0;
         let absx = Math.abs(x);
         if (x){
            if (absx >= 10){
               digits = 0;
            }
            else if (absx >= 1){
               digits = 1;
            }
            else if (absx >= 0.1){
               digits = 2;
            }
            else if (absx >= 0.01){
               digits = 3;
            }
            else if (absx >= 0.001){
               digits = 4;
            }
            else {
               digits = 6;
            }


            return this.fmt_number(x, {places: digits});
         }

         else
            return "0"
      },

      /**
       * simple helper to concat a user's first/last names and account for if value aren't defined
       * @param f_name : str, first name
       * @param l_name : str, last name
       */
      get_name(f_name, l_name){
         let ans = '';
         if (f_name != null  && f_name !== ''){
            ans = f_name;
         }

         if (l_name != null  && l_name !== ''){
            if (ans !== '') ans +=  ' ';
            ans += l_name;
         }
         return ans;
      },

      get_name_user(user, {nullVal=''}={}){
         if (user == null){
            return nullVal;
         }

         let ans =  this.get_name(user.name_first, user.name_last);

         if (ans === ''){
            return nullVal
         }
         return ans;
      },


      fmt_trim_str(s, len=10){

         if (s == null)
            return s;

         if (s.length <= len)
            return s;
         else{
            return s.slice(0, len) + '...';
         }

      },

   }, // methods

}; // export


