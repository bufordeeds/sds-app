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
      default: 50
    },
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    repeatTime: {
      type: Number,
      default: 5000
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
        const module = await import(`@/assets/images/icons/Lordicons/${this.icon}`);
        const animationData = module.default;

        this.animation = lottie.loadAnimation({
          container: this.$refs[this.containerRef],
          renderer: 'svg',
          loop: this.loop,
          autoplay: this.autoplay,
          animationData: animationData,
        });

        // Calculate speed based on animation duration and desired repeat time
        const duration = this.animation.getDuration() * 1000; // Convert to milliseconds
        const speed = duration / this.repeatTime;
        this.animation.setSpeed(speed);

        // Set up loop
        this.animation.addEventListener('complete', () => {
          setTimeout(() => {
            this.animation.goToAndPlay(0);
          }, this.repeatTime - duration);
        });

        // Start the animation
        this.animation.play();

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