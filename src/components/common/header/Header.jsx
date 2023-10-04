import React, { useState } from "react"
import { ethers } from 'ethers';
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"
import { computeHeadingLevel } from "@testing-library/react";



const Header = () => {
  const [navList, setNavList] = useState(false)


  const [walletAddress, setWalletAddress] = useState("");
  const[buttonText,setButtonText]=useState("Connect Metamask");

  async function requestAccount() {
    console.log('Requesting account...');
    // ❌ Check if Meta Mask Extension exists 
    if(window.ethereum) {
      console.log('detected');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setButtonText(walletAddress);

        console.log({walletAddress});
        const handleClick = ()=>{
          setButtonText(walletAddress);
        }
      } catch (error) {
        console.log('Error connecting...');
      }

    } else {
      alert('Meta Mask not detected');
    }
  }

  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }
  
  const listings=()=>{
    if(localStorage.getItem("category")==="LISTER"){
      return "My Listings"
    }else if(localStorage.getItem("category")==="INVESTOR"){
      return "My Investments"
    }else{
      return
    }
  }

  const getListing=()=>{
    console.log("hi")
  }

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='./images/logo.png' alt='' />
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div onClick={getListing} className="cursor-pointer px-2 py-2 rounded-md"> 
            {/* {<h2>{localStorage.getItem("category")==="LISTER"?"My Listings":"My Investments"}</h2>} */}
            <h2>{listings()}</h2>
          </div>
          <div className='button flex gap-x-4'>
          <button onClick={requestAccount} className="px-2 py-1 text-sm">{buttonText}</button>
          
            <button className='btn1 px-2 py-1 text-sm'>
              <Link to='/login'></Link>
              <a href="/login" className='fa fa-sign-out'>Sign In</a> 
            </button>
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
