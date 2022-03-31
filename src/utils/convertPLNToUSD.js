export const convertPLNToUSD = (PLN) => {
  if (typeof PLN === 'number') {
    if (PLN > 0) {
      const PLNtoUSD = PLN / 3.5;
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      });
      return formatter.format(PLNtoUSD);
    } else {
      return '$0.00';
    }
  } else if (typeof PLN === 'string' || typeof PLN === 'undefined'){
    return NaN;
  } else {
    return 'Error';
  }
}
