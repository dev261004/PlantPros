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
    const [newAddress, setNewAddress] = useState({ name: '', address: '', phone: '', setAsDefault: false });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        fetchCart();
        fetchAddresses();
    }, []);

    const fetchCart = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/cart');
            setCartItems(response.data);
            setTotalAmount(response.data.reduce((acc, item) => acc + item.price * item.quantity, 0));
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const fetchAddresses = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/address');
            setAddresses(response.data.result);
            const defaultAddr = response.data.result.find(addr => addr.setAsDefault) || response.data.result[0];
            setSelectedAddress(defaultAddr);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const addNewAddress = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/v1/address', newAddress);
            setAddresses([...addresses, response.data.result]);
            if (newAddress.setAsDefault) setSelectedAddress(response.data.result);
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAddress) {
            setError('Please select a shipping address.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/api/orders', {
                cartItems,
                shippingDetails: selectedAddress,
                totalAmount,
            });
            if (response.status === 200) {
                setSuccess(true);
                setCartItems([]);
            }
        } catch (error) {
            setError('Error during checkout. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-5xl font-bold text-green-800 mb-8">Checkout</h1>
            {success ? (
                <div className="bg-green-100 p-6 rounded-lg text-center">
                    <h2 className="text-2xl text-green-700">Order placed successfully!</h2>
                </div>
            ) : (
                <div className="space-y-8">
                    <h2 className="text-xl font-semibold text-green-700">Order Summary</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center justify-between mb-4">
                                <img src={item.image} alt={item.name} className="w-24 h-24 rounded mr-4" />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p>₹{item.price} x {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between mt-4 border-t pt-4">
                            <h3 className="text-lg font-semibold">Total:</h3>
                            <p className="text-lg font-semibold">₹{totalAmount}</p>
                        </div>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-green-700">Shipping Details</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <select onChange={(e) => setSelectedAddress(addresses.find(addr => addr._id === e.target.value))}>
                            {addresses.map(addr => (
                                <option key={addr._id} value={addr._id}>{addr.name} - {addr.address}</option>
                            ))}
                        </select>
                        
                        <h3 className="text-lg font-semibold mt-4">Add New Address</h3>
                        <input type="text" name="name" placeholder="Full Name" onChange={handleAddressChange} className="w-full p-2 border" />
                        <input type="text" name="address" placeholder="Shipping Address" onChange={handleAddressChange} className="w-full p-2 border" />
                        <input type="text" name="phone" placeholder="Phone Number" onChange={handleAddressChange} className="w-full p-2 border" />
                        <input type="checkbox" name="setAsDefault" onChange={(e) => setNewAddress({ ...newAddress, setAsDefault: e.target.checked })} /> Set as Default
                        <button onClick={addNewAddress} className="bg-blue-500 text-white p-2 mt-2">Save Address</button>
                    </div>
                    
                    {error && <p className="text-red-500">{error}</p>}
                    <button onClick={handleSubmit} className="w-full bg-green-500 text-white py-3 mt-4">Complete Order</button>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
