import { createChatBotMessage } from "react-chatbot-kit";
 
const config = {
    botName: "Game Analyzer",
    initialMessages: [createChatBotMessage(`Hello, I'm your game analyzer. Please upload a video to start analysis.`)],
    customStyles: {
        botMessageBox: {
          backgroundColor: "#376B7E",
        },
        chatButton: {
          backgroundColor: "#376B7E",
        },
    }
}

export default config
