<template>
  <section v-loading="loading" class="users">
    <keep-alive>
      <el-input class="search" v-model="search" placeholder="Поиск">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </keep-alive>
    <el-table :data="filteredData" style="width: 100%; min-width: 1000px">
      <el-table-column label="id" prop="_id"> </el-table-column>
      <el-table-column label="Имя" prop="name"> </el-table-column>
      <el-table-column label="Email" prop="email"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetails(scope.row)"
            >Детали</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >Удалить</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AppUsersList",
  props: {
    users: {
      type: Array
    }
  },
  data: () => ({
    search: "",
    filteredData: []
  }),
  methods: {
    ...mapActions("users", ["deleteUser", "getUsers"]),
    handleDetails(elem) {
      this.$router.push(`/admin/user/${elem._id}`);
    },
    handleDelete(userId) {
      this.$confirm("Вы уверены, что хотите удалить пользователя?", "Warning", {
        confirmButtonText: "Да",
        cancelButtonText: "Отмена",
        type: "warning"
      })
        .then(async () => {
          console.log(userId);
          try {
            await this.deleteUser(userId);
            await this.getUsers();
            this.notify();
          } catch (error) {
            this.notify();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Отменено"
          });
        });
    },
    debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    },
    filterData() {
      this.filteredData = this.users.filter(
        data =>
          !this.search ||
          data.name.toLowerCase().includes(this.search.toLowerCase())
      );
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
    ...mapGetters("users", ["loading", "message", "error"])
  },
  watch: {
    search: function() {
      this.debouncedFilterData();
    },
    users: function() {
      this.debouncedFilterData();
    }
  },
  created() {
    this.debouncedFilterData = this.debounce(this.filterData);
  },
  mounted() {
    this.filterData();
  }
};
</script>

<style lang="stylus" scoped>
.users
  width 100%
  overflow auto
.search
  max-width 200px
</style>
