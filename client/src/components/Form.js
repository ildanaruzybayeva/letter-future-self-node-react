import React, { useState } from 'react';
import axios from 'axios'
import Status from './Status'
import './Form.css'

const Form = props => {
    const BACKEND_ROOT = 'http://localhost:5000/'
    const [text, setText] = useState('');
    const [status, setStatus] = useState('waiting for the message')
    const [loading, setLoading] = useState('Send')
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
        setLoading('Sending...')
        axios.post(`${BACKEND_ROOT}api`, data)
            .then(() => {
                setText('')
                setRecipient('')
                setLoading('Sent')
                setStatus(`Message sent to ${recipient}`)
            })
            .catch(() => {
                setStatus('Message failed to sent')
            })
    }
    return (
        <div className="Form">
            <form onSubmit={sendMessage}>
                <input
                    className="email-input"
                    type="email"
                    value={recipient}
                    placeholder="To:"
                    onChange={handleRecipient}
                    required />
                <input
                    className="date-input"
                    type="date"
                    placeholder="choose date"
                />
                <textarea
                    className="text-input"
                    type="text"
                    value={text}
                    placeholder="Your letter into the future goes here"
                    onChange={handleChange}
                    required />
                <button type="submit">{loading}</button>
            </form>
            <Status status={status} />
        </div>
    );
}

export default Form
