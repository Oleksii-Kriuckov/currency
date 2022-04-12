import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currencyArrayState } from '../Atoms/AtomArrayCurrency';
import { isErrorState, errorMsgState } from '../Atoms/atomError';
import { foreinCurrencyArray } from '../const';
import { Navbar, Container } from 'react-bootstrap';
import axios from 'axios';
import Scoreboard from './Scoreboard';

const Header = () => {
    const [currencyArray, setCurrencyArray] = useRecoilState(currencyArrayState)

    const [isError, setIsError] = useRecoilState(isErrorState)
    const [errorMsg, setErrorMsg] = useRecoilState(errorMsgState)

    async function fetchRate() {
        await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((responce) => {
                setIsError(false)
                currency(responce.data);
            })
            .catch((error) => {
                setIsError(true)            
                setErrorMsg(error.toJSON().message)
            })
    }

    const currency = (array) => {
        const arr = [];
        array.map((elem) => {
            if (foreinCurrencyArray.some(el => el === elem.cc)) {
                arr.push(elem)
            }
        })
        setCurrencyArray(arr);
    }

    useEffect(() => {
        fetchRate();
    }, [])

    return (
        <Navbar bg="primary" variant="dark" style={{height: 50}}>
            {!isError ?
                <Container className='justify-content-around py-1'>
                    {currencyArray.map((currency, index) =>
                        <Scoreboard key={index} cc={currency.cc}>{currency.rate}</Scoreboard> //Перейменувати сс
                    )}
                </Container>
                : null
            }
        </Navbar>
    )
}

export default Header