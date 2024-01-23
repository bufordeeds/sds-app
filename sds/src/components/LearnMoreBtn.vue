<template>
  <v-btn
    text
    color="#2d76ba"
    :to="to"
    :style="btn_style"
    @click="$emit('click')"
  >
    <div
      style="justify-content: flex-start;  display: flex; align-items: flex-end"
      :style="text_size"
    >
      Learn More
      <div
        class=" ml-1 mb-1 mb-1"
        :style="triangle_style"
      />
    </div>
  </v-btn>
</template>

<script>
import utilities from "@/mixins/utilities";

export default {
  name: "LearnMoreBtn",
  mixins: [utilities],
  props: {
    size: {type: Number, default: 12},
     to:  {type: String, },
    noPadding: {type: Boolean, default: false},

  },

  computed:{
    text_size(){
      return `font-size: ${this.size}pt;`
    },

    triangle_style(){
      let s2 = parseInt(this.size/2);
      let ans = 'width: 0px; height: 0px;';
      ans += `border-top: ${s2}px solid transparent;`
      ans += `border-bottom: ${s2}px solid transparent;`
      ans += `border-left: ${s2+2}px solid #2d76ba;`
      return ans;
    },

    btn_style(){
      if (this.noPadding){
        return 'padding-left: 0; padding-right: 0';
      }
      return '';
    }
  }
}
</script>

<style scoped>
.triangle{
  --width: 6px;
  width: 0;
  height: 0;
  border-top: var(--width) solid transparent;
  border-bottom: var(--width) solid transparent;
  border-left: 7px solid #2d76ba;
}
</style>