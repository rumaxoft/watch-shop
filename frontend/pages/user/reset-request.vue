<template>
  <section v-loading="loading" class="reset-request">
    <el-row class="row-top" type="flex" justify="space-between">
      <App-logo></App-logo>
      <el-button @click="$router.push('/')">
        На главную
      </el-button>
    </el-row>
    <el-row class="row-top" v-if="success">
      <h3>Успешно!</h3>
      <p>
        На указанный адрес электронной почты вам отпрален email с инструкцией по
        сбросу пароля.
      </p>
    </el-row>
    <el-row
      v-else
      class="row-center"
      type="flex"
      justify="center"
      align="middle"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="resetRequestForm"
        @submit.prevent.native="submitHandler()"
      >
        <h3 align="center">Восстановление пароля</h3>
        <p class="mt-16">
          Вам будет отправлено письмо на email с инструкциями по восстановлению
          пароля.
        </p>
        <el-form-item prop="email" label="Email">
          <el-input type="email" v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item class="mt-32">
          <el-button
            class="app-arrange-order__button-confirm "
            native-type="submit"
            type="primary"
          >
            Отправить инструкцию
          </el-button>
        </el-form-item>
        <el-alert v-show="this.error" :title="this.error" type="error">
        </el-alert>
      </el-form>
    </el-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "Empty",
  data() {
    return {
      success: false,
      loading: false,
      error: "",
      ruleForm: {
        email: ""
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
        ]
      }
    };
  },
  computed: {
    ...mapGetters('apiUrl', ["getApiUrl"]),
  },
  methods: {
    submitHandler() {
      this.$refs.resetRequestForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            this.error = "";
            this.message = "";
            this.success = false;
            const config = {
              headers: {
                "Content-type": "application/json"
              }
            };
            const { data } = await this.$axios.post(
              `${this.getApiUrl}/reset`,
              { email: this.ruleForm.email },
              config
            );
            this.message = `Email с инструкцией по сбросу пароля отправлен ${data.emailId}`;
            this.loading = false;
            this.success = true;
            this.notify();
          } catch (error) {
            this.success = false;
            this.loading = false;
            this.error = error.response?.data?.message
              ? error.response.data.message
              : error.message;
            this.notify();
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
  }
};
</script>

<style lang="stylus">
.reset-request
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
