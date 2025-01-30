class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(message)
      this.actionProvider.fetchBotResponse(message);
    }
  }
  
export default MessageParser;
