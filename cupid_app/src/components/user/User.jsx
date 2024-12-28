import React from "react"
import "./user.css"

function User({user}) {
  return (
        <div className="userContainer">
            <div className="userProfile">
                <img src={user.profilePicture} alt="profilePhoto" className="userImage" />
                <div className="onlineBadge"></div>
            </div>
            <div className="userName">{user.username}</div>
        </div>
  )
}

export default User