import React, {useState, useEffect} from 'react';
import { DeletePost, SendMessage } from "../api/Requests";

const post = (itemInfo, token, reloadItem, setReloadItem, message, setMessage) => {
    return itemInfo.isAuthor ?  <><div className="post">
    <div className="post-item"> Post: {itemInfo.title}</div>
    <div className="post-item">Author: {itemInfo.author.username} (You)</div>
    <div className="post-item">Price: {itemInfo.price}</div>
    <div className="post-item">Location: {itemInfo.location}</div>
    <div className= "post-item description">Description: {itemInfo.description}</div>
    <div className="post-item messages">Messages: {itemInfo.messages}</div>
    <button className="post-item delete-post" onClick={async() =>{DeletePost(token, itemInfo._id);
    setReloadItem(!reloadItem)}}>Delete Post</button>
</div> </>: <><div className="post">
        <div className="post-item"> Post: {itemInfo.title}</div>
        <div className="post-item">Author: {itemInfo.author.username}</div>
        <div className="post-item">Price: {itemInfo.price}</div>
        <div className="post-item">Location: {itemInfo.location}</div>
        <div className= "post-item description">Description: {itemInfo.description}</div>
        {token ? <form onSubmit = {async () => {SendMessage(token,itemInfo._id, message);
        setReloadItem(!reloadItem);}}>
            <input type = "text" onChange = {()=> {setMessage(message)}}></input> <button > Send Message </button> </form>: null}
    </div> </>
    }


const Posts =  (props) => {


    const [message, setMessage] = useState("");
    const response = props.posts;
    const token = props.token;
    const reloadItem = props.reloadItem;
    const setReloadItem = props.setReloadItem;
    console.log(response);
    
    return <div className="posts"> {
        response.map((item)=> {return post(item, token, reloadItem, setReloadItem, message, setMessage)})
    }</div>


}

export default Posts

