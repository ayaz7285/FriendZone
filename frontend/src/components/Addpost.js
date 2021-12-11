import * as React from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Component } from 'react'

class Addpost extends Component {
    constructor(props) {
        super(props)
        
        const token = localStorage.getItem("token")

        this.state = {
            name:token,
            info:"",
            successmessage: "",
            errorMessage: ""
        }
    }
    
    enterinfo = (event) =>{
        this.setState({
            info:event.target.value
        })
    }
    
    addPost = () => {
        var formJSON = {
            name: this.state.name,
            info:this.state.info
        };
        console.log(formJSON)
        axios
        .post('http://localhost:8080/addpost', formJSON)
        .then(response => {
            this.setState({successmessage: response.data.message, errorMessage: ""})
            console.log("Data from backend", response.data);
        }).catch(error => {
            if(error.response){
                this.setState({successmessage: "", errorMessage: error.response.data.message})
            }else{
                this.setState({successmessage: "", errorMessage: error.message})
            }
        })
    }
    handleSubmit=(event)=>{
                // alert(`form submitted by ${this.state.username}`)
                console.log("username",this.state.username)
                event.preventDefault()
            }


    render() {
        return (
            <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            style={{margin:"5vh"}}
            >
            <form style={{border:"2px solid black",borderRadius:"4px",width:"70%",height:"fit-content" ,margin:"auto",backgroundColor:"white"}} onSubmit = {this.handleSubmit}>
                <h2 style={{marginTop:"15px",marginBottom:"15px"}}>Create New Post</h2>
                <TextField
                id="outlined-multiline-static"
                label="Your New Post"
                multiline
                rows={15}
                style={{width:"90%"}}
                value={this.state.info} 
                onChange= {this.enterinfo}
                />

                <div style={{marginTop:"13px",marginBottom:"13px"}}>
                    <button className="btn btn-primary" type="submit" style={{width:"90%"}} onClick= {this.addPost}>Submit Post</button>
                </div>
                <p>{this.state.successmessage}</p>
                <p>{this.state.errorMessage}</p>
            </form>
            
            </Box>
        )
    }
}

export default Addpost