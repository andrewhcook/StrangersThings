import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Switch, Link} from "react-router-dom";
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
  // vvvv THIS IS A PLACEHOLDER TO ENSURE INDIVIDUAL COMPONENTS DISPLAY PROPERLY vvvv//
  return <> <inline><Logout setToken= {setToken}></Logout><Register setToken={setToken}></Register><LogIn setToken={setToken}></LogIn></inline><Posts posts={posts}> </Posts></>
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);