import React, { useState } from 'react';
import axios from 'axios'
import Status from './Status'

const Form = props => {
    const BACKEND_ROOT = 'http://localhost:5000/'
    const [text, setText] = useState('');
    const [status, setStatus] = useState('pending')
    const [loading, setLoading] = useState()
    const [recipient, setRecipient] = useState('')

    function handleChange(e) {
        setText(e.target.value)
    }

    function handleRecipient(e) {
        setRecipient(e.target.value)
    }

    const data = {
        message: text,
        email: recipient
    }

    const sendMessage = (e) => {
        e.preventDefault();
        setLoading('loading')
        axios.post(`${BACKEND_ROOT}api`, data)
            .then(() => {
                setText('')
                setRecipient('')
                setLoading()
                setStatus(`Message sent to ${recipient}`)
            })
            .catch(() => {
                setStatus('Message failed to sent')
            })
    }
    return (
        <div className="App">
            <form onSubmit={sendMessage}>
                <input
                    type="email"
                    value={recipient}
                    placeholder="recipient"
                    onChange={handleRecipient}
                    required />
                <input
                    type="text"
                    value={text}
                    placeholder="your message"
                    onChange={handleChange}
                    required />
                <button type="submit">Send</button>
            </form>
            {loading}
            <Status status={status} />
        </div>
    );
}

export default Form
