import React from "react";
import Profile from "../components/Profile";
import OwnPosts from "../components/OwnPosts";
import Navbar from "../components/Navbar";

function UserProfile() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-4 md:px-34  md:pl-45 xl:ml-80 2xl:ml-130 ">
        <Profile />
        <OwnPosts />
      </div>
    </div>
  );
}

export default UserProfile;
