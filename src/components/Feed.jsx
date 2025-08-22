import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy
} from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import Post from "./Post";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const q = query(postsCollectionRef, orderBy("timestamp", "desc"));
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

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Carregando feed...</p>;
  }

  return (
    <div className="flex flex-col gap-12 max-w-lg mx-auto py-8">
      {posts.map((post) => (
        <Post key={post.id} postData={post} />
      ))}
    </div>
  );
}

export default Feed;
