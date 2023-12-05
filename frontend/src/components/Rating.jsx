import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useParams, useNavigate } from 'react-router-dom';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const handleRatingChange = (event) => {
    setRating(Math.min(5, Math.max(1, parseInt(event.target.value, 10))));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitRatingAndReview = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/home/brewery/${id}/rating`, { id, rating, review });

      // Redirect to brewery detail page after successful submission
      navigate(`/home/brewery/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto mt-20 border rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">Rate and Review</h2>
      <div className="mb-4">
        <label htmlFor="rating" className="block mb-1 text-sm font-medium">
          Rating (1-5):
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="review" className="block mb-1 text-sm font-medium">
          Review:
        </label>
        <textarea
          id="review"
          name="review"
          value={review}
          onChange={handleReviewChange}
          className="w-full px-4 py-2 border rounded"
          rows="4"
        ></textarea>
      </div>

      <div className="flex justify-between">
        <button
          onClick={submitRatingAndReview}
          className="flex-1 px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-900"
        >
          Submit
        </button>
        <NavLink to={`/home/brewery/${id}`} className="flex-1 ml-4">
          <button className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-900">
            Go back
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Rating;
