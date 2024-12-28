import React from "react"
import "./rightbar.css"
import Ad from "../ad/Ad";
import Request from "../request/Request";

function Rightbar({Users, currentUser, requests, setrequests}) {
  var friend_requests = [];
  requests.map((request)=>{
    if(request.receiver_id === currentUser.userId){
      friend_requests.push(request);
    }
  })

  const requestUser ={
    _id: "637864c567506f50b6d02d9c",
    followers: [],
    following: [],
    password: "1234",
    profilePicture: "assets/person/9.jpeg",
    userId: 9,
    username: "Gary Duty",
  }

  

  return (
    <div className="rightBarContainer">
      
      <div className="AdContainer">
        <Ad/>
      </div>

      <div className="requestsContainer">
        <div className="requestsContainerLabel">Pending Requests</div>
        <div className="requests">
        {
          friend_requests.map((friend_request)=>{
            for(var i=0;i<Users.length;i++){
              if(Users[i].userId === friend_request.sender_id){
                return <Request key={Users[i].userId} currentUser={currentUser} requestUser={Users[i]} requests={requests} setrequests={setrequests}/>
              }
            }
          })
        }
        </div>
      </div>

      <div className="unreadMessagesContainer">
        <div className="messageContainer">
          <div className="messageContainerLeft">
              <div className="messageUserProfile">
                  <img src={requestUser.profilePicture} alt="profilePhoto" className="messageUserImage" />
                  <div className="messageOnlineBadge"></div>
              </div>
          </div>
          <div className="messageContainerRight">
              <div className="messageUserName">{requestUser.username}</div>
              <div className="message"><span>follow back</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rightbar