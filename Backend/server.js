import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import crypto from "crypto";
import Masale from "./data/Masale.js";
import Konkan from "./data/Konkan.js";
import Flour from "./data/Flour.js";
import Syrup from "./data/Syrup.js";
import { type } from "os";

const app = express();
const port = 4000;
const key = "secret_key"; // JWT secret key
dotenv.config();

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
    Email: { type: String }, 
    Phone: { type: Number }, 
    Password: { type: String },
    AddToCart: { type: [String], default: [] },
    Order: { type: [String], default: [] },
    role: {type: String , enum: ['Admin']}
});


const ProductSchema = new mongoose.Schema({
    productId: { type: String },
    productImage: { type: String },
    productName: { type: String },
    productPrice: { type: Number },
    productDetail: { type: String },
    Category: { type: String },
});

const OrderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: {type: String, require: true},
    address: {
        street: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true }
    },
    cartItems: [
        {
            productId: {type: String, required: true},
            productName: { type: String, required: true },
            productPrice: { type: Number, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number, required: true },
    orderID: { type: String, required: true, unique: true },
    paymentID: {type: String, required: true},
    isPaid: { type: Boolean, default: false },
}, { timestamps: true });

// Models
const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Order = mongoose.model("Order", OrderSchema);

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
        const products = await Product.find({ Category: new RegExp(`^${category}$`, "i") }); 
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

// google auth
app.post("/api/google-auth", async (req, res) => {
    const { name, email, photoURL } = req.body;

    try {
        let user = await User.findOne({ Email: email });

        if (!user) {
            user = new User({
                Name: name,
                Email: email,
                PhotoURL: photoURL,
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

// Fetch User Details 
app.get("/api/user-details", authenticateToken, async (req, res) => {
    try {
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

// Fetch AddToCart Products 
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

// Add product to user's cart 
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

// Set order api
app.post("/api/store-order", async (req, res) => {

    try {
        const { customerName, phone, email, address, cartItems, totalAmount, orderID , paymentID} = req.body;

        if (!customerName || !phone || !email || !address || !cartItems || !totalAmount || !orderID || !paymentID) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!address.street || !address.state || !address.zipCode) {
            return res.status(400).json({ message: "Incomplete address information" });
        }

        if (!Array.isArray(cartItems) || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart items are required and must be an array" });
        }

        for (let item of cartItems) {
            if (!item.quantity || item.quantity <= 0) {
                return res.status(400).json({ message: `Invalid quantity for product ${item.productId}` });
            }
        }

        const productIds = cartItems.map(item => item.productId); 
        const products = await Product.find({ 'productId': { $in: productIds } }); 

        if (products.length !== cartItems.length) {
            return res.status(400).json({ message: "Some products not found in the database" });
        }

        for (let item of cartItems) {
            const product = products.find(p => p.productId === item.productId);
            if (product) {
                product.stock -= item.quantity; 
                if (product.stock < 0) {
                    return res.status(400).json({ message: `Not enough stock for product ${item.productId}` });
                }
                await product.save(); 
            }
        }

        const newOrder = new Order({
            customerName,
            phone,
            email,
            address,
            cartItems,
            totalAmount,
            orderID,
            paymentID,
            isPaid: false,
        });

        await newOrder.save();
        res.status(201).json({ message: "Order stored successfully", order: newOrder });
    } catch (error) {
        console.error("Error storing order:", error);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: "Validation error", error: error.message });
        } else if (error instanceof mongoose.Error) {
            return res.status(500).json({ message: "Database error", error: error.message });
        } else {
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
});


// Fetch all orders
app.get('/api/get-orders', async (req, res) => {
    try {
        const orders = await Order.find().populate('cartItems.productId'); 

        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

app.delete('/api/delete-order/:orderID', async (req, res) => {
    try {
        const { orderID } = req.params;
        const order = await Order.findOne({ orderID });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        for (let item of order.cartItems) {
            const product = await Product.findOne({ productId: item.productId });
            if (product) {
                product.stock += item.quantity; 
                await product.save();
            }
        }

        await Order.deleteOne({ orderID });

        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to create an order 
app.post("/api/create-order", async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const options = {
            amount: amount * 100, // Convert to paise
            currency,
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Something went wrong", error });
    }
});

// API to verify payment
app.post("/api/verify-payment", (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        res.status(200).json({ message: "Payment verified successfully" });
    } else {
        res.status(400).json({ message: "Invalid signature" });
    }
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));