import React from 'react'
import { Form } from 'react-bootstrap'

const Main = () => {
    return (
        <div>
            <Form className='d-flex justify-content-center mt-5'>
                <Form.Group className="mb-3 d-flex me-5" >
                    <Form.Label className='me-3'>1 USD</Form.Label>
                    <Form.Control className='me-3' id='input' type="text" />
                    <Form.Select id='select'/>
                </Form.Group>

                <Form.Group className="mb-3 d-flex " >
                    <Form.Label className='me-3'>1 EUR</Form.Label>
                    <Form.Control className='me-3' id='input' type="text" />
                    <Form.Select id='select'/>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Main