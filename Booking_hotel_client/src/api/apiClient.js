import axios from 'axios';
import API_ENDPOINTS from './apiConfig';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Các hàm gọi API
export const getAllHotels = () => apiClient.get(API_ENDPOINTS.GET_ALL_HOTELS);
export const getHotelById = (id) => apiClient.get(API_ENDPOINTS.GET_HOTEL_BY_ID(id));
export const createHotel = (data) => apiClient.post(API_ENDPOINTS.CREATE_HOTEL, data);
export const updateHotel = (id, data) => apiClient.put(API_ENDPOINTS.UPDATE_HOTEL(id), data);
export const deleteHotel = (id) => apiClient.delete(API_ENDPOINTS.DELETE_HOTEL(id));

export const getAllRooms = () => apiClient.get(API_ENDPOINTS.GET_ALL_ROOMS);
export const getRoomsByHotel = (hotelId) => apiClient.get(API_ENDPOINTS.GET_ROOMS_BY_HOTEL(hotelId));
export const getRoomById = (id) => apiClient.get(API_ENDPOINTS.GET_ROOM_BY_ID(id));
export const createRoom = (data) => apiClient.post(API_ENDPOINTS.CREATE_ROOM, data);
export const updateRoom = (id, data) => apiClient.put(API_ENDPOINTS.UPDATE_ROOM(id), data);
export const deleteRoom = (id) => apiClient.delete(API_ENDPOINTS.DELETE_ROOM(id));
export const getAvailableRooms = (checkIn, checkOut, hotelId) =>
  apiClient.get(API_ENDPOINTS.GET_AVAILABLE_ROOMS(checkIn, checkOut, hotelId));

export const getAllBookings = () => apiClient.get(API_ENDPOINTS.GET_ALL_BOOKINGS);
export const getBookingById = (id) => apiClient.get(API_ENDPOINTS.GET_BOOKING_BY_ID(id));
export const getUserBookings = (userId) => apiClient.get(API_ENDPOINTS.GET_USER_BOOKINGS(userId));
export const createBooking = (data) => apiClient.post(API_ENDPOINTS.CREATE_BOOKING, data);
export const updateBooking = (id, data) => apiClient.put(API_ENDPOINTS.UPDATE_BOOKING(id), data);
export const deleteBooking = (id) => apiClient.delete(API_ENDPOINTS.DELETE_BOOKING(id));

export const loginUser = (data) => apiClient.post(API_ENDPOINTS.LOGIN, data);
export const getUserById = (id) => apiClient.get(API_ENDPOINTS.GET_USER_BY_ID(id));
export const updateUser = (id, data) => apiClient.put(API_ENDPOINTS.UPDATE_USER(id), data);