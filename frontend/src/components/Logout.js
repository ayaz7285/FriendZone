import React, { Component } from 'react'
import Paper from '@mui/material/Paper'

export class Logout extends Component {
    constructor(props) {
        super(props)
        const token = localStorage.removeItem("token")
    }
    
    render() {
        return (
            <div>
                <Paper elevation={5} sx={{width:"80%",height:"82vh",padding:"30px",margin:"auto"}}>
                    <h1 style={{fontSize:"70px",margin:"20px",fontFamily:'Pacifico'}}>You have been Logged out</h1>
                    <h2 style={{margin:"20px",fontFamily:"cursive"}}>Please Login to continue</h2>
                    <img src="logout.png"/>
                </Paper>
            </div>
        )
    }
}

export default Logout