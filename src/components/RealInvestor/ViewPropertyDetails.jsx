import React, { useEffect, useState } from 'react'
import {useParams} from "react-router-dom"
import axios from "axios";
import { FaHome, FaMapMarkerAlt, FaBuilding, FaInfo, FaRuler, FaDollarSign, FaKey, FaArrowRight  } from "react-icons/fa";

function ViewPropertyDetails() {
    const params=useParams()
    const [propertyDetails, setpropertyDetails] = useState("")
    const [number, setnumber] = useState(0)
    const changeNumber=()=>{
        setnumber(prev=>prev+1)
        console.log("Hi")
    }
    useEffect(() => {
        sendRequestToBackend().then(data=>{
          console.log(data.propertyDetails)
          if (data.success){
            setpropertyDetails(data.propertyDetails)
          }
        })
      }, [])
    
    const sendRequestToBackend = async() =>{
        const url=`http://localhost:5000/api/properties/getProperty/${params.tokenID}`
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
    
    // // Helper function to calculate the width of the green bar
    // const calculateBarWidth = (text) => {
    //   // You can adjust the factor (e.g., 8) to control the width
    //   return `${text.length * 8}px`;
    // };
    const barWidth = "300px";

  return (
    <div className="flex justify-center">
        {propertyDetails && (
            <div className='flex flex-col items-center justify-center'> 
                <div className='relative mx-auto'>
                    <img
                        src={propertyDetails.imageSource[`${number%(propertyDetails.imageSource.length)}`]}
                        alt="property"
                        // className="w-full h-auto max-h-screen"
                    />
                     <button
                    onClick={changeNumber}
                    className='absolute right-0 top-1/2 z-10 bg-red-500 outline-none p-2 rounded-full text-white'
                >
                    <FaArrowRight />
                </button>
                </div>
                <div className='mt-4'>
                    <div className="mb-2 flex justify-center">
                        <div className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`} style={{ width: barWidth }}>
                            <FaHome className='mr-2' />
                            {propertyDetails.propertyName}
                        </div>
                    </div>
                    
                    <div className="mb-2 flex justify-center">
                        <div className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`} style={{ width: barWidth }}>
                            <FaMapMarkerAlt className='mr-2' />
                            {propertyDetails.address}
                        </div>
                    </div>
                    
                    <div className="mb-2 flex justify-center">
                        <div className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`} style={{ width: barWidth }}>
                            <FaBuilding className='mr-2' />
                            {propertyDetails.propertyType}
                        </div>
                    </div>
                    
                    <div className="mb-2 flex justify-center">
                        <div className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`} style={{ width: barWidth }}>
                            <FaInfo className='mr-2' />
                            {propertyDetails.description}
                        </div>
                    </div>
                    
                    <div className="mb-2 flex justify-center">
                        <div className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`} style={{ width: barWidth }}>
                            <FaRuler className='mr-2' />
                            {propertyDetails.area}
                        </div>
                    </div>
                    
                    <div className="mb-2 flex justify-center">
                        <div className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`} style={{ width: barWidth }}>
                            <FaDollarSign className='mr-2' />
                            {propertyDetails.price}
                        </div>
                    </div>
                    
                    <div className="mb-2 flex justify-center">
                        <div className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`} style={{ width: barWidth }}>
                            <FaKey className='mr-2' />
                            {propertyDetails.tokenID}
                        </div>
                    </div>
                </div>
                <div className='mt-4'>
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        BUY NOW!
                    </button>
                </div>
            </div>
        )}
    </div>
  )
}

export default ViewPropertyDetails