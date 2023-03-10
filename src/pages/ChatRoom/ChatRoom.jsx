import React, { useEffect, useState } from "react"
import { Grid, Typography } from "@mui/material"
import "./chatroom.css"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import AllUser from "./AllUser"
import ActiveUser from "./ActiveUser"
import { allUsers, fetchChat, sendMessage } from "../../axios/chatroom"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import CBTextField from "../../components/CBTextField/CBTextField"
import CBButton from "../../components/CBButton/CBButton"
import CBLoader from "../../components/CBLoader/CBLoader"
import SendIcon from "@mui/icons-material/Send"
import { getUserId } from "../../utils/localStorage"

function ChatRoom() {
  const [activeChat, setActiveChat] = useState("")
  const [activeChatRoom, setActiveChatRoom] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    allUsers().then((resp) => {
      setUsers(resp.data.users)
    })
  }, [])
  useEffect(() => {
    setLoading(true)
    if (activeChat[0]?.id) {
      fetchChat(activeChat[0]?.id).then((resp) => {
        setActiveChatRoom(resp.data.message)
        setLoading(false)
      })
    }
  }, [activeChat])
  const loadChat = (id) => {
    const activeUser = users.filter((user) => {
      return user.id == id
    })
    setActiveChat(activeUser)
  }
  const sendMessageEvent = ()=>{    
    if(message !== ""){     
      sendMessage(activeChat[0]?.id,message).then((response)=>{
        if(response?.data?.status  == 200)
          setMessage("");        
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
  return (
    <Grid container style={{ height: "86vH" }}>
      <Grid item xs={6} md={3} className="chatroom user-chat-list">
        <AllUser users={users} loadChat={loadChat} />
      </Grid>
      <Grid item xs={6} md={7} className="chatroom chatroom-message-containter">
        {activeChat.length === 0 ? (
          <div className="welcome-page-chatroom">
            <div className="chat-message">
              <SpeakerNotesIcon className="chatroom-msg-icon" />
              <Typography variant="h4">Welcome to ChatRoom</Typography>
            </div>
          </div>
        ) : (
          <div className={`active-user-chatroom ${loading ? "chat-loader-active":""}`}>
            {loading ? (
              <div>
                <CBLoader/>
              </div>
            ) : (
              <>
                <div className="user-details">
                  <AccountCircleIcon
                    style={{ fontSize: "40px", marginLeft: "20px" }}
                  />
                  <Typography variant="h6" className="user-active-name">
                    {activeChat[0].displayName}
                  </Typography>
                </div>
                <div className="active-room">
                  {activeChatRoom.length !==0 ? activeChatRoom.map((x)=>{                    
                  return ( 
                    <div className={`chatmessage-box ${x.sender_id === getUserId() ? 'active-user-2':'active-user-1'}`} key={x.id}>
                      {x.message}
                      <div id={`${x.sender_id === getUserId() ? 'pointer-sender':'pointer-receiver'}`}></div>
                    </div>
                    )                  
                  }                    
                  ) : null}
                </div>
                <div className="message-text-area">
                  <CBTextField
                    variant="outlined"
                    required
                    size="small"
                    value={message}
                    style={{
                      width: "90%",
                      backgroundColor: "#ffb7005e",
                      color: "#ffff !important",
                    }}
                    onChange={(e)=>{setMessage(e.target.value)}}
                    onKeyPress={(event) => {              
                      if (event.charCode == '13'){
                        sendMessageEvent()     
                      }
                    }
                  }
                  />
                  <CBButton
                    variant="text"
                    size="small"
                    className="send-message"
                    onClick={sendMessageEvent}                    
                  >
                    <SendIcon />
                  </CBButton>
                </div>
              </>
            )}
          </div>
        )}
      </Grid>
      <Grid item xs={6} md={2} className="chatroom">
        <ActiveUser />
      </Grid>
    </Grid>
  )
}

export default ChatRoom
