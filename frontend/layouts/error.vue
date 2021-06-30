<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
    <h1 v-else>Произошла ошибка ...</h1>
    <NuxtLink to="/">На Главную</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>
<style lang="stylus" scoped>
.container
  width 100%
  height 100%
  display flex
  flex-direction column
  gap 32px
</style>
