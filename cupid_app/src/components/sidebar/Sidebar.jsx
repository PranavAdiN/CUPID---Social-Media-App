import React from "react"
import "./sidebar.css"
import {RssFeed, ChatOutlined, Group, School, Today, WorkOutlineOutlined, AccountCircle, Description, Person} from "@material-ui/icons"
import User from "../user/User"
// import { Users } from "../../dummyData"

function Sidebar({Users, showProfile, setshowProfile, showPostInput, setshowPostInput}) {
  return (
    <div className="SidebarContainer">
      <div className="sidebarLinks">
        <ul className="sidebarLinkItems">
          <li className="sidebarLinkItem" onClick={()=>{setshowProfile(false)}}>
            <div className="linkIcon"><RssFeed/></div>
            <div className="linkName">Feed</div>
          </li>
          <li className="sidebarLinkItem" onClick={()=>{setshowProfile(true)}}>
            <div className="linkIcon"><AccountCircle/></div>
            <div className="linkName">Profile</div>
          </li>
          <li className="sidebarLinkItem">
            <div className="linkIcon"><ChatOutlined/></div>
            <div className="linkName">Chats</div>
          </li>
          <li className="sidebarLinkItem" onClick={()=>{setshowPostInput(!showPostInput)}}>
            <div className="linkIcon"><Description/></div>
            <div className="linkName">Post</div>
          </li>
          <li className="sidebarLinkItem">
            <div className="linkIcon"><Group/></div>
            <div className="linkName">Followers</div>
          </li>
          <li className="sidebarLinkItem">
            <div className="linkIcon"><Person/></div>
            <div className="linkName">Following</div>
          </li>
          <li className="sidebarLinkItem">
            <div className="linkIcon"><WorkOutlineOutlined/></div>
            <div className="linkName">Jobs</div>
          </li>
          <li className="sidebarLinkItem">
            <div className="linkIcon"><Today/></div>
            <div className="linkName">Events</div>
          </li>
          <li className="sidebarLinkItem">
            <div className="linkIcon"><School/></div>
            <div className="linkName">Courses</div>
          </li>
        </ul>
      </div>


      {/* <Rightbar Users={Users} forSidebar={true}/> */}
      <div className="sidebarfollowers">
        <ul className="sidebarfollowersList">

          {Users.map((user)=>(
            <li className="followerListItem" key={user.userId}>
              <User key={user.userId} user={user}/>
            </li>
          ))}
        </ul>
      </div>

      {/* <Ad/> */}
      {/* <div className="followers">
        <ul className="followersList">

          {Users.map((user)=>(
            <li className="followerListItem">
              <User key={user.id} user={user}/>
            </li>
          ))}
        </ul>
      </div> */}

    </div>
  )
}

export default Sidebar