import { useState } from "react";
import styles from "./chat.module.css";
import Button from "../Button/Button";

const Chat = () => {
  const [messages, setMessages] = useState([
    { text: "Hola en que puedo ayudarte?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };
  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatBox}>
        <div className={styles.chatMessages}>
          {messages.map((message, index) => (
            <div key={index}>
              <li className={styles.message}>
                <h4 className={`${styles[message.sender]} `}>
                  {message.sender === "bot" ? "GPT" : "Tu"}
                </h4>
                <p
                  className={`${styles.chatMessage} ${styles[message.sender]}`}
                >
                  {message.text}
                </p>
              </li>
            </div>
          ))}
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
          />
          <Button className={styles.sendButton} action={sendMessage} name={"Send"} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
