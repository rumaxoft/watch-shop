<template>
  <section v-loading="loading" class="register">
    <el-row class="row-top" type="flex" justify="space-between">
      <App-logo></App-logo>
      <el-button @click="$router.go(-1)">
        назад
      </el-button>
    </el-row>
    <el-row class="row-center" type="flex" justify="center" align="middle">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="registerForm"
        @submit.prevent.native="submitHandler('registerForm')"
      >
        <h3 align="center">Регистрация</h3>
        <el-form-item prop="name" label="Имя">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="Email">
          <el-input type="email" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input
            type="password"
            v-model.trim="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Повторите пароль" prop="checkPassword">
          <el-input
            type="password"
            v-model.trim="ruleForm.checkPassword"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="mt-32">
          <el-button
            class="app-arrange-order__button-confirm "
            native-type="submit"
            type="primary"
          >
            Зарегистрироваться
          </el-button>
        </el-form-item>
        <p :style="{ opacity: '0.6' }">
          нажимая на кнопку я соглашаюсь с условиями
        </p>
        <NuxtLink to="/">правил пользования интернет-магазином</NuxtLink>
        <div class="mt-32">
          <small>
            Уже зарегистрированы?
          </small>
          <el-button
            class="app-arrange-order__button-confirm "
            type="text"
            @click="goToLogin"
          >
            Войти
          </el-button>
        </div>
        <el-alert v-show="this.error" :title="this.error" type="error">
        </el-alert>
      </el-form>
    </el-row>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "Empty",
  data() {
    return {
      ruleForm: {
        name: "",
        email: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        name: [{ required: true, message: "Введите имя", trigger: "blur" }],
        email: [
          { required: true, message: "Введите email", trigger: "blur" },
          {
            required: true,
            pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
            message: "Email некорректный",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Введите пароль",
            trigger: "blur"
          },
          {
            min: 8,
            message: "Пароль должен быть не менее 8 символов",
            trigger: "blur"
          },
          {
            max: 32,
            message: "Пароль должен быть не более 32 символов",
            trigger: "blur"
          }
        ],
        checkPassword: [
          {
            required: true,
            message: "Введите пароль",
            trigger: "blur"
          },
          {
            validator: this.validatePass,
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("users", ["register"]),
    submitHandler(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.register({
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            name: this.ruleForm.name
          });
          this.notify();
          if (this.userInfo._id) {
            this.$router.push("/");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    validatePass(rule, value, callback) {
      if (value !== this.ruleForm.password) {
        callback(new Error("Пароли должны совпадать"));
      } else {
        callback();
      }
    },
    goToLogin() {
      const redirect = this.redirect
        ? `/user/login?redirect=${this.redirect}`
        : "/user/login";
      this.$router.push(redirect);
    },
    notify() {
      if (this.message) {
        this.$notify({
          message: this.message,
          position: "bottom-right",
          type: "success"
        });
      }
      if (this.error) {
        this.$notify.error({
          message: this.error,
          position: "bottom-right"
        });
      }
      if (this.alert) {
        this.$message({
          showClose: true,
          duration: 10000,
          message: this.alert,
          type: "warning"
        });
      }
    }
  },
  computed: {
    ...mapGetters("users", [
      "loading",
      "error",
      "message",
      "userInfo",
      "alert"
    ]),
    redirect() {
      return this.$route.query.redirect || null;
    }
  },
  middleware({ store, redirect, route }) {
    if (store.state.users.userInfo._id) {
      const redirectUrl = route.query.redirect ? route.query.redirect : "/";
      return redirect(redirectUrl);
    }
  }
};
</script>

<style lang="stylus">
.register
  display flex
  flex-direction column
  margin 0
  padding 0
  width 100%
  min-height 100%
.row-top
  padding 24px 32px
  color black
  flex-shrink 0
.row-center
  min-height 100%
  padding 16px
</style>
