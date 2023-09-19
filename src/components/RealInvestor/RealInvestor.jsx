import React, { useEffect } from "react"
import { ethers } from 'ethers';
import erc1155abi from '../../erc1155ABI.json';
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import "../home/recent/recent.css"
import img from "../images/about.jpg"

{/* */}

const RealInvestor = () => {
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  }, [])
  
  return (
    <>
      <section className='blog-out mb'>
        <Back name='Welcome Investor!' title='Ready to Invest?' cover={img} />
        <div className='container recent'>
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default RealInvestor