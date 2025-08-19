import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../services/FirebaseConfig";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
  increment
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { X } from "lucide-react";

function NewPost({ onClose }) {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePost = async () => {
    if (!imageFile) return;
    setLoading(true);

    const user = auth.currentUser;

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      const userData = userDoc.exists() ? userDoc.data() : {};

      const imageRef = ref(storage, `posts/${imageFile.name + v4()}`);
      await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        username: userData.username || user.email,
        profilePicUrl: userData.profilePicUrl || "",
        imageUrl: imageUrl,
        description: description,
        likedBy: [],
        likesCount: 0,
        timestamp: serverTimestamp(),
      });

      await updateDoc(userDocRef, {
      postsN: increment(1),
    });

      setLoading(false);
      nav('/')
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      alert("Erro ao criar o post: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center z-50">
      <X
        onClick={onClose}
        className="absolute cursor-pointer top-0 right-0 text-white mt-5 mr-5 font-bold"
      />
      {previewUrl ? (
        <div className="bg-white gap-4 w-8/10 rounded-2xl p-4 flex flex-col items-center shadow-md 2xl:w-5/10 2xl:max-h-[80vh]">
          <div className="w-full flex-grow flex flex-row items-stretch overflow-hidden">
            <div className="w-1/2 pr-2">
              <img
                src={previewUrl}
                className="w-full h-full object-contain 2xl:max-h-[calc(80vh-120px)]"
                alt="Preview"
              />
            </div>

            <div className="w-1/2 pl-2 flex flex-col">
              <h1 className="font-semibold mb-2">Descrição:</h1>
              <textarea
                placeholder="Escreva uma legenda..."
                className="border border-gray-300 w-full rounded-lg p-2 flex-grow resize-none focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={handlePost}
            disabled={loading}
            className="w-full mt-4 bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors duration-200 shadow-sm flex-shrink-0 disabled:bg-indigo-300"
          >
            {loading ? "Publicando..." : "Publicar"}
          </button>
        </div>
      ) : (
        <div className="bg-white w-8/10 h-4/10 rounded-2xl p-3 flex justify-start flex-col items-center lg:w-7/10 lg:h-6/10 2xl:w-5/10 2xl:h-5/10">
          <h1 className="font-bold border-b text-lg lg:text-2xl w-full text-center pb-2 border-b-gray-300">
            Criar novo post
          </h1>
          <div className="flex flex-col gap-4 justify-center items-center h-full">
            <p className="text-lg font-semibold lg:text-2xl">
              Escolha sua foto aqui
            </p>
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={handleImageChange}
              accept="image/*"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer lg:text-xl rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600"
            >
              <span>Selecionar foto</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPost;
