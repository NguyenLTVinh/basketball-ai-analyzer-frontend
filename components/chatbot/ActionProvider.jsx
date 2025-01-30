class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    async fetchBotResponse(userMessage) {
      try {
        const response = await fetch("http://127.0.0.1:8000/chatbot/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        });
  
        const data = await response.json();
        const botMessage = data.response || "I couldn't process your request. Please try again.";
  
        this.updateChatbotState(this.createChatBotMessage(botMessage));
      } catch (error) {
        this.updateChatbotState(this.createChatBotMessage("Error reaching the chatbot service. Try again later."));
      }
    }
  
    updateChatbotState(message) {
      this.setState(prevState => ({
        ...prevState,
        messages: [...prevState.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  