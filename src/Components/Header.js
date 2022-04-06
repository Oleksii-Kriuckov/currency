import React, { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap'
import axios from 'axios'
import Scoreboard from './Scoreboard'

const Header = () => {
    const [arrayRates, setArrayRates] = useState([])

    async function fetchRate() {
        await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
            .then((responce) => {
                console.log(responce.data)
                currencyRates(responce.data);
            })
            .catch((error) => {
                console.error(error.toJSON().message)
            })
    }

    const currencyRates = (array) => {
        const arr = [];
        array.map(elem => {
            if (elem.cc === 'USD' || elem.cc === 'EUR') {
                arr.push(elem);
            }
        })
        setArrayRates(arr);
    }

    useEffect(() => {
        fetchRate();
    }, [])

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                { arrayRates.map((currency, index) => 
                <Scoreboard key={index} сс={currency.cc}>{currency.rate}</Scoreboard>
                )}
            </Container>
        </Navbar>

    )
}

export default Header