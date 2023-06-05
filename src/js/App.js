import React, { useState } from 'react';

import './app.scss';

export default function App() {
  const [message, setMessage] = useState('SELECT * FROM repositories');
  const [responses, setResponses] = useState();

  const send = (channel, data) => window.ipcRenderer.send(channel, data)
    .then((res) => setResponses(res));

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Standalone application with Electron, React, and
          SQLite stack.
        </h1>
      </header>
      <article>
        <p>Run sql query</p>
        <textarea
          value={message}
          rows="5"
          cols="40"
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button type="button" onClick={() => send('message', message)}>
          Send
        </button>
        <br />
          <p>Main process responses:</p>
        <br />
        <pre>
        {(responses && JSON.stringify(responses, null, 2)) ||
        'No query results yet'}
        </pre>
      </article>
    </div>  
  )
}