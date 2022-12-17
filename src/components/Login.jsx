import { Button, Modal, Form } from "antd";
import { useState } from "react";
import { getAuth, GoogleAuthProvider, 
  signInWithPopup } from 'firebase/auth'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD8VwlJC1GCu72Fi8MkaJmpDJOIltR0rLI",
  authDomain: "express-ts-at.firebaseapp.com",
  projectId: "express-ts-at",
  storageBucket: "express-ts-at.appspot.com",
  messagingSenderId: "994436065585",
  appId: "1:994436065585:web:20e819c0d0c30edc58a810"
};

export default function Login( { setUser }){
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };
  const handleGoogleLogin = async () => {
    const app = initializeApp(firebaseConfig) // connects to firebase
    const auth = getAuth(app) // connects us to firebase auth
    const provider = new GoogleAuthProvider()
    const response = await signInWithPopup(auth, provider)
      .catch(alert)
    setUser(response.user)
  }
  return (
    <>
    <Button 
    type='dashed' onClick={handleGoogleLogin}>
      Sign in with Google
    </Button>
    </>
  ) 

}