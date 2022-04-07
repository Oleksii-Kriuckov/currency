import { atom } from 'recoil'

export const usdRateState = atom({
    key: 'usdRate',
    default: 0
})

export const eurRateState = atom({
    key: 'eurRate',
    default: 0
})