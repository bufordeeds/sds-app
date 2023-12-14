<template>
  <div style="height: 100%">
    <v-dialog
      v-model="show_full"
      max-width="600px"
    >
      <v-card>
        <v-row
          dense
          class="ma-0 pr-1"
          style="z-index: 10; position: relative"
        >
          <v-spacer />
          <v-btn
            icon
            @click="show_full=false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </v-row>
        <div
          class="box-container"
          style="margin-top: -30px"
        >
          <div class="box-icon">
            <slot name="icon" />
          </div>

          <div style="text-align: left">
            <div
              class="box-header"
              style="text-align: center"
            >
              <slot name="header" />
            </div>

            <div class="box-content">
              <slot name="content" />
            </div>

            <div class="box-content">
              <slot name="content_full" />
            </div>
          </div>

          <!--               <div style="margin-top: 10px; ">-->
          <!--                  <v-btn text color="#2d76ba" @click="show_full=true">-->
          <!--                     <div style="justify-content: flex-start; font-size:12pt; display: flex; align-items: flex-end">-->
          <!--                        Learn More-->
          <!--                        <div class="triangle ml-1 mb-1 mb-1"></div>-->
          <!--                     </div>-->
          <!--                  </v-btn>-->
          <!--               </div>-->
        </div>
      </v-card>
    </v-dialog>





    <div class="box-container">
      <div class="box-icon">
        <slot name="icon" />
      </div>

      <div style="max-width: 300px; ; text-align: center">
        <div class="box-header">
          <slot name="header" />
        </div>

        <div class="box-content">
          <slot name="content" />
        </div>
      </div>

      <div style="margin-top: 10px; ">
        <v-btn
          text
          color="#2d76ba"
          @click="show_full=true"
        >
          <div style="justify-content: flex-start; font-size:12pt; display: flex; align-items: flex-end">
            Learn More
            <div class="triangle ml-1 mb-1 mb-1" />
          </div>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   name: "HomeContentBox",
   data(){
      return{
         show_full: false,
      }
   }
}
</script>

<style scoped>

.triangle{
   --width: 5px;
   width: 0;
   height: 0;
   border-top: var(--width) solid transparent;
   border-bottom: var(--width) solid transparent;
   border-left: 7px solid #2d76ba;
}

.box-container{
   background-color: white;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 30px 20px 50px 20px;
   height: 100%;
   position: relative;
}

.box-header{
   font-weight: 600;
   font-size: 16pt;
   color: #014f86;
   margin-top: 10px
}


.box-content{
   font-weight: 450;

   margin-top: 10px
}
</style>