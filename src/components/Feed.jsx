import { useState, useEffect } from "react";
import { Button } from "antd"
import UploadModal from "./UploadModal";

export default function Feed() {
  const [photoList, setPhotoList] = useState();
  const [showUpload, setShowUpload] = useState(false)
  useEffect(() => {
    // fetch('https://express-ts-at.web.app/photos') // hosting url
    fetch("https://express-ts-at.web.app/photos")
      .then((results) => results.json())
      .then((data) => setPhotoList(data))
      .catch(alert);
  }, [setPhotoList]);
  return (
    <section>
      {!photoList 
      ? <p>Loading...</p> 
      : <p>{photoList.length}</p>
      }
      { showUpload ? <UploadModal setShowUpload={setShowUpload} setPhotoList={setPhotoList} /> : null}
      {/* { showUpload && <Upload/>} */}
      <Button 
      onClick={() => setShowUpload(true)} 
      className="fab" 
      type='primary' 
      shape="circle" 
      size="large">+</Button>
    </section>
  );
}