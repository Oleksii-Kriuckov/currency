export const foreinCurrencyArray = ['USD', 'JPY', 'EUR', 'GBP']

export const convert = (amount, rate1, rate2) => {
    // if ( typeof amount !== 'number') {}
      amount = Math.abs(parseFloat(amount))
   
   return (amount*rate1)/rate2
}