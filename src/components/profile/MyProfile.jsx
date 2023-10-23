import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MyProfile = () => {
  const [profileData, setProfileData] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    sendRequestToBackend().then((data) => {
      console.log(data)
      setCategory(localStorage.getItem("category"))
      if (data.success) {
        setProfileData(data.userData)
      }
    })
  }, [])

  const sendRequestToBackend = async () => {
    const url = 'http://localhost:5000/api/properties/getHoldings'
    const res = await axios
      .post(url, { username: localStorage.getItem("username") })
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

  return <div>MyProfile</div>
}

export default MyProfile
