import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Logout from './components/Logout'
import Profile from './components/Profile'
import Posts from './components/Posts'
import User from './components/User'
import Userposts from './components/Userposts';
import Addpost from './components/Addpost';
import Friendposts from './components/Friendposts';
import {Routes,Route} from 'react-router-dom'
import bg from './images/bg.jpg'

function App() {
  return (
    <div className="App" style={{backgroundImage:`url(${bg})`}}>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Posts/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/user" element={<User/>}></Route>
        <Route exact path="/logout" element={<Logout/>}></Route>
        <Route exact path="/userposts" element={<Userposts/>}></Route>
        <Route exact path="/friendposts/:name" element={<Friendposts/>}></Route>
        <Route exact path="/addpost" element={<Addpost/>}></Route>
        <Route exact path="/profile/:name" element={<Profile/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
