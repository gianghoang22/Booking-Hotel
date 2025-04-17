const BASE_URL = process.env.BASE_URL;

const API_ENDPOINTS = {
  // Users
  GET_ALL_USERS: `${BASE_URL}/users`,
  GET_USER_BY_ID: (id) => `${BASE_URL}/users/${id}`,
  CREATE_USER: `${BASE_URL}/users`,
  UPDATE_USER: (id) => `${BASE_URL}/users/${id}`,
  DELETE_USER: (id) => `${BASE_URL}/users/${id}`,
  LOGIN: `${BASE_URL}/users/login`,

  // Hotels
  GET_ALL_HOTELS: `${BASE_URL}/hotels`,
  GET_HOTEL_BY_ID: (id) => `${BASE_URL}/hotels/${id}`,
  CREATE_HOTEL: `${BASE_URL}/hotels`,
  UPDATE_HOTEL: (id) => `${BASE_URL}/hotels/${id}`,
  DELETE_HOTEL: (id) => `${BASE_URL}/hotels/${id}`,

  // Rooms
  GET_ALL_ROOMS: `${BASE_URL}/rooms`,
  GET_ROOMS_BY_HOTEL: (hotelId) => `${BASE_URL}/rooms?hotel_id=${hotelId}`,
  GET_ROOM_BY_ID: (id) => `${BASE_URL}/rooms/${id}`,
  CREATE_ROOM: `${BASE_URL}/rooms`,
  UPDATE_ROOM: (id) => `${BASE_URL}/rooms/${id}`,
  DELETE_ROOM: (id) => `${BASE_URL}/rooms/${id}`,
  GET_AVAILABLE_ROOMS: (checkIn, checkOut, hotelId) =>
    `${BASE_URL}/rooms/available?check_in_date=${checkIn}&check_out_date=${checkOut}&hotel_id=${hotelId}`,

  // Bookings
  GET_ALL_BOOKINGS: `${BASE_URL}/bookings`,
  GET_BOOKING_BY_ID: (id) => `${BASE_URL}/bookings/${id}`,
  GET_USER_BOOKINGS: (userId) => `${BASE_URL}/bookings/user/${userId}`,
  CREATE_BOOKING: `${BASE_URL}/bookings`,
  UPDATE_BOOKING: (id) => `${BASE_URL}/bookings/${id}`,
  DELETE_BOOKING: (id) => `${BASE_URL}/bookings/${id}`,
};

export default API_ENDPOINTS;