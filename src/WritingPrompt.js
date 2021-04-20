import React, { useEffect } from 'react';

import ECApi from './ECApi';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function WritingPrompt({ prompt, setPrompt }) {

    // async function getPrompt() {
    //     const gottenPrompt = await ECApi.getPrompt();
    //     setPrompt(gottenPrompt[0]) 
    // }
    
    // useEffect(() => {
    //     getPrompt();
    // }, [])

    useEffect(() => {
        async function getPrompt() {
            try {
                const gottenPrompt = await ECApi.getPrompt();
                setPrompt(gottenPrompt[0]) 
                
            } catch (err) {
                console.error(err);
            }
        }
        getPrompt();
    }, [])


    return (
        
        <Card className='m-4 shadow'>
            <Card.Body>
                <Card.Text className='display-5 lead'>Something to write about...</Card.Text>
                <Card.Text className='display-4'>{prompt.prompt}</Card.Text>
                <Button variant='dark' onClick={getPrompt}>GET A NEW PROMPT</Button>
            
            </Card.Body>
        </Card>
        
        )

}

export default WritingPrompt;