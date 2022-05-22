import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  // console.log(data);

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      console.log("success");
    } catch (err) {
      console.log("Lỗi tè le luôn", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuv7GqevqRqUgCNaskcs87rvMxqN-jENlxNQ&usqp=CAU"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadIcon className="icon" />
                </label>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>

              {inputs?.map((input) => (
                <div className="formInput" key={input.id}>
                  <label htmlFor="">{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}

              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
