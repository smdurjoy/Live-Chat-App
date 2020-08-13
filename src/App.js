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
import WhatshotIcon from '@material-ui/icons/Whatshot';

function App() {
    const [ input, setInput ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ username, setUsername ] = useState('');
    const [ loader, setLoader ] = useState('');

    useEffect(() => {
      db.collection('messages')
          .orderBy('timestamp', 'desc')
          .onSnapshot(snapshot => {
              setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}) ))
              setLoader('')
      })
    }, []);

    useEffect( () => {
      setUsername(prompt('Enter your existing name or new name to chat.'))
    }, [])

    useEffect( () => {
      setLoader('Loading ...')
    }, [])

    const formatDate = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear() + " at " + strTime;
    }

    const sendMessage = (event) => {
        event.preventDefault();
        const d = new Date();
        const msgTime = formatDate(d);

        db.collection('messages').add({
            messages: input,
            username: username,
            msgTime: msgTime,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }
    return (
        <Container className="App">
        <div className="topSection">
            <h1 className="title">Welcome to dJes liveChat <WhatshotIcon/></h1>
            <div className="intro">
                <p className="helpMsg">Hello { username ? username : 'Unknown User'}</p>
                <p className="helloUser">Recent chats on top</p>
            </div>
        </div>

          <div className="msgSection">
              <FlipMove>
                  {
                      messages.map(({ id, message }) => (
                          <Message key={id} username={username} message={message}/>
                      ))
                  }
              </FlipMove>
              <p className="loading">{loader}</p>
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
