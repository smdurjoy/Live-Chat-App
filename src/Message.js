import React from "react";
import './App.css';

function Message({ username, message }) {
    const isUser = username === message.username;
    return (
        <div>
            <div className={`messages ${isUser && 'userMessage'}`}>
                <div className={isUser ? 'userMsg' : 'guestMsg'}>
                    {message.username}: {message.message}
                </div>
            </div>
        </div>
    )
}

export default Message