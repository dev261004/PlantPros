// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
// import { FiEye, FiEyeOff } from 'react-icons/fi';

// const SignUp = () => {
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [emailValid, setEmailValid] = useState(true);
    
//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     const handleEmailChange = (e) => {
//         const email = e.target.value;
//         const isValid = /\S+@\S+\.\S+/.test(email);
//         setEmailValid(isValid);
//     };

//     return (
//         <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-4">
//             <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
//                 <h2 className="text-3xl font-bold text-green-800 text-center mb-4">Register</h2>
//                 <p className="text-gray-500 text-center mb-8">Create your new account</p>
//                 <form>
//                     <div className="mb-4">
//                         <div className="flex items-center bg-green-100 p-2 rounded">
//                             <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M10 4a2 2 0 100-4 2 2 0 000 4zm0 2C6.686 6 4 8.686 4 12v5h12v-5c0-3.314-2.686-6-6-6zm-3 6a3 3 0 016 0H7z"/>
//                             </svg>
//                             <input 
//                                 type="text" 
//                                 placeholder="Full Name" 
//                                 className="bg-green-100 w-full pl-2 outline-none"
//                             />
//                         </div>
//                     </div>
//                     <div className="mb-4">
//                         <div className={`flex items-center bg-green-100 p-2 rounded ${emailValid ? '' : 'border-red-500 border'}`}>
//                             <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                                 <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v10h12V5H4zm2.22 2.22a1 1 0 011.42 0L10 9.59l2.36-2.37a1 1 0 011.42 1.42l-3 3a1 1 0 01-1.42 0l-3-3a1 1 0 010-1.42z"/>
//                             </svg>
//                             <input 
//                                 type="email" 
//                                 placeholder="abc123@gmail.com" 
//                                 className="bg-green-100 w-full pl-2 outline-none"
//                                 onChange={handleEmailChange}
//                             />
//                             {emailValid && (
//                                 <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd"/>
//                                 </svg>
//                             )}
//                         </div>
//                     </div>
//                     <div className="mb-6">
//                         <div className="flex items-center bg-green-100 p-2 rounded">
//                             <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v5a6 6 0 006 6h4a6 6 0 006-6V8a6 6 0 00-6-6h-4zm-1 7a1 1 0 112 0v2a1 1 0 11-2 0V9z" clipRule="evenodd"/>
//                             </svg>
//                             <input 
//                                 type={passwordVisible ? "text" : "password"} 
//                                 placeholder="Password" 
//                                 className="bg-green-100 w-full pl-2 outline-none"
//                             />
//                             <button type="button" onClick={togglePasswordVisibility}>
//                                 {passwordVisible ? <FiEyeOff className="text-green-600" /> : <FiEye className="text-green-600" />}
//                             </button>
//                         </div>
//                     </div>
//                     <button className="bg-green-500 text-white w-full py-2 rounded-lg font-semibold">Login</button>
//                     <div className="flex items-center justify-between mt-4">
//                         <label className="flex items-center text-gray-500">
//                             <input type="checkbox" className="form-checkbox text-green-600" />
//                             <span className="ml-2">Remember Me</span>
//                         </label>
//                         <Link to="/forgot-password" className="text-green-600 hover:underline">Forgot password?</Link>
//                     </div>
//                 </form>
//                 <div className="flex items-center justify-center mt-6">
//                     <div className="h-px bg-gray-500 w-1/4"></div>
//                     <p className="text-gray-500 mx-2">Or continue with</p>
//                     <div className="h-px bg-gray-500 w-1/4"></div>
//                 </div>
//                 <div className="flex justify-center space-x-4 mt-6">
//                     {/* <FaFacebookF className="text-green-500 text-2xl cursor-pointer" /> */}
//                     <FaGoogle className="text-green-500 text-2xl cursor-pointer" />
//                     {/* <FaApple className="text-green-500 text-2xl cursor-pointer" /> */}
//                 </div>
//                 <p className="text-center text-gray-500 mt-8">
//                     Already have an account? <Link to="/login" className="text-green-600 font-semibold hover:underline">Login</Link>
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default SignUp;
import React, { useState } from 'react';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { FaFacebookF, FaGoogle, FaApple } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: ''
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [emailValid, setEmailValid] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        const isValid = /\S+@\S+\.\S+/.test(email);
        setEmailValid(isValid);
        setFormData({ ...formData, email: email });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/v1/users/register', formData);
            console.log('User registered successfully:', response.data);
            // Redirect to login page or dashboard on success
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-green-800 text-center mb-4">Register</h2>
                <p className="text-gray-500 text-center mb-8">Create your new account</p>
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <div className="flex items-center bg-green-100 p-2 rounded">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 4a2 2 0 100-4 2 2 0 000 4zm0 2C6.686 6 4 8.686 4 12v5h12v-5c0-3.314-2.686-6-6-6zm-3 6a3 3 0 016 0H7z" />
                            </svg>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="bg-green-100 w-full pl-2 outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className="flex items-center bg-green-100 p-2 rounded">
                            <input 
                                type="text" 
                                placeholder="Username" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="bg-green-100 w-full pl-2 outline-none"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div className={`flex items-center bg-green-100 p-2 rounded ${emailValid ? '' : 'border-red-500 border'}`}>
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v10h12V5H4zm2.22 2.22a1 1 0 011.42 0L10 9.59l2.36-2.37a1 1 0 011.42 1.42l-3 3a1 1 0 01-1.42 0l-3-3a1 1 0 010-1.42z" />
                            </svg>
                            <input 
                                type="email" 
                                placeholder="abc123@gmail.com" 
                                name="email"
                                value={formData.email}
                                onChange={handleEmailChange}
                                className="bg-green-100 w-full pl-2 outline-none"
                            />
                            {emailValid && (
                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                    </div>
                    <div className="mb-6">
                        <div className="flex items-center bg-green-100 p-2 rounded">
                            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v5a6 6 0 006 6h4a6 6 0 006-6V8a6 6 0 00-6-6h-4zm-1 7a1 1 0 112 0v2a1 1 0 11-2 0V9z" clipRule="evenodd" />
                            </svg>
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                placeholder="Password" 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-green-100 w-full pl-2 outline-none"
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FiEyeOff className="text-green-600" /> : <FiEye className="text-green-600" />}
                            </button>
                        </div>
                    </div>
                    <button className="bg-green-500 text-white w-full py-2 rounded-lg font-semibold" type="submit">Register</button>
                </form>
                {/* Rest of your code */}
            </div>
        </div>
    );
};

export default SignUp;
