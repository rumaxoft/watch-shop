export default {
  data() {
    return {
      viewportSize: null,
    };
  },
  beforeCreate() { //avoid vue[warn]
    this.viewportSize = null
  },
  beforeMount() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      const width = window.innerWidth;
      switch (true) {
        case width < 768:
          this.viewportSize = "xs";
          break;
        case width >= 768 && width < 992:
          this.viewportSize = "sm";
          break;
        case width >= 992 && width < 1200:
          this.viewportSize = "md";
          break;
        case width >= 1200 && width < 1920:
          this.viewportSize = "lg";
          break;
        case width >= 1920:
          this.viewportSize = "xl";
          break;
      }
    }
  }
};
