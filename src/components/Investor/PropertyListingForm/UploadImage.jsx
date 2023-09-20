import React, { useState } from 'react'
import {
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import { storage } from "../../firebase";
  import { v4 } from "uuid";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadImage = () => {
    const uploadFile = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      };

      const [documents, setDocuments] = useState(null);
      const [imageUpload, setImageUpload] = useState(null);
      const [imageUrls, setImageUrls] = useState([]);
      const [formData, setformData] = useState('')
      const navigate=useNavigate()

      const handleSubmit = (e) => {
        e.preventDefault();
        sendRequestToBackend().then(data=>{
          console.log(data)
          if(data.success){
            navigate(`/uploadimage/${formData.tokenID}`)
          }
        })
      };

      const sendRequestToBackend=async()=>{
        const url='http://localhost:5000/api/properties/addproperty'
        const response = await axios.post(url, {
          ...formData
      }).catch((err) => {
        return {
          data: {
            message: err.response.data.message,
            success: err.response.data.success,
            status: err.response.status,
          },
        }
      })
      const data = await response.data
      return data
      }

      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setDocuments(file);
      };

  return (
    <div>
        <div>
            <label htmlFor="documents">Documents (Images, etc.):</label>
            <input
              type="file"
              id="documents"
              name="documents"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <button onClick={uploadFile}> Upload Image</button>
            {imageUrls.map((url) => {
              return <img src={url} />;
            })}
          </div>
          <button className='my-4' onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default UploadImage