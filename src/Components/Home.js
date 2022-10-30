import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

const Home = ({guest}) => {
    return (
        <div >
        <h2 className='welcome-header'>Welcome Home</h2>
        {guest ? <h2 className = "welcome-home">You are logged in as user: {guest.username}</h2> : null}
        {guest.messages ? <h2 className='message-inbox'>Messages:  {guest.messages.map((item)=> {return <div className='indi-message-in-inbox'><div className="message-sender">From: {item.fromUser.username} </div><div className='message-content'>Message: {item.content}</div></div>})}</h2> : null }
        </div>
    )
}

export default Home;