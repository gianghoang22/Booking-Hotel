import { React, useState } from 'react';
import { createBooking } from '../api/apiClient'; // Sử dụng hàm từ apiClient
import { useLocation } from 'react-router-dom';

const BookingForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roomId = queryParams.get('room_id');
  const [booking, setBooking] = useState({
    user_id: 1, // Giả sử user_id là 1 (sẽ cần đăng nhập để lấy user_id thực tế)
    room_id: roomId,
    check_in_date: '',
    check_out_date: '',
    total_price: 0,
    booking_status: 'pending'
  });

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBooking(booking);
      alert('Booking created successfully!');
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Book Room</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="check_in_date" className="block text-gray-700 font-semibold mb-2">
            Check-In Date
          </label>
          <input
            type="date"
            id="check_in_date"
            name="check_in_date"
            value={booking.check_in_date}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="check_out_date" className="block text-gray-700 font-semibold mb-2">
            Check-Out Date
          </label>
          <input
            type="date"
            id="check_out_date"
            name="check_out_date"
            value={booking.check_out_date}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="total_price" className="block text-gray-700 font-semibold mb-2">
            Total Price
          </label>
          <input
            type="number"
            id="total_price"
            name="total_price"
            value={booking.total_price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Submit Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;