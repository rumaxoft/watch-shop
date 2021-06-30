  export default function currencyFilter(value) {
      if (!value) return "";
      return new Intl.NumberFormat("ru-Ru", {
        currency: "rub",
        style: "currency",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0
      }).format(value);
    }
