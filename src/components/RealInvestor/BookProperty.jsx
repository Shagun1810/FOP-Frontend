import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';


const BookProperty = () => {
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
          return{...formData,tokenID:tokenId}
        })
      }, [])

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
      };
    
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
    
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    };

export default BookProperty