import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/order.css"

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please sign in first.');
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/api/fetch-last-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders.');
      }
    };
    fetchOrders();
  }, []);

  if (error) {
    return <div className="orders-error">{error}</div>;
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>
      {orders.length > 0 ? (
        <ul className="orders-items">
          {orders.map((item) => (
            <li key={item.productId} className="orders-item">
              <p>{item.productName}</p>
              <p className="price">Price: {item.productPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="orders-empty">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
