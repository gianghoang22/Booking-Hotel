const { sql } = require('../config/db');

const bookingController = {
    getAllBookings: async (req, res) => {
        try {
            const pool = await sql.connect();
            const result = await pool.request().query('SELECT * FROM bookings');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    createBooking: async (req, res) => {
        const { user_id, room_id, check_in_date, check_out_date, total_price } = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('user_id', sql.Int, user_id)
                .input('room_id', sql.Int, room_id)
                .input('check_in_date', sql.Date, check_in_date)
                .input('check_out_date', sql.Date, check_out_date)
                .input('total_price', sql.Decimal(10, 2), total_price)
                .query(`
                    INSERT INTO bookings (user_id, room_id, check_in_date, check_out_date, total_price)
                    VALUES (@user_id, @room_id, @check_in_date, @check_out_date, @total_price)
                `);
            res.status(201).json({ message: 'Booking created' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getBookingById: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM bookings WHERE booking_id = @id');
            if (result.recordset.length === 0) {
                return res.status(404).json({ error: 'Booking not found' });
            }
            res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateBooking: async (req, res) => {
        const { id } = req.params;
        const { user_id, room_id, check_in_date, check_out_date, total_price, booking_status } = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .input('user_id', sql.Int, user_id)
                .input('room_id', sql.Int, room_id)
                .input('check_in_date', sql.Date, check_in_date)
                .input('check_out_date', sql.Date, check_out_date)
                .input('total_price', sql.Decimal(10, 2), total_price)
                .input('booking_status', sql.NVarChar, booking_status)
                .query(`
                    UPDATE bookings
                    SET user_id = @user_id, room_id = @room_id, check_in_date = @check_in_date,
                        check_out_date = @check_out_date, total_price = @total_price, booking_status = @booking_status
                    WHERE booking_id = @id
                `);
            res.json({ message: 'Booking updated' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteBooking: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM bookings WHERE booking_id = @id');
            res.json({ message: 'Booking deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = bookingController;