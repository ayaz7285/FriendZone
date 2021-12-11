import * as React from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { Component } from 'react'

class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            contact:"",
            errorContactNo:false,
            errorContactNoMessage:"",
            password:"", 
            error:false,
            errorMessage:"",
            username:"",
            email:"",
            DOB:"",
            bio:"",
            successmessage: "",
            errorMessage: ""
        }
    }
    enterUsername = (event) =>{
        this.setState({
            username:event.target.value
        })
    }
    enterEmail = (event) =>{
        this.setState({
            email:event.target.value
        })
    }
    enterDOB = (event) =>{
        this.setState({
            DOB:event.target.value
        })
    }
    enterbio = (event) =>{
        this.setState({
            bio:event.target.value
        })
    }
    validatePassword = (event)=>{
        const password = event.target.value;
        var error = this.state.error;
        var errorMessage = this.state.errorMessage;
        this.setState({password:password});
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
        let valid = regex.test(password);
        if(valid==false)
        {
            error=true;
            errorMessage="enter correct password";
        }
        else
        {
            error=false;
            errorMessage="";
        }
        this.setState({password:password})
        this.setState({error:error});
        this.setState({errorMessage:errorMessage});
    }

    validateContactNo = (event)=>{
        const contactNo = event.target.value;
        var errorContactNo = this.state.error;
        var errorContactNoMessage = this.state.errorContactNoMessage;
        this.setState({contactNo:contactNo});
        if(contactNo.length!=10)
        {
            errorContactNo=true;
            errorContactNoMessage="enter correct contact no.";
        }
        else
        {
            errorContactNo=false;
            errorContactNoMessage="";
        }
        this.setState({contact:contactNo})
        this.setState({errorContactNo:errorContactNo});
        this.setState({errorContactNoMessage:errorContactNoMessage});
    }

    addUser = () => {
        var formJSON = {
            name: this.state.username,
            email: this.state.email,
            password: this.state.password,
            contact: this.state.contact,
            DOB: this.state.DOB,
            bio:this.state.bio
        };
        console.log(formJSON)
        axios
        .post('http://localhost:8080/register', formJSON)
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
            <form style={{border:"2px solid black",borderRadius:"4px",width:"40%",height:"fit-content" ,margin:"auto",backgroundColor:"white"}} onSubmit = {this.handleSubmit}>
                <h2 style={{marginTop:"15px",marginBottom:"15px"}}>Register</h2>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    style={{width:"90%"}}
                    name="username"
                    value={this.state.username} 
                    onChange= {this.enterUsername}
                    />
                </div>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    required
                    id="outlined-email-required"
                    label="Email"
                    type="email"
                    style={{width:"90%"}}
                    value={this.state.email} 
                    onChange= {this.enterEmail}
                    />
                </div>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    required
                    error={this.state.error}
                    helperText={this.state.errorMessage}
                    id="outlined-password-required"
                    label="Password"
                    type="password"
                    style={{width:"90%"}}
                    value={this.state.password}
                    onChange={this.validatePassword}
                    />
                </div>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    required
                    error={this.state.errorContactNo}
                    helperText={this.state.errorContactNoMessage}
                    id="outlined-required"
                    label="Contact No."
                    style={{width:"90%"}}
                    value={this.state.contact}
                    onChange={this.validateContactNo}
                    />
                </div>
                <div style={{marginTop:"10px",marginBottom:"10px"}}>
                    <TextField
                    required
                    id="outlined-DOB-required"
                    label="Date of Birth"
                    type="text"
                    style={{width:"90%"}}
                    value={this.state.DOB} 
                    onChange= {this.enterDOB}
                    />
                </div>
                <TextField
                id="outlined-multiline-static"
                label="Bio"
                multiline
                rows={4}
                style={{width:"90%"}}
                value={this.state.bio} 
                onChange= {this.enterbio}
                />

                <div style={{marginTop:"13px",marginBottom:"13px"}}>
                    <button className="btn btn-primary" type="submit" style={{width:"90%"}} onClick= {this.addUser}>Register</button>
                </div>
                <p>{this.state.successmessage}</p>
                <p>{this.state.errorMessage}</p>
            </form>
            
            </Box>
        )
    }
}

export default Register