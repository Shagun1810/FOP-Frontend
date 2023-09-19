import React from 'react'
import {
    ref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
  import { storage } from "../../firebase";
  import { v4 } from "uuid";

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
          <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default UploadImage