import React, { Component } from 'react'
import axios from 'axios'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Like from '@mui/icons-material/ThumbUpAltOutlined';
import Dislike from '@mui/icons-material/ThumbDownAltOutlined';
import Delete from '@mui/icons-material/DeleteOutlineOutlined';

export class Userposts extends Component {
    constructor(props) {
        super(props)
        let token = localStorage.getItem("token")
        this.state = {
             list:[],
             name:token
        }
    }
    
    componentDidMount()
    {
        axios.get(`http://localhost:8080/posts/${this.state.name}`) 
        .then(res=>{
            console.log("response data",res.data);
            this.setState({list: res.data});
        })
        .catch(error=>{
            console.log(error);
        })
    }

    setId(id,event){
        console.log(id)
        const JSON = {
            id:id
        };
        axios
        .post('http://localhost:8080/delete', JSON)
        .then(response => {
            console.log("Data from backend", response.data);
        })
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
               <h1 style={{padding:"30px"}}>Your Posts</h1>
               <div>
                    {
                        list.map(post=>
                            <Paper elevation={5} sx={{width:"70%",margin:"10px auto",textAlign:"justify",padding:"10px"}}>
                                <div style={{display:"flex"}}><Avatar {...stringAvatar(post.name)} /><div style={{paddingTop:"7px",paddingLeft:"7px",fontWeight:"bold"}}>{post.name.toUpperCase()}</div></div>
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
                                            <div style={{display:"flex"}}><Avatar {...stringAvatar(post.name)} sx={{ width: 27, height: 27,margin:"10px"}}/><div style={{paddingTop:"10px",fontWeight:"bold"}}>{x.name.toUpperCase()}</div></div>             
                                            <div style={{paddingTop:"5px",fontsize:"10px"}}>{x.comment}</div>
                                            </Paper>
                                        )
                                    }
                                </Typography>
                                </AccordionDetails>
                            </Accordion>
                            <div style={{display:"flex"}}>
                                <Like style={{margin:"5px"}}/>
                                <div style={{width:"10px",margin:"5px"}}>{post.likes}</div>
                                <Dislike style={{margin:"5px"}}/>
                                <div style={{width:"10px",margin:"5px"}}>{post.dislikes}</div>
                                <button style={{border:"none"}} onClick={(event)=> this.setId(post._id,event)} > <Delete style={{margin:"5px"}}/> </button>
                            </div>
                            </Paper>
                        )
                    }
               </div>
            </div>
        )
    }
}

export default Userposts
