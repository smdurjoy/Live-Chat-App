import React, {useEffect, useState} from 'react';
import './App.css';
import Message from "./Message";
import Container from "@material-ui/core/Container";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from 'react-flip-move';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const [ input, setInput ] = useState('');
  const [ messages, setMessages ] = useState([]);
  const [ username, setUsername ] = useState('');

  useEffect(() => {
      db.collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => {
              setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}) ))
      })
  }, []);

  useEffect( () => {
    setUsername(prompt('Enter your existing name or new name to chat.'))
  }, [])

  const sendMessage = (event) => {
      event.preventDefault();

      db.collection('messages').add({
          messages: input,
          username: username,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput('');
  }
  return (
      <Container className="App">
        <div className="topSection">
            <h1 className="title">Welcome to dJes liveChat {username}</h1>
        </div>

          <div className="msgSection">
              <FlipMove>
                  {
                      messages.map(({ id, message }) => (
                          <Message key={id} username={username} message={message}/>
                      ))
                  }
              </FlipMove>
          </div>

          <div className="bottomSection">
              <form className="sendMsgBox">
                  <TextareaAutosize
                      rowsMin={3}
                      rowsMax={4}
                      placeholder="Enter a message .."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      className="msgInput"
                  />
                  <IconButton disabled={!input} type="submit" variant="contained" color="primary" onClick={sendMessage} className="sendIcon">
                      <SendIcon/>
                  </IconButton>
              </form>
          </div>
      </Container>
  );
}

export default App;
