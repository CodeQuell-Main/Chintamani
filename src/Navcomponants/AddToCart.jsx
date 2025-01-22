import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please sign in first.");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:4000/api/fetch-cart-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCartItems(response.data);
      } catch (err) {
        setError("Failed to fetch cart products.");
      }
    };
    fetchCartProducts();
  }, []);

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please sign in to remove items from your cart.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/remove-from-cart",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(cartItems.filter((item) => item.productId !== productId));
    } catch (err) {
      setError("Failed to remove product from cart.");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productPrice * (item.quantity || 1),
    0
  );

  const ShippingPrice= parseFloat("100")

  if (error) {
    return <div className="cart-error">{error}</div>;
  }

  return (
    <div className="bg-[#faf7f0] px-20 h-[78vh] text-[#4A4947]">
      <div className="">
        <p className="font-bold sha text-4xl pt-10 pb-2 text-[#4A4947]">
          Total Cart Items: {cartItems.length}
        </p>
      </div>

      <div className="grid grid-cols-6">
        <div className="col-span-4">
          <div className="grid grid-cols-4 pt-4">
            <div className="flex justify-center items-center gap-4">
              <img src="/images/Packing.svg" alt="productdetails" />
              <p className="text-xl font-bold">Product Details</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="/images/MoneyBagRupee.svg" alt="productprice" />
              <p className="text-xl font-bold">Price</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="/images/Eye.svg" alt="productQuntity" />
              <p className="text-xl font-bold">Quantity</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="/images/Cash.svg" alt="Total" />
              <p className="text-xl font-bold">Total</p>
            </div>
          </div>

          <hr className="border-[#B17457] border-2" />

          <div className="">
            {cartItems.length > 0 ? (
              <ul className="cart-items grid gap-8 mt-4 overflow-x-auto h-80">
                {cartItems.map((item) => (
                  <li key={item.productId} className="cart-item">
                    <div className="grid grid-cols-4 items-center">
                      <div className="flex items-center">
                        <button
                          className="removefromcart"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <img src="/images/Delete.svg" alt="Delete" className="w-8" />
                        </button>

                        <div className="flex flex-col justify-center items-center text-lg font-bold">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="cart-item-image w-20"
                          />
                          <p className="text-lg font-bold">{item.productName}</p>
                        </div>
                      </div>

                      <div className="cart-item-info">
                        <p className="price text-lg font-bold">{item.productPrice}</p>
                      </div>

                      <div className="">
                        <input
                          type="number"
                          id="quantity"
                          value={item.quantity || 1}
                          onChange={(e) =>
                            setCartItems((prevCartItems) =>
                              prevCartItems.map((cartItem) =>
                                cartItem.productId === item.productId
                                  ? { ...cartItem, quantity: parseInt(e.target.value, 10) || 1 }
                                  : cartItem
                              )
                            )
                          }
                          min="1"
                          className="w-14 text-center py-1 bg-[#B17457] text-white rounded-2xl"
                        />
                      </div>

                      <div className="">
                        <p className="text-lg font-bold">
                          ₹{(item.productPrice * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="cart-empty">Your cart is empty.</p>
            )}
          </div>
        </div>

        <div className="col-span-2 px-6 py-4">
          <div className="border-2 border-[#B17457] px-6 py-8 rounded-2xl">
            <h1 className="font-bold text-4xl">Cart Totals</h1>
            <div className="grid  gap-4 mt-8 pb-4">
              <p className="text-2xl grid grid-cols-2 text-left font-semibold">
                Total Price:{" "}
                <span className="text-[#B17457] font-bold text-center">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </p>
            </div>

            <p className="text-2xl grid grid-cols-2 text-left font-semibold mt-6">
                Shipping Charge:{" "}
                <span className="text-[#B17457] font-bold text-center">
                ₹{ShippingPrice.toFixed(2)}
                </span>
              </p>

              <p className="text-2xl grid grid-cols-2 text-left font-semibold mt-6">
                Total Price:{" "}
                <span className="text-[#B17457] font-bold text-center">
                  ₹{(parseFloat(totalPrice.toFixed(2))+ShippingPrice).toFixed(2)}
                </span>
              </p>

              <div className="flex justify-center items-center mt-8">
                <Link to="/" className="w-full">
                    <button
                      type="button"
                      className="bg-[#B17457] py-2 font-bold text-white text-lg w-full  rounded-2xl"
                    >
                      Proceed To Order
                    </button>
                    
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
