import { React, useEffect, useState } from 'react';
import { getAllHotels } from '../api/apiClient'; // Sử dụng hàm từ apiClient
import { Link } from 'react-router-dom';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels();
        setHotels(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Hotels</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map(hotel => (
          <div key={hotel.hotel_id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
            <p className="text-gray-600 mt-2">
              {hotel.address}, {hotel.city}, {hotel.country}
            </p>
            <p className="text-gray-600">Star Rating: {hotel.star_rating}</p>
            <p className="text-gray-600">{hotel.description}</p>
            <Link
              to={`/rooms?hotel_id=${hotel.hotel_id}`}
              className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              View Rooms
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;