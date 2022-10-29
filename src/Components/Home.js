import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';

const Home = ({guest}) => {
    return (
        <div className = "welcome-home">
        <h1 >Welcome to Strangers' Things</h1>
        {guest ? <h2 >You are logged in as user: {guest.username}</h2> : null}
        {guest.messages ? <h2 className='message-inbox'>Messages:  {guest.messages.map((item)=> {return <><div className="message-sender">From: {item.fromUser.username} </div><div className='message-content'>Message: {item.content}</div></>})}</h2> : null }
        </div>
    )
}

export default Home;