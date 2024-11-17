<template>
  <div class="flex horizontal-divider">
    <span class="horizontal-divider__line" />
    <span class="horizontal-divider__text">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: "HorizontalDivider",
  props: {
    label: { default: 'or', required: false, type: String },
  }
}
</script>

<style lang="css" scoped>
.horizontal-divider {
  align-items: center;
  justify-content: center;
  position: relative;
}

.horizontal-divider__line {
  background: var(--text-medium, #616165);
  height: 1px;
  position: absolute;
  width: 100%;
}

.horizontal-divider__text {
  background-color: var(--surface-light-white);
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.2px;
  padding: 0 12px;
  position: absolute;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
</style>