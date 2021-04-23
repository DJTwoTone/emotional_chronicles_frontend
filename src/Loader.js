import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

function Loader () {


    return (
    
        <div className="d-flex justify-content-center">
            <Spinner animation="grow" variant="dark" size="sm"/>
            <Spinner animation="grow" variant="dark" size="sm"/>
            <Spinner animation="grow" variant="dark" />
            <p>LOADING</p>
            <Spinner animation="grow" variant="dark" size="sm"/>
            <Spinner animation="grow" variant="dark" size="sm"/>
            <Spinner animation="grow" variant="dark" />
        </div>
        
    )

}

export default Loader;