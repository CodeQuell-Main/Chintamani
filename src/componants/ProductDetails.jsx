import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loder from './Loder';

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newReview, setNewReview] = useState('');

    // Fetch product details
    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/fetch-product/${productId}`)
            .then((response) => {
                setProduct(response.data);
                setReviews(response.data.reviews || []);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [productId]);


    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    // Add to cart
    const addToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please sign in to add items to your cart.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:4000/api/add-to-cart",
                { productId, quantity },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(`Added ${quantity} item(s) to the cart!`);
        } catch (err) {
            setError("Failed to add product to cart.");
        }
    };

    if (loading) return <Loder/>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="product-details-container bg-[#faf7f0] max-[800px]:pb-16">
          <div className="">

            <div className="flex max-[750px]:flex-col max-[750px]:justify-center  justify-evenly items-center">

              <div className="product-gallery ">
                <img src={product.productImage} alt={product.productName} />
                {product.productImages && product.productImages.length > 1 && (
                    <div className="gallery-thumbnails">
                        {product.productImages.map((image, index) => (
                            <img key={index} src={image} alt={`Thumbnail ${index + 1}`} />
                        ))}
                    </div>
                )}
             </div>

             <div className="head flex md:justify-start justify-center   items-center gap-16">
                  <div>
                    <p className="name marathi text-2xl text-left">{product.productName}</p>
                   
                    <div className="flex items-center justify-start gap-10">
                      <div>
                        <i className="fa-solid mx-1 fa-star text-yellow-500"></i>
                        <i className="fa-solid mx-1 fa-star text-yellow-500"></i>
                        <i className="fa-solid mx-1 fa-star text-yellow-500"></i>
                        <i className="fa-solid mx-1 fa-star text-yellow-500"></i>
                        <i className="fa-solid mx-1 fa-star text-yellow-500"></i>
                      </div>
                      <p className="text-[#676666] font-semibold">100+ Review</p>
                    </div>

                    <p className="price font-bold text-2xl text-left">{product.productPrice}/kg</p>

                    <div className="text-[#4A4947] font-bold text-lg mt-3 text-left">
                        <p>Item Form: Powder</p>
                        <p>Net Quantity: 1000.0 gram / 1 kg</p>
                        <p>Diet Type: Vegetarian</p>
                      <div className="quantity-container text-left flex items-center gap-2">
                              <label htmlFor="quantity">Quantity:</label>
                              <input 
                                  type="number" 
                                  id="quantity" 
                                  value={quantity} 
                                  onChange={handleQuantityChange} 
                                  min="1" 
                                  max="5" 
                                  className='w-14 text-center py-1 bg-[#B17457] text-white rounded-2xl'
                              />
                      </div>
                   </div>

                   <div className="grid md:grid-cols-3 grid-cols-2 gap-6 mt-6">
                        <div className="">
                          <button type="button" className='bg-[#B17457] w-full text-center font-semibold py-2 px-6 text-white rounded-lg' onClick={addToCart}>Buy Now</button>
                        </div>
                        <div className="">
                        <button type="button" className='bg-white w-full border-[1.5px] border-[#1c1c1c] flex justify-around items-center gap-2 text-center font-semibold py-2 px-6 rounded-lg' onClick={addToCart}>Add To Cart <img src="/images/UpLeft.svg" alt="" className="w-6" /></button>
                        </div>
                  </div>
                  </div>
              </div>
            </div>

          </div>
           
            
          <div className="grid grid-cols-6 max-[800px]:grid-cols-1 max-[800px]:gap-4 mx-44 max-[1000px]:mx-12 max-[500px]:mx-6 font-semibold mt-8 ">
              <div className="text-xl max-[800px]:text-[24px] font-extrabold">Product Description : </div>
              <div className="col-span-5 font-medium text-left text-sm product-details leading-6">{product.productDetail}</div>
            </div>           
        </div>
    );


};

export default ProductDetails;
