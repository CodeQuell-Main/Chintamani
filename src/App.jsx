import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navcomponants/Navbar';  // Check this path
import Contact from './Navcomponants/Contact';  // Check this path
import Home from './Navcomponants/Home';  // Check this path
import Products from './Navcomponants/Products';  // Check this path
import Profile from './Navcomponants/Profile';  // Check this path
import ProductList from './componants/ProductList';  // Check this path
import AddToCart from './Navcomponants/AddToCart';
import Orders from './Navcomponants/Orders';
import ProductDetails from './componants/ProductDetails';
import Footer from './Navcomponants/Footer';

const App = () => {

  const location = useLocation(); 
  const hideNavAndFooterRoutes = ['/', '/profile']; 

  return (
    
      <div>
      {!hideNavAndFooterRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path= '/products/details/:productId' element = {<ProductDetails/>} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/addtocart' element={<AddToCart />} />
          <Route path='/order' element={<Orders />} />
        </Routes>
        {!hideNavAndFooterRoutes.includes(location.pathname) && <Footer/>}
      </div>
    
  );
};

export default App;
