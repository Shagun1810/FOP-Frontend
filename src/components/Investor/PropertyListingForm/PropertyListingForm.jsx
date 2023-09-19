// src/PropertyForm.js
import React, { useEffect } from "react";
import { useState } from 'react';
import { ethers } from "ethers";
import contractABI from '../../../erc1155ABI.json'

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
  }, [])
  

    const [formData, setFormData] = useState({
      propertyName: "",
      propertyType: "",
      price: "",
      area: "",
      address: "",
      description: "",
      tokenID: '',
    });
    
    const [documents, setDocuments] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setDocuments(file);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    };

    

    return (
      <div>
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
              name="addresss"
              value={formData.address}
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
              value={formData.tokenID+1}
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
          <button onClick={handleSubmit}>List Property</button>
        </form>
      </div>
    );
  }


export default PropertyListingForm;
