<template>
  <section v-loading="loading" class="verify">
    <el-row class="row-top" type="flex" justify="space-around">
      <App-logo></App-logo>
      <el-button @click="$router.push('/')">
        На главную
      </el-button>
    </el-row>
    <div v-if="success">
      <el-row class="row-center" type="flex" justify="center" align="middle">
        <el-col>
          <h3 align="center">Вы подтвердили email!</h3>
        </el-col>
      </el-row>
      <el-row class="row-center" type="flex" justify="center" align="middle">
        <el-col :xs="16" :sm="12" :md="6">
          <svg
            width="100%"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M440 72H40C22.3269 72 8 86.3269 8 104V360C8 377.673 22.3269 392 40 392H440C457.673 392 472 377.673 472 360V104C472 86.3269 457.673 72 440 72Z"
              fill="#FFB632"
            />
            <path
              d="M472 104V113.27L260.23 237.41C254.094 241.005 247.111 242.9 240 242.9C232.889 242.9 225.906 241.005 219.77 237.41L8.00003 113.27V104C7.99638 101.326 8.32898 98.6614 8.99003 96.07C10.0705 96.1969 11.1127 96.5477 12.05 97.1L227.86 223.61C231.543 225.766 235.733 226.903 240 226.903C244.267 226.903 248.458 225.766 252.14 223.61L467.95 97.1C468.887 96.5477 469.93 96.1969 471.01 96.07C471.671 98.6614 472.004 101.326 472 104V104Z"
              fill="#E09F2C"
            />
            <path
              d="M400 472C457.438 472 504 425.438 504 368C504 310.562 457.438 264 400 264C342.562 264 296 310.562 296 368C296 425.438 342.562 472 400 472Z"
              fill="#009746"
            />
            <path
              d="M376 424C375.854 424 375.706 424 375.558 423.987C374.434 423.925 373.337 423.627 372.337 423.113C371.336 422.598 370.456 421.878 369.753 421L337.753 381C336.427 379.343 335.813 377.227 336.047 375.118C336.281 373.009 337.343 371.079 339 369.753C340.656 368.427 342.772 367.813 344.881 368.047C346.991 368.281 348.921 369.343 350.247 371L376.663 404.02L450.343 330.341C451.843 328.841 453.878 327.998 456 327.998C458.121 327.998 460.156 328.841 461.657 330.341C463.157 331.841 464 333.876 464 335.998C464 338.12 463.157 340.155 461.657 341.655L381.657 421.655C380.914 422.398 380.032 422.988 379.061 423.39C378.091 423.793 377.05 424 376 424V424Z"
              fill="#FBE9D8"
            />
          </svg>
        </el-col>
      </el-row>
    </div>
    <div v-else>
      <el-row class="row-center" type="flex" justify="center" align="middle">
        <el-col>
          <h3 align="center">Ошибка подтверждения пароля!</h3>
        </el-col>
      </el-row>
      <el-row class="row-center" type="flex" justify="center" align="middle">
        <el-col :xs="16" :sm="12" :md="6">
          <svg
            width="100%"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M440 56H40C22.3269 56 8 70.3269 8 88V344C8 361.673 22.3269 376 40 376H440C457.673 376 472 361.673 472 344V88C472 70.3269 457.673 56 440 56Z"
              fill="#FFB632"
            />
            <path
              d="M472 88V97.27L260.23 221.41C254.094 225.005 247.111 226.9 240 226.9C232.889 226.9 225.906 225.005 219.77 221.41L8.00003 97.27V88C7.99638 85.3256 8.32898 82.6614 8.99003 80.07C10.0705 80.1969 11.1127 80.5477 12.05 81.1L227.86 207.61C231.543 209.766 235.733 210.903 240 210.903C244.267 210.903 248.458 209.766 252.14 207.61L467.95 81.1C468.887 80.5477 469.93 80.1969 471.01 80.07C471.671 82.6614 472.004 85.3256 472 88V88Z"
              fill="#E09F2C"
            />
            <path
              d="M400 456C457.438 456 504 409.438 504 352C504 294.562 457.438 248 400 248C342.562 248 296 294.562 296 352C296 409.438 342.562 456 400 456Z"
              fill="#FF3162"
            />
            <path
              d="M439.6 399.6C438.549 399.601 437.509 399.395 436.538 398.993C435.567 398.591 434.685 398.001 433.943 397.257L354.743 318.062C353.243 316.562 352.4 314.527 352.399 312.405C352.399 310.283 353.242 308.248 354.742 306.747C356.243 305.247 358.278 304.404 360.4 304.404C362.522 304.404 364.557 305.247 366.057 306.747L445.257 385.942C446.376 387.061 447.138 388.486 447.447 390.038C447.756 391.59 447.598 393.199 446.992 394.661C446.387 396.123 445.361 397.373 444.045 398.252C442.729 399.131 441.182 399.6 439.6 399.6V399.6Z"
              fill="#FBE9D8"
            />
            <path
              d="M360.4 399.6C358.817 399.6 357.27 399.131 355.954 398.252C354.638 397.373 353.613 396.123 353.007 394.661C352.402 393.199 352.243 391.59 352.552 390.038C352.861 388.486 353.624 387.061 354.743 385.942L433.943 306.747C435.443 305.247 437.478 304.404 439.6 304.404C441.722 304.404 443.757 305.247 445.257 306.747C446.758 308.248 447.6 310.283 447.6 312.405C447.6 314.527 446.757 316.562 445.257 318.062L366.057 397.257C365.314 398.001 364.433 398.591 363.462 398.993C362.491 399.395 361.45 399.601 360.4 399.6Z"
              fill="#FBE9D8"
            />
          </svg>
        </el-col>
      </el-row>
      <el-row class="row-center" type="flex" justify="center" align="middle">
        <p>
          Сообщите пожалуйста об ошибке в службу поддержки по телефону: +7 (123)
          456-78-90
        </p>
      </el-row>
    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "EmailVerification",
  layout: "Empty",
  data: () => ({
    success: false,
    loading: true,
    message: "",
    alert: "",
    error: ""
  }),
  validate({ params }) {
    const isVerified = params.token ? true : false;
    return isVerified;
  },
  async fetch() {
    this.loading = true;
    try {
      const token = this.$route.params.token;
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await this.$axios.put(
        `${this.getApiUrl}/users/verify`,
        { token },
        config
      );
      this.alert =
        "Email успешно подтвержден. Теперь вы можете оформлять заказы на сайте";
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
  },
  fetchOnServer: false,
  methods: {
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
          type: "success"
        });
      }
    }
  },
  computed: {
    ...mapGetters('apiUrl', ["getApiUrl"])
  }
};
</script>

<style lang="stylus">
.verify
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
