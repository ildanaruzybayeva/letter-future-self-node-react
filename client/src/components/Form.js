import React, { useState } from 'react';
import axios from 'axios'
import './Form.css'

const todayDate = new Date().toISOString().slice(0, 10);

const Form = props => {
    const BACKEND_ROOT = 'https://5ylxm.sse.codesandbox.io/'
    const [text, setText] = useState('');
    const [loading, setLoading] = useState('Send')
    const [recipient, setRecipient] = useState('')
    const [time, setTime] = useState(todayDate)

    function handleChange(e) {
        setText(e.target.value)
    }

    function handleRecipient(e) {
        setRecipient(e.target.value)
    }

    function handleDate(e) {
        setTime(e.target.value)
    }

    const data = {
        message: text,
        email: recipient,
        date: time
    }

    const sendMessage = (e) => {
        e.preventDefault();
        setLoading('Sent')
        setText(`Message sent to ${recipient}`)
        setRecipient('')
        setLoading('Send')
        axios.post(`${BACKEND_ROOT}api`, data)
            .then(() => {
                console.log('its empty here')
            })
            .catch(() => {
                setText('Message failed to sent')
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
                    value={time}
                    onChange={handleDate}
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
        </div>
    );
}

export default Form
