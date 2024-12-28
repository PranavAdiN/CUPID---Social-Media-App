import './Comment.css'
import React from "react"
import { Users } from '../../dummyData';

function Comment({commentData}) {
    var commentUser;
    Users.forEach(element => {
        if(element.id === commentData.userId){
            commentUser = element;
        }
    });
  return (
    <div className='commentContainer'>
        <div className="commentContainerLeft">
            <div className="commentUserProfile">
                <img src={commentUser.profilePicture} alt="profilePhoto" className="commentUserImage" />
                <div className="commentOnlineBadge"></div>
            </div>
        </div>
        <div className="commentContainerRight">
            <div className="commentUserName">{commentUser.username}</div>
            <div className="commentBody">{commentData.body}</div>
        </div>
    </div>
  )
}

export default Comment