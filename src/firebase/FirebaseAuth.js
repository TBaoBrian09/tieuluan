import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase-config";

const FirebaseAuth = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [userInfo, setUserInfo] = useState("");

  // Dung de xet khi nao dang nhap thi hien ten, dang xuat thi mat ten
  onAuthStateChanged(auth, (currentUser) => {
    setUserInfo(currentUser);
  });
  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, values.email, values.password);

    await updateProfile(auth.currentUser, {
      displayName: "thai bao",
    });
  };

  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div className="w-full mt-10 max-w-[500px] mx-auto bg-white shadow-lg p-5">
      <form className="mb-5" onSubmit={handleCreateUser}>
        <label htmlFor="email">email</label>
        <input
          type="text"
          className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
          placeholder="Enter your email"
          name="email"
          onChange={handleInputChange}
        />

        <label htmlFor="password">password</label>
        <input
          type="text"
          className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
          placeholder="Enter your password"
          name="password"
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="p-3 bg-blue-500 text-sm font-medium rounded-lg w-full text-white"
        >
          Create account
        </button>
      </form>
      <div className="mt-10 flex items-center gap-x-5">
        <span>{userInfo?.email}</span>
        <button
          onClick={handleSignOut}
          className="p-3 bg-purple-500 text-sm font-medium rounded-lg text-white"
        >
          SignOut
        </button>
      </div>
    </div>
  );
};

export default FirebaseAuth;
