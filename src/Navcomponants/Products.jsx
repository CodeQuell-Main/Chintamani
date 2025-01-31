import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loder from "../componants/Loder";

import axios from "axios";

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async (category) => {
        setLoading(true);
        setError(null);

        try {
            // Fetch products from the API
            const response = await axios.get(`http://localhost:4000/api/fetch-products/${category}`);
            
            // Navigate to the category page and pass the products via state
            navigate(`/products/${category}`, { state: { products: response.data } });
        } catch (err) {
            // Handle errors and set error message
            setError("Failed to fetch products. Please try again.");
            console.error("Error fetching products:", err);
        } finally {
            // Stop the loading state
            setLoading(false);
        }
    };

    if (loading) return <Loder/>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div className="products-container  md:h-[78vh]  bg-[#faf7f0] max-[800px]:pb-16">
             <p className="text-center text-[#4A4947] font-bold text-[40px] pt-14 page"> आमची दर्जेदार उत्पादने </p>
            <div className="cards grid md:grid-cols-4 grid-cols-2 md:gap-0 gap-10 md:mx-0 mx-10 mt-4 mb-4">
                {["masale", "flour", "syrup", "konkan"].map((category) => (
                    <div className="card flex flex-col pt-4 justify-self-center  transform transition-all hover:scale-105" key={category}>
                        <Link to={`/products/${category}`}>
                        <img
                            src={`images/${category}.png`} // Ensure you have the correct path to your images
                            alt={category}
                            className="card-image  w-52 "
                        />
                        </Link>
                        <button onClick={() => fetchProducts(category)} className="text-black text-xl px-4 py-2 font-bold hover:bg-[#faf7f0] ">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    </div>
                ))}
            </div>

            {/* Display loading state */}
            {loading && <p>Loading...</p>}

            {/* Display error message */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Products;
