<template>
  <el-card>
    <section v-loading="loading" class="app-user-info">
      <div class="app-user-info__title-wrapper">
        <el-button @click="$router.go(-1)" class="back-button" type="text">
          <i class="el-icon-we-arrow-left"></i>
        </el-button>
        <h3 class="app-user-info__title">Профиль</h3>
        <button @click="openEdit = true" class="app-user-info__button-edit">
          <i class="el-icon-we-edit-2"></i>
        </button>
      </div>
      <div class="app-user-info__info">
        <div class="app-user-info__info-row">
          <small class="app-user-info__info-label">Имя:</small>
          <b class="app-user-info__info-text">{{ userDetailsById.name }}</b>
        </div>
        <div class="app-user-info__info-row">
          <small class="app-user-info__info-label">email:</small>
          <b class="app-user-info__info-text"> {{ userDetailsById.email }} </b>
          <small v-if="userDetailsById.isVerifiedEmail" style="color: #409746;">
            <i class="el-icon-we-check-circle"></i> подтвержден
          </small>
          <small v-else style="color: red;">
            <i class="el-icon-we-x-circle"></i> не подтвержден
          </small>
        </div>
        <div class="app-user-info__info-row">
          <small class="app-user-info__info-label">Роль:</small>
          <b class="app-user-info__info-text">{{
            userDetailsById.isAdmin ? "Администратор" : "Пользователь"
          }}</b>
        </div>
        <el-dialog
          :fullscreen="viewportSize == 'xs' ? true : false"
          title="Редактирование профиля"
          :visible.sync="openEdit"
        >
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="editForm"
            @submit.prevent.native="submitEditFormHandler()"
          >
            <el-form-item prop="name" label="Имя">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="Email">
              <el-input type="email" v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-checkbox v-model="ruleForm.isAdmin">
              Администратор
            </el-checkbox>
            <el-form-item class="mt-32">
              <el-button
                class="app-arrange-order__button-confirm "
                native-type="submit"
                type="primary"
              >
                Сохранить
              </el-button>
            </el-form-item>
            <el-alert v-show="this.error" :title="this.error" type="error">
            </el-alert>
          </el-form>
        </el-dialog>
      </div>
    </section>
  </el-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import breakpointsMixin from "~/mixins/breakpoints.mixin";
export default {
  name: "AppUserInfo",
  mixins: [breakpointsMixin],
  data() {
    return {
      openEdit: false,
      openEditPassword: false,
      ruleForm: {
        name: "",
        email: "",
        isAdmin: false
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
        isAdmin: [
          {
            required: true,
            message: "Выберите роль",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("users", ["getUserDetailsById", "updateUser"]),
    validatePass(rule, value, callback) {
      if (value !== this.ruleFormPassword.newPassword) {
        callback(new Error("Пароли должны совпадать"));
      } else {
        callback();
      }
    },
    submitEditFormHandler() {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          let user = {
            _id: this.userDetailsById._id,
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            isAdmin: this.ruleForm.isAdmin
          };
          await this.updateUser(user);
          if (!this.error) {
            this.openEdit = false;
          }
          this.notify();
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
    ...mapGetters("users", [
      "userInfo",
      "user",
      "userDetailsById",
      "loading",
      "error",
      "message"
    ])
  },
  async fetch() {
    if (this.userInfo.length === 0) {
      await this.fetchUserInfo();
    }
    await this.getUserDetailsById(this.$route.params.id);
  },
  fetchOnServer: false,
  fetchKey(getCounter) {
    return this.$route.params.id + "-" + getCounter("AppUserInfo");
  },
  watch: {
    openEdit: function() {
      this.ruleForm.name = this.userDetailsById.name;
      this.ruleForm.email = this.userDetailsById.email;
      this.ruleForm.isAdmin = this.userDetailsById.isAdmin;
    }
  }
};
</script>
<style lang="stylus" scoped>
.back-button
  color black
  font-size 18px
  padding 0
  margin-right 16px
.app-user-info
  &__title-wrapper
    display flex
    align-items flex-end
    margin-bottom 16px
  &__title
    margin-right 16px
  &__button-edit
    background transparent
    border none
    i
      font-size 18px
  &__info-row
    padding 8px 0
  &__button-delete
    margin-top 24px
    background transparent
    border none
</style>
