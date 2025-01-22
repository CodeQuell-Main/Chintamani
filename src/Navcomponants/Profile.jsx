import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "../style/profile.css";

const Profile = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign-in and sign-up
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // For navigation

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/sign-up', {
        name,
        phone,
        password,
      });
      alert(response.data); // Display success message
      setIsSignUp(false); // Switch to sign-in after successful sign-up
    } catch (err) {
      setError('Error during sign-up: ' + (err.response?.data || err.message));
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/sign-in', {
        phone,
        password,
      });

      const { token, message } = response.data;
      alert(message); // Display success message

      // Save the token to localStorage for future use
      localStorage.setItem('token', token);

      navigate('/home'); // Redirect to home after successful sign-in
    } catch (err) {
      setError('Error during sign-in: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="profile-container">
      <h2>{isSignUp ? 'Sign-Up' : 'Sign-In'}</h2>
      
      <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        {isSignUp && (
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
        )}
        
        <div>
          <label>Phone:</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div>
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Already have an account? Sign In' : 'Create a new account? Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Profile;
