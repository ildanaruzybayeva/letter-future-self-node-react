import React, { useState } from 'react';
import axios from 'axios'
const BACKEND_ROOT = 'http://localhost:5000/'

function App() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("waiting for the message")

  function handleChange(e) {
    setText(e.target.value)
  }

  const data = {
    message: text
  }

  const addMessage = () => {
    axios.post(`${BACKEND_ROOT}api`, data)
      .then(() => {
        setText('')
        setStatus('Message sent')
      })
      .catch(() => {
        setStatus('Message not sent')
      })
  }
  return (
    <div className="App">
      <input type="text" value={text} onChange={handleChange} />
      <button onClick={addMessage} type="submit">
        Send it
      </button>
      {status}
    </div>
  );
}
export default App;
