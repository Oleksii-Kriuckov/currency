import React from 'react';
import { Form } from 'react-bootstrap';
import {arrayRateState} from '../Atoms/AtomArrayCurrency';
import { useRecoilState } from 'recoil';

const Select = ({defaultvalue}) => {
    const [arrayRates, setArrayRates] = useRecoilState(arrayRateState)

  return (
    <Form.Select id='select'>
    <option disabled>{defaultvalue}</option>
    {arrayRates.map((currency, index) => 
        <option key={index}>{currency.cc}</option>
        )}
    <option>UAH</option>
</Form.Select>
  )
}

export default Select