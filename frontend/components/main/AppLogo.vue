<template>
  <nuxtLink to="/">
    <img
      v-if="white"
      src="@/assets/img/logo-white.svg"
      alt=""
      class="applogo"
    />
    <img v-else src="@/assets/img/logo.svg" alt="" class="applogo" />
  </nuxtLink>
</template>
<script>
export default {
  props: {
    white: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>
<style lang="stylus">
.applogo
  width 100%
  height auto
</style>
