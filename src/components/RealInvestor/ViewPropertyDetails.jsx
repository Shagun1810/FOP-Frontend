import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {
  FaHome,
  FaMapMarkerAlt,
  FaBuilding,
  FaInfo,
  FaRuler,
  FaDollarSign,
  FaArrowRight,
} from 'react-icons/fa'
import { ethers } from 'ethers'
import contractABI from '../../erc1155ABI.json'
import { MdGeneratingTokens } from 'react-icons/md'
const YOUR_CONTRACT_ADDRESS = '0x97a6ce7B74A28288c5ef442C3C2dcA73Ae054Ee6'

function ViewPropertyDetails() {
  const params = useParams()
  const [propertyDetails, setpropertyDetails] = useState('')
  const [tokenDetails, setTokenDetails] = useState({
    isPresent: false,
    pd: ''      // its an array
  })
  const [number, setnumber] = useState(0)
  const navigate=useNavigate()

  let getSingleToken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    let contract = new ethers.Contract(
      YOUR_CONTRACT_ADDRESS,
      contractABI,
      signer
    )
    const token = await contract.getSingleToken(params.tokenID)
    return token
  }

  const changeNumber = () => {
    setnumber((prev) => prev + 1)
  }

  useEffect(() => {
    sendRequestToBackend().then((data) => {
      console.log(data.propertyDetails)
      if (data.success) {
        setpropertyDetails(data.propertyDetails)
      }
    })
    getSingleToken().then((data) => {
      console.log(data.isPresent, data.pd)
      setTokenDetails(
        prev => {
            return {
                ...prev,
                isPresent: data.isPresent,
                pd: data.pd
            }
        }        
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const sendRequestToBackend = async () => {
    const url = `http://localhost:5000/api/properties/getProperty/${params.tokenID}`
    const res = await axios.get(url).catch((err) => {
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

  const bookProperty=()=>{
    navigate(`/bookProperty/${propertyDetails.tokenID}`,{state: {tokenID:propertyDetails.tokenID,owner:propertyDetails.owner, ownerMetamask: propertyDetails.metamaskAddress}})
  }

  // // Helper function to calculate the width of the green bar
  // const calculateBarWidth = (text) => {
  //   // You can adjust the factor (e.g., 8) to control the width
  //   return `${text.length * 8}px`;
  // };
  const barWidth = '300px'

  return (
    <div className="flex justify-center w-[90vw] ">
      {propertyDetails && (
        <div className="flex flex-col items-center justify-center">
          <div className="relative mx-auto">
            <img
              src={
                propertyDetails.imageSource[
                  `${number % propertyDetails.imageSource.length}`
                ]
              }
              alt="property"
              className="w-full h-auto max-h-screen"
            />
            <button
              onClick={changeNumber}
              className="absolute right-0 top-1/2 z-10 bg-red-500 outline-none p-2 rounded-full text-white"
            >
              <FaArrowRight />
            </button>
          </div>
          <div className="mt-4">
            <div className="mb-2 flex justify-center gap-x-2">
              <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`}
                style={{ width: barWidth }}
              >
                <FaHome className="mr-2" />
                {propertyDetails.propertyName}
              </div>
              <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`}
                style={{ width: barWidth }}
              >
                <FaMapMarkerAlt className="mr-2" />
                {propertyDetails.address}
              </div>
            </div>


            <div className="mb-2 flex justify-center gap-x-2 ">
              <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`}
                style={{ width: barWidth }}
              >
                <FaBuilding className="mr-2" />
                {propertyDetails.propertyType}
              </div>
              <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`}
                style={{ width: barWidth }}
              >
                <FaDollarSign className="mr-2" />
                {propertyDetails.price}
              </div>
              
            </div>


            <div className="mb-2 flex justify-center">
              <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`}
                style={{ width: barWidth }}
              >
                <FaRuler className="mr-2 " />
                {propertyDetails.area}
              </div>
              {tokenDetails.isPresent && <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`}
                style={{ width: barWidth }}
              >
                <MdGeneratingTokens className="mr-2 " />
                {100 - tokenDetails.pd[4].toNumber()}
              </div>}
              {!tokenDetails.isPresent && <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full`}
                style={{ width: barWidth }}
              >
                <MdGeneratingTokens className="mr-2 " />
                Token Not Available
              </div>}
              
            </div>

            <div className="mb-2 flex justify-center gap-x-2 w-fit">
            <div
                className={`bg-green-500 text-white py-2 px-4 mb-2 flex items-center rounded-full w-full`}
              >
                <FaInfo className="mr-2" />
                {propertyDetails.description}
              </div>
            </div>

            <div className="mb-2 flex justify-center">
              
            </div>
          </div>
          <div className="my-4 ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={bookProperty}>
              BOOK PROPERTY!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewPropertyDetails
