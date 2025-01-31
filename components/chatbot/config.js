import { createChatBotMessage } from "react-chatbot-kit";
 
const config = {
    botName: "Game Analyzer",
    initialMessages: [createChatBotMessage(`Hello, I'm your game analyzer. Please upload a video to start analysis.`)],
    customStyles: {
        botMessageBox: {
          backgroundColor: "#0a0a0a",
        },
        chatButton: {
          backgroundColor: "#0a0a0a",
        },
    }
}

export default config
