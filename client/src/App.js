import React from 'react';
import PerfumeList from './PerfumeList';
import ReviewForm from './ReviewForm';
import './App.css';


function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h1>Scentify 🌸</h1>
      <PerfumeList />
      <hr />
      <ReviewForm />
    </div>
  );
}

export default App;
