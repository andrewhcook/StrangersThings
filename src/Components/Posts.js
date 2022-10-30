import React, {useState, useEffect} from 'react';
import { DeletePost, SendMessage } from "../api/Requests";

const post = (itemInfo, token, reloadItem, setReloadItem, message, setMessage) => {
  //console.log(token);
    return itemInfo.isAuthor ?  <><div className="post">
    <div className="post-item"> Post: {itemInfo.title}</div>
    <div className="post-item">Author: {itemInfo.author.username} (You)</div>
    <div className="post-item">Price: {itemInfo.price}</div>
    <div className="post-item">Location: {itemInfo.location}</div>
    <div className= "post-item description">Description: {itemInfo.description}</div>
    <div className="post-item messages">  Messages:{itemInfo.messages ? <>{itemInfo.messages.map((item)=> {return <div className="message-on-posting">User: {item.fromUser.username} writes: {item.content}</div>})}</>: null}</div>
    <button className="delete-post" onClick={async() =>{DeletePost(token, itemInfo._id);
    setReloadItem(!reloadItem)}}>Delete Post</button>
</div> </>: <><div className="post">
        <div className="post-item"> Post: {itemInfo.title}</div>
        <div className="post-item">Author: {itemInfo.author.username}</div>
        <div className="post-item">Price: {itemInfo.price}</div>
        <div className="post-item">Location: {itemInfo.location}</div>
        <div className= "post-item description">Description: {itemInfo.description}</div>
        {token ? <form onSubmit = {async () => {SendMessage(token,itemInfo._id, message);
        }}>
            <input type = "text" onChange = {(event)=> {setMessage(event.target.value)}}></input> <button type = "submit"> Send Message </button> </form>: null}
    </div> </>
    }




const searchForm = (searchTerm, setSearchTerm) => {
    

  return <input  type="text" placeholder='Search'  value = {searchTerm}  onChange = {(event)=> {
    setSearchTerm(event.target.value);}}></input>
}

const Posts =  (props) => {


    const [message, setMessage] = useState("");
    const response = props.posts;
    const token = props.token;
    const reloadItem = props.reloadItem;
    const setReloadItem = props.setReloadItem;
    console.log(response);

    const [searchTerm, setSearchTerm] = useState("");

    function postMatches(post, text) {
        // return true if any of the fields you want to check against include the text
        // strings have an .includes() method 
        if (!text) {
          return true 
        }
        if (post.title.includes(text)) {
          return true
        }
        if (post.description.includes(text)) {
            return true
          }
        if (post.price.includes(text)) {
        return true
          }
        if (post.author.username.includes(text)) {
        return true
        }
        return false
      }
      function truthytest(searchValue, posts){
        if (searchValue === "") {return true}
        if (searchValue !== "" && !posts) {
          return false
        }
        return true
      }
      const filteredPosts = response.filter(post => postMatches(post, searchTerm));
    return  truthytest(searchTerm, filteredPosts) ? <><div> {searchForm(searchTerm,setSearchTerm)} </div><div className='posts'> {filteredPosts.map((item) => { return post(item, token, reloadItem, setReloadItem, message, setMessage); })}</div></>: <><div> {searchForm(searchTerm, setSearchTerm)} </div><div className = "no-results-error">No Search Results Found</div></>


}

export default Posts

