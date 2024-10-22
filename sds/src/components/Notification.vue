<template>
  <span class="notification flex">
    <img
      v-if="type === 'info'"
      class=" notification__icon"
      src="../assets/images/icons/info-circle.png"
    >
    <p class="notification__message">
      {{ content }}
    </p>
  </span>
</template>

<script>
export default {
  name: "NotificationComponent",
  props: {
    type: { default: 'info', required: false, type: String },
    content: { required: true, type: String },
  },
}
</script>

<style lang="scss">
.notification {
  align-items: center;
  background-color: var(--alert-info-200);
  border-radius: 8px;
  column-gap: 8px;
  padding: 8px 16px;

  .notification__icon {
    height: 48px;
    width: 48px;
  }

  .notification__message {
    color: #151B25;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.2px;
    line-height: 18px;
    margin: 0;
  }
}
</style>