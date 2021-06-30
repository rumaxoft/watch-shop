<template>
  <el-card>
    <section class="app-arrange-order">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="name">
          <el-input placeholder="Имя" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            type="email"
            placeholder="Email"
            v-model="ruleForm.email"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input
            type="tel"
            v-mask="'+7 (999) 999-9999'"
            placeholder="+7 (___) ___-____"
            v-model="ruleForm.phone"
          ></el-input>
        </el-form-item>
        <el-form-item prop="delivery">
          <el-select
            class="app-arrange-order__select"
            v-model="ruleForm.delivery"
            placeholder="Доставка"
          >
            <el-option label="Самовывоз" value="exw"></el-option>
            <el-option label="Доставка курьером" value="courier"></el-option>
          </el-select>
        </el-form-item>
        <small
          style="display: block; padding: 0 8px 16px"
          v-if="ruleForm.delivery == 'exw'"
        >
          <b>Адрес склада: </b>г.Краснодар, ул.Промышленная, д.49/2
          <br />
          <b>Время работы: </b>8.00 - 18.00, Пн-Пт.
        </small>
        <el-form-item prop="address" v-if="ruleForm.delivery == 'courier'">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="Введите адрес доставки"
            v-model="ruleForm.address"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="payment">
          <el-select
            class="app-arrange-order__select"
            v-model="ruleForm.payment"
            placeholder="Оплата"
          >
            <el-option label="Наличные" value="cash"></el-option>
            <el-option label="Карта" value="card"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            class="app-arrange-order__button-confirm"
            type="primary"
            @click="submitForm('ruleForm')"
            >Оформить</el-button
          >
        </el-form-item>
      </el-form>
    </section>
  </el-card>
</template>
<script>
import breakpointsMixin from "~/mixins/breakpoints.mixin";

export default {
  mixins: [breakpointsMixin],
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        delivery: "",
        payment: "",
        address: ""
      },
      rules: {
        name: [{ required: true, message: "Введите имя", trigger: "blur" }],
        email: [
          { required: true, message: "Введите email", trigger: "blur" },
          {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: "Email некорректный",
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "Введите номер телефона", trigger: "blur" }
        ],
        delivery: [
          { required: true, message: "Выберите тип доставки", trigger: "blur" }
        ],
        payment: [
          { required: true, message: "Выберите тип оплаты", trigger: "blur" }
        ],
        address: [
          { required: true, message: "Введите адрес доставки", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-arrange-order
  padding 0
  &__select
    width 100%
  &__button-confirm
    margin-top 16px
</style>
