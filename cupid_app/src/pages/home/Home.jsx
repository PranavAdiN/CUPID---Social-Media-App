import React, { useState, useEffect } from 'react'
import Topbar from "../../components/topbar/Topbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"

import {Cancel} from "@material-ui/icons"
// import { useNavigate} from "react-router-dom"
import "./home.css"
import Profile from '../../components/profile/Profile'

function Home({currentUser, setcurrentUser}) {
  const [loggedIn, setloggedIn] = useState(true);
  // useEffect(() => {
    
  //   const navigate = useNavigate();
  //   if(currentUser !== undefined){
  //     navigate('/login');
  //     console.log("undefined currentUser");
  //     setloggedIn(true);
  //   }
  
  // }, [])
  // console.log("current", currentUser)
  const [users, setusers] = useState([]);
  const [posts, setposts] = useState([]);
  const [requests, setrequests] = useState([])
  const [requested, setrequested] = useState(false)
  const [loaded_data, setloaded_data] = useState(false);
  const [showProfile, setshowProfile] = useState(false);
  const [profileUser, setprofileUser] = useState(currentUser);
  const [showPostInput, setshowPostInput] = useState(false);

  const onLoad = () => {
    if(!requested){
      getUsers();
      getPosts();
      getrequests();
      setrequested(true);
    }
  }
  async function getUsers(){
    if(!loaded_data){
      const response = await fetch('http://localhost:5000/user/all');
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        alert(`Record not found`);
        return;
      }
      setloaded_data(true);

      setusers(record);
      setcurrentUser(record[0]);
      console.log(record);
    }
  };

  async function getPosts(){
    if(!loaded_data){
      const response = await fetch('http://localhost:5000/post/all');
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        alert(`Record not found`);
        return;
      }
      setloaded_data(true);

      // console.log(record);
      setposts(record);
    }
  };

  async function getrequests(){
    if(!loaded_data){
      const response = await fetch(`http://localhost:5000/friend_requests/all`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        alert(message);
        return;
      }
  
      const record = await response.json();
      if (!record) {
        alert(`Record not found`);
        return;
      }
      setloaded_data(true);

      console.log(record);
      setrequests(record);
    }
  };
  
  useEffect(() => {
    setprofileUser(currentUser);
  }, [currentUser])
  
  async function sendToDB({newPost}){
    console.log(newPost)
    await fetch(`http://localhost:5000/post/add`, {
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => {
            if(data.acknowledged === true){                    
                window.confirm("Posted Successfully. Refresh to see the new post");
            } else{
              window.confirm("Error Occured. Check the console");
              console.log(data);
            }
        });
  };

  const addPost = () => {
    var newPost = {
      postId: posts.length+1,
      desc: "",
      photo: "",
      date: "1 min ago",
      userId: currentUser.userId,
      like: 0,
      comment: 0,
      comments: [],
    }
    console.log("clicked")
    newPost.desc = document.getElementById("desc").value;
    newPost.photo = document.getElementById("photo").value;

    console.log("newPost",newPost)
    if( newPost.desc!== "" && newPost.photo!==""){
      sendToDB(newPost={newPost});
    } else {
      window.alert("Please enter the details");
    }
  }

  return (
      <div onLoad={onLoad}>
        { loggedIn &&
          <>
          <Topbar currentUser={currentUser} showProfile={showProfile} setshowProfile={setshowProfile}/>
          <main className="main">
            
            <div className="Sidebar">
              <Sidebar Users={users} showProfile={showProfile} setshowProfile={setshowProfile} showPostInput={showPostInput} setshowPostInput={setshowPostInput}/>
            </div>
            {
              (!showProfile) && 
              <>
                <div className="Feed">
                  <Feed currentUser={currentUser} Users={users} Posts={posts}/>
                </div>
                <div className="Rightbar">
                  <Rightbar Users={users} currentUser={currentUser} requests={requests} setrequests={setrequests}/>
                </div>
              </>
            }
            {
              (showProfile) &&
              <div className="Profile">
                <Profile profileUser={profileUser} setprofileUser={setprofileUser} Posts={posts} Users={users}/>
              </div>
            }
          </main>
          {
            (showPostInput) && 
            <div className="PostInputContainer">
              <div className="PostInputForm">
                <div className="PostInputClose"><span>POST</span><Cancel className='PostInputCloseButton' onClick={()=>{setshowPostInput(false)}}/></div>
                <div className='InputContainer'>
                  <span className="Label">Description</span>
                  <input id="desc" type="text" placeholder='Description' />
                </div>
                <div className='InputContainer'>
                  <span className="Label">Photo</span>
                  <input id="photo" type="text" placeholder='Photo Address' />
                </div>
                <div className="submitButtonContainer">
                  <button className="submitButton" onClick={()=>{addPost()}}>Post</button>
                </div>
              </div>
            </div>
          }
          </>
        }
      </div>
  )
}

export default Home