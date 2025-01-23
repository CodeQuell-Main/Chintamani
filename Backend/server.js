import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import Masale from "./data/Masale.js";
import Konkan from "./data/Konkan.js";
import Flour from "./data/Flour.js";
import Syrup from "./data/Syrup.js";

const app = express();
const port = 4000;
const key = "secret_key"; // JWT secret key

app.use(express.json());
app.use(cors());

// Database connection
mongoose
    .connect("mongodb://localhost:27017/Chintamani")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Database connection failed:", err));

// Schemas
const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Email: { type: String}, // For Google users
    Phone: { type: Number}, // Optional for Google users
    Password: { type: String }, // Optional for Google users
    AddToCart: { type: [String], default: [] },
    Order: { type: [String], default: [] },
    PhotoURL: { type: String }, // Optional profile photo URL
});


const ProductSchema = new mongoose.Schema({
    productId: { type: String },
    productImage: { type: String },
    productName: { type: String },
    productPrice: { type: Number },
    productDetail: { type: String },
    Category: { type: String },
});

// Models
const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Assuming the token is sent as Bearer token in Authorization header
    if (!token) {
        return res.status(401).send("Access Denied: No token provided");
    }

    try {
        // Verify token using the secret key
        const decoded = jwt.verify(token, key);
        req.userId = decoded.userId; // Attach the userId to the request object
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).send("Access Denied: Invalid token");
    }
};

// Add Products 
const addProducts = async (req, res, category, data) => {
    try {
        await Product.insertMany(data.map((item) => ({ ...item, Category: category })));
        res.status(201).send(`${category} products added successfully!`);
    } catch (error) {
        console.error(`Error adding ${category} products:`, error);
        res.status(500).send("Error adding products");
    }
};

app.post("/api/add-products/masale", (req, res) => addProducts(req, res, "Masale", Masale));
app.post("/api/add-products/konkan", (req, res) => addProducts(req, res, "Konkan", Konkan));
app.post("/api/add-products/flour", (req, res) => addProducts(req, res, "Flour", Flour));
app.post("/api/add-products/syrup", (req, res) => addProducts(req, res, "Syrup", Syrup));

// Fetch Products by Category
app.get("/api/fetch-products/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ Category: new RegExp(`^${category}$`, "i") }); // Case-insensitive regex
        res.status(200).json(products);
    } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
        res.status(500).send("Internal Server Error");
    }
});

// Fetch product by ID
app.get("/api/fetch-product/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
        const product = await Product.findOne({ productId });
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/api/google-auth", async (req, res) => {
    const { name, email, photoURL } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ Email: email });

        if (!user) {
            // Create a new user if it doesn't exist
            user = new User({
                Name: name,
                Email: email,
                PhotoURL: photoURL, // You might want to add this field to the schema
                AddToCart: [],
                Order: [],
            });
            await user.save();
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, key, { expiresIn: "30d" });

        res.status(200).json({ message: "Google authentication successful", token, user });
    } catch (error) {
        console.error("Error during Google authentication:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


// Sign-up
app.post("/api/sign-up", async (req, res) => {
    const { name, phone, password } = req.body;

    if (!name || !phone || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        const existingUser = await User.findOne({ Phone: phone });

        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ Name: name, Phone: phone, Password: hashedPassword });
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error("Error during sign-up:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Sign-in
app.post("/api/sign-in", async (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).send("All fields are required");
    }

    try {
        const user = await User.findOne({ Phone: phone });

        if (!user) {
            return res.status(400).send("Invalid phone number or password");
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
            return res.status(400).send("Invalid phone number or password");
        }

        // Create a JWT token for the user
        const token = jwt.sign({ userId: user._id }, key, { expiresIn: "30d" });
        res.status(200).json({ message: "Sign-in successful", token });
    } catch (error) {
        console.error("Error during sign-in:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Fetch User Details (with authentication)
app.get("/api/user-details", authenticateToken, async (req, res) => {
    try {
        // Get user details using the userId attached by the middleware
        const user = await User.findById(req.userId, "Name Phone");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch AddToCart Products (with authentication)
app.get("/api/fetch-cart-products", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId, "AddToCart");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productsData = await Product.find({ productId: { $in: user.AddToCart } });
        res.status(200).json(productsData);
    } catch (error) {
        console.error("Error fetching cart products:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch Last Orders (with authentication)
app.get("/api/fetch-last-orders", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId, "Order");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const productsData = await Product.find({ productId: { $in: user.Order } });
        res.status(200).json(productsData);
    } catch (error) {
        console.error("Error fetching last orders:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Add product to user's cart (with authentication)
app.post("/api/add-to-cart", authenticateToken, async (req, res) => {
    const { productId } = req.body;

    try {
        const user = await User.findById(req.userId); 
        if (!user) {
            return res.status(404).send("User not found");
        }

        if (!user.AddToCart.includes(productId)) {
            user.AddToCart.push(productId);
            await user.save(); 
            return res.status(200).send("Product added to cart");
        } else {
            return res.status(400).send("Product is already in the cart");
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Remove product from user's cart 
app.post("/api/remove-from-cart", authenticateToken, async (req, res) => {
    const { productId } = req.body; 

    try {
        const user = await User.findById(req.userId); 
        if (!user) {
            return res.status(404).send("User not found");
        }

        const productIndex = user.AddToCart.indexOf(productId);
        if (productIndex === -1) {
            return res.status(400).send("Product is not in the cart");
        }

        user.AddToCart.splice(productIndex, 1);
        await user.save();
        return res.status(200).send("Product removed from cart");
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port, () => console.log(`Server running on http://localhost:${port}`));