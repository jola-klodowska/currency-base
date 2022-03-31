export const convertUSDToPLN = (USD) => {
  if (typeof USD === 'number') {
    const USDtoPLN = USD * 3.5;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PLN'
    });

    return formatter.format(USDtoPLN);
  } else {
    return NaN
  }
}
