const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true
    },
    port: parseInt(process.env.DB_PORT),
    connectionTimeout: 30000
}

console.log({
    user: dbConfig.user,
    server: dbConfig.server,
    database: dbConfig.database,
    port: dbConfig.port
});

const connectDB = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to SQL Server');
        return pool;
    } catch (err) {
        console.error('Database connection failed:', err);
    }
};

module.exports = { connectDB, sql };