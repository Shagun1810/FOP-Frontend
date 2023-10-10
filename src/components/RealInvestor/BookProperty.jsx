import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import contractABI from '../../erc1155ABI.json'

const YOUR_CONTRACT_ADDRESS = '0x97a6ce7B74A28288c5ef442C3C2dcA73Ae054Ee6'

const { ethereum } = window

const BookProperty = () => {
  const [buttonDetails, setbuttonDetails] = useState('Book Property')
  const [isDone, setisDone] = useState(false)
  const navigate = useNavigate()

  let getContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    let contract = new ethers.Contract(
      YOUR_CONTRACT_ADDRESS,
      contractABI,
      signer
    )
    return contract
  }

  const location = useLocation()
  // console.log(location.state.ownerMetamask)
  const [formData, setFormData] = useState({
    username: '',
    metamaskAddress: '',
    tokenID: '',
    amount: '',
  })

  useEffect(() => {
    setFormData((prev) => {
      const tokenId = location.state.tokenID
      return { ...prev, tokenID: tokenId }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  let BookPropertyFunction = async () => {
    const tx = await getContract().allotToken(
      formData.tokenID,
      formData.metamaskAddress,
      formData.amount
    )
    // const response = await tx.wait();
    console.log(tx)
    if (tx.nonce) {
      // console.log("hi") reaching here
      const finalAmount = Number(formData.amount) * 0.01
      const parsedAmount = ethers.utils.parseEther(String(finalAmount))
      const ownerMetamask = location.state.ownerMetamask

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: formData.metamaskAddress,
            to: ownerMetamask,
            gas: '0x5208',
            value: parsedAmount._hex,
          },
        ],
      })
    }
    return tx
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setbuttonDetails('Booking Property sabar kro')
    BookPropertyFunction()
      .then((data) => {
        console.log(data)
        setbuttonDetails('Property Booked!')
        setisDone(true)
        setFormData({
          username: '',
          metamaskAddress: '',
          tokenID: '',
          amount: '',
        })
      })
      .catch((error) => console.log(error))
  }

  const navigateToHome = () => {
    navigate('/')
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl text-center mt-4 font-semibold mb-6">Property Investment Form</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
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

        {formData.tokenID && (
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
          </div>
        )}

        <div className="form-group my-4">
          <label htmlFor="amount">Amount to be invested (In %):</label>
          <input
            type="text"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-4"
        >
          {buttonDetails}
        </button>

        {isDone && (
          <button
            onClick={navigateToHome}
            className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Done
          </button>
        )}
      </form>
    </div>
  )
}

export default BookProperty
