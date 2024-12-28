import React from "react"
import Post from "../post/Post";
import User from "../user/User";
import "./Profile.css"
function Profile({profileUser, setprofileUser, Posts, Users}) {
  console.log(profileUser)
  const own_posts = Posts.filter((p)=>p.userId === profileUser.userId);
   return (
    <div className="profileContainer">
        <div className="bannerImageContainer">
            <img src="/assets/profile_banner.jpeg" alt="Banner" className="profileBanner"/>
            <div className="profilePictureContainer">
                <img src={profileUser.profilePicture} alt="ProfilePicture" className="profilePicture" />
            </div>
        </div>
        <div className="header">
            <div className="profileNameContainer">
                {profileUser.username}
            </div>
            <div className="userStats">
                <div className="followers"><div className="followersCount">{profileUser.followers.length}</div><div className="label">followers</div></div>
                <div className="followings"><div className="followingsCount">{profileUser.following.length}</div><div className="label">followings</div></div>
            </div>
        </div>
        <div className="profileMainContainer">
            <div className="profilePostContainer">
                {
                    own_posts.map((post)=>(<Post key={post.postId} post={post} Users={Users} />))
                }
            </div>
            <div className="profilefollowListContainer">
                <div className="label">Followers</div>
                <div className="profilefollowersList">
                    {
                        (profileUser.followers.length>0)?
                        profileUser.followers.map((id)=>{
                            const follow_user = Users.filter((u)=>(u.userId===id))[0];
                            return <User user={follow_user} />})
                            :
                            <div className="nolist">No Followers Yet</div>
                    }
                </div>
                <br/>
                <div className="label">Followings</div>
                <div className="profilefollowingList">
                    {
                        (profileUser.following.length>0)?
                        profileUser.following.map((id)=>{
                            const follow_user = Users.filter((u)=>(u.userId===id))[0];
                            return <User user={follow_user}/>})
                            :
                            <div className="nolist">No Followings Yet</div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile