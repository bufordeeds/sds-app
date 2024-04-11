<template>
   <div style="position: relative;">
      <v-menu v-model="show_menu" :close-on-content-click="false" :nudge-right="0" transition="scale-transition"
         offset-y :nudge-bottom="picker_nudge" max-width="599px">
         <template #activator="inputscope">
            <v-text-field v-model="datetime_fmt" :label="null" hint="YYYY-MM-DD format" :readonly="readonly2" outlined
               dense hide-details :rules="rules" disable-lookup :clearable="clearable" v-on="inputscope.on"
               @change="update_from_input" height="44px" />
         </template>

         <v-card>
            <v-date-picker v-model="date" class="ma-1" scrollable color="var(--color-primary)" />

            <v-container class="pa-2 ma-0" style="width:100%">
               <v-row class="ma-0">
                  <v-btn small @click="cancel">Cancel</v-btn>
                  <v-spacer />
                  <v-btn small color="primary" @click="get_now">Today</v-btn>
                  <div class="pl-2">
                     <v-btn small color="primary" @click="update_display">Ok</v-btn>
                  </div>
               </v-row>
            </v-container>
         </v-card>
      </v-menu>
      <label :for="id" :style="{
         position: 'absolute',
         top: '-20px',
         left: '10px',
         fontSize: '14px',
         color: '#1D1D1F'
      }">{{ label }}</label>
   </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
   name: "MyDatePicker",
   props: {
      value: String,
      rules: Array,
      label: String,
      readonly: Boolean,
      timezone: String,
      onChange: Function,
      onlyDate: { type: Boolean, default: () => false },
      clearable: { type: Boolean, default: () => false },
   },
   data() {
      return {
         date: null,
         time: null,
         picker_nudge: 10,
         show_menu: false,
         datetime: this.value,
         datetime_fmt: null,
         fmt: "M/d/yyyy",
         id: `date-picker-${Math.floor(Math.random() * 1000)}`,
      };
   },
   computed: {
      readonly2() {
         return this.readonly === undefined ? true : this.readonly;
      },
   },
   methods: {
      update_display() {
         let ans = "";

         if (this.date !== null) ans += this.date;
         else {
            this.datetime = null;
            this.show_menu = false;
            return;
         }

         if (this.time == null) {
            ans += "T00:00";
         } else {
            ans += "T" + this.time;
         }

         this.datetime = DateTime.fromISO(ans).toISO();
         this.datetime_fmt = DateTime.fromISO(ans).toFormat(this.fmt);

         this.show_menu = false;
         this.$emit("input", this.datetime);

         if (this.onChange !== undefined) {
            this.onChange();
         }
      },
      cancel() {
         this.parse_input();
         this.show_menu = false;
      },
      get_now() {
         let tmp = DateTime.local().startOf("day");
         this.date = tmp.toISODate();
      },
      update_from_input() {
         this.parse_input();
         this.$emit("input", this.datetime);
      },
      parse_input() {
         if (this.datetime_fmt === null || this.datetime_fmt === "") {
            this.date = null;
            this.time = null;
            this.datetime = null;
         } else {
            let tmp = DateTime.fromFormat(this.datetime_fmt, this.fmt);
            this.date = tmp.toFormat("yyyy-LL-dd");
            this.time = tmp.toFormat("HH:mm:ss");
            this.datetime = tmp.toISO();
         }
      },
      update_from_prop() {
         if (this.value == null) {
            this.datetime = null;
            this.datetime_fmt = null;
            this.date = null;
            this.time = null;
         } else {
            this.datetime = this.value;
            this.datetime_fmt = DateTime.fromISO(this.value).toFormat(this.fmt);
            this.parse_input();
         }
      },
   },
   watch: {
      datetime_fmt() {
         this.parse_input();
      },
      value() {
         this.update_from_prop();
      },
   },
   created() {
      this.update_from_prop();
   },
};
</script>

<style>
.v-time-picker-title__time .v-picker__title__btn,
.v-time-picker-title__time span {
   font-size: 50px !important;
   height: 55.2px !important;
}
</style>
