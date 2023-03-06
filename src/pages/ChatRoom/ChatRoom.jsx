import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import "./chatroom.css";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import AllUser from "./AllUser";
import ActiveUser from "./ActiveUser";
import { allUsers } from "../../axios/chatroom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CBTextField from "../../components/CBTextField/CBTextField";
import CBButton from "../../components/CBButton/CBButton";
import SendIcon from "@mui/icons-material/Send";

function ChatRoom() {
  const [activeChat , setActiveChat] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    allUsers().then((resp) => {
      setUsers(resp.data.users);
    });
  },[]);
  const loadChat = (id)=>{
    const activeUser = users.filter((user)=>{
      return user.id == id;
    })
    setActiveChat(activeUser);
  }

  return (
    <Grid container style={{height:"86vH"}}>
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
        ):(
          <div className="active-user-chatroom">
            <div className="user-details">
              <AccountCircleIcon style={{ fontSize: "40px" , marginLeft:"20px" }} />
              <Typography variant="h6" className="user-active-name">{activeChat[0].displayName}</Typography>
            </div>
            <div className="active-room">
              <div className="chatmessage-box active-user-1">
              sdfsdfjs
                <div id="pointer-receiver"></div>
              </div>
              <div className="chatmessage-box active-user-2">
              sdfsdf3
                <div id="pointer-sender"></div>
              </div>            
            </div>
            <div className="message-text-area">
              
              <CBTextField
                variant="outlined"
                required
                size="small"
                style={{width:"90%",backgroundColor:"#ffb7005e",color:"#ffff !important"}}
              />              
              <CBButton variant="text" size="small" className="send-message" >
                <SendIcon/>
              </CBButton>
            </div>
          </div>
        )}        
      </Grid>
      <Grid item xs={6} md={2} className="chatroom">
        <ActiveUser />
      </Grid>
    </Grid>
  );
}

export default ChatRoom;
