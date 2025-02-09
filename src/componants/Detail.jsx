import React from 'react'
import axios from 'axios'
import Loder from './Loder'
import { useNavigate } from 'react-router-dom'
import { useState , useEffect } from 'react'

const Detail = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState("")
    const [orderDetails, setOrderDetails] = useState(null);
    const [Loding, setloding] = useState(true)
    const [formData, setFormData] = useState({
        fullName: "",
        streetAddress: "",
        phoneNumber: "",
        email: "",
        state: "",
        zipCode: "",
    });
    const neviget = useNavigate();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const createOrder = async () => {
        try {
            const { fullName, streetAddress, phoneNumber, email, state, zipCode } = formData;
    
            if (!fullName || !streetAddress || !phoneNumber || !email || !state || !zipCode) {
                alert("Please fill all required fields");
                return;
            }
    
            const orderID = "ORD" + Date.now();
    
            const updatedCartItems = cartItems.map(item => ({
                ...item,
                quantity: item.quantity || 1, 
            }));
    
            // Create Razorpay order
            const { data: order } = await axios.post("http://localhost:4000/api/create-order", {
                amount: totalPrice,
                currency: "INR",
                orderID,
            });
    
            if (!window.Razorpay) {
                alert("Razorpay SDK not loaded. Please check your internet connection.");
                return;
            }
    
            const options = {
                key: "rzp_test_iIYcf8MKzdXw4g",
                amount: order.amount,
                currency: order.currency,
                name: "Chitamani",
                order_id: order.id,
                handler: function (response) {
                    console.log("Payment successful:", response);
                    verifyPayment(response, orderID, updatedCartItems);
                },
                prefill: {
                    name: fullName,
                    email: email,
                    contact: phoneNumber,
                },
            };
    
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };
    
    const verifyPayment = async (paymentDetails, orderID, updatedCartItems) => {
        try {
            const response = await axios.post("http://localhost:4000/api/verify-payment", {
                razorpay_order_id: paymentDetails.razorpay_order_id,
                razorpay_payment_id: paymentDetails.razorpay_payment_id,
                razorpay_signature: paymentDetails.razorpay_signature,
            });
    
            if (response.data.message === "Payment verified successfully") {
                alert("Payment successful!");
    
                await axios.post("http://localhost:4000/api/store-order", {
                    customerName: formData.fullName,
                    phone: formData.phoneNumber,
                    email: formData.email,
                    address: { 
                        street: formData.streetAddress, 
                        state: formData.state, 
                        zipCode: formData.zipCode 
                    },
                    cartItems: updatedCartItems,
                    totalAmount: totalPrice,
                    orderID,
                    paymentID: paymentDetails.razorpay_payment_id, 
                });
    
                alert("Order stored successfully!");

                await axios.post("http://localhost:4000/api/send-receipt", {
                    email: formData.email,
                    fullName: formData.fullName,
                    orderID,
                    cartItems: updatedCartItems,
                    totalAmount: totalPrice,
                });
    
                alert("Receipt sent to your email!");
                
                await axios.delete("http://localhost:4000/api/clear-cart", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                neviget("/")

            } else {
                alert("Payment verification failed! Order not stored.");
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
        }
    };
    
    
    useEffect(() => {
        const fetchCartProducts = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please sign in first.");
                setloding(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:4000/api/fetch-cart-products",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCartItems(response.data.map(item => ({ ...item, quantity: item.quantity || 1 })));
            } catch (err) {
                setError("Failed to fetch cart products.");
            } finally {
                setloding(false);
            }
        };
        fetchCartProducts();
    }, []);

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.productPrice * (item.quantity || 1),
        0
    );

    if (Loding) {
        return <Loder/>
    }

    if (error) {
        return <div className="cart-error flex justify-center items-center text-4xl h-[80vh] text-red-600">{error}</div>;
    }

  return (
    <div className=" lg:px-20 md:px-10 px-3  md:h-[78vh] text-[#4A4947]">

            <div className="">
                <p className="font-bold sha text-4xl pt-10 pb-2 text-[#4A4947]">Shipping Address : </p>
            </div>

            <div className="grid grid-cols-6 max-[1400px]:grid-cols-12 max-[800px]:grid-cols-1 max-[800px]:pb-16  items-center">
                <div className="col-span-4 max-[1400px]:col-span-7 max-[1100px]:col-span-6">
                    <div className="border-2 border-[#b17457] rounded-xl mt-6 px-10 py-4">

                        <form action="">
                            <div className="grid grid-cols-2 gap-8 ">
                                <div className="flex flex-col justify-center items-start col-span-2 ">
                                    <label htmlFor="" className=''>Full Name</label>
                                    <input type="text" name="fullName" id="" value={formData.fullName} onChange={handleInputChange} className="border-2 bg-[#faf7f0] outline-none px-6 py-1 border-[#b1745780] rounded-xl w-full" />
                                </div>

                                <div className="flex flex-col justify-center items-start">
                                    <label htmlFor="" className=''>Streeet Address</label>
                                    <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} id="" className="border-2 bg-[#faf7f0] outline-none px-6 py-1 border-[#b1745780] rounded-xl w-full" />
                                </div>

                                <div className="flex flex-col justify-center items-start">
                                    <label htmlFor="" className=''>Phone Number</label>
                                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} id="" className="border-2 bg-[#faf7f0] outline-none px-6 py-1 border-[#b1745780] rounded-xl w-full font-family: var(--font-serif);" />
                                </div>

                                <div className="flex flex-col max-[1000px]:col-span-2 justify-center items-start">
                                    <label htmlFor="" className=''>Email ID</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} id="" className="border-2 bg-[#faf7f0] outline-none px-6 py-1 border-[#b1745780] rounded-xl w-full" />
                                </div>

                                <div className="grid max-[1000px]:grid-cols-2 grid-cols-4 col-span-2  gap-5">
                                    <div className="flex flex-col justify-center items-start">
                                        <label htmlFor="" className=''>State</label>
                                        <input type="text" name="state" id="" value={formData.state} onChange={handleInputChange} className="border-2 bg-[#faf7f0] outline-none px-6 py-1 border-[#b1745780] rounded-xl w-full" />
                                    </div>

                                    <div className="flex flex-col justify-center items-start">
                                        <label htmlFor="" className=''>Zip Code</label>
                                        <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} id="" className="border-2 bg-[#faf7f0] outline-none px-6 py-1 border-[#b1745780] rounded-xl w-full" />
                                    </div>
                                </div>
                            </div>
                            
                        </form>

                    </div>
                </div>


                <div className="col-span-2 max-[1400px]:col-span-5 max-[1100px]:col-span-6 md:px-6 py-4   ">
                    <div className="border-2 border-[#B17457]  md:px-6 py-2 px-2 rounded-2xl">
                        <h1 className='font-semibold text-2xl'>Order Detail</h1>
                        {cartItems.length > 0 ? (
                            <div className="grid gap-4 mt-6 overflow-y-auto md:h-44" >
                                {cartItems.map((item) => (
                                    <div className="grid grid-cols-5 max-[1400px]:gap-4 items-center" key={item.productId}>
                                        <img
                                            src={item.productImage}
                                            alt={item.productName}
                                            className="w-16" />
                                        <div className="col-span-2">
                                            <p className="marathi max-[1500px]:text-sm">{item.productName}</p>
                                            <p className=" max-[1500px]:text-sm">{item.productPrice}</p>
                                        </div>
                                        <div className="">
                                            <input
                                                type="number"
                                                id="quantity"
                                                value={item.quantity || 0}
                                                onChange={(e) =>
                                                    setCartItems((prevCartItems) =>
                                                        prevCartItems.map((cartItem) =>
                                                            cartItem.productId === item.productId
                                                                ? { ...cartItem, quantity: parseInt(e.target.value, 10) || 0 }
                                                                : cartItem
                                                        )
                                                    )
                                                }
                                                min="1"
                                                max="5"
                                                className="w-14 text-center py-1 bg-[#B17457] text-white rounded-2xl"
                                            />
                                        </div>
                                        <div className="">
                                            <p className="text-lg font-bold">
                                                ₹{(item.productPrice * (item.quantity || 1)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="cart-empty">Your cart is empty.</p>
                        )}

                        <div className="grid grid-cols-4 gap-2 mt-8 pb-4">
                            
                            <span className='min-[1500px]:col-start-2 max-[1500px]: text-lg font-semibold justify-self-center'>Subtotal -</span> <span className='text-[#B17457] text-lg font-bold  col-span-2'>₹{totalPrice.toFixed(2)}</span>
                            <span className='min-[1500px]:col-start-2 max-[1500px]:row-start-2 text-lg font-semibold justify-self-center'>Shipping -</span> <span className='text-[#B17457] text-lg font-bold max-[1400px]:col-span-3  col-span-2'>Depend on the place</span>
                            <span className='min-[1500px]:col-start-2 max-[1500px]:row-start-3 text-xl font-bold justify-self-center '>Total -</span> <span className='text-[#B17457] text-xl font-bold   col-span-2'>₹{(parseFloat(totalPrice.toFixed(2)))}</span>
                        </div>

                        <div className="flex justify-center items-center">
                            <button type="button" className='bg-[#B17457] py-2 font-bold text-white text-lg w-full  rounded-2xl' onClick={createOrder}>Proceed To Payment </button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  )
}

export default Detail
