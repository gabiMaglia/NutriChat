import { useEffect, useState, useRef } from "react";
import styles from "./chat.module.css";
import Button from "../Button/Button";
import { CreateMLCEngine } from "@mlc-ai/web-llm";

const Chat = () => {
  const scrollRef = useRef(null);
  const [messages, setMessages] = useState([
    { text: "Hola en que puedo ayudarte?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [engine, setEngine] = useState(false);
//   const [engine, setEngine] = useState({engine : false, loading: false});
  const [ip, setIp] = useState('');
  

  const initProgressCallback = (initProgress) => {
    console.log(initProgress)
    setIp(initProgress.text);
  };
  const selectedModel = "TinyLlama-1.1B-Chat-v0.4-q4f32_1-MLC";

  useEffect(() => {
    const createEngine = async () => {
      const engine = await CreateMLCEngine(
        selectedModel,
        { initProgressCallback: initProgressCallback } // engineConfig
      );
      setEngine(engine);
    };
    !engine && createEngine();
  }, [engine]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    console.log(input)
    if (input.trim()) {
      setMessages(prevMessages => [...prevMessages, { text: input, sender: "user" }]);
      setInput("");

     const reply = await engine.chat.completions.create({
        messages: [
            ...messages, {
                role: 'user',
                content: input
            }
        ]
     })

     console.log(reply)
        // addMessage('te cache', 'bot');
  
    }
  };

  const addMessage = (text, sender) => {
    setMessages(prevMessages => [...prevMessages, { text, sender }]);
  };

//   console.log(object)

  return (
    <div  className={styles.chatContainer}>
      <div  className={styles.chatBox}>
        <div ref={scrollRef} className={styles.chatMessages}>
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
          <Button
            className={styles.sendButton}
            action={sendMessage}
            name={"Send"}
          />
        </div>
          <small className={styles.small}>{ip}</small>
      </div>
    </div>
  );
};

export default Chat;
