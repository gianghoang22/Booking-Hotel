const { sql } = require('../config/db');

const roomController = {
    getAllRooms: async (req, res) => {
        try {
            const pool = await sql.connect();
            const result = await pool.request().query('SELECT * FROM rooms');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    createRoom: async (req, res) => {
        const { hotel_id, room_number, room_type, price_per_night, max_guests, description } = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('hotel_id', sql.Int, hotel_id)
                .input('room_number', sql.NVarChar, room_number)
                .input('room_type', sql.NVarChar, room_type)
                .input('price_per_night', sql.Decimal(10, 2), price_per_night)
                .input('max_guests', sql.Int, max_guests)
                .input('description', sql.NVarChar, description)
                .query(`
                    INSERT INTO rooms (hotel_id, room_number, room_type, price_per_night, max_guests, description)
                    VALUES (@hotel_id, @room_number, @room_type, @price_per_night, @max_guests, @description)
                `);
            res.status(201).json({ message: 'Room created' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getRoomById: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM rooms WHERE room_id = @id');
            if (result.recordset.length === 0) {
                return res.status(404).json({ error: 'Room not found' });
            }
            res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateRoom: async (req, res) => {
        const { id } = req.params;
        const { hotel_id, room_number, room_type, price_per_night, max_guests, description } = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .input('hotel_id', sql.Int, hotel_id)
                .input('room_number', sql.NVarChar, room_number)
                .input('room_type', sql.NVarChar, room_type)
                .input('price_per_night', sql.Decimal(10, 2), price_per_night)
                .input('max_guests', sql.Int, max_guests)
                .input('description', sql.NVarChar, description)
                .query(`
                    UPDATE rooms
                    SET hotel_id = @hotel_id, room_number = @room_number, room_type = @room_type,
                        price_per_night = @price_per_night, max_guests = @max_guests, description = @description
                    WHERE room_id = @id
                `);
            res.json({ message: 'Room updated' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteRoom: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM rooms WHERE room_id = @id');
            res.json({ message: 'Room deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = roomController;