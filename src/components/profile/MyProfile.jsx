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
    <div>
      {category === 'INVESTOR' && <h2>Hi {profileData.username}</h2>}
      {category === 'LISTER' && <h2>Hi {profileData.username}</h2>}

      {category === 'LISTER' && <div>
        <h2>Token ID</h2>

        {
          profileData.listings.map(tokens=>
            <div>
              
              <h2>{tokens.tokenID}</h2>
              <button onClick={() => viewTokenDetails(tokens.tokenID)}>View Details</button>
            </div>
          )
        }
        </div>}

        {category === 'INVESTOR' && <div>
        <h2>Token ID</h2>
        <h2>Amount invested</h2>

        {
          profileData.holdings.map(tokens=>
            <div>
              <h2>{tokens.tokenID}</h2>
              <h2>{tokens.amountInvested}</h2>
              <button onClick={() => viewInvestmentDetails(tokens.tokenID)}>View Details</button>
            </div>
          )
        }
        </div>}
    </div>
  )
}

export default MyProfile
