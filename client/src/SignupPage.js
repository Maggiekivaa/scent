// client/src/SignupPage.js
import React, { useState } from 'react';

function SignupPage({ onSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch('http://localhost:5555/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password })
    })
    .then(res => {
      if (res.ok) return res.json();
      return res.json().then(err => Promise.reject(err));
    })
    .then(user => {
      onSignup(user);
    })
    .catch(err => {
      setError(err.error || 'Signup failed');
    });
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: '5rem' }}>
      <h2>Sign Up</h2>
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
          <label>Email:</label><br />
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
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
        <button type="submit" style={{ marginTop: '1.5rem' }}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
