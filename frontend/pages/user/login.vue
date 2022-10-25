<template>
  <section v-loading="loading" class="login">
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
        ref="loginForm"
        @submit.prevent.native="submitHandler('loginForm')"
      >
        <h3 align="center">Вход</h3>
        <el-form-item prop="email" label="Email">
          <el-input type="email" v-model.trim="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input
            type="password"
            v-model.trim="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row :gutter="24" type="flex" align="middle">
          <el-col :span="12">
            <el-form-item class="mt-32">
              <el-button
                class="app-arrange-order__button-confirm "
                native-type="submit"
                type="primary"
              >
                Войти
              </el-button>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <NuxtLink to="/user/reset-request">
              Забыли пароль?
            </NuxtLink>
          </el-col>
        </el-row>
        <small class="mt-32">Еще не зарегистрированы?</small>
        <el-button
          class="app-arrange-order__button-confirm "
          type="text"
          @click="goToRegistration"
        >
          Зарегистрироваться
        </el-button>
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
        email: "",
        password: ""
      },
      rules: {
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
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("users", ["login"]),
    goToRegistration() {
      const redirect = this.redirect
        ? `/user/registration?redirect=${this.redirect}`
        : "/user/registration";
      this.$router.push(redirect);
    },
    submitHandler(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.login({
            email: this.ruleForm.email,
            password: this.ruleForm.password
          });
          this.notify();
          if (this.userInfo._id) {
            this.$router.push(this.redirect);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    }
  },
  computed: {
    ...mapGetters("users", ["loading", "message", "error", "userInfo"]),
    redirect() {
      return this.$route.query.redirect || "/";
    }
  },
  created() {
    if (this.$store.state.users.userInfo._id) {
      this.$router.push("/user/profile");
    }
  }
};
</script>

<style lang="stylus">
.login
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
