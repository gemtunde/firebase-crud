//import React from 'react'
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //signin with email and password
  const signIn = async () => {
    // console.log("formdata", formData);
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
    } catch (error) {
      console.log(error);
    }
  };
  //logout
  const logout = async () => {
    // console.log("formdata", formData);
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };
  //signin with Google Auth
  const signInWithGoogle = async () => {
    // console.log("formdata", formData);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        placeholder="email.."
        type="text"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        placeholder="xxxxxxx"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={signIn}>Sign in</button>

      <button onClick={signInWithGoogle}>Signin with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Auth;
