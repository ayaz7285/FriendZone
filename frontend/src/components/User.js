import React, { Component } from 'react'
import {Navigate,Link} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import axios from 'axios'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import bg from '../images/bg2.jpg'

export class User extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        console.log("token",token)
        let loggedIn = true
        let name = token
        if(token === null)
        {
            alert("Login to see your profile")
            loggedIn=false
        }
        this.state = {
             loggedIn,
             name,
             user:{},
             pp:"http://localhost:8080/user.png",
             image:null,
             friends:[]
        }
    }
    
    setImage = (event)=>{
        this.setState({image:event.target.files[0]})
        console.log(event.target.files[0])
    }

    upload = ()=>{
        var fd = new FormData()
        fd.append("name",this.state.name)
        fd.append("pp",this.state.image)
        axios.post("http://localhost:8080/upload",fd)
        .then(res=>console.log(res.data))
    }

    componentDidMount()
    {
        axios.get(`http://localhost:8080/profile/${this.state.name}`) 
        .then(res=>{
            console.log("response data",res.data);
            this.setState({user: res.data});
            this.setState({friends: res.data.friends});
            this.setState({pp:res.data.image})
            console.log("friends",this.state.friends)
        })
        .catch(error=>{
            console.log(error);
        })
    }

    render() {
        if(this.state.loggedIn == false){
            return <Navigate to = "/login"></Navigate>
        }
        const {user} = this.state
        const {friends} = this.state
        return (
            <div style={{backgroundImage:`url(${bg})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",padding:"10px"}}>
                <Paper elevation={5} sx={{width:"80%",margin:"auto",padding:"20px"}}>
                <img src={this.state.pp} style={{height:"30%",width:"30%",borderRadius:"50%"}}/>
                {/* <PersonOutlineIcon style={{height:"30%",width:"30%"}}/> */}
                {/* <h1>Hello {this.state.name}</h1> */}
                <div style={{width:"fit-content",height:"fit-content",margin:"auto",padding:"4px",border:"1px solid gray",display:"flex"}}>
                    <input type="file" style={{marginTop:"3px"}} onChange={this.setImage}/> 
                    <Button variant="outlined" onClick={this.upload} >Upload Profile Pic</Button>
                </div>
                <h1 style={{fontFamily:'Pacifico',margin:"5px"}}>Your Profile</h1>
                <Paper elevation={2} sx={{width:"60%",textAlign:"justify",margin:"auto",padding:"10px"}}>
                <div><b>Name: </b> {user.name} </div>
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

                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = "/userposts">Your Posts</Link> </Button>
                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = "/addpost">Create New Post</Link> </Button>
                <Button variant="outlined" style={{width:"20%",margin:"20px"}}><Link to = "/logout">Logout</Link> </Button>
                </Paper>
            </div>
        )
    }
}

export default User