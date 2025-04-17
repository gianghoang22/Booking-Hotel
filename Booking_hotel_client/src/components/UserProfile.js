import { React, useEffect, useState } from 'react';
import { getUserById, updateUser } from '../api/apiClient'; // Sử dụng hàm từ apiClient

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    phone_number: '',
    address: '',
  });

  // Giả sử user_id được lấy từ trạng thái đăng nhập (có thể dùng JWT sau này)
  const userId = 1; // Thay bằng user_id thực tế từ trạng thái đăng nhập

  // Lấy thông tin người dùng khi component được render
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(userId);
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          full_name: response.data.full_name,
          phone_number: response.data.phone_number,
          address: response.data.address,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Failed to load user profile.');
      }
    };
    fetchUser();
  }, [userId]);

  // Xử lý thay đổi giá trị trong form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý gửi yêu cầu cập nhật thông tin người dùng
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(userId, formData);
      setUser({ ...user, ...formData });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile.');
    }
  };

  if (!user) {
    return <div className="container mx-auto py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">User Profile</h2>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        {isEditing ? (
          // Form chỉnh sửa thông tin
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="full_name" className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone_number" className="block text-gray-700 font-semibold mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          // Hiển thị thông tin người dùng
          <div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Username:</p>
              <p className="text-gray-600">{user.username}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Email:</p>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Full Name:</p>
              <p className="text-gray-600">{user.full_name || 'Not set'}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Phone Number:</p>
              <p className="text-gray-600">{user.phone_number || 'Not set'}</p>
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Address:</p>
              <p className="text-gray-600">{user.address || 'Not set'}</p>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;