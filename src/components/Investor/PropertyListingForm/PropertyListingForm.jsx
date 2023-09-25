// src/PropertyForm.js
import React, { useEffect } from "react";
import { useState } from 'react';
import { ethers } from "ethers";
import contractABI from '../../../erc1155ABI.json'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const YOUR_CONTRACT_ADDRESS = "0x97a6ce7B74A28288c5ef442C3C2dcA73Ae054Ee6";

const PropertyListingForm = () => {

  let getContract = async() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let contract = new ethers.Contract(
      YOUR_CONTRACT_ADDRESS,
      contractABI,
      signer
    );
    const tx=await contract.getAllTokens();
    return tx.length;
  };

  useEffect(() => {
    getContract().then(data=>{
      console.log(data)
      setFormData({
          ...formData,
          tokenID:data
        });
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  const navigate=useNavigate()
    const [formData, setFormData] = useState({
      propertyName: "",
      propertyType: "",
      price: "",
      area: "",
      address: "",
      owner: "",
      description: "",
      metamaskAddress: "",
      tokenID: '',
    });
    const [buttonText, setButtonText] = useState('List Property')
    
    const [documents, setDocuments] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const sendRequestToBackend=async()=>{
      const url='http://localhost:5000/api/properties/addproperty'
      const response = await axios.post(url, {
        ...formData
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

    let mintToken = async() => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      let contract = new ethers.Contract(
        YOUR_CONTRACT_ADDRESS,
        contractABI,
        signer
      );
      const token=await contract.mintNewToken(formData.propertyName, [],[]);
      return token
    };
  
    const handleSubmit = (e) => {
      setButtonText('Adding Property to blockchain')
      e.preventDefault();
      sendRequestToBackend().then(data=>{
        console.log(data)
        if(data.success){

          mintToken().then(newData => {
            console.log(newData)
            navigate(`/uploadimage/${formData.tokenID}`,{state:{id:data.credentials._id}})
          }).catch(err => console.log(err))
        }
      })
    };

    

    return (
      <div>
        <h1>Step-1</h1>
        <h1>List a New Property for Sale</h1>
        <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="propertyName">Property Name:</label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="propertyType">Property Type:</label>
            <input
              type="text"
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="area">Area(in sqft.):</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <label htmlFor="fractionalOwners">No of Fractional Owners:</label>
            <input
              type="number"
              id="fractionalOwners"
              name="fractionalOwners"
              value={this.state.fractionalOwners}
              onChange={this.handleChange}
            />
            <div className="error">{this.state.errors.fractionalOwners}</div>
          </div> */}
          <div>
            <label htmlFor="address">Address:</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="owner">UserName:</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="metamaskAddress">Metamask Account Address</label>
            <input
              type="text"
              id="metamaskAddress"
              name="metamaskAddress"
              value={formData.metamaskAddress}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="tokenID">TokenID:</label>
            {formData.tokenID && 
              <input
              type="text"
              id="tokenID"
              name="tokenID"
              value={formData.tokenID}
              onChange={handleChange}
              disabled={true}
            />
            }
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button className="my-4" onClick={handleSubmit}>{buttonText}</button>
        </form>
      </div>
    );
  }


export default PropertyListingForm;
