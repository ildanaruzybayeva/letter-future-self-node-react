import React, { useState } from 'react';

const API_URI = 'http://localhost:3000/api'

export default function Form() {
    return (
        <div>
            <form className="contact-form">
                <label class="message" htmlFor="message-input">Your Message</label>
                <textarea name="message" class="message-input" type="text" placeholder="Please write your message here" required />

                <label class="message-name" htmlFor="message-name">Your Name</label>
                <input name="name" class="message-name" type="text" placeholder="Your Name" />

                <label class="message-email" htmlFor="message-email">Your Email</label>
                <input name="email" class="message-email" type="email" placeholder="your@email.com" required />

                <div className="button--container">
                    <button type="submit" className="button button-primary">submit</button>
                </div>
            </form>
        </div>
    )
}
