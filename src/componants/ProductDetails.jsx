import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
// import "../style/productdetail.css";

const ProductDetails = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reviews, setReviews] = useState([]);
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

    // Handle review submission
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (!newReview) {
            setError("Please enter a review before submitting.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Please sign in to submit a review.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:4000/api/add-review",
                { productId, review: newReview },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setReviews([...reviews, { review: newReview, user: "You" }]); // Update the reviews list locally
            setNewReview('');
            alert("Review submitted successfully!");
        } catch (err) {
            setError("Failed to submit review.");
        }
    };
    

    if (loading) return <h1>Loading...</h1>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="product-details-container bg-[#faf7f0]">
          <div className="">

            <div className="flex justify-evenly items-center">

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

             <div className="head flex justify-start items-center gap-16">
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

                   <div className="grid grid-cols-3 gap-6 mt-6">
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
           
            
          <div className="grid grid-cols-6 mx-44 font-semibold mt-8 ">
              <div className="text-xl">Product Description : </div>
              <div className="col-span-5 text-left">{product.productDetail}</div>
            </div>
            
            <div className="mt-10  flex flex-col justify-center items-center gap-4">
                <h3 className='font-bold text-2xl font-serif'>Reviews</h3>
                {reviews.length > 0 ? (
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <strong>{review.user}:</strong> {review.review}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='font-bold text-lg font-serif'>No reviews yet. Be the first to review this product!</p>
                )}
                <form onSubmit={handleReviewSubmit} className='mt-4'>
                    <textarea
                        value={newReview}
                        cols="20"
                        onChange={(e) => setNewReview(e.target.value)}
                        placeholder="Write your review here..."
                        className=' px-6 py-2 rounded-2xl bg-[#faf7f0] border-2 border-black w-96'
                    />
                    <div className="flex justify-center items-center pb-4">
                    <button type="submit" className='text-xl font-bold bg-sky-400 flex justify-center items-center px-10 hover:bg-sky-700 py-1 rounded-xl text-white '>Submit Review</button>
                    </div>
                </form>
            </div>
          

           
        </div>
    );


};

export default ProductDetails;
