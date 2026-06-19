import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserCircle, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('personal');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Personal Info Form State
    const [personalInfo, setPersonalInfo] = useState({ fullName: '', email: '' });
    const [personalInfoSuccess, setPersonalInfoSuccess] = useState('');

    // Password Form State
    const [passwordData, setPasswordData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [passwordError, setPasswordError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('http://localhost:4000/api/v1/users/current-user', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const userData = response.data.data;
                setUser(userData);
                setPersonalInfo({ fullName: userData.fullName || '', email: userData.email || '' });
            } catch (err) {
                console.error("Error fetching profile", err);
                setError('Failed to load profile details. Please try logging in again.');
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [navigate]);

    const handlePersonalInfoChange = (e) => {
        setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const updatePersonalInfo = async (e) => {
        e.preventDefault();
        setPersonalInfoSuccess('');
        setError('');
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch('http://localhost:4000/api/v1/users/update-account', personalInfo, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setUser(response.data.data);
            setPersonalInfoSuccess('Personal information updated successfully!');
            setTimeout(() => setPersonalInfoSuccess(''), 3000);
        } catch (err) {
            console.error("Error updating profile", err);
            setError(err.response?.data?.message || 'Failed to update personal information.');
        }
    };

    const updatePassword = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError('New passwords do not match!');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:4000/api/v1/users/change-password', {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setPasswordSuccess('Password changed successfully!');
            setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setPasswordSuccess(''), 3000);
        } catch (err) {
            console.error("Error changing password", err);
            setPasswordError(err.response?.data?.message || 'Failed to change password.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    if (!user && !loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
                    <p className="text-red-500 text-lg mb-4">{error || 'Unable to load profile'}</p>
                    <button onClick={() => navigate('/login')} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">Return to Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-green-700 px-8 py-10 text-white flex items-center">
                        <div className="mr-6">
                            <FaUserCircle className="w-24 h-24 text-green-200" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{user.fullName || 'User Profile'}</h1>
                            <p className="text-green-200 mt-2 flex items-center">
                                <FaUser className="mr-2" /> @{user.username}
                            </p>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 bg-gray-50">
                        <button
                            onClick={() => setActiveTab('personal')}
                            className={`flex-1 py-4 px-6 text-center font-medium text-sm transition duration-150 ${activeTab === 'personal' ? 'text-green-700 border-b-2 border-green-600 bg-white' : 'text-gray-500 hover:text-green-600 hover:bg-gray-100'}`}
                        >
                            Personal Information
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`flex-1 py-4 px-6 text-center font-medium text-sm transition duration-150 ${activeTab === 'security' ? 'text-green-700 border-b-2 border-green-600 bg-white' : 'text-gray-500 hover:text-green-600 hover:bg-gray-100'}`}
                        >
                            Security Settings
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        {activeTab === 'personal' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Details</h2>
                                
                                {error && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">{error}</div>}
                                {personalInfoSuccess && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">{personalInfoSuccess}</div>}

                                <form onSubmit={updatePersonalInfo} className="space-y-6 max-w-2xl">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaUser className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={personalInfo.fullName}
                                                onChange={handlePersonalInfoChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaEnvelope className="text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={personalInfo.email}
                                                onChange={handlePersonalInfoChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>
                                
                                {passwordError && <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">{passwordError}</div>}
                                {passwordSuccess && <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-lg">{passwordSuccess}</div>}

                                <form onSubmit={updatePassword} className="space-y-6 max-w-2xl">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                name="oldPassword"
                                                value={passwordData.oldPassword}
                                                onChange={handlePasswordChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handlePasswordChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaLock className="text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={passwordData.confirmPassword}
                                                onChange={handlePasswordChange}
                                                required
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            className="bg-green-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
