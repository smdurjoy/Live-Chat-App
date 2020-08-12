import React, { forwardRef } from "react";
import './App.css';

const Message = forwardRef(({ username, message }, ref) => {
    const isUser = username === message.username;
    return (
        <div ref={ref}>
            <div className={`messages ${isUser && 'userMessage'}`}>
                <div className={isUser ? 'userMsg' : 'guestMsg'}>
                    {!isUser && `${message.username || 'Unknown User'}: `} {message.messages}
                </div>
            </div>
        </div>
    )
})

export default Message