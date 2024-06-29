import Chat from "../components/Chat/Chat";

const ChatbotPage = () => {
    const name = 'Gabriel'
  return (
    <>
      <div>Soy el ChatbotPage</div>
      <Chat name={name}></Chat>
    </>
  );
};

export default ChatbotPage;
