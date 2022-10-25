<template>
  <section v-loading="loading" class="app-user-orders">
    <h3 class="app-user-orders__title">Заказы</h3>
    <el-button size="small" @click="clearFilter">Сбросить фильтр</el-button>
    <el-table
      ref="filterTable"
      :data="normalizedOrdersList"
      style="width: 100%"
    >
      <el-table-column prop="id" width="100" label="Заказ">
        <template slot-scope="scope">
          <NuxtLink :to="`/admin/order/${scope.row.id}`">
            <small>{{ scope.row.id }}</small>
          </NuxtLink>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="Дата"
        sortable
        column-key="date"
        width="100"
      >
      </el-table-column>
      <el-table-column
        width="160"
        prop="products"
        label="Товары"
        :formatter="formatter"
      >
        <template slot-scope="scope">
          <el-avatar
            fit="cover"
            class="app-user-orders__order-avatar"
            v-for="(item, index) in scope.row.products.slice(0, 2)"
            :key="index"
            :size="60"
            :src="item.image"
          >
            <img src="~/assets/image-fallback.png" />
          </el-avatar>
          <el-avatar
            v-if="scope.row.products.length - 2 > 0"
            class="app-user-orders__order-avatar"
            :size="60"
            >+{{ scope.row.products.length - 2 }}</el-avatar
          >
        </template>
      </el-table-column>
      <el-table-column prop="amount" width="100" label="Сумма">
      </el-table-column>
      <el-table-column
        prop="paid"
        label="Оплата"
        :filters="[
          { text: 'не оплачен', value: 'notPaid' },
          { text: 'оплачен', value: 'paid' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="scope.row.paid === 'не оплачен' ? 'warning' : 'success'"
            disable-transitions
            >{{ scope.row.paid }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="delivered"
        label="Оплата"
        :filters="[
          { text: 'не доставлен', value: 'notDelivered' },
          { text: 'доставлен', value: 'delivered' }
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        width="120"
      >
        <template slot-scope="scope">
          <el-tag
            size="small"
            :type="
              scope.row.delivered === 'не доставлен' ? 'warning' : 'success'
            "
            disable-transitions
            >{{ scope.row.delivered }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("orders", ["getOrdersListByUserId"]),
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
    ...mapGetters("orders", [
      "fetchedOrdersByUserId",
      "loading",
      "error",
      "message"
    ]),
    normalizedOrdersList() {
      return this.fetchedOrdersByUserId.map(el => {
        return {
          id: el._id,
          date: new Intl.DateTimeFormat("ru-RU").format(new Date(el.createdAt)),
          products: el.orderItems,
          amount: el.totalPrice,
          paid: el.isPaid ? "оплачен" : "не оплачен",
          delivered: el.isDelivered ? "доставлен" : "не доставлен"
        };
      });
    }
  },
  async fetch() {
    try {
      await this.getOrdersListByUserId(this.$route.params.id);
    } catch (error) {
      this.notify();
    }
  },
  fetchOnServer: false
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
