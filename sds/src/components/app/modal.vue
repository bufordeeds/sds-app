<template>
  <div class="modal">
    <slot />
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Modal",
}
</script>

<style scoped lang="scss">
  @import url('../../views/vars.css');

  .modal {
    align-items: center;
    background-color: rgba(193, 201, 210, 0.7);
    backdrop-filter: blur(10px);
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
</style>