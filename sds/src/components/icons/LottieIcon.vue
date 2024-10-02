<template>
  <div :ref="containerRef"></div>
</template>

<script>
import lottie from 'lottie-web';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LottieIcon',
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 32
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      containerRef: `lottie-container-${this._uid}`,
      animation: null
    };
  },
  mounted() {
    this.loadAnimation();
  },
  methods: {
    async loadAnimation() {
      try {

        console.log('Loading animation:', this.icon);
        const module = await import(`@/assets/images/icons/Lordicons/${this.icon}`);
        console.log('Animation data loaded:', module);
        const animationData = module.default;

        this.animation = lottie.loadAnimation({
          container: this.$refs[this.containerRef],
          renderer: 'svg',
          loop: this.loop,
          autoplay: this.autoplay,
          animationData: animationData,
        });

        console.log('Animation created:', this.animation);

        this.$refs[this.containerRef].style.width = `${this.size}px`;
        this.$refs[this.containerRef].style.height = `${this.size}px`;
      } catch (error) {
        console.error('Failed to load animation:', error);
      }
    }
  },
  beforeUnmount() {
    if (this.animation) {
      this.animation.destroy();
    }
  }
});
</script>