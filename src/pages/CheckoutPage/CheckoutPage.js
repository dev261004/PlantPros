// // src/components/Checkout.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const CheckoutPage= () => {
//     // Example cart items hardcoded (for the sake of this example)
//     const [cartItems, setCartItems] = useState([
//         {
//             id: 1,
//             name: 'Aloe Vera',
//             price: 150,
//             quantity: 2,
//             image: 'https://via.placeholder.com/150',
//         },
//         {
//             id: 2,
//             name: 'Bamboo Plant',
//             price: 300,
//             quantity: 1,
//             image: 'https://via.placeholder.com/150',
//         },
//     ]);

//     const [shippingDetails, setShippingDetails] = useState({
//         name: '',
//         address: '',
//         phone: '',
//     });

//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);
//     const [totalAmount, setTotalAmount] = useState(0);

//     // Calculate total amount
//     useEffect(() => {
//         const total = cartItems.reduce(
//             (acc, item) => acc + item.price * item.quantity,
//             0
//         );
//         setTotalAmount(total);
//     }, [cartItems]);

//     const handleChange = (e) => {
//         setShippingDetails({
//             ...shippingDetails,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!shippingDetails.name || !shippingDetails.address || !shippingDetails.phone) {
//             setError('Please fill in all shipping details.');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:4000/api/orders', {
//                 cartItems,
//                 shippingDetails,
//                 totalAmount,
//             });

//             if (response.status === 200) {
//                 setSuccess(true);
//                 setShippingDetails({ name: '', address: '', phone: '' });
//             }
//         } catch (error) {
//             setError('Error during checkout. Please try again.');
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 p-8">
//             <h1 className="text-5xl font-bold text-green-800 mb-8">Checkout</h1>

//             {success ? (
//                 <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
//                     <h2 className="text-2xl text-green-700">Order placed successfully!</h2>
//                     <p className="text-green-600">Thank you for your purchase!</p>
//                 </div>
//             ) : (
//                 <div className="space-y-8">
//                     <div>
//                         <h2 className="text-xl font-semibold text-green-700 mb-4">Order Summary</h2>
//                         <div className="bg-white p-6 rounded-lg shadow-lg">
//                             {cartItems.map((item) => (
//                                 <div key={item.id} className="flex items-center justify-between mb-4">
//                                     <div className="flex items-center">
//                                         <img
//                                             src={item.image}
//                                             alt={item.name}
//                                             className="w-24 h-24 object-cover rounded mr-4"
//                                         />
//                                         <div>
//                                             <h3 className="text-lg font-semibold">{item.name}</h3>
//                                             <p className="text-gray-600">
//                                                 ₹{item.price} x {item.quantity}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                             <div className="flex justify-between mt-4 border-t pt-4">
//                                 <h3 className="text-lg font-semibold text-green-700">Total:</h3>
//                                 <p className="text-lg font-semibold text-green-700">₹{totalAmount}</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <h2 className="text-xl font-semibold text-green-700 mb-4">Shipping Details</h2>
//                         <form onSubmit={handleSubmit} className="space-y-4">
//                             <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Full Name"
//                                 value={shippingDetails.name}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                             />
//                             <input
//                                 type="text"
//                                 name="address"
//                                 placeholder="Shipping Address"
//                                 value={shippingDetails.address}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                             />
//                             <input
//                                 type="text"
//                                 name="phone"
//                                 placeholder="Phone Number"
//                                 value={shippingDetails.phone}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                             />
//                             {error && <p className="text-red-500">{error}</p>}
//                             <button
//                                 type="submit"
//                                 className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-300"
//                             >
//                                 Complete Order
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CheckoutPage;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({ name: '', phone: '', address: '', city: '', state: '', pinCode: '', setAsDefault: false });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchCart();
        fetchAddresses();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:4000/api/v1/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = response.data;
            if (data && data.items) {
                const formattedItems = data.items.map(item => ({
                    id: item.productId?._id,
                    name: item.productId?.plantName || item.productId?.name,
                    price: item.productId?.price,
                    quantity: item.quantity,
                    image: item.productId?.image
                }));
                setCartItems(formattedItems);
                setTotalAmount(data.totalPrice || 0);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://localhost:4000/api/v1/address', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const fetchedAddresses = response.data.result || [];
            setAddresses(fetchedAddresses);
            if (fetchedAddresses.length > 0) {
                const defaultAddr = fetchedAddresses.find(addr => addr.setAsDefault) || fetchedAddresses[0];
                setSelectedAddress(defaultAddr);
            }
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const addNewAddress = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post('http://localhost:4000/api/v1/address', newAddress, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const added = response.data.result;
            const updatedAddresses = [...addresses, added];
            setAddresses(updatedAddresses);
            
            if (newAddress.setAsDefault || addresses.length === 0) {
                setSelectedAddress(added);
            }
            
            // Clear the form
            setNewAddress({ name: '', phone: '', address: '', city: '', state: '', pinCode: '', setAsDefault: false });
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAddress) {
            setError('Please select or add a shipping address.');
            return;
        }
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post('http://localhost:4000/api/v1/order', {
                cartItems,
                shippingDetails: selectedAddress,
                totalAmount,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setSuccess(true);
            setCartItems([]);
            setTotalAmount(0);
        } catch (error) {
            console.error('Error during checkout:', error);
            setError('Error during checkout. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-5xl font-bold text-green-800 mb-8">Checkout</h1>
            {success ? (
                <div className="bg-green-100 p-6 rounded-lg text-center shadow-lg">
                    <h2 className="text-2xl text-green-700 font-bold mb-2">Order placed successfully!</h2>
                    <p className="text-green-600">Thank you for your purchase.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    <div>
                        <h2 className="text-xl font-semibold text-green-700 mb-4">Order Summary</h2>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-center py-4">Your cart is empty.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded mr-4" />
                                            ) : (
                                                <div className="w-24 h-24 bg-gray-200 rounded mr-4 flex items-center justify-center text-gray-400">No Image</div>
                                            )}
                                            <div>
                                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                                <p className="text-gray-600">₹{item.price} x {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-semibold">₹{(item.price || 0) * (item.quantity || 1)}</p>
                                    </div>
                                ))
                            )}
                            <div className="flex justify-between mt-4 border-t pt-4">
                                <h3 className="text-lg font-semibold text-green-700">Total:</h3>
                                <p className="text-lg font-semibold text-green-700">₹{totalAmount}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-semibold text-green-700 mb-4">Shipping Details</h2>
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            {addresses.length > 0 && (
                                <div className="mb-6">
                                    <label className="block text-gray-700 font-medium mb-2">Select Address</label>
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        value={selectedAddress?._id || ''}
                                        onChange={(e) => setSelectedAddress(addresses.find(addr => addr._id === e.target.value))}
                                    >
                                        <option value="" disabled>Select an address</option>
                                        {addresses.map(addr => (
                                            <option key={addr._id} value={addr._id}>{addr.name} - {addr.address} ({addr.phone})</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            
                            <div className="border-t pt-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Address</h3>
                                <div className="space-y-4">
                                    <input type="text" name="name" value={newAddress.name} placeholder="Full Name" onChange={handleAddressChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    <input type="text" name="phone" value={newAddress.phone} placeholder="Phone Number (10 digits)" onChange={handleAddressChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    <input type="text" name="address" value={newAddress.address} placeholder="Shipping Address" onChange={handleAddressChange} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    <div className="flex space-x-4">
                                        <input type="text" name="city" value={newAddress.city} placeholder="City" onChange={handleAddressChange} className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                                        <input type="text" name="state" value={newAddress.state} placeholder="State" onChange={handleAddressChange} className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                                        <input type="text" name="pinCode" value={newAddress.pinCode} placeholder="Pin Code (6 digits)" onChange={handleAddressChange} className="w-1/3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
                                    </div>
                                    <label className="flex items-center space-x-2 text-gray-700">
                                        <input type="checkbox" name="setAsDefault" checked={newAddress.setAsDefault} onChange={(e) => setNewAddress({ ...newAddress, setAsDefault: e.target.checked })} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" /> 
                                        <span>Set as Default Address</span>
                                    </label>
                                    <button onClick={addNewAddress} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">Save Address</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {error && <p className="text-red-500 font-medium text-center">{error}</p>}
                    <button 
                        onClick={handleSubmit} 
                        disabled={cartItems.length === 0}
                        className={`w-full py-4 text-lg font-bold rounded-lg transition duration-300 ${cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed text-gray-200' : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'}`}
                    >
                        Complete Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
