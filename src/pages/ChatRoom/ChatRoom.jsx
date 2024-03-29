import React, { useEffect, useState, useRef, useContext } from 'react'
import { Grid, Typography } from '@mui/material'
import './chatroom.css'
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes'
import AllUser from './AllUser'
import ActiveUser from './ActiveUser'
import { allUsers, fetchChat, sendMessage } from '../../axios/chatroom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import CBButton from '../../components/CBButton/CBButton'
import CBLoader from '../../components/CBLoader/CBLoader'
import SendIcon from '@mui/icons-material/Send'
import { getUserId } from '../../utils/localStorage'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { SocketContext } from '../../utils/socket'
import { DoDecrypt, DoEncrypt } from '../../utils/encrpytion'
import { getLastSeen } from 'last-seen-ago'
import moment from 'moment'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeToken } from '../../utils/localStorage'
function ChatRoom() {
  const [activeChat, setActiveChat] = useState('')
  const [activeChatRoom, setActiveChatRoom] = useState([])
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeUsers, setActiveUsers] = useState([])
  const [sendSocketMessage, setSendSocketMessage] = useState(null)
  const [typingState, setTypingState] = useState(false)
  const socket = useRef()
  const scrollToEnd = useRef()
  const receiverId = activeChat[0]?.id
  const socketInit = useContext(SocketContext)
  useEffect(() => {
    allUsers().then((resp) => {
      setUsers(resp.data.users)
    })
    .catch(err=>{
      errorfun(err);
    })
    socket.current = socketInit
    socket.current.emit('new-user-add', getUserId())
    socket.current.on('get-users', (users) => {
      const onlineUsers = users.filter((user) => {
        return user.id !== getUserId()
      })
      setActiveUsers(onlineUsers)
    })
  }, [])
  useEffect(() => {
    socket.current.on('user-created-data', (data) => {
      setUsers([...users, data])
    })
  }, [users])
  useEffect(() => {
    if (sendSocketMessage) {
      socket.current.emit('typing', { typing: false, receiverId: receiverId })
      socket.current.emit('send-message', sendSocketMessage)
      setSendSocketMessage(null)
    }
  }, [sendSocketMessage])
  useEffect(() => {
    socket.current.on('receive-message', (message) => {
      setActiveChatRoom(message)
    })
  }, [activeChatRoom])
  useEffect(() => {
    setLoading(true)
    if (receiverId) {
      fetchChat(receiverId).then((resp) => {
        setActiveChatRoom(resp.data.message)
        setLoading(false)
      }).catch(err =>{
        errorfun(err);
      })
    }
  }, [activeChat])
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      socket.current.emit('typing', { typing: true, receiverId: receiverId })
    }, 100)
    const delay = setTimeout(() => {
      socket.current.emit('typing', { typing: false, receiverId: receiverId })
    }, 300)
    socket.current.on('typing-user', (typing) => {
      setTypingState(typing)
    })
    return () => {
      clearTimeout(delayDebounceFn)
      clearTimeout(delay)
    }
  }, [message])
  const errorfun = (e) =>{
    if(e.response.data.statusCode == 403){
      toast(e.response.data.message)
      setTimeout(()=>{
        removeToken();
        window.location = '/login'
      },2200)        
      }else{
        toast(err.response.data.message)
      }       
  }
  const loadChat = (id) => {
    const activeUser = users.filter((user) => {
      return user.id == id
    })
    setActiveChat(activeUser)
  }
  const sendMessageEvent = () => {
    if (message !== '') {
      sendMessage(receiverId, DoEncrypt(message))
        .then((response) => {
          setActiveChatRoom([...activeChatRoom, response?.data?.message])
          setSendSocketMessage({
            activeChatRoom: [...activeChatRoom, response?.data?.message],
            receiverId: receiverId,
          })
          if (response?.data?.status == 200) setMessage('')
        })
        .catch((err) => {
          errorfun(err);   
        })
    }
  }
  //scroll to last message
  useEffect(() => {
    scrollToEnd?.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [activeChatRoom])
  return (
    <Grid container style={{ height: '86vH' }}>
      <Grid item xs={4} sm={4} md={3} className="chatroom user-chat-list">
        <AllUser
          users={users}
          loadChat={loadChat}
          activeUserChat={activeChat}
        />
      </Grid>
      <Grid
        item
        xs={8}
        sm={8}
        md={7}
        className="chatroom chatroom-message-containter"
      >
        {activeChat.length === 0 ? (
          <div className="welcome-page-chatroom">
            <div className="chat-message">
              <SpeakerNotesIcon className="chatroom-msg-icon" />
              <Typography variant="h4">Welcome to ChatRoom</Typography>
            </div>
          </div>
        ) : (
          <div
            className={`active-user-chatroom ${
              loading ? 'chat-loader-active' : ''
            }`}
          >
            {loading ? (
              <div>
                <CBLoader />
              </div>
            ) : (
              <>
                <div className="user-details">
                  <AccountCircleIcon
                    style={{ fontSize: '48px', marginLeft: '20px' }}
                  />
                  <div>
                    <Typography variant="h6" className="user-active-name">
                      {activeChat[0].displayName}
                    </Typography>
                    {activeUsers.some(
                      (activeUser) => activeUser.id === receiverId,
                    ) ? (
                      typingState ? (
                        <Typography
                          variant="caption"
                          className="user-active-name"
                        >
                          Typing...
                        </Typography>
                      ) : (
                        <Typography
                          variant="caption"
                          className="user-active-name"
                        >
                          Online
                        </Typography>
                      )
                    ) : activeChat[0].last_seen ? (
                      <Typography
                        variant="caption"
                        className="user-active-name"
                      >
                        {`Last seen ${getLastSeen(
                          moment(activeChat[0].last_seen).unix(),
                        )}`}
                      </Typography>
                    ) : null}
                  </div>
                </div>
                <div className="active-room">
                  {activeChatRoom.length !== 0
                    ? activeChatRoom.map((x) => {
                        return (
                          <div
                            className={`${
                              x.sender_id === getUserId()
                                ? 'active-user-parent-2'
                                : 'active-user-parent-1'
                            }`}
                          >
                            <div
                              ref={scrollToEnd}
                              className={`chatmessage-box ${
                                x.sender_id === getUserId()
                                  ? 'active-user-2'
                                  : 'active-user-1'
                              }`}
                              key={x.id}
                            >
                              <Typography variant="body2">
                                {DoDecrypt(x.message)}
                              </Typography>
                              <div style={{ textAlign:'right', marginTop: '6px' }}>
                                <Typography
                                  variant="caption"
                                  style={{
                                    color: 'rgba(0,0,0,0.5)',
                                    fontSize: '10px',
                                  }}
                                >
                                  {format(x.created_at)}
                                </Typography>
                              </div>
                              <div
                                id={`${
                                  x.sender_id === getUserId()
                                    ? 'pointer-sender'
                                    : 'pointer-receiver'
                                }`}
                              ></div>
                            </div>
                          </div>
                        )
                      })
                    : null}
                </div>
                <div className="message-text-area">
                  <InputEmoji
                    value={message}
                    onChange={(text) => setMessage(text)}
                    cleanOnEnter
                    onEnter={sendMessageEvent}
                    placeholder="Type a message"
                    fontFamily={'Inter Tight'}
                    borderColor="orange"
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
      <Grid
        item
        sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}
        sm={{ display: 'none' }}
        md={2}
        className="chatroom"
      >
        <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
        />
        <ActiveUser activeUsers={activeUsers} />
      </Grid>
    </Grid>
  )
}

export default ChatRoom