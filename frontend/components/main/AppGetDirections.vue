<template>
  <transition appear name="app-get-directions">
    <div @click.self="$emit('close')" class="app-get-directions">
      <div class="app-get-directions__content-wrapper">
        <div class="app-get-directions__content">
          <p class="app-get-directions__title">
            Проложить маршрут:
          </p>
          <div class="app-get-directions__links-container">
            <a
              :href="
                `google.app-get-directions:q=${coords.latitude},${coords.longitude}&amp;mode=d`
              "
              class="app-get-directions__link"
            >
              <span
                class="app-get-directions__link-icon app-get-directions__link-icon--google-maps"
              ></span>
              <span class="app-get-directions__link-text">Google карты</span>
            </a>
            <a
              :href="
                `yandexnavi://build_route_on_map?lat_to=${coords.latitude}&lon_to=${coords.longitude}`
              "
              class="app-get-directions__link"
            >
              <span
                class="app-get-directions__link-icon app-get-directions__link-icon--yandex-nav"
              ></span>
              <span class="app-get-directions__link-text">Яндекс навигатор</span>
            </a>
            <a
              :href="
                `yandexmaps://build_route_on_map?lat_to=${coords.latitude}&lon_to=${coords.longitude}`
              "
              class="app-get-directions__link"
            >
              <span
                class="app-get-directions__link-icon app-get-directions__link-icon--yandex-maps"
              ></span>
              <span class="app-get-directions__link-text">Яндекс карты</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "AppGetDirections",
  data: () => {
    return {
      coords: {
        latitude: 45.03862840705398,
        longitude: 39.00404710615154
      }
    };
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-get-directions
    position fixed
    z-index 100
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,0.75)
    transition: opacity 0.3s ease;
    display flex
    justify-content center
    align-items flex-end
    +md()
        padding 0 60px
    &__content-wrapper
      background-color white
      padding 24px 0
      width 100%
      position relative
      transition: all 0.3s ease;
      // transform translateY(100%)
      +sm()
        max-width 600px
    &__content
      padding 0 16px
      background-color white
    &__title
      font-family roboto
      font-weight 700
      font-size 18px
      color #333
      text-align center
    &__links-container
      display flex
      justify-content center
      margin-top 36px
      width 100%
    &__link
      display flex
      flex-direction column
      align-items center
      width 100px
      text-decoration none
    &__link-icon
      display block
      background-size cover
      width 36px
      height 36px
      &--google-maps
        background-image url('~@/assets/img/Google_Maps_icon.svg')
      &--yandex-nav
        background-image url('~@/assets/img/YandexNavigatorLogo.svg')
      &--yandex-maps
        background-image url('~@/assets/img/YandexMaps.svg')
    &__link-text
      display block
      margin-top 8px
      font-family roboto
      font-size 16px
      color #333
      text-align center

// Vue transition styles
.app-get-directions-enter {
  opacity: 0;
}

.app-get-directions-leave-active {
  opacity: 0;
}

.app-get-directions-enter .app-get-directions__content-wrapper,
.app-get-directions-leave-active .app-get-directions__content-wrapper {
  transform: translateY(100%);
}
</style>
