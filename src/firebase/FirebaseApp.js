import { async } from "@firebase/util";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  getDoc,
  whete,
  orderBy,
  limit,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

const FirebaseApp = () => {
  // colRef
  const colRef = collection(db, "posts");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [olds, setOlds] = useState("");
  const [postId, setPostId] = useState("");
  const [posts, setPosts] = useState([]);
  const [singlePost, setSinglePost] = useState("");

  useEffect(() => {
    //   1. Get collection data (posts)
    // getDocs(colRef)
    //   .then((snapshot) => {
    //     let posts = [];
    //     snapshot.docs.forEach((doc) => {
    //       posts.push({
    //         id: doc.id,
    //         ...doc.data(),
    //       });
    //     });
    //     setPosts(posts);
    //     console.log(posts);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // 2. Get document in realtime
    onSnapshot(colRef, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(posts);
    });
    const docRefSingle = doc(db, "posts", "MrXY0CjSMbsh6JXTnX21");
    // getDoc(docRefSingle).then((doc) => {
    //   console.log(doc.id, doc.data());
    // });
    onSnapshot(docRefSingle, (doc) => {
      console.log(doc.id, doc.data());
    });
  }, []);

  const handleAddPost = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      title,
      author,
      createAt: serverTimestamp(),
      olds,
    })
      .then(() => {
        console.log("success");
        // reset form
      })
      .catch((err) => {
        console.log(err);
        // reset form
      });
  };

  const handleRemovePost = async (e) => {
    e.preventDefault();
    // Get document ID
    const colRefDelete = doc(db, "posts", postId);
    await deleteDoc(colRefDelete);
    console.log("success");
  };

  //   createAt

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const colRefUpdate = doc(db, "posts", postId);
    await updateDoc(colRefUpdate, {
      title,
      author,
    });
    console.log("success");
  };
  //   fetching single

  useEffect(() => {
    //   Firestore queries
    const q = query(colRef, limit(5));
    // console.log(q);

    onSnapshot(q, (snapshot) => {
      let posts = [];
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(posts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-10">
      {/* Create */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <form onSubmit={handleAddPost} className="mb-5">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />

          <label htmlFor="olds">Olds</label>
          <input
            type="number"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your olds"
            name="olds"
            onChange={(e) => setOlds(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 bg-blue-500 text-sm font-medium rounded-lg w-full text-white"
          >
            Add post
          </button>
        </form>
      </div>

      {/* Delete */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <form onSubmit={handleRemovePost}>
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your id"
            name="postId"
            onChange={(e) => setPostId(e.target.value)}
          />

          <button
            type="submit"
            className="p-3 bg-blue-500 text-sm font-medium rounded-lg w-full text-white"
          >
            Remove post
          </button>
        </form>
      </div>

      {/* Update */}
      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        <form onSubmit={handleUpdatePost} className="mb-5">
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="p-3 rounded border border-gray-200 w-full mb-5 outline-none focus:border-blue-500"
            placeholder="Enter your title"
            name="author"
            onChange={(e) => setAuthor(e.target.value)}
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-sm font-medium rounded-lg w-full text-white"
          >
            Update post
          </button>
        </form>
      </div>

      <div className="w-full max-w-[500px] mx-auto bg-white shadow-lg p-5">
        {posts.length > 0 &&
          posts.map((item) => (
            <div key={item.id}>
              <div>
                {item.title} - {item.author}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FirebaseApp;
