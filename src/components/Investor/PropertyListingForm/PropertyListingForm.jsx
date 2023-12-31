// src/PropertyForm.js
import React, { useEffect } from "react";
import { useState } from 'react';
import { ethers } from "ethers";
import contractABI from '../../../erc1155ABI.json'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const YOUR_CONTRACT_ADDRESS = "0x97a6ce7B74A28288c5ef442C3C2dcA73Ae054Ee6";

// ADD DESCRIPTION FIELD

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

    const addListingToBackend = async () => {
      const url = 'http://localhost:5000/api/properties/updateListings'
      const response = await axios.patch(url, {
        username: localStorage.getItem("username"),
        listing: {
          tokenID: formData.tokenID
        }
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
            // add listing to backend
            addListingToBackend().then(data2 => console.log(data2))

            console.log(newData)
            navigate(`/uploadimage/${formData.tokenID}`,{state:{id:data.credentials._id}})
          }).catch(err => console.log(err))
        }
      })
    };

    

    return (
      <div className="container mx-auto mt-10 p-4 border rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">List a New Property for Sale</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div className="flex flex-col">
            <label htmlFor="propertyName" className="text-sm font-semibold text-gray-600 mb-1">Property Name:</label>
            <input
              type="text"
              id="propertyName"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="propertyType" className="text-sm font-semibold text-gray-600 mb-1">Property Type:</label>
            <input
              type="text"
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-semibold text-gray-600 mb-1">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="area" className="text-sm font-semibold text-gray-600 mb-1">Area (in sqft.):</label>
            <input
              type="number"
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="address" className="text-sm font-semibold text-gray-600 mb-1">Address:</label>
            <input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="owner" className="text-sm font-semibold text-gray-600 mb-1">Owner/Username:</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="metamaskAddress" className="text-sm font-semibold text-gray-600 mb-1">Metamask Account Address:</label>
            <input
              type="text"
              id="metamaskAddress"
              name="metamaskAddress"
              value={formData.metamaskAddress}
              onChange={handleChange}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
  
          {/* TokenID field */}
          {formData.tokenID && (
            <div className="flex flex-col">
              <label htmlFor="tokenID" className="text-sm font-semibold text-gray-600 mb-1">TokenID:</label>
              <input
                type="text"
                id="tokenID"
                name="tokenID"
                value={formData.tokenID}
                onChange={handleChange}
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                disabled
              />
            </div>
          )}

          <div>
            <label htmlFor="description">Description:</label>
            <input
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
  
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            {buttonText}
          </button>
        </form>
      </div>
    );
  };


export default PropertyListingForm;
