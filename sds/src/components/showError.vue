<template>
  <div id="main">
    <v-dialog
      v-model="visible"
      max-width="80%"
      persistent
    >
      <v-card>
        <div
          class="sds-title pr-3"
          style="color: red"
        >
          An Error Occurred
        </div>
        <div class="pl-5 pr-5">
          <div v-if="error">
            Error: {{ error.msg }}
          </div>


          <div class="mt-4">
            <v-btn
              small
              @click="show_details = !show_details"
            >
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
            v-if="show_details"
            id="error_element"
            v-model="disp_error"
            class="pt-2"
            auto-grow
            readonly
            outline
          />

          <v-btn
            v-if="show_details"
            small
            @click="copy_error"
          >
            Copy Error Message
          </v-btn>
        </div>


        <v-card-actions>
          <v-spacer />

          <v-btn @click="close">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

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

      watch:{
         value(){
            this.visible = this.value;
         },

         visible(){
            this.$emit('input', this.visible);
         },


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


<style scoped>
.txt-color{
  color: red;
}


</style>
