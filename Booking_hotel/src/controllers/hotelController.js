const { sql } = require('../config/db');

const hotelController = {
    getAllHotels: async (req, res) => {
        try {
            const pool = await sql.connect();
            const result = await pool.request().query('SELECT * FROM hotels');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    createHotel: async (req, res) => {
        const { name, address, city, country, star_rating, description, contact_phone, contact_email } = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('name', sql.NVarChar, name)
                .input('address', sql.NVarChar, address)
                .input('city', sql.NVarChar, city)
                .input('country', sql.NVarChar, country)
                .input('star_rating', sql.Int, star_rating)
                .input('description', sql.NVarChar, description)
                .input('contact_phone', sql.NVarChar, contact_phone)
                .input('contact_email', sql.NVarChar, contact_email)
                .query(`
                    INSERT INTO hotels (name, address, city, country, star_rating, description, contact_phone, contact_email)
                    VALUES (@name, @address, @city, @country, @star_rating, @description, @contact_phone, @contact_email)
                `);
            res.status(201).json({ message: 'Hotel created' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    getHotelById: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM hotels WHERE hotel_id = @id');
            if (result.recordset.length === 0) {
                return res.status(404).json({ error: 'Hotel not found' });
            }
            res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateHotel: async (req, res) => {
        const { id } = req.params;
        const { name, address, city, country, star_rating, description, contact_phone, contact_email } = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .input('name', sql.NVarChar, name)
                .input('address', sql.NVarChar, address)
                .input('city', sql.NVarChar, city)
                .input('country', sql.NVarChar, country)
                .input('star_rating', sql.Int, star_rating)
                .input('description', sql.NVarChar, description)
                .input('contact_phone', sql.NVarChar, contact_phone)
                .input('contact_email', sql.NVarChar, contact_email)
                .query(`
                    UPDATE hotels
                    SET name = @name, address = @address, city = @city, country = @country,
                        star_rating = @star_rating, description = @description,
                        contact_phone = @contact_phone, contact_email = @contact_email
                    WHERE hotel_id = @id
                `);
            res.json({ message: 'Hotel updated' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteHotel: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM hotels WHERE hotel_id = @id');
            res.json({ message: 'Hotel deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = hotelController;