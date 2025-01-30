import React from 'react'
import { useEffect , useState } from 'react'
import axios from 'axios'

const AdminPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/get-orders'); // Make sure the endpoint matches your backend route
            setOrders(response.data.orders); // Assuming the response has an 'orders' field
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
    
        fetchOrders();
      }, []);

  return (
    <div className="flex justify-center items-start bg-[#faf7f0] px-20 overflow-auto ">
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
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.orderID}>
              <td className="px-4 border-2 border-black">{index + 1}</td>
              <td className="px-4 border-2 border-black">
                {order.cartItems.map(item => item.productId).join(", ")}
              </td>
              <td className="px-4 border-2 border-black">
                {order.cartItems.map(item => item.productName).join(", ")}
              </td>
              <td className="px-4 border-2 border-black">
                {order.cartItems
                  .map(item => item.quantity)
                  .join(", ")}
              </td>
              <td className="px-4 border-2 border-black">
                {order.cartItems
                  .reduce((total, item) => total + item.productPrice * item.quantity, 0)
                  .toFixed(2)}
              </td>
              <td className="px-4 border-2 border-black">{order.customerName}</td>
              <td className="px-4 border-2 border-black">{order.phone}</td>
              <td className="px-4 border-2 border-black">
                {`${order.address.street}, ${order.address.state}, ${order.address.zipCode}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPage
