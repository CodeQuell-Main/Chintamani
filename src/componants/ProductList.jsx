import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loder from "./Loder";
// import "../style/productlist.css";

const ProductList = () => {
    const { category } = useParams(); 
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
        const token = localStorage.getItem("token"); 
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

    if (loading) return <Loder/>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="product-list-container bg-[#faf7f0]">
            <h1  className="font-bold text-2xl marathi text-center">Products in {category}</h1>
            <div className="product-list grid grid-cols-4 max-[950px]:grid-cols-2 items-center gap-y-14 mt-8 pb-4  ">
                {products.map((product) => (
                    <div className="product-card flex flex-col justify-center items-start  justify-self-center" key={product.productId}>
                       <Link to={`/products/details/${product.productId}`}>
                       <img
                            src={product.productImage}
                            alt={product.productName}
                            className="md:w-60 w-40 border-black border-2 rounded-2xl p-2 shadow-lg"
                        />
                       </Link>
                        <h3 className="marathi mt-2 max-[500px]:text-[12px] px-4">{product.productName}</h3>
                        <div className=" mt-0 px-4">
                           <p className="text-left font-extrabold text-xl max-[500px]:text-[14px] ">{product.productPrice}</p>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default ProductList;
