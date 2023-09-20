import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import noImage from '../../../assets/No-Image-Placeholder.png'



const RecentCard = () => {
  // const [ispropertydetailsavailable, setIspropertydetailsavailable] = useState(false)
  const [propertyDetails, setpropertyDetails] = useState([])
  const navigate=useNavigate()
  useEffect(() => {
    sendRequestToBackend().then(data=>{
      console.log(data.propertyDetails)
      if (data.success){
        // setIspropertydetailsavailable(true)
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
            <div className='box shadow flex flex-col ' key={index}>
              <div className='img'>
                {val.imageSource[0].startsWith('http') ? 
                <img src={val.imageSource[0]} alt='' /> : 
                <img src={noImage} alt='' /> }
              </div>
              <div className='flex justify-start gap-x-4'>
                <h4>{val.propertyName}</h4>
                <h4>
                  <i className='fa fa-location-dot'></i> {val.address}
                </h4>
              </div>
              <div className='flex justify-evenly gap-x-4'>
                <div className="w-fit ">
                  {val.price} Rs
                </div>
                <div>{val.propertyType}</div>
              </div>
              <div className="w-full my-2">
                <button className="w-full" onClick={()=>getPropertyDetails(val.tokenID)}>View Details</button>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default RecentCard
