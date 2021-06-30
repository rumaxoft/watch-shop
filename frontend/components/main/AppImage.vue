<template>
  <div>
    <div class="container">
      <div class="wrapper">
        <img :src="src" :alt="alt" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    src: {
      type: String
    },
    alt: {
      type: String
    }
  }
};
</script>
<style lang="stylus" scoped>
.container
  padding-bottom 133.33%
  position relative
.wrapper
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  img
    width 100%
    height 100%
    object-fit cover
</style>
