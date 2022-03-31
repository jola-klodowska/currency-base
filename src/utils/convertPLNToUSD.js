export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === 'number') {
    const PLNtoUSD = PLN / 3.5;
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });

    return formatter.format(PLNtoUSD);
  } else {
    return NaN
  }
}
