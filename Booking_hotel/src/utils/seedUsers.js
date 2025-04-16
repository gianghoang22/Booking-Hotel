const bcrypt = require('bcrypt');
const { sql, connectDB } = require('../config/db');

// Hàm thêm một người dùng mới
const addUser = async (userData) => {
    const saltRounds = 10;

    try {
        const pool = await connectDB();

        // Kiểm tra xem email đã tồn tại chưa
        const result = await pool.request()
            .input('email', sql.NVarChar, userData.email)
            .query('SELECT COUNT(*) AS count FROM users WHERE email = @email');

        if (result.recordset[0].count > 0) {
            console.log(`User with email ${userData.email} already exists. Skipping...`);
            return false;
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        // Chèn người dùng vào bảng users
        await pool.request()
            .input('username', sql.NVarChar, userData.username)
            .input('password_hash', sql.NVarChar, hashedPassword)
            .input('email', sql.NVarChar, userData.email)
            .input('full_name', sql.NVarChar, userData.full_name)
            .input('phone_number', sql.NVarChar, userData.phone_number)
            .input('address', sql.NVarChar, userData.address)
            .input('role', sql.NVarChar, userData.role || 'customer')
            .query(`
                INSERT INTO users (username, password_hash, email, full_name, phone_number, address, role)
                VALUES (@username, @password_hash, @email, @full_name, @phone_number, @address, @role)
            `);
        console.log(`Added user: ${userData.username}`);
        return true;
    } catch (err) {
        console.error('Error adding user:', err);
        return false;
    }
};

// // Hàm seed dữ liệu mẫu (tùy chọn)
// const seedUsers = async () => {
//     const users = [
//         { username: 'admin1', password: 'AdminPass123', email: 'admin1@example.com', full_name: 'Admin One', phone_number: '0123456789', address: '123 Admin Street, Hanoi', role: 'admin' },
//         { username: 'customer1', password: 'CustomerPass456', email: 'customer1@example.com', full_name: 'Nguyen Van A', phone_number: '0987654321', address: '456 Customer Road, HCM', role: 'customer' },
//         { username: 'customer2', password: 'CustomerPass789', email: 'customer2@example.com', full_name: 'Tran Thi B', phone_number: '0912345678', address: '789 Guest Avenue, Da Nang', role: 'customer' }
//     ];

//     for (const user of users) {
//         await addUser(user);
//     }
//     console.log('All users have been processed successfully.');
// };

// Gọi hàm seedUsers nếu chạy trực tiếp file này
if (require.main === module) {
    seedUsers();
}

// Export hàm addUser để sử dụng ở nơi khác
module.exports = { addUser };