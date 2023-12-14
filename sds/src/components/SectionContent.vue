<template>
  <div class="section-container">
    <div
      v-if="show_side_headings"
      class="heading-container"
    >
      <span class="side-headings">
        {{ title }}
      </span>
    </div>

    <div
      v-else
      :class="get_no_side_class"
    />

    <div
      class="content-container "
      :class="get_no_margin_class"
    >
      <v-container
        fluid
        style="max-width: 1200px"
      >
        <div
          v-if="!show_side_headings"
          class="top-headings display-1"
        >
          {{ title }}
        </div>
        <v-row>
          <v-col>
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
   import helpers from '@/mixins/helpers'

   export default {
      name: "SectionContent",
      mixins: [helpers],
      props:{
         title: String,
         noSide: Boolean,
      },
      computed: {
         show_side_headings(){

            if (this.noSide !== undefined && this.noSide === true)
               return false;

            if (['xs', ].includes(this.$vuetify.breakpoint.name)) {
               return false;
            }
            return true;
         },

         get_no_margin_class(){
            if (this.noSide === true || ['xs', 'sm'].includes(this.$vuetify.breakpoint.name))
               return 'no-side-margins';
            else
               return '';
         },
         get_no_side_class(){
            if (this.noSide === true || ['xs', 'sm'].includes(this.$vuetify.breakpoint.name))
               return 'empty_size_heading_no_side';
            else
               return 'empty_size_heading';
         }
      },

   }
</script>

<style scoped lang="scss">
  .heading-line{
    text-align: center;
    width: 100%
  }



  .main-heading{
    /*min-height: 350px;*/
    display: flex;
    align-items: center;
    justify-content: center;
    /*background-image: url('../assets/images/content/math.png')*/

  }




  .plain-link{
    color: white;
    text-decoration: none;

  }

  .ref_object{
    cursor: pointer;
  }


  .section-container{

    display: flex;
    min-height: 300px;
    width: 100%;
    /*max-width: 1000px;*/
    /*margin: auto;*/


    /*background: blue;*/
    .heading-container{
      /*width: 70px;*/
      width: 60px;
      min-height: 100%;
      /*position: relative;*/

      /*background: red;*/


      /*centers side title*/
      /*.side-headings{
          !*https://stackoverflow.com/questions/15138723/vertically-center-rotated-text-with-css*!
          position: relative;
          top: 50%;
          left: 50%;
          font-size: 2em;
          !*text-align: center;*!
          display:inline-block;
          !*transform-origin: 0 0;*!

          transform:  translateX(-50%)  translateY(-50%) rotate(-90deg);
          white-space: nowrap;
        }*/


      /*aligns side label to top*/
      .side-headings{
        /*https://stackoverflow.com/questions/15138723/vertically-center-rotated-text-with-css*/
        font-size: 2em;
        display:inline-block;
        transform-origin: 100% 0%;
        transform: translateX(-100%) rotate(-90deg)  translateY(15px)  translateX(-5px);
        white-space: nowrap;
      }

    }

    .empty_size_heading{
      width: 20px;
    }

    .empty_size_heading_no_side{
      width: 0px;
    }

    .top-headings{
      width: 100%;
      color: black;
      /*padding-left: 10px;*/

    }



    .content-container{
      background: #ffffff;
      width: 100%;
      padding-top: 0px;
      padding-bottom: 0px;

      color: black;
      /*margin-right: 20px;*/
      margin-right: 4px;


    }


    .no-side-margins{
      margin-right: 4px ;
      margin-left: 4px ;
    }



  }
</style>