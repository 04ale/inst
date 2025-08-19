import React, { useState } from "react";
import { X } from "lucide-react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../services/FirebaseConfig";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function EditProfile({ onClose, onLogout, onDelete }) {
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [chosen, setChosen] = useState(null);
  const [newProfilePicFile, setNewProfilePicFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { userId } = useParams();
  const nav = useNavigate()

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setNewProfilePicFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleProfilePicUpdate = async () => {
    if (!newProfilePicFile) {
      alert("Por favor, selecione uma nova imagem primeiro.");
      return;
    }
    const user = auth.currentUser;
    if (!user) return;
    const fileRef = ref(storage, `profile_pics/${user.uid}`);
    try {
      await uploadBytes(fileRef, newProfilePicFile);
      const newUrl = await getDownloadURL(fileRef);
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, { profilePicUrl: newUrl });
      alert("Foto de perfil atualizada com sucesso!");
      window.location.reload();
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar a foto de perfil:", error);
      alert("Erro ao atualizar a foto.");
    }
  };

  const handleDeleteAccount = async () => {
    const delRef = doc(db, 'users', userId)

    try{
      await deleteDoc(delRef)
      console.log('User deleted')
      onLogout()
    } catch (erro) {
      console.log('Failed to delete user', erro)
    }
  }

  const handleUpdate = async () => {
    const editRef = doc(db, "users", userId);
    let dataToUpdate = {};

    switch (chosen) {
      case 0:
        if (newName) dataToUpdate.name = newName;
        break;
      case 1:
        if (newUsername) dataToUpdate.username = newUsername;
        break;
      case 2:
        if (newBio) dataToUpdate.bio = newBio;
        break;
      case 3:
        await handleProfilePicUpdate();
        break;
      default:
        break;
    }
    try {
      await updateDoc(editRef, dataToUpdate);
      alert("Perfil atualizado com sucesso!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      alert("Ocorreu um erro ao atualizar o perfil.");
    }
  };

  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/60 flex justify-center items-center ">
      <X
        onClick={onClose}
        className="absolute cursor-pointer top-0 right-0 text-white mt-5 mr-5 font-bold"
      />
      <div className="bg-white gap-4 w-11/12 max-w-sm rounded-2xl p-6 flex flex-col items-center shadow-md">
        <h1 className="font-bold text-lg lg:text-xl w-full text-center pb-4 border-b border-gray-300">
          Edit infos
        </h1>

        {chosen === null ? (
          <div className="w-full flex flex-col gap-3 mt-4">
            <button
              onClick={() => setChosen(0)}
              className="text-lg font-semibold bg-gray-100 border w-full rounded-lg cursor-pointer py-2 hover:bg-gray-200"
            >
              Edit name
            </button>
            <button
              onClick={() => setChosen(1)}
              className="text-lg font-semibold bg-gray-100 border w-full rounded-lg cursor-pointer py-2 hover:bg-gray-200"
            >
              Edit username
            </button>
            <button
              onClick={() => setChosen(2)}
              className="text-lg font-semibold bg-gray-100 border w-full rounded-lg cursor-pointer py-2 hover:bg-gray-200"
            >
              Edit bio
            </button>
            <button
              onClick={() => setChosen(3)}
              className="text-lg font-semibold bg-gray-100 border w-full rounded-lg cursor-pointer py-2 hover:bg-gray-200"
            >
              Edit profile pic
            </button>
            <button
              onClick={onLogout}
              className="text-lg font-semibold bg-gray-100 border w-full rounded-lg cursor-pointer py-2 hover:bg-gray-200"
            >
              Logout
            </button>
            <button
              onClick={handleDeleteAccount}
              className="text-lg font-semibold bg-gray-100 border w-full rounded-lg cursor-pointer py-2 hover:bg-gray-200"
            >
              Delete account
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 mt-4">
            {chosen === 0 && (
              <div className="flex flex-col gap-2">
                <label className="font-semibold">New name:</label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border p-2 rounded-md"
                />
              </div>
            )}
            {chosen === 1 && (
              <div className="flex flex-col gap-2">
                <label className="font-semibold">New username:</label>
                <input
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="border p-2 rounded-md"
                />
              </div>
            )}
            {chosen === 2 && (
              <div className="flex flex-col gap-2">
                <label className="font-semibold">New bio:</label>
                <textarea
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  className="border p-2 rounded-md h-24 resize-none"
                />
              </div>
            )}
            {chosen === 3 && (
              <div className="flex flex-col gap-4 items-center">
                <label className="font-semibold">New profile pic:</label>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                )}
                <input
                  id="pic-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="pic-upload"
                  className="cursor-pointer text-sky-600 font-semibold"
                >
                  Choose pic
                </label>
              </div>
            )}

            <div className="flex gap-4 mt-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-sky-500 cursor-pointer text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600"
              >
                Save
              </button>
              <button
                onClick={() => setChosen(null)}
                className="flex-1 bg-gray-200 cursor-pointer font-bold py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EditProfile;
