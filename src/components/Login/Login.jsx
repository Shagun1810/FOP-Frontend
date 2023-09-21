import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import erc1155abi from '../../erc1155ABI.json'

import Video from '../images/Bgvideo1.mp4';
import '../Login/Login.css';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import Logo from '../images/logo1.png';
import {FaUserShield} from 'react-icons/fa';
import {BsFillShieldLockFill} from 'react-icons/bs';

function Login() {
    const [username, setUsername] =useState('')
    const [password, setPassword] =useState('')
    const [category, setCategory] =useState('')
    const navigate = useNavigate();

  // function Navigater(){
  //   if (category="INVESTOR"){
  //     navigate('/investor')
  //   }
  // }
  
  
  const loginUser = async ()=>{
    const response = await axios.post('http://localhost:5000/api/users/login', {
      username: username,
      password: password,
    }).catch((err) => {
      return {
        data: {
          message: err.response.data.message,
          success: err.response.data.success,
          status: err.response.status,
        },
      }
    })
    const data = await response.data
    return data
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    loginUser().then(data=>{
      console.log(data)
      if(data.success){
        if(data.credentials.category==='LISTER'){
          navigate('/lister')
        }else if(data.credentials.category==='INVESTOR'){
          navigate('/realInvestor')
        }
      }
    })
  }
//   const contractAddress = "0x97a6ce7B74A28288c5ef442C3C2dcA73Ae054Ee6";
//  const temp = async () => {
//   const provider = new ethers.providers.JsonRpcProvider('https://api-goerli.etherscan.io');
//     const erc1155 = new ethers.Contract(contractAddress, erc1155abi, provider);

//     const ca = await erc1155.getAllTokens();
//     console.log(ca)
//   };
//   temp();
  return (
    <div className='loginPage flex'>
      <div className='container flex'>
        <div className="videoDiv">
          {/* <video src={Video} autoPlay muted loop></video> */}

          <div className="textDiv">
          <h2 className='title'>Buy and Sell Properties</h2>
          <p>Welcome to SV Proptech</p>
          </div>

          <div className="footerDiv flex">
            <span className='text'>Don't have an account?</span>
            <Link to={'/register'}>
            <button className='btn'>Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={Logo} alt='Logo Image' />
            <h3>Welcome Back!</h3>
          </div>
          <form action='' className='form grid'>
            <span className='showMessage'>Login status will go here</span>
            <div className='inputDiv'>
              <label htmlFor='username'>Username</label>
              <div className="input flex">
                <FaUserShield className='icon'/>
                <input type="text" id='username' placeholder='Enter Username' onChange={(event)=>{
                  setUsername(event.target.value)
                }}/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='password'>Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className='icon'/>
                <input type="password" id='password' placeholder='Enter Password' onChange={(event)=>{
                  setPassword(event.target.value)
                }}/>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={handleSubmit}>
              <span>Login</span>
            </button>

            <a href='/'>Home Page</a>

            <span className='forgotPassword'>
              Forgot your password? <a href=''>Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
