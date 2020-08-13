import React, { forwardRef } from "react";
import './App.css';

const Message = forwardRef(({ username, message }, ref) => {
    const isUser = username === message.username;
    return (
        <div ref={ref}>
            <div className={`messages ${isUser && 'userMessage'}`}>
                <div className={isUser ? 'userMsg' : 'guestMsg'}>
                    <span className="username">{!isUser && `${message.username || 'Unknown User'}: `}</span> {message.messages} <span className="msgTime"> {message.msgTime}</span>
                </div>
            </div>
        </div>
    )
})

export default Message