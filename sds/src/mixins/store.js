import {DateTime} from "luxon";
import _ from "lodash";


export default {

   methods: {
      /**
       *
       * @param item_key
       * @param items   : object with keys=item_key, and value = item def stored in db
       * @returns
       */
      async get_cart_item(item_key, quantity, {aide={}, dog={}, items,reorder=false}={}){


         // if (this.cart_ix !== null){
         //    this.item = _.cloneDeep(this.$store.state.cart.items[this.cart_ix]);
         //    return;
         // }

         let si;
         if (items != null){
            si = items[item_key].item; //store item
         }
         else{
            //note: this assumes that the component that this is mixed in, also mixes in the data_getters component.
            si = await this.make_request('/store/getItem', {item_key});
         }


         let now = DateTime.local();

         console.log('debug')

         let handler = this.replace_null(_.get(dog, 'handler_id_FR.name_first', ''));
         if (handler !== '') handler += ' ';
         handler += this.replace_null(_.get(dog, 'handler_id_FR.name_last', ''));

         let trainer = this.replace_null(_.get(dog, 'trainer_id_FR.name_first', ''));
         if (trainer !== '') trainer += ' ';
         trainer +=  this.replace_null(_.get(dog, 'trainer_id_FR.name_last', ''));

         // let handler_u = await this.make_request('/private/getUserAgreementExpiration', {user_id: this.dog.handler_id});
         let expiry =_.get(this.dog, 'handler_id_FR.account_status.date_expiry', null);


         let aide_name = '';
         if (aide.name_first != null && aide.name_last != null) {
            aide_name = aide.name_first + ' ' + aide.name_last;
         }
         aide_name = aide_name.trim();


         let prefix = '', suffix='';
         if (reorder) prefix = 'Reorder of '


         if (dog.name && ['sds_card', 'sds_full_kit', 'sds_certificate'].includes(item_key) ){
            suffix = ` (for ${dog.name})`;
         }

         let item = {
            name: prefix + si.name,
            description: si.name + suffix,
            price: si.price,
            number: quantity,
            item_key: item_key,
         };



         item.details = {
            handler_name: handler,
            trainer_name: trainer,
            dog_name: dog.name,
            aide_name,
            expiration: expiry,
            sds_num: 'SDS-'+dog.dog_num,


            handler_id: dog.handler_id,
            trainer_id: dog.trainer_id,
            dog_id: dog._id,
            dog_num: dog.dog_num,

            kit_image: null
         };




         if (['sds_card', 'sds_full_kit'].includes(item_key) ){
            item.details.kit_image = _.get(dog, 'profile_image', null);
         }


         if (item.details.expiration == null){
            throw Error('expiration date is null')
         }

         return item;
      },



      async add_item_to_cart(item, {path= '/cart', navigateToCart=true, }={}){

         console.log({item})

         let items  = _.cloneDeep( this.$store.state.cart.items)

         items.push(item);

         let res = await this.make_request('/store/updateCartItems', {items});

         if (res.newCart){
            //copy new cart with _id property over
            this.$store.commit('set_cart', res.cart);
         }else{
            this.$store.commit('add_cart_item', item);
         }

         if (navigateToCart) await this.$router.push({path});


      },


      /**
       *
       * @param address = {street1, street2, city, state, zip}
       * @returns
       */
      async verify_address(address){


         try{

            let data =  await this.make_request('/store/verifyAddress', {address});

            let success = data.verifications.delivery.success;
            console.log({data})


            let suggestion =null, error_msg=null;
            if (success){
               suggestion = {
                  street1: data.street1,
                  street2: data.street2,
                  city: data.city,
                  state: data.state,
                  zip: data.zip
               }
            }
            else{
               error_msg = '';
               for (let e of data.verifications.delivery.errors){
                  if (error_msg != ''){
                     error_msg += ', '
                  }
                  error_msg += e.message;

               }
            }



            return {
               suggestion, success, error_msg,

            }

         }catch (e) {
            console.error(e)
         }
      }


   }
}