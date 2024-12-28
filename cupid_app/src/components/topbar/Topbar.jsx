import React from "react"
// import { useNavigate } from "react-router-dom"
import "./topbar.css"
import {Search, Notifications, Chat, Menu} from "@material-ui/icons"

function Topbar({currentUser, showProfile, setshowProfile}) {
  return (
    <div className="topbarContainer">
        <div className="topbarLeft">
            <span className="topbarLogo">
              <a href="/" className="topbarLogoLink">
                Cupid
              </a>
            </span>
        </div>

        <div className="topbarCenter">
          <div className="searchBar">
            <Search className="searchBarIcon"/>
            <input placeholder="search" className="searchBarInput" />
          </div>
        </div>
        
        <div className="topbarRight">
          <div className="topbarRightContainer">
            <Notifications className="topbarIcons"/>
            <Chat className="topbarIcons"/>
            <img src={currentUser.profilePicture} alt={currentUser.username} className="topbarIcons profile" title={currentUser.username} onClick={()=>{setshowProfile(!showProfile)}}/>
          </div>
          <div className="mobileMenu">
            <Menu className="menuButton"/>
          </div>
        </div>
    </div>
  )
}

export default Topbar