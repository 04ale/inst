import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";

function OwnPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();
  const photoRef = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
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
      }
    };
    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  if (loading) {
    return <p>Carregando posts...</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-center font-semibold text-xl">Posts</h1>
      <div className="grid grid-cols-3 gap-1 px-1">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square">
            <img
              src={post.imageUrl}
              ref={photoRef}
              className="w-full h-full object-cover cursor-pointer border-1 border-gray-200 rounded-lg"
              onClick={() => navigate(`/userfeed/${userId}`, {state: {selectedPostId:post.id}})}
              alt="Post"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnPosts;