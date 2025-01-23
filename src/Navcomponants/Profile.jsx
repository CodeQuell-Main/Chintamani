import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/profile.css";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
} from "../firebase/firebaseConfig";

const Profile = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { name, phone, password } = formData;
      const response = await axios.post("http://localhost:4000/api/sign-up", {
        name,
        phone,
        password,
      });
      alert(response.data);
      setIsSignUp(false);
    } catch (err) {
      setError(err.response?.data || "Error during sign-up");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const { phone, password } = formData;
      const response = await axios.post("http://localhost:4000/api/sign-in", {
        phone,
        password,
      });

      const { token, message } = response.data;
      alert(message);

      localStorage.setItem("token", token);

      const userResponse = await axios.get(
        "http://localhost:4000/api/user-details",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Fetched user details:", userResponse.data); // Debugging
      setUser(userResponse.data);
      localStorage.setItem("user", JSON.stringify(userResponse.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Error during sign-in");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const userData = {
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      };

      const response = await axios.post(
        "http://localhost:4000/api/google-auth",
        userData
      );

      const { token, user, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);

      console.log("Google Auth User:", user); // Debugging
      alert(message);
    } catch (error) {
      setError(error.response?.data?.message || "Error during Google Sign-In");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      setError(error.message || "Error during logout");
    }
  };

  return (
    <div className="profile-container">
      {user ? (
        <div>
          <h2>Welcome, {user?.Name || "User"}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <h2>{isSignUp ? "Sign-Up" : "Sign-In"}</h2>

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

            <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
          </form>

          {error && <p className="error">{error}</p>}

          <button onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp
              ? "Already have an account? Sign In"
              : "Create a new account? Sign Up"}
          </button>

          <button onClick={handleGoogleSignIn}>Continue with Google</button>
        </>
      )}
    </div>
  );
};

export default Profile;
