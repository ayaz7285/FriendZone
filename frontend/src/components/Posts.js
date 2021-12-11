import React, { Component } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar';
import Like from '@mui/icons-material/ThumbUpAltOutlined';
import Dislike from '@mui/icons-material/ThumbDownAltOutlined';
import {Link} from 'react-router-dom'

export class Posts extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             list:[],
             comment:""
        }
    }
    
    componentDidMount()
    {
        axios.get(`http://localhost:8080/posts`) 
        .then(res=>{
            console.log("response data",res.data);
            this.setState({list: res.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }
    updateLike(id,event){
        let name = localStorage.getItem("token")
        if(name)
        {
            let likes=1
            let dislikes=0
            const JSON = {
                id:id,
                likes:likes,
                dislikes:dislikes
            }
            axios
            .post('http://localhost:8080/like_dislike', JSON)
            .then(response => {
                console.log("Likes Updated", response.data);
            })
        }else{
            alert("Login to like the post")
        }
    }
    updateDislike(id,event){
        let name = localStorage.getItem("token")
        if(name)
        {
            let likes=0
            let dislikes=1
            const JSON = {
                id:id,
                likes:likes,
                dislikes:dislikes
            }
            axios
            .post('http://localhost:8080/like_dislike', JSON)
            .then(response => {
                console.log("Likes Updated", response.data);
            })
        }else{
            alert("Login to dislike the post")
        }
    }

    setComment = (event)=>{
        this.setState({comment:event.target.value})
        console.log(this.state.comment)
    }

    addComment(id,event){
        let name = localStorage.getItem("token")
        if(name)
        {
            var JSON = {
                id:id,
                name:name,
                info:this.state.comment
            }
            console.log(JSON)
            axios
            .post('http://localhost:8080/addcomment', JSON)
            .then(response => {
                console.log("Data from backend", response.data);
            })
        }else{
            alert("Login to add comment")
        }
    }

    render() {

        function stringToColor(string) {
            let hash = 0;
            let i;
            for (i = 0; i < string.length; i += 1) {
              hash = string.charCodeAt(i) + ((hash << 5) - hash);
            }
          
            let color = '#';
          
            for (i = 0; i < 3; i += 1) {
              const value = (hash >> (i * 8)) & 0xff;
              color += `00${value.toString(16)}`.substr(-2);
            }
            return color;
          }
          function stringAvatar(name) {
            return {
              sx: {
                bgcolor: stringToColor(name),
              },
              children: `${name[0].toUpperCase()}`,
            };
          }


        const {list} = this.state
        return (
            <div>
               <h1 style={{padding:"10px",backgroundColor:"white",width:"fit-content",borderRadius:"5px",margin:"20px auto",fontFamily:'Lobster Two'}}>See what your friends are discussing</h1>
               <div>
                    {
                        list.map(post=>
                            <Paper elevation={5} sx={{width:"70%",margin:"10px auto",textAlign:"justify",padding:"10px"}}>
                                <div style={{display:"flex"}}><Avatar {...stringAvatar(post.name)} /><div style={{paddingTop:"7px",paddingLeft:"7px",fontWeight:"bold"}}>  <Link to={`/profile/${post.name}`} style={{color:"black",textDecoration:"none"}}>   {post.name.toUpperCase()} </Link>   </div></div>
                                <Paper elevation={3} style={{padding:"10px 10px",margin:"5px"}}>{post.info}</Paper>
                                <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography>Comments</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <Typography>
                                    {
                                        post.comments.map(x=>
                                            <Paper elevation={4} sx={{margin:"5px",padding:"5px"}}>
                                            <div style={{display:"flex"}}><Avatar {...stringAvatar(x.name)} sx={{ width: 27, height: 27,margin:"10px"}}/><div style={{paddingTop:"10px"}}> <Link to={`/profile/${x.name}`} style={{color:"black",textDecoration:"none"}}>  {x.name.toUpperCase()}  </Link>  </div></div>             
                                            <div style={{paddingTop:"5px",fontsize:"10px",paddingLeft:"10px"}}>{x.comment}</div>
                                            </Paper>
                                        )
                                    }
                                </Typography>
                                <form style={{display:"flex",marginTop:"10px",marginBottom:"5px"}}>
                                    <TextField
                                        id="outlined"
                                        label="Add your comment"
                                        style={{width:"90%",marginRight:"8px"}}
                                        name="comment"
                                        value={this.state.comment}
                                        onChange={this.setComment}
                                    />
                                    <Button variant="outlined" onClick={(event)=> this.addComment(post._id,event)}>Submit</Button>
                                </form>
                                </AccordionDetails>
                            </Accordion>
                            <div style={{display:"flex"}}>
                                <Like style={{margin:"5px"}} onClick={(event)=> this.updateLike(post._id,event)}/>
                                <div style={{width:"10px",margin:"5px"}}>{post.likes}</div>
                                <Dislike style={{margin:"5px"}} onClick={(event)=> this.updateDislike(post._id,event)}/>
                                <div style={{width:"10px",margin:"5px"}}>{post.dislikes}</div>
                            </div>
                            </Paper>
                        )
                    }
               </div>
            </div>
        )
    }
}

export default Posts
