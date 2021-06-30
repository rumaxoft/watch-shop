<template>
  <section class="app-contacts">
    <div class="app-contacts__content">
      <div class="app-contacts__text-wrapper">
        <p class="app-contacts__subtitle">Watch-expert</p>
        <ul class="app-contacts__list">
          <li class="app-contacts__list-item">
            <p class="app-contacts__list-item-content">
              <i class="app-contacts__icon el-icon-we-map-pin"></i>
              <span class="app-contacts__list-item-text">{{
                contacts.address
              }}</span>
            </p>
            <button
              @click="showNavigation = true"
              class="app-contacts__navigate-button reset-button-css"
            >
              Проложить маршрут
            </button>
          </li>
          <li class="app-contacts__list-item">
            <a
              :href="`tel:${contacts.phoneNumber.code}`"
              class="app-contacts__list-item-content"
            >
              <i class="app-contacts__icon el-icon-we-phone"></i>
              <p class="app-contacts__list-item-text">
                {{ contacts.phoneNumber.human }}
              </p>
            </a>
          </li>
          <li class="app-contacts__list-item">
            <a
              :href="`mailto:${contacts.email}`"
              class="app-contacts__list-item-content"
            >
              <i class="app-contacts__icon el-icon-we-mail"></i>
              <p class="app-contacts__list-item-text">
                {{ contacts.email }}
              </p>
            </a>
          </li>
          <li class="app-contacts__list-item">
            <a
              :href="contacts.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="app-contacts__list-item-content"
            >
              <i class="app-contacts__icon el-icon-we-whatsapp"></i>
              <p class="app-contacts__list-item-text">
                напишите нам в whatsapp
              </p>
            </a>
          </li>
          <li class="app-contacts__list-item">
            <a
              :href="contacts.telegram"
              target="_blank"
              rel="noopener noreferrer"
              class="app-contacts__list-item-content"
            >
              <i class="app-contacts__icon el-icon-we-telegram"></i>
              <p class="app-contacts__list-item-text">
                напишите нам в telegram
              </p>
            </a>
          </li>
        </ul>
      </div>
      <div ref="yandexMap" class="app-contacts__map">
        <div class="app-contacts__map-fallback-wrapper">
          <img
            v-lazy="require('@/assets/img/map.png')"
            alt="map"
            class="app-contacts__map-fallback"
          />
        </div>
      </div>
    </div>
    <AppGetDirections v-if="showNavigation" @close="showNavigation = false" />
  </section>
</template>
<script>
export default {
  name: "AppContacts",
  data: () => {
    return {
      showNavigation: false,
      yandexMapShown: false,
      contacts: {
        phoneNumber: {
          human: "+7 (900) 246-80-68",
          code: "+79002468068"
        },
        address: "350038, г.Краснодар, ул.Промышленная, д.49/2",
        email: "info@bldzr.ru",
        whatsapp: "https://wa.me/+79002468068",
        telegram: "tg://resolve?domain=helixkrd",
        instagram:
          "https://www.instagram.com/p/CFRhNqoBW2J/?igshid=occ1qs3gjt6p",
        vkontakte: "https://vk.com/remonttut23"
      }
    };
  },
  methods: {
    showMap() {
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ada65849de0593c5873d9d5ad1f68f7ff60cfb2b54391c598e5108561568259dd&amp;width=100%25&amp;height=400&amp;lang=ru_RU&amp;scroll=true";
      if (this.$refs.yandexMap) {
        this.$refs.yandexMap.appendChild(script);
      }
    },
    deferYandexMap() {
      let mapContainer = this.$refs.yandexMap;

      window.addEventListener(
        "scroll",
        () => {
          if (!this.yandexMapShown) {
            if (
              window.innerHeight > mapContainer.getBoundingClientRect().bottom
            ) {
              this.showMap();
              this.yandexMapShown = true;
            }
          }
        },
        { passive: true }
      );
    }
  },
  mounted() {
    this.deferYandexMap();
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-contacts
  overflow hidden
  box-sizing border-box
  background-color white
  padding-top 32px
  margin-bottom 32px
  +sm()
    padding-top 64px
  &__content
    +sm()
      display flex
  &__subtitle
    margin 0
    padding-bottom 16px
    text-align center
    font-weight 700
    font-size 24px
    line-height 32px
    text-transform uppercase
    +sm()
      line-height auto
    +md()
      padding-bottom 32px
  &__list
    margin 0
    padding 0
    list-style none
  &__list-item
    margin 0
    padding 0
    margin-bottom 24px
  &__list-item-content
    margin 0
    padding 0
    display flex
    align-items flex-start
    text-decoration none
  &__list-item-text
    margin 0
    padding 0
    padding-left 16px
    font-family roboto
    line-height auto
    color $primary-text
    font-size 14px
    +sm()
      font-size 18px
  &__navigate-button
    display block
    background-color transparent
    border none
    margin-top 16px
    padding-left 48px
    font-family roboto
    font-weight 700
    font-size 16px
    color $darkGrey
    text-decoration underline
    +lg()
      display none
  &__icon
    flex-shrink 0
    color $primary
    font-size 24px
  &__map
    position relative
    height 400px
    width 100%
    overflow hidden
    +sm()
      width 70%
      order -1
      margin-right 32px
  &__map-fallback-wrapper
    position absolute
    top 0
    right 0
    left 0
    bottom 0
  &__map-fallback
    height 100%
    width 100%
    object-fit cover
</style>
