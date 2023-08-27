<template>
  <div id="main">

    <v-dialog v-model="visible" max-width="80%" persistent >
      <v-card >

         <div class="sds-title pr-3" style="color: red">
            An Error Occurred
         </div>
        <div class="pl-5 pr-5">
           <div v-if="error">
              Error: {{error.msg}}
           </div>


           <div class="mt-4">
              <v-btn small @click="show_details = !show_details">
                 <template v-if="!show_details">
                    See
                 </template>
                 <template v-else>
                    Hide
                 </template>

                 Technical Details
              </v-btn>

           </div>

          <v-textarea
                  id="error_element"
                  class="pt-2"
                  v-model="disp_error"
                  auto-grow
                  readonly
                  outline
                  v-if="show_details"
          ></v-textarea>

           <v-btn v-if="show_details" small @click="copy_error">Copy Error Message</v-btn>
        </div>


        <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn @click="close">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



  </div>
</template>

<style scoped>
.txt-color{
  color: red;
}


</style>


<script>

   export default {

      props: {
         error: {type: Object, default: ()=>{return {}}},
         value: Boolean,  //used to control if the dialog is visibility

      },
      data() {
         return {
            visible: this.value,
            error2: '',

            show_details: false,
         };
      },

      watch:{
         value(){
            this.visible = this.value;
         },

         visible(){
            this.$emit('input', this.visible);
         },


      },

      computed:{
         disp_error(){

            if (this.error !== null){
               let msg = this.error.msg;
               return 'Error Message: ' + msg +'\n' +  JSON.stringify(this.error);

            }
            else{
               return '';
            }
         }

      },


      methods:{

         copy_error(){
            let el = document.getElementById('error_element');
            el.select();
            document.execCommand("copy");

         },

         close(){
            this.visible = false;

         },



      },
   };
</script>
