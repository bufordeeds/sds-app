const {DateTime} = require('luxon');
const _ = require('lodash');
const axios = require('axios');

// module.exports.findWithAttr = function (array, attr, value) {
//    for(var i = 0; i < array.length; i += 1) {
//       if(array[i][attr] === value) {
//          return i;
//       }
//    }
//    return -1;
// }


/**
 *
 * @param array - array of objects
 * @param attr - note, interprets foo.bar as bar is a prop of object foo
 * @param value - value to search for
 * @param compareType - equality | contains
 * @param convertToStr - bool, if true then both value and array prop are converted to strings before comparison
 * @returns {number}
 */
module.exports.findWithAttr = function (array, attr, value, {compareType = 'equality', convertToStr=false} = {}) {

   if (value != null && convertToStr ){
      value = value.toString();
   }

   // console.log('array', array)
   for(let i = 0; i < array.length; i += 1) {
      let a = attr.split('.');
      let val;
      val = array[i][a[0]];


      // console.log('a', a)
      for (let j=1; j < a.length; j++) {

         val = val[a[j]];
      }

      if (val != null && convertToStr){
         val = val.toString();
      }

      // console.log('val', val, 'value', value)
      if (compareType === 'equality' && val === value) {
         return i;
      }
      else if (compareType === 'contains' && val.includes(value)) {
         return i;
      }





   }
   return -1;
};




/**
 * cleans a filename of special chars
 * @param fname - string
 */
module.exports.clean_filename =  function(fname) {

   return fname.replace(/[ /\\:]/g, '_');
};


if (require.main === module){


   console.log(module.exports.clean_filename('lkj sl/fjslie\\js neal'));

}




/**
 * Converts various date formats to a luxon DataTime
 * @param date
 */
module.exports.get_luxon_dt = function(date){
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
};

/**
 * returns date1 - date2 in units unit
 * @param date1
 * @param date2
 * @param units
 *
 * @returns time in unite
 */
module.exports.diff_dates = function(date1, date2, units='seconds'){

   let d1 = module.exports.get_luxon_dt(date1);
   let d2 = module.exports.get_luxon_dt(date2);
   return d1.diff(d2).as(units);

};


/**
 * returns the great-cirlcle distance between two points.
 *
 * Code taken from  https://www.movable-type.co.uk/scripts/latlong.html
 * @param lat1
 * @param lon1
 *
 * @param lat2
 * @param lon2
 *
 * @param unit : 'miles' | 'meters'
 * @returns {number}
 */
module.exports.haversine = function(lat1, lon1, lat2, lon2, {unit='miles'}={}){


   const R = 6371e3; // metres
   const φ1 = lat1 * Math.PI/180; // φ, λ in radians
   const φ2 = lat2 * Math.PI/180;
   const Δφ = (lat2-lat1) * Math.PI/180;
   const Δλ = (lon2-lon1) * Math.PI/180;

   const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
      Math.cos(φ1) * Math.cos(φ2) *
      Math.sin(Δλ/2) * Math.sin(Δλ/2);
   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

   const d = R * c; // in metres

   if (unit === 'meters'){
      return d;
   }
   else if (unit === 'miles'){
      return d/1609.344; //convert to miles
   }
   else {
      throw Error(`unit=${unit} not valid`)
   }

};















/**
 * rounds
 * @param value     - value to round
 * @param precision - num of digits to round to
 * @returns {number}
 * Taken from: https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
 */
module.exports.round = round;
function round(value, precision=0) {
   let multiplier = Math.pow(10, precision );
   return Math.round(value * multiplier) / multiplier;
}

/**
 * helper fn to format numbers into dollars string
 * @param val    - number
 * @param places - number, the decimals to return, default 0
 * @returns {*}
 *
 * see: https://stackoverflow.com/questions/721304/insert-commas-into-number-string
 *
 */
module.exports.fmt_number = fmt_number;
function fmt_number(val, {places=0, prefix='', suffix='', add_commas=true}){
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
}//fmt_number()


module.exports.numberWithCommas = numberWithCommas;
function numberWithCommas(x) {
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


      return fmt_number(x, {places: digits});
   }

   else
      return "0"
}


module.exports.get_geo_info = get_geo_info;
async function get_geo_info(address){
   try{
      let geo_info = null;
      let params = {
         api_key: process.env.GEOCODIO_API_KEY,
         street: _.get(address, 'street1', ''),
         city: _.get(address, 'city', ''),
         state: _.get(address, 'state', ''),
         postal_code: _.get(address, 'zip', ''),
      }
      let geo_res = await axios.get('https://api.geocod.io/v1.6/geocode', {params});
      if (geo_res.data != undefined){
         let loc = geo_res.data.results;
         if (loc.length>0){
            loc = loc[0]; //get first result.

            geo_info = {
               location:{
                  type: 'Point',
                  coordinates: [loc.location.lng, loc.location.lat],
               },
               source: 'geocodio',
               raw_response:loc,
            }
         }
      }
      return geo_info;
   }catch (e) {
      throw e;
      // return null;
   }

}
