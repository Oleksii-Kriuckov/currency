import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import {arrayRateState} from '../Atoms/AtomArrayCurrency';
import { usdRateState, eurRateState } from '../Atoms/atomCurrency';
import { Navbar, Container } from 'react-bootstrap';
import axios from 'axios';
import Scoreboard from './Scoreboard';

const Header = () => {
    const [arrayRates, setArrayRates] = useRecoilState(arrayRateState)
    const [usdRate, setUsdRate] = useRecoilState(usdRateState)
    const [eurRate, setEurRate] = useRecoilState(eurRateState)

    async function fetchRate() {
        await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((responce) => {
                currencyRates(responce.data);
            })
            .catch((error) => {
                console.error(error.toJSON().message)
            })
    }

    const currencyRates = (array) => {
        const arr = [];
        array.map(elem => {
            switch (elem.cc) {
                case 'USD':
                    arr.push(elem);
                    setUsdRate(elem.rate)
                    break;

                case 'EUR':
                    arr.push(elem);
                    setEurRate(elem.rate)
                    break;
            }
        })
        setArrayRates(arr);
    }

    useEffect(() => {
        fetchRate();
    }, [])

    return (
        <Navbar bg="primary" variant="dark">
            <Container className='justify-content-around'>
                { arrayRates.map((currency, index) => 
                <Scoreboard key={index} cc={currency.cc}>{currency.rate}</Scoreboard> //Перейменувати сс
                )}
            </Container>
        </Navbar>

    )
}

export default Header