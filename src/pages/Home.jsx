import React from "react";
import SignUp from "../components/SignUp";
import Logout from "../components/Logout";
import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import Stories from "../components/Stories";
import UserPosts from "../components/UserPics";

function Home() {
  return (
    <div className="w-full items-center justify-center">
      <Navbar />
      <div className="py-20 md:pt-0 flex flex-col gap-5 md:ml-64 md:w-120 xl:ml-130 2xl:w-150 2xl:ml-160">
        <Stories />
        <Feed />
      </div>
    </div>
  );
}

export default Home;
