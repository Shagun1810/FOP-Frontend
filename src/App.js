import React from 'react';
// import { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Investor from "./components/Investor/Investor";
import Home from './components/home/Home';
import About from './components/about/About';
import Services from './components/services/Services';
import Blog from './components/blog/Blog';
// import Pricing from './components/pricing/Pricing';
import Contact from './components/contact/Contact';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PropertyListingForm from './components/Investor/PropertyListingForm/PropertyListingForm';
import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import Test from './components/test';
import ViewPropertyDetails from './components/RealInvestor/ViewPropertyDetails';
import RealInvestor from './components/RealInvestor/RealInvestor';
import UploadImage from './components/Investor/PropertyListingForm/UploadImage';
import BookProperty from './components/RealInvestor/BookProperty';
import MyProfile from './components/profile/MyProfile';
import ViewListings from './components/profile/ViewListings';
import ViewInvestments from './components/profile/ViewInvestments';

// import{
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom"

// import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

// const router = createBrowserRouter([
//   {
//     path: '/login',
//     element: <div><Login/></div>
//   },
//   {
//     path: '/register',
//     element: <div><Register/></div>
//   },
//   {
//     path: '/',
//     element: <Pages/>
//   }
// ])

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route  path='/' element={<Home/>} />
          <Route  path='/about' element={<About/>} />
          <Route  path='/services' element={<Services/>} />
          <Route  path='/blog' element={<Blog/>} />
          {/* <Route  path='/pricing' element={<Pricing/>} /> */}
          <Route  path='/contact' element={<Contact/>} />
          <Route  path='/login' element={<Login/>} />
          <Route  path='/register' element={<Register/>} />
          <Route  path='/propertylistingform' element={<PropertyListingForm/>} />
          <Route  path='/lister' element={<Investor/>} />
          <Route path='/realInvestor' element={<RealInvestor/>} />
          <Route  path='/test' element={<Test/>} />
          <Route path='/uploadimage/:tokenID' element={<UploadImage/>} />
          <Route path='/properties/:tokenID' element={<ViewPropertyDetails/>} />
          <Route path='/bookProperty/:tokenID' element={<BookProperty/>} />
          <Route path='/myprofile' element={<MyProfile/>} />
          <Route path='/viewlistings/:tokenID' element={<ViewListings/>} />
          <Route path='/viewinvestments/:tokenID' element={<ViewInvestments/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App;
