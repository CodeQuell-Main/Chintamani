import React, { useEffect, useState } from "react";
import axios from "axios";
import Loder from "../componants/Loder";
import { Link} from "react-router-dom";

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please sign in first.");
        setLoading(false);
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
      } finally {
        setLoading(false);
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
    (acc, item) => acc + item.productPrice ,
    0
  );


  if(loading){
    return <Loder/>
  }

  if (error) {
    return <div className="cart-error flex justify-center items-center text-4xl h-[80vh] text-red-600">{error}</div>;
  }


  return (
    <div className=" bg-white px-4 lg:px-20 lg:h-[78vh] text-[#4A4947] max-[800px]:pb-16" >
      <div className="">
        <p className=" sha text-4xl pt-10 pb-2 text-[#4A4947]">
          Total Cart Items: {cartItems.length}
        </p>
      </div>

      <div className="grid grid-cols-6 max-[1200px]:grid-cols-1">
        <div className="col-span-4">
          <div className="grid grid-cols-4 pt-4">
            <div className="flex justify-center items-center gap-4">
              <img src="/images/Packing.svg" alt="productdetails" className="max-[800px]:w-10 max-[500px]:hidden" />
              <p className="text-xl max-[800px]:text-sm ">Product Details</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="/images/MoneyBagRupee.svg" alt="productprice" className="max-[800px]:w-10 max-[500px]:hidden" />
              <p className="text-xl max-[800px]:text-sm ">Price</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="/images/Eye.svg" alt="productQuntity" className="max-[800px]:w-10 max-[500px]:hidden" />
              <p className="text-xl max-[800px]:text-sm ">Quantity</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <img src="/images/Cash.svg" alt="Total" className="max-[800px]:w-10 max-[500px]:hidden" />
              <p className="text-xl max-[800px]:text-sm ">Total</p>
            </div>
          </div>

          <hr className="border-[#B17457] border-2" />

          <div className="">
            {cartItems.length > 0 ? (
              <ul className="cart-items grid gap-8 mt-4 overflow-x-auto md:h-80 max-[500px]:h-52">
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

                        <div className="flex flex-col justify-center items-center text-lg ">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="cart-item-image w-36 justify-self-center"
                          />
                          <p className="text-lg  justify-self-center max-[800px]:text-sm">{item.productName}</p>
                        </div>
                      </div>

                      <div className="cart-item-info justify-self-center">
                        <p className="price text-lg ">{item.productPrice}</p>
                      </div>

                      <div className=" justify-self-center">
                        <input
                          readOnly
                          id="quantity"
                          value= "1"
                          className="w-14 text-center py-1 bg-[#B17457] text-white rounded-2xl justify-self-center"
                        />
                      </div>

                      <div className="justify-self-center">
                        <p className="text-lg  ">
                          ₹{(item.productPrice * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="cart-empty flex justify-center items-center text-4xl h-[20vh] text-red-600 ">Your cart is empty.</p>
            )}
          </div>
        </div>

        <div className="col-span-2 px-6 py-4">
          <div className="border-2 border-[#B17457] px-6 py-8 rounded-2xl">
            <h1 className=" text-4xl max-[1200px]:text-xl">Cart Totals</h1>
            <div className="grid  gap-4 mt-8 pb-4">
              <p className="text-xl max-[1200px]:text-lg grid grid-cols-2 text-left ">
                Total Price:{" "}
                <span className="text-[#B17457]  text-center">
                  ₹{totalPrice.toFixed(2)}
                </span>
              </p>
            </div>

            <p className="text-xl max-[1200px]:text-lg grid grid-cols-2 text-left  mt-6">
                Shipping Charge:{" "}
                <span className="text-[#B17457]  text-center">
                Depends on delivery
                </span>
              </p>

              <p className="text-xl max-[1200px]:text-lg grid grid-cols-2 text-left  mt-6">
                Total Price:{" "}
                <span className="text-[#B17457]  text-center">
                  ₹{(parseFloat(totalPrice.toFixed(2)))}
                </span>
              </p>

              <div className="flex justify-center items-center w-full mt-8">
                <Link to="/detail" className="w-full">
                    <button
                      type="button"
                      className="bg-[#B17457] py-2  text-white text-lg w-full  rounded-2xl"
                    >
                      Go to Order
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
