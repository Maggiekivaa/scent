import React, { useState } from 'react';
import { postReview } from './api';

function ReviewForm() {
  const [formData, setFormData] = useState({
    perfume_id: '',
    rating: '',
    comment: ''
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await postReview(formData);
      alert('Review submitted!');
      setFormData({ perfume_id: '', rating: '', comment: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Leave a Review</h2>
      <input
        name="perfume_id"
        placeholder="Perfume ID"
        value={formData.perfume_id}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        name="rating"
        placeholder="Rating (1–5)"
        type="number"
        value={formData.rating}
        onChange={handleChange}
        required
      /><br /><br />
      <textarea
        name="comment"
        placeholder="Write your review..."
        value={formData.comment}
        onChange={handleChange}
        required
      /><br /><br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReviewForm;
