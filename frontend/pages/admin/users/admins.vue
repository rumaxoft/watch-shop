<template>
  <AppUsersList v-loading="loading" :users="adminUsers" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters("users", ["loading", "message", "error", "users"]),
    adminUsers() {
      return this.users.filter(el => el.isAdmin === true);
    }
  },
  methods: {
    ...mapActions("users", ["getUsers"])
  },
  async fetch() {
    if (!this.users.length) {
      await this.getUsers();
    }
  },
  fetchOnServer: false
};
</script>

<style lang="stylus" scoped></style>
