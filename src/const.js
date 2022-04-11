export const foreinCurrencyArray = ['USD', 'GBP', 'EUR', ]


export const convert = (amount, rate1, rate2) => {
//     if ( typeof amount !== 'number') {
//        Math.abs(parseFloat(amount))
//    }
   return (amount*rate1)/rate2
}