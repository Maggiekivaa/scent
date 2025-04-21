// client/src/LoginPage.js
import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5555/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // important for sending session cookies
      body: JSON.stringify({ username, password })
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(err => Promise.reject(err));
    })
    .then(user => {
      onLogin(user);
    })
    .catch(err => {
      setError(err.error);
    });
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '5rem' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br />
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Password:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required />
        </div>
        <button type="submit" style={{ marginTop: '1.5rem' }}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
