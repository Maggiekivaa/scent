import React from 'react';
import PerfumeList from './PerfumeList';
import { useAuth } from './context/AuthContext';

function HomePage() {
  const { user, logout } = useAuth();

  return (
    <div className='home-container'>
      {user ? (
        <div className='perfume-header'>
          <h1>Welcome, {user.username}!</h1>
          <button className='logout-btn' onClick={logout}>Logout</button>
        </div>
      ) : (
        <h1>Welcome to the Perfume App</h1>
      )}

      <PerfumeList />
      <hr />
  
    </div>
  );
}

export default HomePage;
