import "./post.css"
import User from "../user/User"
import {Favorite, FavoriteBorderOutlined, MoreHorizOutlined} from "@material-ui/icons"
import React, {useState, useEffect} from "react"
import Comment from "../comment/Comment"
// import { Users } from "../../dummyData"
const Post = ({currentUser, post, Users}) => {
    // console.log(post, Users)
    const user = Users.filter((u)=>u.userId===post.userId)[0]; // to get the user who posted.
    const [likes, setlikes] = useState(post.like)
    const [liked, setliked] = useState(false);
    const [animate, setanimate] = useState(false);
    const [ShowComments, setShowComments] = useState(false);

    const updateLike = () => {
        if(liked){
            setlikes(likes-1);
        } else{
            setlikes(likes+1);
        }
        setliked(!liked);
    }

    useEffect(() => {
      return () => {
        if(!liked){
            setanimate(true);
            setTimeout(()=>{setanimate(false);},500)
        }
      }
    }, [liked])
    
    async function comment(){
        const newPost = { comment: post.comment+1, comments: post.comments.concat({commentId: post.comments.length+1, userId: currentUser.userId, body: document.getElementById("commentBox"), timeStamp: "2022-09-20-13-01-32", recomments: [] })}

        console.log(newPost, post);
        await fetch(`http://localhost:5000/post_update/${post._id}`, {
                method: 'POST',
                body: JSON.stringify({newPost}),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                console.log("inserted")
            });
    };

  return (
    <div className="postContainer">
        <div className="postUser">
            <User user={user}/>
            <MoreHorizOutlined className="moreButton"/>
        </div>
        <div className="post">
            <div className="postDescribe">{post.desc}</div>
            <div className="postImageContainer">
                <img src={post.photo} alt="PostImage" onDoubleClick={updateLike} className="postImage" />
                {(animate)?<Favorite className="likeEffect"/>:""}
            </div>
        </div>
        <div className="postData">
            <div className="postButton">
                {/* <img src="assets/heart.png" alt="Like" className="likeButton" /> */}
                {(liked)?<Favorite className="likeButton" onClick={updateLike}/>:<FavoriteBorderOutlined className="likeButton" onClick={updateLike}/>}
                <p className="likes">{likes}<span className="LikeWord">Likes</span> </p>
            </div>
            <div className="postComment">
                <p className="comments"><span onClick={()=>{if(post.comment >0) setShowComments(!ShowComments)}}>{`${post.comment} Comments`}</span></p>
                <p className="timestamp">{post.date}</p>
            </div>
        </div>
        { ShowComments && <div className="CommentsContainer">
            {
            (post.comment > 0)? 
            post.comments.map((commentData)=>(<Comment key={commentData.commentId} commentData={commentData}/>))
            :<></>
            }
            <div className="CommentButtonContainer"><input type="text" id="commentBox" className="commentBox" placeholder="Comment..."/><button className="CommentButton" onClick={()=>{}}>comment</button></div>
        </div>}
    </div>
  )
}

export default Post