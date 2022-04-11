import React, { useState, useMemo } from 'react'
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

        if (typeof value !== 'string') {
            value = String(value)
        }
        if (value !== 0) {
            setValidation(true)
            setIsValid(false)
            const pattern = /\d+(.\d{1,2})?/

            if (value.search(pattern) !== -1) {
                setIsValid(true)
                setValidation(false);
                console.log("work checkout")
            } else {
                console.log('work first')
            }

        } else {
            if (value === 0)
                setIsValid(true)
            setValidation(false)
            console.log('work second')
        }
    }

    const changeAmountFirst = useMemo(() => {
        if (amountFirst) {
            // validationAmount(amountFirst)
            // console.log('work changeF ' + amountFirst)
            // if (!isValid) {
            //     return setAmountSecond('')
            // }
            if (currencyFirst !== '' && currencySecond !== '') {
                console.log('work AmSecond')
                return setAmountSecond(convert(amountFirst, currencyFirst, currencySecond).toFixed(2))
            }
        } else {
            return setAmountSecond('')
        }
    }, [amountFirst])

    const changeAmountSecond = useMemo(() => {
        if (amountSecond) {
            // validationAmount(amountSecond)
            // if (!isValid) {
            //     return setAmountFirst('')
            // }
            if (currencyFirst !== '' && currencySecond !== '') {
                console.log('work Amfirst')
                return setAmountFirst(convert(amountSecond, currencySecond, currencyFirst).toFixed(2))
            } else {
                return setAmountFirst('')
            }
        }
    }, [amountSecond])

    const selectCurrencyFirst = (currency) => {
        setCurrencyFirst(currency);
        if (amountSecond !== '' && currencySecond !== '') {
            // if (!isValid) {
            //     return setAmountFirst('')
            // }
            return setAmountFirst(convert(amountSecond, currencySecond, currency).toFixed(2))
        }
        if (amountFirst !== '' && currencySecond !== '') {
            // if (!isValid) {
            //     return setAmountSecond('')
            // }
            return setAmountSecond(convert(amountFirst, currency, currencySecond).toFixed(2))
        }
    }

    const selectCurrencySecond = (currency) => {
        setCurrencySecond(currency);
        if (amountFirst !== '' && currencyFirst !== '') {
            // if (!isValid) {
            //     return setAmountSecond('')
            // }
            return setAmountSecond(convert(amountFirst, currencyFirst, currency).toFixed(2))
        }
        if (amountSecond !== '' && currencyFirst !== '') {
            // if (!isValid) {
            //     return setAmountFirst('')
            // }
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
                        // onBlur={changeAmountFirst}
                        />
                        <FormGroup
                            valueControl={amountSecond}
                            valueSelect={currencySecond}
                            onChangeControl={(e) => setAmountSecond(e.target.value)}
                            onChangeSelect={selectCurrencySecond}
                            onFocus={() => setAmountFirst('')}
                        // onBlur={changeAmountSecond}
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