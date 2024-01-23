<template>
  <div>
    <!--style="border: grey solid 1px"-->
    <div class="svg-container ma-3">
      <svg
        :width="width"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 270 40"
        preserveAspectRatio="xMidYMid slice"
      >

        <!--line1-->
        <line
          :x1="p1.x"
          :y1="p1.y"
          :x2="p2.x"
          :y2="p2.y"
          class="svg-lines"
          :style="style_line(2)"
        />

        <circle
          :cx="p1.x"
          :cy="p1.y"
          :r="r"
          class="svg-dots"
          :style="{fill:col_cur}"
        />
        <text
          :x="p1.x"
          :y="y_txt"
          class="svg-status-txt"
          :style="style_txt(1)"
        >In Process</text>


        <!--line2-->
        <line
          :x1="p2.x"
          :y1="p2.y"
          :x2="p3.x"
          :y2="p3.y"
          class="svg-lines"
          :style="style_line(3)"
        />

        <circle
          :cx="p2.x"
          :cy="p2.y"
          :r="r"
          class="svg-dots"
          :style="style_point(2)"
        />
        <text
          :x="p2.x"
          :y="y_txt"
          class="svg-status-txt"
          :style="style_txt(2)"
        >In Transit</text>


        <circle
          :cx="p3.x"
          :cy="p3.y"
          :r="r"
          class="svg-dots"
          :style="style_point(3)"
        />
        <text
          :x="p3.x"
          :y="y_txt"
          class="svg-status-txt"
          :style="style_txt(3)"
        >Delivered</text>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
   name: "StatusLine",
   props:{
      status: String,
      width: {type:Number, default: 300}
   },
   data(){
      return{
         y: 11,
         x0: 36,
         line_length: 100,
         r: 8,
         y_txt: 35,

         col_cur: '#46e021',
         col_cur_txt: '#343434',
      }
   },

   computed:{
     p1(){
        return {
           x: this.x0,
           y: this.y,
        }
     },
      p2(){
         return {
            x: this.x0 + this.line_length,
            y: this.y,
         }
      },
      p3(){
         return {
            x: this.x0 + this.line_length*2,
            y: this.y,
         }
      },

      status2(){
        let ans = 1;

        if (['Shipped', 'InTransit','OutForDelivery'].includes(this.status)){
           ans = 2;
        }

        if (this.status === 'Delivered'){
           ans = 3;
        }
        return ans;
      },

   },

   methods:{
      style_line(status){
         if (this.status2 >=status){
            return `stroke: ${this.col_cur};`;
         }
         else{
            return '';
         }
      },

      style_point(status){
         if (this.status2 >=status){
            return `fill: ${this.col_cur};`;
         }
         else{
            return '';
         }
      },

      style_txt(status){
         if (this.status2 === status){
            return `font-weight: 600; fill:${this.col_cur_txt}`;
         }
         else{
            return '';
         }
      },
   }

}
</script>

<style scoped>
.svg-status-txt{
    font-size: 10pt;
    font-weight: 400;
    text-anchor: middle;
    fill: #b3b3b3;

}

.svg-lines{
    stroke: #dbdbdb;
    stroke-width: 5px;
}
.svg-dots{
    fill: #dbdbdb;
}
</style>