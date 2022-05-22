import React, { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./login.scss";
import GoogleButton from "react-google-button";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential?.user;
        dispatch({ type: "LOGIN", payload: user });
        navigation("/");
        // ...
      })
      .catch((error) => {
        setError(true);
        // ..
      });
  };

  const signInGG = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        navigation("/");
        // ...
        alert(user.displayName);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        // ...
      });
  };

  const signOutGG = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("success");
      })
      .catch((error) => {
        console.log("err");
        // An error happened.
      });
  };

  return (
    <div className="Login w-full max-w-[500px] mx-auto bg-white shadow-lg p-5 mt-10">
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-[20px] font-medium rounded-lg w-full text-white mb-5"
        >
          Login
        </button>
        <GoogleButton onClick={signInGG} />
        <GoogleButton onClick={signOutGG} />

        {error && <span className="text-red-600">Wrong email or password</span>}
      </form>
    </div>
  );
};

export default Login;
