<template>
  <div>
    <v-menu
      v-model="show_menu"
      :close-on-content-click="false"
      :nudge-right="0"
      transition="scale-transition"
      offset-y
      :nudge-bottom="picker_nudge"
      max-width="599px"
    >
      <template #activator="inputscope">
        <v-text-field
          v-model="datetime_fmt"
          :label="label2"
          hint="YYYY-MM-DD format"
          :readonly="readonly2"
          outlined
          dense
          hide-details
          :rules="rules"
          disable-lookup
          :clearable="clearable"
          v-on="inputscope.on"
          @change="update_from_input"
        />
      </template>

      <v-card>
        <v-date-picker
          v-model="date"
          class="ma-1 "
          scrollable
          color="var(--color-primary)"
        />


        <v-container
          class="pa-2 ma-0"
          style="width:100%"
        >
          <v-row class="ma-0">
            <v-btn
              small
              @click="cancel"
            >
              Cancel
            </v-btn>
            <v-spacer />
            <v-btn
              small
              color="primary"
              @click="get_now"
            >
              Today
            </v-btn>

            <div class="pl-2">
              <v-btn
                small
                color="primary"
                @click="update_display"
              >
                Ok
              </v-btn>
            </div>
          </v-row>
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
   //:rules="[x=>isRequired(x, 'Date', dis_check)]"
   //@input="show_menu = false"

   // max-width="600px"
   // min-width="290px"
   import {DateTime} from 'luxon';

   export default {
      name: "MyDatePicker",
      props: {
         value: String, //iso formatted string
         rules: Array,
         label: String,
         readonly: Boolean,
         timezone: String,
         onChange: Function, //event handler for when the date changesmyDateTimePicker.vue

         onlyDate: {type: Boolean, default: () => false},

         clearable: {type: Boolean, default: () => false},

      },
      data(){
         return {
            date: null,
            time: null,
            picker_nudge: 10,
            show_menu: false,

            datetime:this.value, //iso formatted string
            datetime_fmt: null, //formatted according to fmt,

            // fmt: 'M/d/yyyy, hh:mmZ a', //luxon formatting string
            // fmt: 'M/d/yyyy, hh:mm a', //luxon formatting string
            fmt: 'M/d/yyyy', //luxon formatting string
            // fmt: 'EEE, MMM d, yyyy hh:mm a', //luxon formatting string
         };
      },


      computed: {
         label2() {
            if (this.label === undefined)
               return 'Date Time';
            else
               return this.label;
         },

         readonly2() {
            if (this.readonly === undefined)
               return true;
            else
               return this.readonly;
         },

      },

      watch:{

         // datetime(newVal){
         //    this.$emit('input', newVal)
         // },

         datetime_fmt(newVal, oldVal){
            console.log(newVal, oldVal)
            this.parse_input();
            // this.$emit('input', newVal);

         },

         value(){

            console.log('watch value')
            this.update_from_prop();
         }
      }, //methods

      created(){
         this.update_from_prop();

      },

      methods: {
         update_display(){
            // console.log(this.date, this.time)
            let ans = '';

            if (this.date !== null)
               ans += this.date;
            else {
               this.datetime = null;
               this.show_menu = false;
               return;
            }

            if (this.time == null){
               ans += 'T00:00';
            }
            else{
               ans += ('T' + this.time);
            }

            this.datetime = DateTime.fromISO(ans).toISO();
            this.datetime_fmt = DateTime.fromISO(ans).toFormat(this.fmt);

            this.show_menu = false;
            this.$emit('input', this.datetime);

            // console.log('onChange', this.onChange)
            if (this.onChange !== undefined){
               this.onChange();
            }
         },

         parse_input(){

            if (this.datetime_fmt === null || this.datetime_fmt === '' ){
               this.date = null;
               this.time = null;
               this.datetime = null;
            }
            else{
               let tmp = DateTime.fromFormat(this.datetime_fmt, this.fmt);
               // console.log(tmp)
               this.date = tmp.toFormat('yyyy-LL-dd');
               this.time = tmp.toFormat('HH:mm:ss');
               this.datetime = tmp.toISO();
            }

            // this.$emit('input', this.datetime);

         },

         get_now(){
            let tmp = DateTime.local().startOf('day');
            this.date = tmp.toISODate();
            // this.time = tmp.toFormat('HH:mm:ss');
            // this.parse_input();
         },

         cancel(){
            this.parse_input();
            this.show_menu = false;
         },

         //updates when the input prop changes
         update_from_prop(){
            if (this.value == null){
               this.datetime = null;
               this.datetime_fmt = null;
               this.date=null;
               this.time = null;
            }
            else{
               this.datetime = this.value;
               this.datetime_fmt =  DateTime.fromISO(this.value).toFormat(this.fmt);
               this.parse_input();
            }
         },

         update_from_input(){

            this.parse_input();
            this.$emit('input', this.datetime);



         }
      }

   }
</script>

<style>


  /*.v-time-picker-title__time .v-picker__title__btn{*/
  /*height: 20px !important;*/
  /*font-size: 20px;*/

  /*}*/

  .v-time-picker-title__time .v-picker__title__btn, .v-time-picker-title__time span {
    font-size: 50px !important;
    height: 55.2px !important;
  }

</style>

