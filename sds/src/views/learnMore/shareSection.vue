<template>
   <div style="display: flex; flex-wrap: wrap; justify-content: center; ">

      <a :href="url_fb" target="_blank">
         <div class="social-btn" style="background-color: #3352a2;">
            <img src="../../assets/images/content/social/SDSFacebookAsset20.svg" height="32">
            Share
         </div>
      </a>

      <a :href="url_twitter" target="_blank">
         <div class="social-btn" style="background-color: #55c2ee;">
               <img src="../../assets/images/content/social/SDSTwitterAsset21.svg" height="32">
            Tweet
         </div>

      </a>

      <a :href="url_email">
         <div class="social-btn" style="background-color: #55c2ee;">
            <img src="../../assets/images/content/social/SDSTwitterAsset21.svg" height="32">
            Email
         </div>
      </a>

      <a href="">
         <div class="social-btn" style="background-color: #55c2ee;">
            <img src="../../assets/images/content/social/SDSTwitterAsset21.svg" height="32">
            Share
         </div>
      </a>




   </div>
</template>

<script>
export default {
   name: "shareSection",
   props:{
      title: {type: String, default: null}
   },
   computed:{
      cur_url(){
         // let path = encodeURI(window.location);
         let path = encodeURI('https://servicedogstandards.org'+this.$route.path);

         // console.log({path: path})
         return path
      },

      url_fb(){
         let ans = `https://www.facebook.com/sharer/sharer.php?u=${this.cur_url}`
         return ans;
         // return "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.google.com%2F&amp;src=sdkprepars"
      },

      url_twitter(){

         let ans = `https://twitter.com/intent/tweet?text=${this.cur_url}`
         return ans;
      },

      url_email(){
         let subject = this.title;

         if (subject == null){
            subject = encodeURI('Service Dog Standards Article');
         }
         else{
            subject = encodeURI(subject);
         }

         let ans = `mailto:%20?subject=${subject}&body=${this.cur_url}`
         return ans
      }



   }
}
</script>


<style scoped>
.social-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;

    color: white;
    width: 105px;
    padding-right: 5px;
    padding-top: 2px;
    padding-bottom: 2px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>

