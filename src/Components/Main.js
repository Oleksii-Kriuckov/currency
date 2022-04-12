import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { isErrorState, errorMsgState } from '../Atoms/atomError';
import { convert } from '../const';
import FormGroup from './FormGroup';

const Main = () => {
    const [amountFirst, setAmountFirst] = useState('')
    const [amountSecond, setAmountSecond] = useState('')
    const [currencyFirst, setCurrencyFirst] = useState('')
    const [currencySecond, setCurrencySecond] = useState('')

    const [isError, setIsError] = useRecoilState(isErrorState)
    const [errorMsg, setErrorMsg] = useRecoilState(errorMsgState)

    const [isValid, setIsValid] = useState(false)
    const [validation, setValidation] = useState(false)

    const validationAmount = (value) => {
        setValidation(true)
        setIsValid(false)
        const pattern = /\d+(.\d{1,2})?/ 
        if (value.search(pattern) !== -1) {
            setIsValid(true)
            setValidation(false)
        }
    }

    const changeAmountFirst = () => {
        validationAmount(amountFirst)
        if (!isValid) {
            return setAmountSecond('')
        }
        if (currencyFirst !== '' && currencySecond !== '') {
            return setAmountSecond(convert(amountFirst, currencyFirst, currencySecond).toFixed(2))
        }
    }
    const changeAmountSecond = () => {
        validationAmount(amountSecond)
        if (!isValid) {
            return setAmountFirst('')
        }
        if (currencyFirst !== '' && currencySecond !== '') {
            return setAmountFirst(convert(amountSecond, currencySecond, currencyFirst).toFixed(2))
        }
    }

    const selectCurrencyFirst = (currency) => {
        setCurrencyFirst(currency);
        if (amountSecond !== '' && currencySecond !== '') {
            return setAmountFirst(convert(amountSecond, currencySecond, currency).toFixed(2))
        }
        if (amountFirst !== '' && currencySecond !== '') {
            if (!isValid) {
                return setAmountSecond('')
            }
            return setAmountSecond(convert(amountFirst, currency, currencySecond).toFixed(2))
        }
    }

    const selectCurrencySecond = (currency) => {
        setCurrencySecond(currency);
        if (amountFirst !== '' && currencyFirst !== '') {
            if (!isValid) {
                return setAmountSecond('')
            }
            return setAmountSecond(convert(amountFirst, currencyFirst, currency).toFixed(2))
        }
        if (amountSecond !== '' && currencyFirst !== '') {
            if (!isValid) {
                return setAmountFirst('')
            }
            return setAmountFirst(convert(amountSecond, currency, currencyFirst).toFixed(2))
        }
    }

    return (
        <div>
            {!isError ?
                <>
                    <Form className='d-flex justify-content-center mt-5'>
                        <FormGroup
                            valueControl={amountFirst}
                            valueSelect={currencyFirst}
                            onChangeControl={(e) => setAmountFirst(e.target.value)}
                            onChangeSelect={selectCurrencyFirst}
                            onFocus={() => setAmountSecond('')}
                            onBlur={changeAmountFirst}
                        />
                        <FormGroup
                            valueControl={amountSecond}
                            valueSelect={currencySecond}
                            onChangeControl={(e) => setAmountSecond(e.target.value)}
                            onChangeSelect={selectCurrencySecond}
                            onFocus={() => setAmountFirst('')}
                            onBlur={changeAmountSecond}
                        />
                    </Form>
                    {(!isValid && validation) ?
                        <h3 style={{ color: "red" }}>
                            An input field must contain a positive number and any non-numeric characters exept for dot
                        </h3>
                        : null}
                </>
                : <h1 className='mt-5'>{errorMsg}</h1>
            }
        </div>
    )
}

export default Main