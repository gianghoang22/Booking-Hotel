import { React, useEffect, useState } from 'react';
import { getRoomsByHotel, getAllRooms } from '../api/apiClient'; // Sử dụng hàm từ apiClient
import { useLocation, Link } from 'react-router-dom';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hotelId = queryParams.get('hotel_id');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = hotelId ? await getRoomsByHotel(hotelId) : await getAllRooms();
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };
    fetchRooms();
  }, [hotelId]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room.room_id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800">Room {room.room_number}</h3>
            <p className="text-gray-600 mt-2">Type: {room.room_type}</p>
            <p className="text-gray-600">Price: ${room.price_per_night}/night</p>
            <p className="text-gray-600">Max Guests: {room.max_guests}</p>
            <p className="text-gray-600">{room.description}</p>
            <Link
              to={`/bookings?room_id=${room.room_id}`}
              className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;