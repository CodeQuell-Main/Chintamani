import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false); 
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({ name: '', phone: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { name, phone, password } = formData;
      const response = await axios.post('http://localhost:4000/api/sign-up', { name, phone, password });
      alert(response.data);
      setIsSignUp(false);
    } catch (err) {
      setError(err.response?.data || 'Error during sign-up');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { phone, password } = formData;
      const response = await axios.post('http://localhost:4000/api/sign-in', { phone, password });

      const { token, message } = response.data;
      alert(message);

      localStorage.setItem('token', token);

      const userResponse = await axios.get('http://localhost:4000/api/user-details', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(userResponse.data);
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data || 'Error during sign-in');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="profile-container">
      {user ? (
        <div>
          <h2>Welcome, {user.Name}!</h2>
          <p><strong>Phone:</strong> {user.Phone}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <h2>{isSignUp ? 'Sign-Up' : 'Sign-In'}</h2>

          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            {isSignUp && (
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
          </form>

          {error && <p className="error">{error}</p>}

          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Already have an account? Sign In' : 'Create a new account? Sign Up'}
          </button>
        </>
      )}
    </div>
  );
};

export default Profile;
