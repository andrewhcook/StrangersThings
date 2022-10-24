import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {Posts, Login} from './Components/index';
import { fetchPosts } from './api/Requests.js';




const App = () => {
  const [posts, setPosts] = useState([]);
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
  return <> <Login></Login><Posts posts={posts}> </Posts></>

};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);