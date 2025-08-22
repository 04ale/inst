import React, { useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  increment,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/FirebaseConfig";
import { Heart, User } from "lucide-react";
import { auth } from "../services/FirebaseConfig";
import { useAuth } from "../Authentication";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Post({ postData }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(postData.likesCount);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser && postData.likedBy?.includes(currentUser.uid)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }, [postData.likedBy, currentUser]);

  useEffect(()=> {

  }, [])
  

  const handleLike = async () => {
    const postDocRef = doc(db, "posts", postData.id);
    const newIsLiked = !isLiked;

    try {
      await updateDoc(postDocRef, {
        likesCount: increment(newIsLiked ? 1 : -1),
        likedBy: newIsLiked
          ? arrayUnion(currentUser.uid)
          : arrayRemove(currentUser.uid),
      });
      setIsLiked(newIsLiked);
      setLikesCount((prevCount) =>
        newIsLiked ? prevCount + 1 : prevCount - 1
      );
    } catch (err) {
      console.log("Erro ao curtir o post", err);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div key={postData.id} className="flex flex-col gap-4">
        <div >
          <Link className="flex gap-2 pl-4 items-center" to={`/userprofile/${postData.userId}`}>
            {postData.profilePicUrl ? (
              <img
                src={postData.profilePicUrl}
                className="rounded-full h-10 w-10"
              />
            ) : (
              <User className="rounded-2xl bg-black text-white p-1" />
            )}

            <p className="font-semibold">{postData.username}</p>
          </Link>
        </div>
        <img
          onDoubleClick={handleLike}
          src={postData.imageUrl}
          className="w-full aspect-square md:border-1 md:border-gray-200 md:rounded-lg"
        />
        {isLiked === false ? (
          <div className="flex flex-row gap-2">
            <Heart className="ml-4 cursor-pointer" onClick={handleLike} />
            <p className="font-bold">{postData.likesCount}</p>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <Heart
              className="ml-4 fill-red-600 text-red-600 cursor-pointer"
              onClick={handleLike}
            />
            <p className="font-bold">{postData.likesCount + 1}</p>
          </div>
        )}

        <p className="pl-4">
          <span className="font-bold">{postData.username}</span>:{" "}
          {postData.description}
        </p>
      </div>
    </div>
  );
}

export default Post;
