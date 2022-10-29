import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {Posts, Register, LogIn, Logout, Home, CreatePostForm} from './Components/index';
import { fetchPosts, fetchUser } from './api/Requests.js';




const App = () => {
  const [reloadItem, setReloadItem] = useState(false);
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const [user,setUser] = useState({});
  useEffect( ()=> {
    const getPosts = async (token) => {
      const {error, posts_value} = await fetchPosts(token);
    if (error) {
      console.error(error);
    }
    setPosts(posts_value.reverse());};
    const getUser = async (token) => {
      console.log("got to getUser() call");
      const {error, userResponse} = await fetchUser(token);
      console.log("userResponse:", userResponse);
      if (error) {
        console.error(error);
      }
      setUser(userResponse);
    };
    getUser(token);
    console.log("user:", user);
    getPosts(token);
  },[reloadItem])
  //  x make the nav bar then make the rest of the UI.
  // x use router to show the appropriate view
  // add a Profile view upon login which displays messages
  // NAV BAR on top >> login component shows below nav bar upon first load >> posts in center below nav bar and home component>>
  // Home message 
  
    return(
      <BrowserRouter>
      <div id = "container">
        <div id = "nav-bar">
          <Link to ="/Home">Home</Link>
          <Link to = "/Posts">Posts</Link>
         {token ? <Logout setToken={setToken}></Logout> : <Link to = "/LogIn">Login/Register</Link>} 


        </div>
        <h2 className='logo'>Strangers' Things</h2>
      <div id = "main-section">
      <Route path = "/Login">
        <LogIn setToken = {setToken} setUser = {setUser} reloadItem = {reloadItem} setReloadItem = {setReloadItem}></LogIn>
        <div>Not a user? Register Below: </div>
        <Register setToken={setToken} reloadItem = {reloadItem} setReloadItem = {setReloadItem}></Register>
        </Route>
        <Route path = "/Posts">
        <Posts posts = {posts} token = {token} setPosts = {setPosts} reloadItem = {reloadItem} setReloadItem = {setReloadItem}></Posts>
        </Route>
        <Route path = "/Home">
          { token ? <>
          <Home guest = {user}></Home>
          <aside><CreatePostForm token = {token} setPosts = {setPosts} posts = {posts} reloadItem = {reloadItem} setReloadItem = {setReloadItem}></CreatePostForm></aside> </>: null}
          // placeholder for Messages and specific user info //
          <Posts posts = {posts} token = {token} setPosts = {setPosts} reloadItem = {reloadItem} setReloadItem = {setReloadItem}></Posts>
        </Route>
    </div>
    </div>
    </BrowserRouter>)
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);