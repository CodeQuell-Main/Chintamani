import React, { useState, useEffect } from "react";
import axios from "axios";
import Loder from "../componants/Loder";
import { Link, useNavigate } from "react-router-dom";

import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
} from "../firebase/firebaseConfig";


const Profile = () => {

  //hooks
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  //handelchange 
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //signup
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
    } finally {
      setLoading(false);
    }
  };

  //singin
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

      setUser(userResponse.data);
      localStorage.setItem("user", JSON.stringify(userResponse.data));

      if (phone === "1234567890" && password === "1234") {
        navigate("/admin");
      } else {
        navigate("/"); 
      }
    } catch (err) {
      setError(err.response?.data || "Error during sign-in");
    } finally {
      setLoading(false);
    }
};


  //sing in with google
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

      alert(message);
    } catch (error) {
      setError(error.response?.data?.message || "Error during Google Sign-In");
    } finally {
      setLoading(false);
    }
  };

  //logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (error) {
      setError(error.message || "Error during logout");
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  if(loading){
    return <Loder/>
  }

  return (
    <section className="Login">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="left md:flex justify-center items-center col-span-1">
        
          <img
            src="/images/Logo.svg"
            alt="Logo"
            className="md:w-96 w-24 md:mt-0 mt-4"
          />
        </div>

        <div className="md:bg-[#faf7f0] md:col-start-2 md:mt-0 mt-14 h-screen flex flex-col justify-center items-center">
        <div className="absolute top-3 right-4"><Link to='/'><img src="/images/mobile-Home.svg" alt="" className="mb-2" /></Link></div>
          {user ? (
            <div className="flex flex-col justify-center items-center gap-7">
              <h2 className="text-2xl">
                Welcome,{" "}
                <span className="">{user?.Name || "User"}</span>!
              </h2>
              <Link to="/products">
                <button
                  type="button"
                  className="bg-[#439C33] hover:bg-[#358327] px-12 py-2 rounded-2xl text-2xl text-white "
                >
                  Explore
                </button>
              </Link>
              <button
                className=" text-xl bg-red-400 px-10 py-2 rounded-2xl hover:bg-red-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl  md:">
                {isSignUp ? "Sign-Up" : "Sign-In"}
              </h2>

              <form
                onSubmit={isSignUp ? handleSignUp : handleSignIn}
                className="mt-8 md:mt-6 "
              >
                {isSignUp && (
                  <div className="phone-no">
                    <label className="md:text-[#676666] text-white  text-xl ">
                      Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-6 py-2 rounded-full border-[1.5px] border-black" 
                    />
                  </div>
                )}

                <div className="mt-4">
                  <label className="md:text-[#676666] text-white  text-xl">Phone:</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-2 rounded-full border-[1.5px] border-black"
                  />
                </div>

                <div className="mt-4">
                  <label className="md:text-[#676666] text-white  text-xl">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-2 rounded-full  border-[1.5px] border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="text-center w-full bg-[#475AFF] text-white  text-2xl mt-10 py-2 rounded-full"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </form>

              {error && <p className="error text-xl mt-2 text-red-600">{error}</p>}

              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="mt-6  text-xl"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Create a new account? Sign Up"}
              </button>

              <button
                onClick={handleGoogleSignIn}
                className="flex mt-6 items-center  text-xl"
              >
                Continue with Google 
              </button>
            </>
          )}
        </div>
      </div>
    </section>

    
  );
};

export default Profile;
