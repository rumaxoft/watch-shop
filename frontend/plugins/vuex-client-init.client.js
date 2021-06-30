export default async context => {
  await context.store.dispatch("cart/initializeState");
  await context.store.dispatch("users/initializeState");
};
