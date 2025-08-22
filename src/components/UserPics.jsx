// src/components/Feed.jsx
import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, orderBy, doc } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import Post from "./Post";
import { useLocation, useParams } from "react-router-dom";
import { where } from "firebase/firestore";

function UserPics() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { userId } = useParams();
  const location = useLocation();
  const selectedPostId = location.state?.selectedPostId;

  const postRefs = useRef(new Map());

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const q = query(
          postsCollectionRef,
          where("userId", "==", userId)
        );
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

  useEffect(() => {
    if (selectedPostId && postRefs.current.has(selectedPostId)) {
      const node = postRefs.current.get(selectedPostId);
      node.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [posts, selectedPostId]);


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

export default UserPics;
