import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [orders, setOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState({}); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/get-orders');
                setOrders(response.data.orders);

                const initialCompletedState = {};
                response.data.orders.forEach(order => {
                    initialCompletedState[order.orderID] = order.isComplete || false;
                });
                setCompletedOrders(initialCompletedState);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (orderID) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;

        try {
            await axios.delete(`http://localhost:4000/api/delete-order/${orderID}`);
            setOrders(orders.filter(order => order.orderID !== orderID));
        } catch (error) {
            console.error('Error deleting order:', error);
            alert("Failed to delete order. Please try again.");
        }
    };

    const handleComplete = (orderID) => {
        setCompletedOrders(prevState => ({
            ...prevState,
            [orderID]: !prevState[orderID] 
        }));
    };

    return (
        <div className="flex justify-center items-start bg-[#faf7f0] px-20 overflow-auto">
            <table className="mt-6">
                <thead>
                    <tr>
                        <th className="px-4 border-2 border-black">Sr.No</th>
                        <th className="px-4 border-2 border-black">Product Id</th>
                        <th className="px-4 border-2 border-black">Product Name</th>
                        <th className="px-4 border-2 border-black">Product Quantity</th>
                        <th className="px-4 border-2 border-black">Total</th>
                        <th className="px-4 border-2 border-black">Customer Name</th>
                        <th className="px-4 border-2 border-black">Customer Phone No.</th>
                        <th className="px-4 border-2 border-black">Customer Address</th>
                        <th className="px-4 border-2 border-black">Order ID</th>
                        <th className="px-4 border-2 border-black">Payment ID</th>
                        <th className="px-4 border-2 border-black">Is Complete</th>
                        <th className="px-4 border-2 border-black">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.orderID} className={completedOrders[order.orderID] ? "line-through text-gray-500" : ""}>
                            <td className="px-4 border-2 border-black">{index + 1}</td>
                            <td className="px-4 border-2 border-black">
                                {order.cartItems.map(item => item.productId).join(", ")}
                            </td>
                            <td className="px-4 border-2 border-black">
                                {order.cartItems.map(item => item.productName).join(", ")}
                            </td>
                            <td className="px-4 border-2 border-black">
                                {order.cartItems.map(item => item.quantity).join(", ")}
                            </td>
                            <td className="px-4 border-2 border-black">
                                {order.cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2)}
                            </td>
                            <td className="px-4 border-2 border-black">{order.customerName}</td>
                            <td className="px-4 border-2 border-black">{order.phone}</td>
                            <td className="px-4 border-2 border-black">
                                {`${order.address.street}, ${order.address.state}, ${order.address.zipCode}`}
                            </td>
                            <td className="px-4 border-2 border-black">{order.orderID}</td>
                            <td className="px-4 border-2 border-black">{order.paymentID}</td>
                            <td className="px-4 border-2 border-black">
                                <input
                                    type="checkbox"
                                    checked={completedOrders[order.orderID]}
                                    onChange={() => handleComplete(order.orderID)}
                                />
                            </td>
                            <td className="px-4 border-2 border-black">
                                <button onClick={() => handleDelete(order.orderID)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPage;
