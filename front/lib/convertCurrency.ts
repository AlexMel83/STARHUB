export const convertCurrency = (amount: string | number) => {
  return new Intl.NumberFormat("uk-UK", {
    style: "currency",
    currency: "UAH",
  }).format(+amount);
};
