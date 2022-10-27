import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import {Posts, Register, LogIn, Logout, Home} from './Components/index';
import { fetchPosts } from './api/Requests.js';




const App = () => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  useEffect( ()=> {
    const getPosts = async () => {
      const {error, posts_value} = await fetchPosts();
    if (error) {
      console.error(error);
    }
    console.log("posts_value", posts_value);
    setPosts(posts_value);};
    console.log("got to getPosts() call");
    getPosts();
  }, [])
  // make the nav bar then make the rest of the UI.
  // use router to show the appropriate view
  // NAV BAR on top >> login component shows below nav bar upon first load >> posts in center below nav bar and home component>>
  // Home message 
  // vvvv THIS IS A PLACEHOLDER TO ENSURE INDIVIDUAL COMPONENTS DISPLAY PROPERLY vvvv//

    //return <> <inline><Logout setToken= {setToken}></Logout><Register setToken={setToken}></Register><LogIn setToken={setToken}></LogIn></inline><Posts posts={posts}> </Posts></>
    // ^^^ delete after line below is complete
    return(
      <BrowserRouter>
      <div id = "container">
        <div id = "nav-bar">
          <Link to ="/Home">Home</Link>
          <Link to = "/Posts">Posts</Link>
          <Link to = "/LogIn">Login</Link>


        </div>
      <div id = "main-section">
      <Route path = "/Login">
        <LogIn setToken = {setToken}></LogIn>
        <div>Not a user? Register Below: </div>
        <Register setToken={setToken}></Register>
        </Route>
        <Route path = "/Posts">
          <Posts posts= {posts}></Posts>
        </Route>
        <Route path = "/Home">
          { token ? <>
          <Logout setToken={setToken}></Logout>
          <Home></Home>
          <div>Placeholder for createPosts</div> </>: null}
          <Posts posts = {posts}></Posts>
        </Route>
    </div>
    </div>
    </BrowserRouter>)
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);