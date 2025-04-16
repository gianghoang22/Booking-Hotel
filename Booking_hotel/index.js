const express = require('express');
const { connectDB } = require('./src/config/db');
const userRoutes = require('./src/routes/users');
const hotelRoutes = require('./src/routes/hotels');
const roomRoutes = require('./src/routes/rooms');
const bookingRoutes = require('./src/routes/bookings');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
};

startServer();