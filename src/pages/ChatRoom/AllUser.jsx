import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search'
import CBSearch from '../../components/Search/CBSearch'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Grid, Typography, TextField } from '@mui/material'

function AllUser({users,...props}) {
  const [allusers,setAllUsers]= useState([]);
  const [searchText,setsearchText] = useState('');
  const search = (e)=>{
    setsearchText(e.target.value.toLowerCase());
  }
  useEffect(()=>{
    if(users.length > 0 ){
      setAllUsers(users);
    }
  },[users])
  useEffect(()=>{    
    if(searchText !== '' && searchText.length > 3){ 
        setAllUsers(users) 
        const searchItem = users?.filter((item)=>{ return item?.displayName?.toLowerCase()?.trim()?.includes(searchText?.toLowerCase().trim() )});
        setAllUsers(searchItem)        
    }else{
      setAllUsers(users) 
    }
  },[searchText])
  return (
    <>
        <div className="user-chat-search-bar">
          <CBSearch className="user-chat-search" icon={<SearchIcon />} onChange={search} />
        </div>
        <div className="user-chat-list-card">
          {
            allusers.length > 0  ? allusers.map((user,index)=>{
              return <div key={index}>
                <AccountCircleIcon style={{ fontSize: '40px' }} />
                <Typography variant="h6" style={{ marginLeft: '12px' }}>
                  {user.displayName}
                </Typography>
              </div>
            }): (<div>
              <Typography variant="h6" style={{ marginLeft: '12px' }}>
                No User Found 
              </Typography>
            </div>)            
          }
        </div>
    </>
  )
}

export default AllUser