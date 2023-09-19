import React from 'react';
import {useNavigate} from "react-router-dom"
import Header from "../common/header/Header"
import Back from "../common/Back"
import Heading from "../common/Heading"
import img from "../images/services.jpg"
import Footer from "../common/footer/Footer"
import "./investor.css"
{/*This 
is
a
lister
page
not 
the 
investor
it 
is shagun
mittal's
mistake
of 
naming 
it
wrong*/}
const Investor = () => {
  const navigate = useNavigate();

  const goToForm=()=>{
    console.log("hi")
    navigate("/propertylistingform")
  }
    return (
      <>
        <section className='about'>
          <Back name='List Propeties Now!' title='List your properties to get trustful owners!' cover={img} />
          <div className='container flex mtop'>
            <div className='left row'>
              <Heading title='Our Policy' subtitle='Check out our company story and work process' />
  
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</p>
              <button className='' onClick={goToForm}>List Property</button>
            </div>
            <div className='right row'>
              <img src='./immio.jpg' alt='' />
            </div>
          </div>
        </section>
      </>
    )
  }
  
  export default Investor;