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
            const response = await axios.get(`http://localhost:4000/api/fetch-products/${category}`);
            
            navigate(`/products/${category}`, { state: { products: response.data } });
        } catch (err) {

            setError("Failed to fetch products. Please try again.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loder/>;
    if (error) return <div className="cart-error flex justify-center items-center text-4xl h-[80vh] text-red-600">{error}</div>;
    
    return (
        <div className="products-container  md:h-[78vh]   max-[800px]:pb-16">
             <p className="text-center text-[#4A4947] font-bold text-[40px] max-[800px]:text-3xl pt-14 page"> आमची दर्जेदार उत्पादने </p>
            <div className="cards grid md:grid-cols-4 grid-cols-2 md:gap-0 gap-10 md:mx-0 mx-10 mt-4 mb-4">
                {["masale", "flour", "syrup", "konkan"].map((category) => (
                    <div className="card flex flex-col pt-4 justify-self-center  transform transition-all hover:scale-105 relative" key={category}>
                        <Link to={`/products/${category}`} className="">
                        <img
                            src={`images/${category}.png`} 
                            alt={category}
                            className="card-image  w-52 "
                        />
                        </Link>
                        <button onClick={() => fetchProducts(category)} className="bg-[#00000084] text-xl rounded-xl  font-bold text-white absolute w-full h-[95%]">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    </div>
                ))}
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Products;
