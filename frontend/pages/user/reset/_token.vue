<template>
  <section v-loading="loading" class="reset">
    <el-row class="row-top" type="flex" justify="space-between">
      <App-logo></App-logo>
      <el-button @click="$router.push('/')">
        на главную
      </el-button>
    </el-row>
    <el-row class="row-center" type="flex" justify="center" align="middle">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="resetForm"
        @submit.prevent.native="submitHandler"
      >
        <h3 align="center">Восстановление пароля</h3>
        <el-form-item
          class="mt-32"
          label="Введите новый пароль"
          prop="password"
        >
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
            Сменить пароль
          </el-button>
        </el-form-item>
        <el-alert v-if="this.error" :title="this.error" type="error">
        </el-alert>
      </el-form>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: "Empty",
  name: "ResetPassword",
  validate({ params }) {
    const isVerified = params.token ? true : false;
    return isVerified;
  },
  data() {
    return {
      loading: false,
      message: "",
      error: "",
      ruleForm: {
        password: "",
        checkPassword: ""
      },
      rules: {
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
  computed: {
    ...mapGetters('apiUrl', ["getApiUrl"]),
  },
  methods: {
    submitHandler() {
      this.$refs.resetForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            this.error = "";
            this.message = "";
            const token = this.$route.params.token;
            const config = {
              headers: {
                "Content-type": "application/json"
              }
            };
            const { data } = await this.$axios.put(
              `${this.getApiUrl}/reset/${token}`,
              { password: this.ruleForm.password },
              config
            );
            this.message = "Пароль успешно изменен";
            this.loading = false;
            this.notify();
            this.$router.push("/user/login");
          } catch (error) {
            this.error = error.response?.data?.message
              ? error.response.data.message
              : error.message;
            this.loading = false;
            this.notify();
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
  }
};
</script>

<style lang="stylus">
.reset
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
