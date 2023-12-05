import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breweryResponse = await axios.get(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        setBrewery(breweryResponse.data);

        const reviewsResponse = await axios.get(`http://localhost:3001/home/brewery/${id}/rating`);
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div className="mt-8 text-2xl text-center text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-3xl font-bold text-gray-800">{brewery.name}</h2>
      <p className="mb-2 text-sm text-gray-700">
        Address: {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}
      </p>
      <p className="mb-2 text-sm text-gray-700">Phone: {brewery.phone}</p>
      <p className="mb-2 text-sm text-gray-700">City: {brewery.city}</p>

      <p className="mb-2 text-sm text-gray-700">State: {brewery.state} </p>
      
      <p className="mb-4 text-sm text-gray-700">
        Website: <a href={brewery.website_url} className="text-blue-600">{brewery.website_url}</a>
      </p>

      <div className="mb-4 text-gray-800">
        <h3 className="mb-2 text-lg font-bold">Reviews and Ratings:</h3>
        {reviews.map((review, index) => (
          <div key={index} className="pb-4 mb-4 border-b-2 border-gray-300">
            <div className="flex items-center mb-2">
              <p className="mb-2 text-md font-bold"></p>
              {Array.from({ length: review.rating }, (_, i) => (
                <span key={i} className="text-yellow-500">&#9733;</span>
              ))}
            </div>
            <p className="mb-2 text-sm"> {review.review}</p>
          </div>
        ))}
      </div>

      <NavLink to={`/home/brewery/${id}/rating`} className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-900">
        Add Rating
      </NavLink>

      <NavLink to="/home" className="block w-32 mx-auto mt-4">
        <button className="px-4 py-2 font-bold text-white bg-gray-800 rounded hover:bg-gray-900">
          Go back
        </button>
      </NavLink>
    </div>
  );
};

export default BreweryDetail;
