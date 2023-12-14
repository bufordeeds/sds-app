<template>
  <div :class="get_css_classes">
    <slot />
  </div>
</template>


<script>
export default {
  name: 'Section',



   props:{
      transparent: Boolean,
      background: String,
      flex: {type: Boolean, default: false}


   },
   data: () => ({
      test: 1
   }),

   computed: {
     get_css_classes(){

        let ans = '';


        switch (this.background){
           case 'black':
              ans += ' section-theme-dark';
              break;

           case 'white':
              ans += ' section-theme-light';
              break;

           default:
              throw Error('background must be one of white or black.  passed in value was ' + this.background.toString());
        }

        if (this.transparent === true){
           ans += ' section-transparent';
        }

        if (this.flex ){
           ans += ' sds-flex-section'
        }

        return ans;
     },

   },

   created(){
     if (this.background === undefined){
        throw Error('prop background must be specified')
     }
   }
};
</script>
<style scoped lang="scss">
  @import '../assets/styles/variables';


  .sds-flex-section{
    /*margin:0;*/
    /*padding:10px;*/

    display: flex;
    align-items: center;
    justify-content: center;

  }

  .section-theme-dark{
    color: rgba(255, 255, 255, 1);
    background-color: $color-section-bg-dark;
  }

  .section-theme-light{
    color: rgb(0, 0, 0);
    background-color: $color-section-bg-light;
  }


  .section-transparent{
    background: none !important;

  }






</style>
