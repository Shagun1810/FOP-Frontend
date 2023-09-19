import React, { useState } from 'react';
import axios from 'axios';
import Video from '../images/Bgvideo1.mp4';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import Logo from '../images/logo1.png';
import {FaUserShield} from 'react-icons/fa';
import {BsFillShieldLockFill} from 'react-icons/bs';
import {MdMarkEmailRead} from 'react-icons/md';
import {BiSolidCategoryAlt} from 'react-icons/bi';
import {BsFillTelephoneFill} from 'react-icons/bs';
import '../Register/Register.css';

function Register() {


    const [email, setEmail] =useState('')
    const [name, setName] = useState('')
    const [contact, setContact] = useState('') 
    const [username, setUsername] =useState('')
    const [password, setPassword] =useState('')
    const [category, setCategory] = useState('')
    const navigate=useNavigate()

    const createUser = async ()=>{
      const response = await axios.post('http://localhost:5000/api/users/signup', {
        name: name,
        email: email,
        contact: contact,
        username: username,
        password: password,
        category: category
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
      createUser().then(data=>{
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
    
  return (
    <div className='registerPage flex'>
      <div className='container flex'>
        <div className="videoDiv">
        {/* <video src={Video} autoPlay muted loop></video> */}

          <div className="textDiv">
          < h2 className='title'>Buy and Sell Properties</h2>
            <p>Welcome to SV Proptech</p>
          </div>

          <div className="footerDiv flex">
            <span className='text'>Have an account?</span>
            <Link to={'/login'}>
            <button className='btn'>Log in</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={Logo} alt='Logo Image' />
            <h3>Let Us Know You!</h3>
          </div>
          <form action='' className='form grid'>

          <div className='inputDiv'>
              <label htmlFor='contact'>Name.</label>
              <div className="input flex">
                <BsFillTelephoneFill className='icon'/>
                <input type="text" id='name' placeholder='Enter Your Name' onChange={(event)=>{
                  setName(event.target.value)
                }}/>
              </div>
            </div>
            
            <div className='inputDiv'>
              <label htmlFor='email'>Email</label>
              <div className="input flex">
                <MdMarkEmailRead className='icon'/>
                <input type="email" id='email' placeholder='Enter email' onChange={(event)=>{
                  setEmail(event.target.value)
                }}/>
              </div>
            </div>

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

            <div className='inputDiv'>
              <label htmlFor='contact'>Contact No.</label>
              <div className="input flex">
                <BsFillTelephoneFill className='icon'/>
                <input type="text" id='contact' placeholder='Enter Contact Number' on onChange={(event)=>{
                  setContact(event.target.value)
                }}/>
              </div>
            </div>

            <div className='inputDiv'>
              <label htmlFor='catrgory'>Category</label>
              <div className="input flex">
                <BiSolidCategoryAlt className='icon'/>
                <select value={category} onChange={(event)=>{
                  setCategory(event.target.value)
                }}>
                    <option value="LISTER" name='lister'>Property Lister</option>
                    <option value="INVESTOR" name='investor'>Investor</option>
                    <option value="TENANT" name='tenant'>Tenant</option>
                </select>
              </div>
            </div>

            <button type='submit' className='btn flex' onClick={handleSubmit}>
              <span>Register</span>
            </button>

            <span className='forgotPassword'>
              Forgot your password? <a href=''>Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
