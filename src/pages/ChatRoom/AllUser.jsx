import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography , Link } from "@mui/material";
import CBSearch from "../../components/Search/CBSearch";

function AllUser({ users , loadChat , activeUserChat}) {
  const [allusers, setAllUsers] = useState([]);
  const [searchText, setsearchText] = useState("");
  const search = (e) => {
    setsearchText(e.target.value.toLowerCase());
  };
  useEffect(() => {
    if (users?.length > 0) {
      setAllUsers(users);
    }
  }, [users]);
  useEffect(() => {
    if (searchText !== "" && searchText.length > 3) {
      setAllUsers(users);
      const searchItem = users?.filter((item) => item?.displayName?.toLowerCase()?.trim()?.includes(searchText?.toLowerCase().trim()));
      setAllUsers(searchItem);
    } else {
      setAllUsers(users);
    }
  }, [searchText]);  
  return (
    <>
      <div className="user-chat-search-bar">
        <CBSearch className="user-chat-search" icon={<SearchIcon />} onChange={search} />
      </div>
      <div className="user-chat-list-card">
        {
          allusers.length > 0 ? allusers.map((user, index) => (
            <Link key={index+user.id} className={`user-list-title ${user.id === activeUserChat[0]?.id ?'active-user-chat':null}`} onClick={()=>{loadChat(user.id)}} role="presentation">
              <AccountCircleIcon style={{ fontSize: "40px" }} />
              <Typography variant="h6" style={{ marginLeft: "12px" }}>
                {user.displayName}
              </Typography>
            </Link>
          )) : (
            <div>
              <Typography variant="h6" style={{ marginLeft: "12px" }}>
                  No User Found
              </Typography>
            </div>
          )
        }
      </div>
    </>
  );
}

export default AllUser;
