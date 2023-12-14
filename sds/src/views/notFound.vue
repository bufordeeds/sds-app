<template>
  <div>
    <!--<div style="position: relative; z-index: -1" width="100%">-->
    <!--<v-img src="../assets/images/content/math.png"  ></v-img>-->
    <!--</div>-->

    <meta
      name="robots"
      content="noindex"
    >
    <!-------------------------------------------------------contact us------------------------------------------------>
    <Section
      background="black"
      class="pt-10"
    >
      <v-container
        fluid
        style="max-width: 1000px"
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col
            cols="12"
            md="12"
            justify="center"
          >
            <div style="text-align: center">
              <p style="font-size: 1.5em">
                Opps, we can't seem to find that page.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </Section>





    <!--<div class="process-section">-->

    <!--some extra space for the moment-->

    <!--</div>-->
  </div>
</template>






<script>
// @ is an alias to /src
import Section from '@/components/Section.vue'




// see https://stackoverflow.com/questions/54218371/how-to-get-a-404-response-in-vue-router


export default {
  name: 'Home',
  components: {Section, },
   data(){return {
   }},

   created(){
      // window.location.replace("https://noexist.espy.ai/");
   }



}
</script>


<style scoped lang="scss">

  .main-heading{
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    /*background-image: url('../assets/images/content/math.png')*/

    background-size: cover;
    /*background-size: auto 100%;*/
    /*background-size: 100% auto;*/
    background-position: center;
    }

  .process-section{
    height: 700px;
    text-align: justify;

  }
  .heading-line{
    text-align: center;

  }


  .bg-transparent-light{
    background: rgba(255, 255, 255, 0.05);
    width:100%;
  }


  .section-heading{
    font-size: 3em;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
    text-align: center;

  }


  .section-sub-heading {
    font-size: 2em;
    font-weight: normal;
  }



  .container-services{
    max-width: 1200px;
    text-align: center;


    /*.service-heading{*/
      /*font-size: 2em;*/
      /*font-weight: normal;*/
    /*}*/

    .service-text{
      font-size: 1.0em;
      /*font-weight: lighter;*/
      line-height: 110%;
      text-align: justify;
      padding-top: 10px;
      padding-left: 5px;
      padding-right: 5px;
    }
  }

  .colored-icon-text{
    font-size: 1.4em;
    /*font-size: 1.0em;*/
    /*text-align: left;*/
    text-align: justify;
    max-width: 800px;
  }










  .slide-container{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .slide-content{
    margin: auto;
  }
  .slide-spacer{
    flex: 'flex-grow';
  }







</style>
