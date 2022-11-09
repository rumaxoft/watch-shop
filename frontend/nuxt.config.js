export default {
  head: {
    title: "watch-expert",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Интернет магазин оригинальных аксессуаров для часов"
      },
      {
        name: "msapplication-config",
        content: "/browserconfig.xml"
      },
      {
        name: "msapplication-TileColor",
        content: "#ffffff"
      },
      {
        name: "theme-color",
        content: "#ffffff"
      }
    ],
    link: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest" }
    ]
  },

  css: ["element-ui/lib/theme-chalk/index.css", "@/theme/index.styl"],

  plugins: [
    "@/plugins/globals",
    "@/plugins/mask.directive.client",
    "@/plugins/vuex-client-init.client"
  ],

  components: ["~/components/admin/", "~/components/main/"],

  buildModules: [],

  modules: ["@nuxtjs/axios", "@nuxtjs/dotenv"],

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: "catalog-page",
        path: "/catalog/**",
        component: resolve(__dirname, "pages/catalog.vue")
      });
    }
  },

  axios: {},

  build: {
    transpile: [/^element-ui/]
  },

  server: {
    port: process.env.NUXT_PORT, // default: 3000
    host: process.env.NUXT_HOST, // default: localhost,
    timing: false
  }
};
