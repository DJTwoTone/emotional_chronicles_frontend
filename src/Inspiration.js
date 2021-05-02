/**
 * If ever a user is in need of inspiration, this component will display a list of inspirational quotes for them.
 * 
 * It will also allow them to share something inspirational.
 */

import React, { useState, useEffect, useContext } from 'react';

import ECApi from './ECApi';
import UserContext from './UserContext';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Loader from './Loader'



function Inspiration () {

    const { loggedInUser } = useContext(UserContext);

    const [inspiration, setInspiration] = useState([]);
    const [insp, setInsp] = useState([])
    const [inspMessage, setInspMessage] = useState('');
    const [loading, setLoading] = useState(false);

    async function getInspiration() {
        setLoading(true)
        const gottenInspiration = await ECApi.getInspiration(15);
        setLoading(false)
        setInspiration(gottenInspiration)
    }

    useEffect(() => {
        getInspiration();
    }, [])

    function handleChange(evt) {
        setInsp(evt.target.value)
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        let data = {
            inspiration: insp
        }

        try {
            let res = await ECApi.addInspiration(data);
            setInspMessage(`Thank you for sharing. "${res}"`)
            setInsp('');
        } catch (err) {
            setInspMessage(err)
        }
    }

    const inspList = inspiration.map(inspire => (
        <ListGroup.Item 
            key={inspire.inspiration} 
            className="border border-dark border-3 rounded padding-3 my-2 shadow"
        >
            {inspire.inspiration}
        </ListGroup.Item>
    ))
    


    
    return (
        <Container fluid className='justify-content-center m-2'>
            <Card className='m-3'>
                <Card.Body>
                <Card.Header className='display-3 shadow'>Something to inspire you...</Card.Header>
                
                <ListGroup className="my-2">
                {loading 
                ? <Loader />
                : null
                }
                {inspList}

                </ListGroup>

                <Button className='mb-4' variant='dark' onClick={getInspiration}>GET MORE INSPIRATION</Button>
                {loggedInUser 
                    ?   <Card.Footer>
                            <Card.Text>Share some inspiration...</Card.Text>
                                <Form inline onSubmit={handleSubmit}>
                                    <Form.Control 
                                        className='col-10'
                                        type='text'
                                        name='inspText'
                                        value={insp}
                                        onChange={handleChange}
                                    />
                                    <Button className='ml-2 shadow' variant='dark' type='submit'>SHARE</Button>
                                </Form>
                                {inspMessage 
                                ? <Card.Text>{inspMessage}</Card.Text>
                                : null
                                }
                        </Card.Footer>
                    : null}
            </Card.Body>
        </Card>
        </Container>
            )
}

export default Inspiration;