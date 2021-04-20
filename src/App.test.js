import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('should render', function() {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
})

it('should match the snapshot', function() {
    const { asFragment } = render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
})