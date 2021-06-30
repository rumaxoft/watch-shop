<template>
  <section class="app-search-result">
    <h3 class="app-search__title">
      Результаты поиска
    </h3>
    <el-row class="app-search__row" :gutter="32">
      <el-col
        class="app-search__col"
        :xs="12"
        :sm="6"
        :md="4"
        :lg="4"
        :xl="4"
        v-for="(item, index) in searchResult"
        :key="index"
        ><AppCard :options="item" />
      </el-col>
    </el-row>
    <el-pagination
      class="app-search__pagination"
      layout="prev, pager, next"
      :total="50"
    >
    </el-pagination>
  </section>
</template>
<script>
export default {
  data() {
    return {
      searchResult: [
        {
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_TCAqxr81ngdDqSVSw0-fD6qODCE75U0wYlnIEXCo_TCh8SPd7GIjtjnV9bUmAocLaL5q7aA&usqp=CAc",
          description: "Ремешок фирменный ",
          price: 23000,
          formerPrice: ""
        },
        {
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFZm5urRf45mCpmhmsHUhle99u4doG4JQJa7J9G7jobQ6VtaKIcG7-F6T2ZElefX_jjFChlfE&usqp=CAc",
          description:
            "Ремешок стальной универсальный, подходит для всего чего",
          price: 3400,
          formerPrice: 5000
        },
        {
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqjW1ViEjtlf1-FcXjKvd8H6CHr-gdxuLT70saJd0FMiOHO4QwBEyBMauNeegHjtUYT7E195o&usqp=CAc",
          description: "Зарядное устройство для акомуляторных батарей",
          price: 600,
          formerPrice: 800
        },
        {
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_x1QYUEgYbef16FxaHQALTrROzWykyRPzG8eVUXA-RqjPIZCIjmRBIrq4CtFKTfc8UZb7Yc&usqp=CAc",
          description: "Зарядка для телефона подходит для всех типов",
          price: 360,
          formerPrice: 700
        },
        {
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkjLTW_H5Yq7jcuNlzK4mma1WAgmAEhW-ifbl8nvK-Pf5YbvBVWwJxZLxN39NC1ApS0Mx6uNs&usqp=CAc",
          description: "Батарейка для часов, будут ходить вечно",
          price: 790
        },
        {
          imageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiIJ90QyIlgZrNjHlMy5Buxq-kX4TCjUxfZ2jCy3lz7m0B5nR_TgPOXda1EvO9q3vk0a7xzH5o&usqp=CAc",
          description: "Батарейка для весов. 3В. Подходит и не для весов",
          price: 30
        }
      ]
    };
  }
};
</script>
<style lang="stylus">
.app-search
  &__title
    margin-bottom 32px
  &__pagination
    padding 32px 0
  &__col
    margin-bottom 24px
</style>
