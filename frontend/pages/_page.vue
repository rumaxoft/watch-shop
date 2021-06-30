<template>
  <h1>
    {{ pageContent[$route.params.page] }}
  </h1>
</template>

<script>
export default {
  name: "page",
  data: () => ({
    pageContent: {
      ["service"]: "Страница о ремонте",
      ["about"]: "О нас",
      ["gallery"]: "Фотогаллерея",
      ["delivery-terms"]: "Условия доставки"
    }
  }),
  created() {
    const isVerified = Object.keys(this.pageContent).includes(
      this.$route.params.page
    );
    if (!isVerified) {
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
