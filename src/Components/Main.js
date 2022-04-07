import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { usdRateState, eurRateState } from '../Atoms/atomCurrency';
import { currencyArrayState } from '../Atoms/AtomArrayCurrency';
import Select from './UI/Select.jsx';


const Main = () => {
    const [amountFirst, setAmountFirst] = useState('')
    const [amountSecond, setAmountSecond] = useState('')
    const [currencyFirst, setCurrencyFirst] = useState('')
    const [currencySecond, setCurrencySecond] = useState('')

    const [usdRate, setUsdRate] = useRecoilState(usdRateState)
    const [eurRate, setEurRate] = useRecoilState(eurRateState)
    const [currencyArray, setCurrencyArray] = useRecoilState(currencyArrayState)
    // const [arrayRates, setArrayRates] = useRecoilState(arrayRateState)

    const selectCurrencyFirst = (currency) => {
        setCurrencyFirst(currency);
        // console.log(currencyArray)
        console.log("first value = " + amountFirst + ' ' + currency)
        currencyArray.map(elem => {
            if (elem.cc === currency && currencySecond === "UAH") {
                return setAmountSecond(amountFirst*elem.rate)
            } 
            if (currency === "UAH" && elem.cc === currencySecond) {
                return setAmountSecond(amountFirst/elem.rate)
            }
        })
            
    }
    const selectCurrencySecond = (currency) => {
        setCurrencySecond(currency);
        // console.log(currencyArray);
        console.log("second value = " + amountSecond + ' ' + currency)
        currencyArray.map(elem => {
            if (elem.cc === currency && currencyFirst === "UAH") {
                return setAmountFirst(amountSecond*elem.rate)
            } 
            if (currency === "UAH" && elem.cc === currencyFirst) {
                return setAmountFirst(amountSecond/elem.rate)
            }
        })
    }

    return (
        <div>
            <Form className='d-flex justify-content-center mt-5'>
                <Form.Group className="mb-3 d-flex me-5" >
                    <Form.Control
                        value={amountFirst}
                        onChange={(e) => setAmountFirst(e.target.value)}
                        className='me-3'
                        id='input' type="text"
                        placeholder='amount'
                        onBlur={selectCurrencyFirst}
                    />
                    <Select 
                    defaultvalue='currency'
                    value={currencyFirst}
                    onChange={selectCurrencyFirst}
                    />
                </Form.Group>

                <Form.Group className="mb-3 d-flex " >
                    <Form.Control
                        value={amountSecond}
                        onChange={(e) => setAmountSecond(e.target.value)}
                        className='me-3'
                        id='input' type="text"
                        placeholder='amount'
                        onBlur={selectCurrencySecond}
                    />
                    <Select 
                    defaultvalue='currency'
                    value={currencySecond}
                    onChange={selectCurrencySecond}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

export default Main