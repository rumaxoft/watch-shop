<template>
  <section v-loading="loading" class="app-product">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Главная</el-breadcrumb-item>
      <el-breadcrumb-item>
        {{ product.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-alert
      class="app-product__error-message mt-16"
      v-if="error"
      :title="error"
      type="error"
      effect="dark"
    >
    </el-alert>
    <div v-if="product.name" class="app-product__product-container">
      <div class="app-product__title-container">
        <el-button
          @click="$router.go(-1)"
          class="app-product__back-button"
          type="text"
        >
          <i class="el-icon-we-arrow-left"></i>
        </el-button>
        <h1 class="app-product__title">
          {{ product.name }}
        </h1>
      </div>
      <div class="app-product__wrapper">
        <div class="app-product__image-block">
          <div class="app-product__thumbnails">
            <button
              @click="prev"
              v-show="product.images.length > thumbnails"
              v-bind:class="{
                'app-product__thumbnails-prev--active':
                  overflow === 'top' || overflow === 'both'
              }"
              class="app-product__thumbnails-prev"
              type="text"
            >
              <i class="el-icon-we-arrow-up"></i>
            </button>
            <div class="app-product__thumbnails-list-wrapper">
              <ul class="app-product__thumbnails-list" ref="thumbnails">
                <li
                  v-for="(image, index) in product.images"
                  :key="index"
                  @click="activeThumbnail = index"
                  class="app-product__thumbnails-item"
                  v-bind:class="{
                    'app-product__thumbnails-item--active':
                      index == activeThumbnail
                  }"
                >
                  <button class="app-product__thumbnails-image-container">
                    <img
                      class="app-product__thumbnails-image"
                      :src="image.thumb"
                      :alt="image.name"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <button
              @click="next"
              v-show="product.images.length > thumbnails"
              v-visible="scrollTop < scrollHeight - height"
              class="app-product__thumbnails-next"
              v-bind:class="{
                'app-product__thumbnails-prev--active':
                  overflow === 'bottom' || overflow === 'both'
              }"
              type="text"
            >
              <i class="el-icon-we-arrow-down"></i>
            </button>
          </div>
          <a
            @click.prevent="openModal = true"
            href="#"
            class="app-product__image"
          >
            <AppImage
              :src="product.images[activeThumbnail].big"
              :alt="product.name"
            />
          </a>
        </div>
        <div class="app-product__description-block">
          <el-card>
            <span>
              Цена:
            </span>
            <span class="app-product__price">
              {{
                product.discount
                  ? product.discountPrice
                  : product.price | currency
              }}
            </span>
            <span v-if="product.discount" class="app-product__former-price">{{
              product.price | currency
            }}</span>
            <el-divider></el-divider>
            <span>
              Наличие:&nbsp;
              {{ product.countInStock > 0 ? "в наличии" : "нет на складе" }}
            </span>
            <el-divider></el-divider>
            <div v-if="product.countInStock > 0">
              <span>
                Кол-во:
              </span>
              <el-select v-model="qty" placeholder="Количество">
                <el-option
                  v-for="item in product.countInStock"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <el-divider></el-divider>
            </div>
            <el-button
              @click="addToCartHandler"
              :disabled="product.countInStock == 0"
              class="app-product__button-add-to-cart"
              type="primary"
            >
              Добавить в корзину
            </el-button>
          </el-card>
          <h3 class="app-product__description-title">Описание</h3>
          <div class="app-product__description-text">
            {{ product.description }}
          </div>
        </div>
      </div>
      <el-dialog
        class="app-product__modal"
        fullscreen
        :visible.sync="openModal"
        top="0"
      >
        <AppSwiper
          :current="activeThumbnail"
          :images="product.images.map(el => el.big)"
        />
      </el-dialog>
    </div>
  </section>
</template>
<script>
import breakpointsMixin from "~/mixins/breakpoints.mixin";
import { mapGetters, mapActions } from "vuex";
const EASING = function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};
export default {
  name: "product",
  mixins: [breakpointsMixin],
  data() {
    return {
      thumbnails: 3,
      activeThumbnail: 0,
      overflow: "none",
      scrollTop: 0,
      scrollHeight: 0,
      openModal: false,
      height: 0,
      sliderTravelling: false,
      item: {},
      qty: 1
    };
  },
  validate({ params }) {
    const isVerified = params.id ? true : false;
    return isVerified;
  },
  computed: {
    ...mapGetters("products", ["loading", "error", "product"]),
    getHeight() {
      return this.$refs.thumbnails.firstChild.clientHeight;
    },
    getMargin() {
      return +getComputedStyle(
        this.$refs.thumbnails.firstChild
      ).marginBottom.slice(0, -2);
    }
  },
  methods: {
    ...mapActions("products", ["fetchProduct"]),
    appointHeight(height) {
      this.$refs.thumbnails.parentNode.style.height =
        (this.getHeight + this.getMargin) * this.thumbnails + "px";
    },
    addToCartHandler() {
      this.$router.push(`/cart/${this.$route.params.id}?qty=${this.qty}`);
    },
    handleScroll() {
      this.scrollTop = this.$refs.thumbnails.parentNode.scrollTop;
    },
    getDimensions() {
      this.scrollHeight = this.$refs.thumbnails.parentNode.scrollHeight;
      this.height = +this.$refs.thumbnails.parentNode.style.height.slice(0, -2);
    },
    animate({ duration = 300, draw, timing = EASING }) {
      let ctx = this;
      ctx.sliderTravelling = true;
      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        let progress = timing(timeFraction);

        draw(progress);

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        } else {
          ctx.sliderTravelling = false;
        }
      });
    },
    determineOverflow(content, container) {
      let containerMetrics = container.getBoundingClientRect();
      let containerMetricsTop = Math.floor(containerMetrics.top);
      let containerMetricsBottom = Math.floor(containerMetrics.bottom);
      let contentMetrics = content.getBoundingClientRect();
      let contentMetricsTop = Math.floor(contentMetrics.top);
      let contentMetricsBottom = Math.floor(contentMetrics.bottom);

      if (
        containerMetricsTop > contentMetricsTop &&
        containerMetricsBottom < contentMetricsBottom
      ) {
        return "both";
      } else if (containerMetricsTop > contentMetricsTop) {
        return "top";
      } else if (containerMetricsBottom < contentMetricsBottom) {
        return "bottom";
      } else {
        return "none";
      }
    },
    setOverflow() {
      this.overflow = this.determineOverflow(
        this.$refs.thumbnails,
        this.$refs.thumbnails.parentNode
      );
    },
    next() {
      if (this.sliderTravelling) return;
      if (this.overflow === "bottom" || this.overflow === "both") {
        let maxScroll =
          this.$refs.thumbnails.parentNode.scrollHeight -
          this.$refs.thumbnails.parentNode.clientHeight;
        let currentScroll = this.$refs.thumbnails.parentNode.scrollTop;
        let availableScroll = maxScroll - currentScroll;
        let travelDistance = this.getHeight + this.getMargin;
        if (availableScroll < travelDistance) {
          this.animate({
            draw: progress => {
              this.$refs.thumbnails.parentNode.scrollTop =
                currentScroll + progress * availableScroll;
            }
          });
        } else {
          travelDistance =
            travelDistance - (Math.round(currentScroll) % travelDistance);
          console.log("currenScroll", currentScroll);
          console.log("travelDistance: ", travelDistance);
          this.animate({
            draw: progress => {
              this.$refs.thumbnails.parentNode.scrollTop =
                currentScroll + progress * travelDistance;
            }
          });
        }
      }
    },
    prev() {
      if (this.sliderTravelling) return;
      if (this.overflow === "top" || this.overflow === "both") {
        let travelDistance = this.getHeight + this.getMargin;
        let currentScroll = this.$refs.thumbnails.parentNode.scrollTop;
        if (currentScroll < travelDistance) {
          this.animate({
            draw: progress => {
              this.$refs.thumbnails.parentNode.scrollTop =
                currentScroll - progress * currentScroll;
            }
          });
        } else {
          travelDistance =
            Math.round(currentScroll) % travelDistance || travelDistance;
          console.log("currenScroll", currentScroll);
          console.log("travelDistance: ", travelDistance);
          this.animate({
            draw: progress => {
              this.$refs.thumbnails.parentNode.scrollTop =
                currentScroll - progress * travelDistance;
            }
          });
        }
      }
    }
  },
  async fetch() {
    await this.fetchProduct(this.$route.params.id);
  },
  fetchKey(getCounter) {
    return this.$route.params.id + "-" + getCounter("product");
  },
  updated() {
    this.$refs.thumbnails.parentNode.addEventListener(
      "scroll",
      this.handleScroll,
      { passive: true }
    );
    this.$refs.thumbnails.parentNode.addEventListener(
      "scroll",
      this.setOverflow,
      { passive: true }
    );
    this.appointHeight();
    this.getDimensions();
    this.setOverflow();
  },
  beforeDestroy() {
    if (this.$refs.thumbnails) {
      this.$refs.thumbnails.parentNode.removeEventListener(
        "scroll",
        this.setOverflow
      );
      this.$refs.thumbnails.parentNode.removeEventListener(
        "scroll",
        this.handleScroll
      );
    }
  },
  watch: {
    "$route.path": "$fetch"
  }
};
</script>
<style lang="stylus">
@import '~/theme/_mixins.styl'
@import '~/theme/_colors.styl'
.app-product
  &__title-container
    display flex
    align-items center
    gap 16px
    margin-top 16px
  &__back-button
    vertical-align middle
    i
      color black
      font-size 20px
  &__wrapper
    +md()
      display flex
      gap 120px
  &__image-block
    display flex
    justify-content space-around
    align-items center
    width 100%
    margin-top 24px
    padding-bottom 16px
    border-bottom 1px solid $base-border
    +md()
      max-width 50%
      border-bottom none
  &__thumbnails
    width 160px
    margin-right 16px
  &__thumbnails-next
  &__thumbnails-prev
    border none
    background-color transparent
    color $placeholder-text
    font-size 32px
    width 100%
    padding 8px 0px
    outline none
    &--active
      color $primary
  &__thumbnails-list-wrapper
    width 100%
    overflow-y auto
    overflow-x hidden
    -ms-overflow-style -ms-autohiding-scrollbar
    -webkit-overflow-scrolling touch
    scrollbar-width none
    will-change scroll-position
    transition all .5s ease-in-out
    &::-webkit-scrollbar
      display:none
  &__thumbnails-list
    list-style none
    width 100%
  &__thumbnails-item
    padding-bottom 133.33%
    position relative
    margin-bottom 8px
    &::last-child
      margin-bottom 0
    &--active
      outline 2px solid $primary
      outline-offset -2px
  &__thumbnails-image-container
    padding 8px
    background-color transparent
    border none
    position absolute
    display block
    outline none
    top 0
    bottom 0
    left 0
    right 0
  &__thumbnails-image
    width 100%
    height 100%
    object-fit cover
  &__image
    display block
    width 600px
  .el-dialog__body
    height 90%
  &__description-block-row
    display flex
    flex-wrap wrap
    justify-content space-between
    align-items center
    margin-top 24px
  &__description-title
    margin-top 24px
  &__description-text
    margin-top 8px
  &__price-block
    padding 8px 0
    display flex
    overflow hidden
  &__price
    font-size 18px
    font-weight 700
    color $primary
    margin-right 8px
    +md()
      font-size 24px
  &__former-price
    color $secondary-text
    font-weight 500
    position relative
    padding 0 2px
    &::before
      content ''
      background-color $secondary-text
      height 2px
      width 100%
      position absolute
      left 0px
      top 10px
    &::after
      content ''
      background-color white
      height 1px
      width 100%
      position absolute
      left -2px
      top 12px
  &__button-add-to-cart
    margin-top 0
</style>
