import React, {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function Profile() {
    const { name } = useParams()
    const [user, setUser] = useState({})
    const [friends,setFriends] = useState([])
    const [image,setImage] = useState("")
    useEffect(()=>{
        getData()
    },{})
    const getData = ()=>
    {
        axios.get(`http://localhost:8080/profile/${name}`) 
        .then(res=>{
            console.log("response data",res.data);
            const data = res.data
            const friendList = res.data.friends
            setUser(data)
            setFriends(friendList)
            setImage(res.data.image)
        })
        .catch(error=>{
            console.log(error);
        })
    }
    const addfriend = ()=>
    {
        const name = localStorage.getItem("token")
        if(name)  //this means only logged in user can add friend
        {
            if(user.name!=name){             // to make sure that the logeed in user doesnot makes himself his friend
            var formJSON = {
                name: name,
                friendName:user.name
            };
            console.log(formJSON)
            axios
            .post('http://localhost:8080/addfriend', formJSON)
            .then(response => {
                console.log("Data from backend", response.data);
            }).catch(error => {
                console.log(error)
            })
            }
        }else{
            alert(`Login to add ${name} to your FriendList`)
        }
    }
    return (
            <Paper elevation={5} sx={{width:"80%",margin:"auto",padding:"20px"}}>
                {/* <PersonOutlineIcon style={{height:"30%",width:"30%"}}/> */}
                <img src={image} style={{height:"30%",width:"30%",borderRadius:"50%"}}/>
                <h1 style={{fontFamily:'Pacifico'}}>{user.name}</h1>

                <Paper elevation={2} sx={{width:"60%",textAlign:"justify",margin:"auto",padding:"10px"}}>
                <div><b>Email: </b>{user.email}</div>
                <div><b>Contact No.: </b>{user.contact}</div>
                <div><b>Date Of Birth: </b>{user.DOB}</div>
                <div><b>Bio: </b>{user.bio}</div>
                <div style={{display:"flex"}}>
                <div><b>Friends: </b></div>
                {friends.map((friend) => {
                    return (<div style={{marginLeft:"4px"}}>{friend.name}</div>); 
                })}
                </div>
                </Paper>

                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = {`/friendposts/${user.name}`}>View Posts</Link> </Button>                 
                <Button variant="outlined" style={{width:"20%",margin:"20px"}} onClick={addfriend}>Add To FriendList</Button>
            </Paper>
    )
}

export default Profile

