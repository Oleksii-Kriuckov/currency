import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { usdRateState, eurRateState } from '../Atoms/atomCurrency';
import { arrayRateState } from '../Atoms/AtomArrayCurrency';
import Select from './UI/Select.jsx';


const Main = () => {
    const [amountFirst, setAmountFirst] = useState('')
    const [amountSecond, setAmountSecond] = useState('')
    const [selectedCurencyFirst, setSelectedCurencyFirst] = useState('')
    const [selectedCurencySecond, setSelectedCurencySecond] = useState('')

    const [usdRate, setUsdRate] = useRecoilState(usdRateState)
    const [eurRate, setEurRate] = useRecoilState(eurRateState)
    const [arrayRates, setArrayRates] = useRecoilState(arrayRateState)

    const selectCurrencyFirst = (currency) => {
        setSelectedCurencyFirst(currency);
        // console.log("first value = " + amountFirst + ' ' + currency)
        arrayRates.map(elem => {
            if (elem.cc === currency) {
                // if(elem.)
                return setAmountSecond()
            }
        })

    }
    const selectCurrencySecond = (currency) => {
        setSelectedCurencyFirst(currency);
        console.log("second value = " + amountSecond + ' ' + currency)
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
                    />
                    <Select 
                    defaultvalue='currency'
                    value={selectedCurencyFirst}
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
                    />
                    <Select 
                    defaultvalue='currency'
                    value={selectedCurencySecond}
                    onChange={selectCurrencySecond}
                    />
                </Form.Group>
            </Form>
        </div>
    )
}

export default Main