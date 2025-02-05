import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Navcomponants/Navbar';  
import Contact from './Navcomponants/Contact'; 
import Home from './Navcomponants/Home'; 
import Products from './Navcomponants/Products';  
import Profile from './Navcomponants/Profile'; 
import ProductList from './componants/ProductList';  
import AddToCart from './Navcomponants/AddToCart';
import ProductDetails from './componants/ProductDetails';
import Footer from './Navcomponants/Footer';
import AdminPage from './componants/AdminPage';
import Detail from './componants/Detail';
import Page from './Navcomponants/PrivacyPolicy';
import PrivacyPolicy from './Navcomponants/PrivacyPolicy';
import Landing from './Navcomponants/Landing';

const App = () => {

  const location = useLocation(); 
  const hideNavAndFooterRoutes = ['/','/Home', '/profile', '/Privacy-Policy']; 

  return (
    
      <div>
      {/* {!hideNavAndFooterRoutes.includes(location.pathname) && <Navbar />} */}
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/Home' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:category' element={<ProductList />} />
          <Route path= '/products/details/:productId' element = {<ProductDetails/>} />
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/addtocart' element={<AddToCart />} />
          <Route path='/detail' element={<Detail/>}/>
          <Route path='/Privacy-Policy' element={<PrivacyPolicy/>} />
        </Routes>
        {!hideNavAndFooterRoutes.includes(location.pathname) && <Footer/>}
      </div>
    
  );
};

export default App;
