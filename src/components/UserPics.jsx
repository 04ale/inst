// src/components/Feed.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, doc } from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import { Heart, User } from "lucide-react";

function UserPics() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0)

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

  const likePost = async () => {
    setLiked(!liked);
    console.log(liked, "teste");
    const postDocRef = doc(db, "posts", posts.id);
    await updateDoc(postDocRef, {
      likesCount: increment(1),
    });
  };

  if (loading) {
    return <p>Carregando feed...</p>;
  }

  return (
    <div className="flex flex-col gap-12">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-4">
          <div className="flex gap-2 pl-4 items-center">
            {post.profilePicUrl ? (
              <img
                src={post.profilePicUrl}
                className="rounded-full h-10 w-10"
              />
            ) : (
              <User className="rounded-2xl bg-black text-white p-1" />
            )}

            <p className="font-semibold">{post.username}</p>
          </div>
          <img
            src={post.imageUrl}
            className="w-full aspect-square border-1 border-gray-200 rounded-lg"
          />
          {liked === false ? (
            <div className="flex flex-row gap-2">
              <Heart className="ml-4" onClick={()=>likePost(posts.id)} />
              <p className="font-bold">{post.likesCount}</p>
            </div>
          ) : (
            <div className="flex flex-row gap-2">
              <Heart className="ml-4 fill-red-600 text-red-600" />
              <p className="font-bold">{post.likesCount}</p>
            </div>
          )}

          <p className="pl-4">
            <span className="font-bold">{post.username}</span>:{" "}
            {post.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default UserPics;
