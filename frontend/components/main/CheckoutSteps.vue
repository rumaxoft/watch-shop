<template>
  <aside class="container">
    <el-steps :active="active" align-center finish-status="success">
      <el-step>
        <template v-slot:title>
          <NuxtLink class="step-link" to="/cart">
            Корзина
          </NuxtLink>
        </template>
      </el-step>
      <el-step>
        <template v-slot:title>
          <NuxtLink class="step-link" to="/cart-checkout/shipping">
            Адрес
          </NuxtLink>
        </template>
      </el-step>
      <el-step>
        <template v-slot:title>
          <NuxtLink class="step-link" to="/cart-checkout/payment">
            Оплата
          </NuxtLink>
        </template>
      </el-step>
      <el-step>
        <template v-slot:title>
          <NuxtLink class="step-link" to="/cart-checkout/place-order">
            Детали
          </NuxtLink>
        </template>
      </el-step>
    </el-steps>
  </aside>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {};
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    }
  }
};
</script>

<style lang="stylus" scoped>
.container
  margin 32px 0
.step-link
  color inherit
  text-decoration  none
  overflow-wrap break-word
  line-height 12px!important
</style>
