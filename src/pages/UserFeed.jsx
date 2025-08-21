import React from 'react'
import UserPics from '../components/UserPics'
import Navbar from '../components/Navbar'

function UserFeed() {
  return (
    <div className="w-full items-center justify-center">
      <Navbar />
    <div className="py-20 pt-10 flex flex-col gap-5 md:ml-64 md:w-120 xl:ml-130 2xl:w-150 2xl:ml-160">
        <UserPics />
    </div>
    </div>
  )
}

export default UserFeed