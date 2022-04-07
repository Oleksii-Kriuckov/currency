import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {currencyArrayState} from '../Atoms/AtomArrayCurrency';
// import { usdRateState, eurRateState } from '../Atoms/atomCurrency';
import { initialCurrencyArray } from '../const';
import { Navbar, Container } from 'react-bootstrap';
import axios from 'axios';
import Scoreboard from './Scoreboard';

const Header = () => {

    // const [arrayRates, setArrayRates] = useRecoilState(arrayRateState)
    const [currencyArray, setCurrencyArray] = useRecoilState(currencyArrayState)
    // const [usdRate, setUsdRate] = useRecoilState(usdRateState)
    // const [eurRate, setEurRate] = useRecoilState(eurRateState)

    async function fetchRate() {
        await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((responce) => {
                currency(responce.data);
                // console.log(responce.data)
            })
            .catch((error) => {                      // Обробити помилку
                console.error(error.toJSON().message)
            })
    }

    const currency = (array) => {
        const arr = [];
        array.map((elem) => {
            if( initialCurrencyArray.some(el => el === elem.cc) ) {
                arr.push(elem)
            }
        })
        setCurrencyArray(arr);
    }

    useEffect(() => {
        fetchRate();
    }, [])

    return (
        <Navbar bg="primary" variant="dark">
            <Container className='justify-content-around'>
                { currencyArray.map((currency, index) => 
                <Scoreboard key={index} cc={currency.cc}>{currency.rate}</Scoreboard> //Перейменувати сс
                )}
            </Container>
        </Navbar>

    )
}

export default Header