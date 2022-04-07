import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { usdRateState, eurRateState } from '../Atoms/atomCurrency';
import Select from './UI/Select.jsx';


const Main = () => {
    const [amountFirst, setAmountFirst] = useState(0)
    const [amountSecond, setAmountSecond] = useState(0)

    const [usdRate, setUsdRate] = useRecoilState(usdRateState)
    const [eurRate, setEurRate] = useRecoilState(eurRateState)

    const convert = () => {

    }

    return (
        <div>
            <Form className='d-flex justify-content-center mt-5'>
                <Form.Group className="mb-3 d-flex me-5" >
                    <Form.Control
                        value={amountFirst}
                        onChange={(e) => e.target.value}
                        className='me-3'
                        id='input' type="text"
                        placeholder='amount'
                    />
                    <Select defaultvalue='USD'/>
                </Form.Group>

                <div></div>

                <Form.Group className="mb-3 d-flex " >
                    <Form.Control
                        value={amountSecond}
                        onChange={(e) => e.target.value}
                        className='me-3'
                        id='input' type="text"
                        placeholder='amount'
                    />
                    <Select  defaultvalue='UAH'/>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Main