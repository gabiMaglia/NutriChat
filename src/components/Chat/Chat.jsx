import { useState } from 'react';
import styles from './chat.module.css'; 

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
    }
  };



  
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        <div className={styles.chatMessages}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.chatMessage} ${styles[message.sender]}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
