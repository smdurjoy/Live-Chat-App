import React, {useEffect, useState} from 'react';
import './App.css';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Message from "./Message";
import Container from "@material-ui/core/Container";

function App() {
  const [ input, setInput ] = useState('');
  const [ messages, setMessages ] = useState([
      {username: 'durjoy', message: 'hello'},
      {username: 'Yoo', message: 'hi'},
  ]);
  const [ username, setUsername ] = useState('');

  useEffect( () => {
    setUsername(prompt('Please enter your name !'))
  }, [])

  const sendMessage = (event) => {
      event.preventDefault();
      setMessages([...messages, { username: username, message: input }]);
      setInput('');
  }
  return (
    <Container className="App">
      <h1 className="title">Welcome to dJes liveChat</h1>
        <h2>Hello {username}</h2>

        {
            messages.map(message => (
                <Message username ={username} message ={message}/>
            ))
        }

        <div className="yoo">
            <form>
                <div className="sendMsgBox">
                    <input placeholder="Enter a message" value={input} onChange={e => setInput(e.target.value)}/>
                    <Button type="submit" variant="contained" color="primary" onClick={sendMessage}>
                        Send
                    </Button>
                </div>
            </form>
        </div>
    </Container>
  );
}

export default App;
