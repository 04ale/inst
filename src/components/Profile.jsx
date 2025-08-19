import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { User, CircleFadingPlus } from "lucide-react";
import { db } from "../services/FirebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import EditProfile from "./EditProfile";
import { signOut } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";

function Profile() {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      nav("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      alert("Não foi possível sair.");
    }
  };

  const deleteUser = async () => {
    await deleteDoc(userDocRef);
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setUserProfile(docSnap.data());
        }
      } catch (erro) {
        console.error("Erro ao buscar Users: ", erro);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <p>Carregando perfil</p>;
  }

  if (!userProfile) {
    return <p>Este perfil não foi encontrado</p>;
  }

  return (
    <div>
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-8 md:gap-16">
          <div className="flex-shrink-0">
            {userProfile.profilePicUrl ? (
              <img
                src={userProfile.profilePicUrl}
                alt={userProfile.username}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-2 border-gray-200 p-1"
              />
            ) : (
              <User
                size={112}
                className="rounded-full bg-gray-300 text-white p-2"
              />
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-light">{userProfile.username}</h1>
              <button
                className="bg-gray-200 cursor-pointer px-4 py-1 text-sm font-semibold rounded-lg hover:bg-gray-300"
                onClick={openModal}
              >
                Edit profile
              </button>
            </div>

            <div className="flex flex-row gap-6 text-base">
              <div className="flex flex-col md:flex-row md:gap-1">
                <span className="font-semibold">{userProfile.postsN}</span> 
                <p className="text-gray-500">posts</p>
              </div>
              <div className="flex flex-col md:flex-row md:gap-1">
                <span className="font-semibold">{userProfile.followersN}</span> 
                <p className="text-gray-500">followers</p>
              </div>
              <div className="flex flex-col md:flex-row md:gap-1">
                <span className="font-semibold">{userProfile.followingN}</span> 
                <p className="text-gray-500">following</p>
              </div>
            </div>

            <div>
              <p className="font-semibold">{userProfile.name}</p>
              <p className="text-gray-700">{userProfile.bio}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 ">
          <CircleFadingPlus size={60}/>
          <p>New</p>
        </div>
      </div>

      {isModalOpen && (
        <EditProfile onClose={closeModal} onLogout={handleLogout} onDelete={deleteUser}/>
      )}
    </div>
  );
}

export default Profile;
