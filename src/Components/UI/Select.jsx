import React from 'react';
import { Form } from 'react-bootstrap';
import { currencyArrayState } from '../../Atoms/AtomArrayCurrency';
import { useRecoilState } from 'recoil';

const Select = ({ defaultvalue, value, onChange }) => {
    const [currencyArray, setCurrencyArray] = useRecoilState(currencyArrayState)


    return (
        <Form.Select
            id='select'
            value={value}
            onChange={e => onChange(e.target.value)}
        >
            <option disabled defaultValue value=''>{defaultvalue}</option>
            {currencyArray.map((currency, index) =>
                <option key={index} value={currency.cc}>{currency.cc}</option>
            )}
            <option value="UAH">UAH</option>
        </Form.Select>
    )
}

export default Select