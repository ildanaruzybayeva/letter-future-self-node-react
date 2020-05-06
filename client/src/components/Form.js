import React, { useState } from 'react';

const Form = props => {
    const [message, setMessage] = useState('');

    const handleInputChange = event => {
        setMessage(event.target.value)
    };

    const handleInputSubmit = event => {
        event.preventDefault();
        props.addMsg(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleInputSubmit}>
            <label>Message</label>
            <input
                type="text"
                name="name"
                value={message}
                onChange={handleInputChange}
            />
            <button>Add a new user</button>
        </form>
    );
}

export default Form
