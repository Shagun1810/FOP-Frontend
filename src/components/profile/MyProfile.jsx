import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyProfile = () => {
  const [profileData, setProfileData] = useState('')
  const [category, setCategory] = useState('')
  const navigate=useNavigate()

  useEffect(() => {
    sendRequestToBackend().then((data) => {
      console.log(data)
      setCategory(localStorage.getItem('category'))
      if (data.success) {
        setProfileData(data.userData)
      }
    })
  }, [])

  const sendRequestToBackend = async () => {
    const url = 'http://localhost:5000/api/properties/getHoldings'
    const res = await axios
      .post(url, { username: localStorage.getItem('username') })
      .catch((err) => {
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

  const viewTokenDetails=(tokenID)=>{
    navigate(`/viewlistings/${tokenID}`)
  }

  const viewInvestmentDetails=(tokenID)=>{
    navigate(`/viewinvestments/${tokenID}`)
  }

  return (
    <div class="container mx-auto p-4">
    {category === 'INVESTOR' && <h2 class="text-2xl mb-4 text-center">Hi {profileData.username}</h2>}
    {category === 'LISTER' && <h2 class="text-2xl mb-4 text-center">Hi {profileData.username}</h2>}

    {category === 'LISTER' && <div>
        <h2 class="text-xl font-semibold mb-2">Token ID</h2>

        {profileData.listings.map(tokens => (
            <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg">{tokens.tokenID}</h2>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => viewTokenDetails(tokens.tokenID)}>View Details</button>
            </div>
        ))}
    </div>}

    {category === 'INVESTOR' && <div>
        <div className='flex justify-evenly'>
        <h2 class="text-xl font-semibold mb-2">Token ID</h2>
        <h2 class="text-xl font-semibold mb-2">Amount invested</h2>
        <h2 class="text-xl font-semibold mb-2"> </h2>
        </div>

        {profileData.holdings.map(tokens => (
            <div class="flex items-center justify-between mb-2">
                <span class="text-lg">{tokens.tokenID}</span>
                <span class="text-lg">{tokens.amountInvested}</span>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => viewInvestmentDetails(tokens.tokenID)}>View Details</button>
            </div>
        ))}
    </div>}
</div>

  )
}

export default MyProfile
