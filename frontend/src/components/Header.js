// import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';

// class Header extends Component {

//   render() {
//     return (
//       <div>
//         <Navbar style={{backgroundColor:"#757bc8"}} expand="lg">
//              <Container fluid>
//                <Navbar.Brand><Link to="/" style={{color:"white",textDecoration:"none",fontWeight:"bold"}}>FriendZone</Link></Navbar.Brand>
//                 <Button variant="outline-success" style={{color:"white",borderColor:"white"}}>
//                     <Link to={`/user`} style={{textDecoration:"none",color:"white"}}>Your Profile</Link>
//                 </Button>
//                 <Button variant="outline-success" style={{color:"white",borderColor:"white"}}>
//                     <Link to={`/login`} style={{textDecoration:"none",color:"white"}}>Login</Link>
//                 </Button>
//             </Container>
//         </Navbar>
//       </div>
//     )
//   }
// }

// export default Header

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'
import Login from '@mui/icons-material/Login';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: "center",justifyContent:"space-between",textAlign: 'center' ,backgroundColor:"#5e60ce",height:"8vh"}} className="container-fluid">
        <h3 style={{fontFamily:"cursive"}}><Link to="/" style={{color:"white",textDecoration:"none",fontWeight:"bold",fontFamily:'Permanent Marker'}}>FriendZone</Link></h3>
        <Tooltip title="Account settings" style={{padding:"5px"}}>
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> <Link to={`/user`} style={{textDecoration:"none",color:"black"}}>Your Account</Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Login fontSize="small" />
          </ListItemIcon>
          <Link to={`/login`} style={{textDecoration:"none",color:"black"}}>Login</Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link to={`/logout`} style={{textDecoration:"none",color:"black"}}>Logout</Link>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
