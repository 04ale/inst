import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication";


function OwnPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const {currentUser} = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const q = query(postsCollectionRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const postsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(postsData);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      } finally {
        setLoading(false);
        ("");
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-3">
        <h1 className="text-center font-semibold text-xl">Posts</h1>
      <div className="grid grid-cols-3 gap-1 px-1">
        {posts.map((post) => (
          <div key={post.id} className="grid grid-cols-1">
            <img
              src={post.imageUrl}
              className="w-full h-50 cursor-pointer border-1 border-gray-200 rounded-lg"
              onClick={() =>nav(`/userprofile/${currentUser.uid}`)}
            />
          </div>
        ))}
      </div>
      
    </div>
  );
}

export default OwnPosts;
