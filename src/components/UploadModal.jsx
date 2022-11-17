import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytes} from "firebase/storage"
import { Modal, Form, Input, Button, Upload } from "antd"

const firebaseConfig = {
  apiKey: "AIzaSyAa3P8rquH_tuAi08XZPXrZgiHJgMyjycA",
  authDomain: "upload-storage-at.firebaseapp.com",
  projectId: "upload-storage-at",
  storageBucket: "upload-storage-at.appspot.com",
  messagingSenderId: "1065355321540",
  appId: "1:1065355321540:web:5b361d8def8dec8fd6a991"
};

export default function UploadModal({setShowUpload, setPhotoList}){
  const handleNewPhoto = (values) => {
    console.log(values)
    // 0. connect to firebase storage
    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    // 1. upload photo to storage bucket
    const filename = values.photo.file.name
    const imageRef = ref(storage, `photos/${filename}`)
    uploadBytes(imageRef, values.photo.file.originFileObj)
    .then(() => console.log('upload succesful'))
    .catch(err => console.error(err))
    // 2. figure out url for that photo
    const photoUrl = `https://firebasestorage.googleapis.com/v0/b/upload-storage-at.appspot.com/o/photos%2F${filename}?alt=media`
    // 3. put that url in to the new photo object
    let newPhotoObj = values
    newPhotoObj.photo = photoUrl
    // 4. send a post request to API
    fetch('https://express-ts-at.web.app/photos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(newPhotoObj)
    })
    .then(results => results.json())
    .then(newListOfPhotos => {
      // 5. get back new list of photos
      setPhotoList(newListOfPhotos)
      // 6. setPhotoList and close modal
      closeModal()
    })


    // send a post request to API
    // get back new list of photos
    // setPhotoList
  }
  const closeModal = () => setShowUpload(false)
  return (
    <Modal title="Upload Photo" open={true} footer={null} onCancel={closeModal}>
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={handleNewPhoto}>
      <Form.Item label="User Name" name="username">
        <Input required />
      </Form.Item>
      <Form.Item label="Profile Picture URL" name="profilePic">
        <Input required />
      </Form.Item>
      <Form.Item label="Photo" name="photo">
        <Upload listType="picture-card">
          +<br />Upload
        </Upload>
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} required />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">Save Photo</Button>
      </Form.Item>
    </Form>
  </Modal>
)
}