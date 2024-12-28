import React from 'react'

function Request({currentUser, requestUser, requests, setrequests}) {

    async function followUser(){
        // console.log(currentUser);
        // console.log(requestUser);
        console.log("clicked")
        const newCurrentUser = { ...currentUser, following: currentUser.following.concat(requestUser.userId)}
        const newRequestUser = { ...requestUser, followers: requestUser.followers.concat(currentUser.userId)}
        await fetch(`http://localhost:5000/user_update/${newCurrentUser["_id"]}`, {
                method: 'POST',
                body: JSON.stringify(newCurrentUser),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => {
                if(data.acknowledged === true && data.modifiedCount > 0){                    
                    window.confirm("Follow Requested Accepted"); 
                    const record = requests.filter((r)=>r.sender_id === requestUser.userId)[0];
                    console.log(record)
                    async function deleteRequest(){
                        await fetch('http://localhost:5000/friend_requests_delete/', {
                            method: 'POST',
                            body: JSON.stringify(record),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        })
                        .then(res => res.json())
                        .then(data => {console.log(data)})
                    }
                    deleteRequest();
                }
            });
        

    };
  return (
    <div className="requestContainer">
    <div className="requestContainerLeft">
        <div className="requestUserProfile">
            <img src={requestUser.profilePicture} alt="profilePhoto" className="requestUserImage" />
            <div className="requestOnlineBadge"></div>
        </div>
    </div>
    <div className="requestContainerRight">
        <div className="requestUserName">{requestUser.username}</div>
        <div className="requestFriend" onClick={followUser}><span>follow back</span></div>
    </div>
    </div>
  )
}

export default Request