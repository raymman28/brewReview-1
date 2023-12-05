import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const initialApiUrl = 'https://api.openbrewerydb.org/v1/breweries';

    axios.get(initialApiUrl)
      .then(response => {
        setBreweries(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);

    try {
      const apiUrl = `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`;
      const response = await axios.get(apiUrl);
      setBreweries(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container p-4 mx-auto bg-gray-100 rounded-lg shadow-lg">
        <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">Discover Breweries Near You</h2>
        <p className="text-lg text-gray-600">
          Find a diverse selection of breweries. Use the search bar to explore by city, name, or type.
        </p>
      </div>
      <input
        type="text"
        placeholder="Search breweries by city, name, or type..."
        value={search}
        onChange={handleSearch}
        className="w-full p-3 mb-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none"
      />
    
      <h1 className="mb-6 text-2xl font-extrabold text-gray-800">Explore Breweries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {breweries.map(brewery => (
            <NavLink to={`brewery/${brewery.id}`} key={brewery.id} className="block">
              <div className="h-full p-6 bg-white border border-gray-300 rounded-md hover:shadow-lg transition duration-300">
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-800">{brewery.name}</h2>
                  <p className="mb-2 text-sm">Address: {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
                  <p className="mb-2 text-sm">Phone: {brewery.phone}</p>
                  <p className="mb-2 text-sm text-gray-700">City: {brewery.city}</p>

<p className="mb-2 text-sm text-gray-700">State: {brewery.state} </p>
                  <p className="mb-2 text-sm">Website: <a href={brewery.website_url} className="text-indigo-600">{brewery.website_url}</a></p>
               
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
