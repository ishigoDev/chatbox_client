import React, { useEffect, useState, useRef } from 'react'
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
import socketClient from 'socket.io-client'
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
  useEffect(() => {
    allUsers().then((resp) => {
      setUsers(resp.data.users)
    })
    socket.current = socketClient('localhost:4000', {
      transports: ['websocket'],
      withCredentials: true,
    })
    socket.current.emit('new-user-add', getUserId())
    socket.current.on('get-users', (users) => {
      const onlineUsers = users.filter((user) => {
        return user.id !== getUserId()
      })
      setActiveUsers(onlineUsers)
    })
  }, [])
  useEffect(() => {
    if (sendSocketMessage) {
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
      })
    }
  }, [activeChat])
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      socket.current.emit('typing', { typing: true, receiverId: receiverId })
    }, 100)
    const delay = setTimeout(() => {
      socket.current.emit('typing', { typing: false, receiverId: receiverId })
    }, 800)
    socket.current.on('typing-user', (typing) => {
      setTypingState(typing)
    })
    return () => {
      clearTimeout(delayDebounceFn)
      clearTimeout(delay)
    }
  }, [message])
  const loadChat = (id) => {
    const activeUser = users.filter((user) => {
      return user.id == id
    })
    setActiveChat(activeUser)
  }
  const sendMessageEvent = () => {
    if (message !== '') {
      sendMessage(receiverId, message)
        .then((response) => {
          setActiveChatRoom([...activeChatRoom, response?.data?.message])
          setSendSocketMessage({
            activeChatRoom: [...activeChatRoom, response?.data?.message],
            receiverId: receiverId,
          })
          if (response?.data?.status == 200) setMessage('')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  //scroll to last message
  useEffect(() => {
    scrollToEnd?.current?.scrollIntoView({ behaviour: 'smooth' })
  }, [activeChatRoom])
  return (
    <Grid container style={{ height: '86vH' }}>
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
                    ) : null}
                  </div>
                </div>
                <div className="active-room">
                  {activeChatRoom.length !== 0
                    ? activeChatRoom.map((x) => {
                        return (
                          <div
                            ref={scrollToEnd}
                            className={`chatmessage-box ${
                              x.sender_id === getUserId()
                                ? 'active-user-2'
                                : 'active-user-1'
                            }`}
                            key={x.id}
                          >
                            {x.message}
                            <div style={{ marginTop: '10px' }}>
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
      <Grid item xs={6} md={2} className="chatroom">
        <ActiveUser activeUsers={activeUsers} />
      </Grid>
    </Grid>
  )
}

export default ChatRoom
