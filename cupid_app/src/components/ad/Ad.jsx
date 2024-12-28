import React from "react"
import "./ad.css"

function Ad() {
  return (
    <div className="adBanner">
        <img src="assets/ad.png" alt="Ad" className="adImage"/>
        <p className="adLabel">Ad</p>
      </div>
  )
}

export default Ad