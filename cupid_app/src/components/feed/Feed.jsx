import React from "react"
import "./feed.css"
import Post from "../post/Post"
// import { Users } from "../../dummyData"
// import { Posts } from "../../dummyData"
function Feed({ currentUser, Users, Posts }) {
  return (
    <div className="feedContainer">
      <div className="uploadPost">
        
      </div>

      <div className="feedPosts">
        {Posts.map((post) => (<Post key={post.postId} currentUser={currentUser} post={post} Users={Users} />))}
      </div>
    </div>
  )
}

export default Feed