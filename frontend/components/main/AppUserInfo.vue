<template>
  <el-card>
    <section v-loading="loading" class="app-user-info">
      <div class="app-user-info__title-wrapper">
        <h3 class="app-user-info__title">Профиль</h3>
        <button @click="openEdit = true" class="app-user-info__button-edit">
          <i class="el-icon-we-edit-2"></i>
        </button>
      </div>
      <div class="app-user-info__info">
        <div class="app-user-info__info-row">
          <small class="app-user-info__info-label">Имя:</small>
          <b class="app-user-info__info-text">{{ user.name }}</b>
        </div>
        <div class="app-user-info__info-row">
          <small class="app-user-info__info-label">email:</small>
          <b class="app-user-info__info-text"> {{ user.email }} </b>
          <small v-if="user.isVerifiedEmail" style="color: #409746;">
            <i class="el-icon-we-check-circle"></i> подтвержден
          </small>
          <small v-else style="color: red;">
            <i class="el-icon-we-x-circle"></i> не подтвержден
          </small>
        </div>
        <el-row class="mt-32" :gutter="24" type="flex" align="middle">
          <el-col :span="12">
            <el-button
              @click="openEditPassword = true"
              class="app-user-info__button-change"
              >Изменить пароль</el-button
            >
          </el-col>
          <el-col :span="12">
            <NuxtLink to="/user/reset-request">
              Забыли пароль?
            </NuxtLink>
          </el-col>
        </el-row>
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
        <el-dialog
          :fullscreen="viewportSize == 'xs' ? true : false"
          title="Изменить пароль"
          :visible.sync="openEditPassword"
        >
          <el-form
            :model="ruleFormPassword"
            :rules="rulesPassword"
            ref="passwordForm"
            @submit.prevent.native="submitPasswordFormHandler()"
          >
            <el-form-item label="Действующий пароль" prop="password">
              <el-input
                type="password"
                v-model.trim="ruleFormPassword.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Новый пароль" prop="newPassword">
              <el-input
                type="password"
                v-model.trim="ruleFormPassword.newPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Повторите пароль" prop="checkPassword">
              <el-input
                type="password"
                v-model.trim="ruleFormPassword.checkPassword"
                autocomplete="off"
              ></el-input>
            </el-form-item>
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
        email: ""
      },
      ruleFormPassword: {
        password: "",
        newPassword: "",
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
        ]
      },
      rulesPassword: {
        password: [
          {
            required: true,
            message: "Введите пароль",
            trigger: "blur"
          }
        ],
        newPassword: [
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
  async fetch() {
    if (this.userInfo.length === 0) {
      await this.fetchUserInfo();
    }
  },
  methods: {
    ...mapActions("users", ["getUserDetails", "updateUserProfile"]),
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
            id: this.user._id,
            name: this.ruleForm.name,
            email: this.ruleForm.email
          };
          await this.updateUserProfile(user);
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
    submitPasswordFormHandler() {
      this.$refs.passwordForm.validate(async valid => {
        if (valid) {
          let user = {
            id: this.user._id,
            password: this.ruleFormPassword.password,
            newPassword: this.ruleFormPassword.newPassword
          };
          await this.updateUserProfile(user);
          if (!this.error) {
            this.openEditPassword = false;
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
    ...mapGetters("users", ["userInfo", "user", "loading", "error", "message"])
  },
  async fetch() {
    if (!this.user.name) {
      await this.getUserDetails("profile");
    }
  },
  fetchOnServer: false,
  fetchKey(getCounter) {
    return this.$route.params.id + "-" + getCounter("AppUserInfo");
  },
  watch: {
    openEdit: function() {
      this.ruleForm.name = this.user.name;
      this.ruleForm.email = this.user.email;
    }
  }
};
</script>
<style lang="stylus">
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
