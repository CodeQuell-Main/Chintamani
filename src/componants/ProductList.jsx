import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
// import "../style/productlist.css";

const ProductList = () => {
    const { category } = useParams(); // Get category from the URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:4000/api/fetch-products/${category}`)
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [category]);

    const addToCart = async (productId) => {
        const token = localStorage.getItem("token"); // Get token from local storage
        if (!token) {
            setError("Please sign in to add items to your cart.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:4000/api/add-to-cart",
                { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Product added to cart!");
        } catch (err) {
            setError("Failed to add product to cart.");
        }
    };

    if (loading) return <h1>Loading...</h1>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="product-list-container bg-[#faf7f0]">
            <h1  className="font-bold text-2xl marathi ">Products in {category}</h1>
            <div className="product-list grid grid-cols-4 items-center gap-y-14 mt-8 pb-4 ">
                {products.map((product) => (
                    <div className="product-card flex flex-col justify-center items-center " key={product.productId}>
                        <img
                            src={product.productImage}
                            alt={product.productName}
                            className="w-60 border-black border-2 rounded-2xl p-2 shadow-lg"
                        />
                        <h3 className="marathi mt-2">{product.productName}</h3>
                        {/* <p>{product.productDetail}</p> */}
                        <div className=" mt-0">
                            {/* <button
                                className="addtocart"
                                onClick={() => addToCart(product.productId)}
                            >
                                Add To Cart
                            </button> */}
                            <Link
                                to={`/products/details/${product.productId}`}
                                className="view-details"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default ProductList;
