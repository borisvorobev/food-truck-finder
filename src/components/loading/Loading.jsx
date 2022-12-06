import React from 'react';

const Loading = ({ show }) => (
    show ? 
        (
            <p>Loading...</p>
        ) : null
)

export default Loading;