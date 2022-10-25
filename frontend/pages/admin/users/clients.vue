<template>
  <AppUsersList v-loading="loading" :users="clientUsers" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters("users", ["loading", "message", "error", "users"]),
    clientUsers() {
      return this.users.filter(el => el.isAdmin === false);
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
