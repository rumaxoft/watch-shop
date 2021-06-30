<template>
  <section class="app-user-orders">
    <h3 class="app-user-orders__title">Заказы</h3>
    <el-button size="small" @click="clearFilter">Сбросить фильтр</el-button>
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column type="expand">
      <template slot-scope="props">
        <p>Статус: {{ props.row.tag }}</p>
      </template>
    </el-table-column>
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column prop="id" width="100" label="Заказ"> </el-table-column>
      <el-table-column
        prop="date"
        label="Дата"
        sortable
        column-key="date"
        width="100"
      >
      </el-table-column>
      <el-table-column width="160" prop="products" label="Товары" :formatter="formatter">
        <template slot-scope="scope">
          <el-avatar fit="cover" class="app-user-orders__order-avatar" v-for="(item, index) in scope.row.products.slice(0,2)" :key="index" :size="60" :src="item.imageUrl">
            <img
              src="~/assets/image-fallback.png"
            />
          </el-avatar>
          <el-avatar v-if="scope.row.products.length - 2 > 0" class="app-user-orders__order-avatar" :size="60">+{{scope.row.products.length - 2}}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="address" width="200" label="Адрес доставки">
      </el-table-column>
      <el-table-column prop="amount" width="100" label="Сумма">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="Статус"
        :filters="[
          { text: 'Home', value: 'Home' },
          { text: 'Office', value: 'Office' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.tag === 'Доставлен' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: [],
      tableData: [
        {
          id: "265455665",
          date: "2016-05-03",
          products: [
            {
              name: "product",
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt_TCAqxr81ngdDqSVSw0-fD6qODCE75U0wYlnIEXCo_TCh8SPd7GIjtjnV9bUmAocLaL5q7aA&usqp=CAc"
            },
            {
              name: "product",
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFZm5urRf45mCpmhmsHUhle99u4doG4JQJa7J9G7jobQ6VtaKIcG7-F6T2ZElefX_jjFChlfE&usqp=CAc"
            },
            {
              name: "product",
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqjW1ViEjtlf1-FcXjKvd8H6CHr-gdxuLT70saJd0FMiOHO4QwBEyBMauNeegHjtUYT7E195o&usqp=CAc"
            },
            {
              name: "product",
              imageUrl:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_x1QYUEgYbef16FxaHQALTrROzWykyRPzG8eVUXA-RqjPIZCIjmRBIrq4CtFKTfc8UZb7Yc&usqp=CAc"
            }
          ],
          address: '350038, г.Краснодар, ул.Промышленная, д.49/2',
          amount: 2300,
          tag: "Подтвержден"
        },
        {
          id: "456878996",
          date: "2016-05-02",
          products: [1],
          address: '350038, г.Краснодар, ул.Промышленная, д.49/2',
          amount: 15000,
          tag: "Доставлен"
        },
        {
          id: "456998712",
          date: "2016-05-04",
          products: [1, 2, 3],
          address: '350038, г.Краснодар, ул.Промышленная, д.49/2',
          amount: 4500,
          tag: "Подтвержден"
        },
        {
          id: "658954236",
          date: "2016-05-01",
          products: [1, 2],
          address: '350038, г.Краснодар, ул.Промышленная, д.49/2',
          amount: 6700,
          tag: "Доставлен"
        }
      ]
    };
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter("date");
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>
<style lang="stylus">
@import '~/theme/_colors.styl'
.app-user-orders
  &__title
    margin-bottom 24px
  &__order-avatar
    font-size 18px
    border 1px solid $primary
    &:not(:first-of-type)
      margin-left -30px
</style>
