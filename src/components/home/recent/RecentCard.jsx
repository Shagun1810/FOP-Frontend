import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { list } from "../../data/Data"
import axios from "axios";



const RecentCard = () => {
  const [ispropertydetailsavailable, setIspropertydetailsavailable] = useState(false)
  const [propertyDetails, setpropertyDetails] = useState([])
  const navigate=useNavigate()
  useEffect(() => {
    sendRequestToBackend().then(data=>{
      console.log(data.propertyDetails)
      if (data.success){
        setIspropertydetailsavailable(true)
        setpropertyDetails(data.propertyDetails)
      }
    })
  }, [])

  const getPropertyDetails=(tokenID)=>{
    console.log(tokenID)
    navigate(`/properties/${tokenID}`)
  }
  
  const sendRequestToBackend = async() =>{
    const url='http://localhost:5000/api/properties/getProperty'
    const res=await axios.get(url).catch((err) => {
      return {
        data: {
          message: err.response.data.message,
          success: err.response.data.success,
          status: err.response.status,
        },
      }
    })
  const data = await res.data
  return data
  }
  return (
    <>
      <div className='content grid3 mtop'>
        {propertyDetails.map((val, index) => {
          return (
            <div className='box shadow' key={index}>
              <div className='img'>
                <img src={val.imageSource[0]} alt='' />
              </div>
              <div className='text'>
                {/* <div className='category flex'>
                  <span style={{ background: category === "For Sale" ? "#25b5791a" : "#ff98001a", color: category === "For Sale" ? "#25b579" : "#ff9800" }}>{category}</span>
                  <i className='fa fa-heart'></i>
                </div> */}
                <h4>{val.propertyName}</h4>
                <p>
                  <i className='fa fa-location-dot'></i> {val.address}
                </p>
              </div>
              <div className='button flex'>
                <div>
                  <button className='btn2'>{val.price} Rs</button>
                </div>
                <span>{val.propertyType}</span>
              </div>
              <div>
                <button onClick={()=>getPropertyDetails(val.tokenID)}>View Details</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
