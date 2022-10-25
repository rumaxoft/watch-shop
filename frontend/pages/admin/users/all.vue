<template>
  <AppUsersList v-loading="loading" :users="users" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data: () => ({}),
  computed: {
    ...mapGetters("users", ["loading", "message", "error", "users"])
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
