import React, { Component } from 'react'
import {AiFillInstagram} from 'react-icons/ai'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillLinkedin} from 'react-icons/ai'

class Home extends Component {
    render() {
        return (
            <div className="footer" style={{backgroundColor:"#caf0f8",bottom:"0",width:"100%",height:"fit-content"}}>
              <div className="container">
                <div className="contact us" style={{margin:"3px"}}>Contact Us : 8374104891</div>
                <div className="email" style={{margin:"3px"}}>Mail Us : ayaz.sarwar@gmail.com</div>
                <div className="follow" style={{margin:"3px"}}>Follow us on : 
                  <a href="https://www.instagram.com/" target="_blank" style={{textDecoration:"none",margin:"2px"}}><AiFillInstagram></AiFillInstagram></a>
                  <a href="https://www.facebook.com/" target="_blank" style={{textDecoration:"none",margin:"2px"}}> <AiFillFacebook></AiFillFacebook></a>
                  <a href="https://www.linkedin.com/in/ayaz-sarwar-68397a1b4/" target="_blank" style={{textDecoration:"none",margin:"2px"}}> <AiFillLinkedin></AiFillLinkedin></a>
                </div>
              </div>
            </div>
        )
    }
}

export default Home