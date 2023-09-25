import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from "ethers";
import contractABI from '../../erc1155ABI.json'

const YOUR_CONTRACT_ADDRESS = "0x97a6ce7B74A28288c5ef442C3C2dcA73Ae054Ee6";


const BookProperty = () => {

  const [buttonDetails, setbuttonDetails] = useState("Book Property")
  const [isDone, setisDone] = useState(false)
  const navigate=useNavigate()

  let getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      YOUR_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    return contract;
  };

  const location = useLocation();
  // console.log(location.state.propertyDetails)
    const [formData, setFormData] = useState({
        username: '',
        metamaskAddress: '',
        tokenID: '',
        amount: '',
      });
    
      useEffect(() => {
        
        setFormData(prev=>{
          const tokenId=location.state.tokenID
          return{...prev,tokenID:tokenId}
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      let BookPropertyFunction = async() =>{
        const tx = await getContract().allotToken(formData.tokenID, formData.metamaskAddress, formData.amount);
        // const response = await tx.wait();
        return tx;
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        setbuttonDetails("Booking Property sabar kro")
        BookPropertyFunction().then(data=>{
          console.log(data)
          setbuttonDetails("Property Booked!")
          setisDone(true)
          setFormData({
            username: '',
            metamaskAddress: '',
            tokenID: '',
            amount: '',
        })
        })
        .catch(error=>console.log(error))
      };

      const navigateToHome=()=>{
        navigate("/")
      }
    
      return (
        <div>
          <h1>Property Investment Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="metamaskAddress">Metamask Address:</label>
              <input
                type="text"
                name="metamaskAddress"
                id="metamaskAddress"
                value={formData.metamaskAddress}
                onChange={handleInputChange}
                required
              />
            </div>
    
            {formData.tokenID &&
            <div className="form-group">
              <label htmlFor="tokenID">Token ID:</label>
              <input
                type="text"
                name="tokenID"
                id="tokenID"
                value={formData.tokenID}
                onChange={handleInputChange}
                disabled={true}
              />
            </div>}
    
            <div className="form-group">
              <label htmlFor="amount">Amount to be invested:</label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </div>
    
            <button onClick={handleSubmit}>{buttonDetails}</button>
            {isDone && <button onClick={navigateToHome}>Done</button>}
          </form>
        </div>
      );
    };

export default BookProperty