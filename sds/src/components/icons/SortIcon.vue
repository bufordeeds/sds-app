<template>
  <v-btn
    icon
    x-small
    :color="icon_color"
    @click="on_click"
  >
    <v-icon small>
      {{ icon_dir }}
    </v-icon>
  </v-btn>
</template>

<script>


/*
   note ascending means first array item is the smallest, last item is the largest, i.e. [1, 2, 4 ], ['a', 'b', 'c']

   up arrow = descending
 */
export default {
   name: "SortIcon",
   props: {
      sortDir: {type: String, default: 'descending'}, // ascending | descending | none.

      disabled:  {type: Boolean, default: false}, // controls whether the associated list is sorted at all

   },
   data(){
      return {
         sortDir2: this.sortDir,
      }
   },
   computed: {
      icon_dir(){
         if (this.sortDir2 === 'descending' ){
            return 'north';
         }
         else if (this.sortDir2 === 'ascending' ){
            return 'south';
         }
         else{
            return 'north';
         }
      },

     icon_color(){
        let ans = 'var(--color-btn)';
        if (this.sortDir2 === 'none'){
           ans = '#b1b1b1'
        }

        return ans;
     }
   },

   watch:{
      // active(newVal){
      //    if (this.active2 !== newVal){
      //       this.active2 = newVal;
      //    }
      // },
      //
      // active2(newVal){
      //    this.$emit('update:active', newVal);
      // },

      sortDir(newVal){
         if (this.sortDir2 !== newVal){
            this.sortDir2 = newVal;
         }
      },

      sortDir2(newVal){
         this.$emit('update:sortDir', newVal);
      },


   },

   methods:{
      on_click(){
         if (this.sortDir2 === 'none'){
            this.sortDir2 = 'ascending'
         }

         else if (this.sortDir2 === 'ascending'){
            this.sortDir2 = 'descending'
         }

         else if (this.sortDir2 === 'descending'){
            this.sortDir2 = 'ascending'
         }

         this.$emit('click', this.sortDir2);
      }
   }
}
</script>

<style scoped>

</style>