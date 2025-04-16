const { sql } = require('../config/db');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const pool = await sql.connect();
            const result = await pool.request().query('SELECT * FROM users');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    createUser: async (req, res) => {
        const { username, password_hash, email, full_name, phone_number, address, role} = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password_hash', sql.NVarChar, password_hash)
            .input('email', sql.NVarChar, email)
            .input('full_name', sql.NVarChar, full_name)
            .input('phone_number', sql.NVarChar, phone_number)
            .input('address', sql.NVarChar, address)
            .input('role', sql.NVarChar, role)
            .query(`
                INSERT INTO users (username, password_hash, email, full_name, phone_number, address, role)
                VALUES (@username, @password_hash, @email, @full_name, @phone_number, @address, @role)
            `);
            res.status(201).json({ message: 'User created' });
        } catch (err) {
            res.status(500).json({ error: 'Server error: ', err});
        }
    },

    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM users WHERE user_id = @id');
            if (result.recordset.length === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(result.recordset[0]);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { username, email, full_name, phone_number, address, role } = req.body;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .input('username', sql.NVarChar, username)
                .input('email', sql.NVarChar, email)
                .input('full_name', sql.NVarChar, full_name)
                .input('phone_number', sql.NVarChar, phone_number)
                .input('address', sql.NVarChar, address)
                .input('role', sql.NVarChar, role)
                .query(`
                    UPDATE users
                    SET username = @username, email = @email, full_name = @full_name,
                        phone_number = @phone_number, address = @address, role = @role
                    WHERE user_id = @id
                `);
            res.json({ message: 'User updated' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const pool = await sql.connect();
            await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM users WHERE user_id = @id');
            res.json({ message: 'User deleted' });
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = userController;
