import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faComments, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function ChatbotComponent() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const back = process.env.REACT_APP_BACKEND_LOCAL;
  // Update the appointment link if needed
  const appointmentLink = process.env.REACT_APP_BOOKING_URL; 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      setMessages([{ sender: "bot", text: "Hi, would you like to ask about your symptoms or book an appointment?" }]);
    }
  }, [isChatOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (inputMessage.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: inputMessage },
    ]);

    try {
      if (inputMessage.toLowerCase().includes("appointment")) {
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text:` You can book your appointment by clicking <Link href="${appointmentLink}" rel="noopener noreferrer">Appointment Link</Link>` },
          ]);
        }, 1000);
      } else {
        // Updated URL to point to .NET backend
        //const response = await axios.post(${process.env.REACT_APP_BACKEND_URL}/chatbot/get_bot_response, { message: inputMessage });
        const response = await axios.post(`${back}/api/v0.1/Chatbot/get_bot_response`, { message: inputMessage });

        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: response.data.response },
          ]);
        }, 1000);
      }

      setInputMessage("");
    } catch (error) {
      console.error("Axios error:", error);
    }
  }; 


  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const renderBotMessage = (text) => {
    if (text === "Yes, you can book an appointment.") {
      return (
        <span>
        Please click on 
        <Link to="/patientBookAppointment" style={{ color: "blue", textDecoration: "underline" }}>
          Appointment Link
        </Link>{" "}
        to book your appointment.
      </span>
      
      );
    } else if (text.includes("Appointment Link")) {
      return (
        <span>
  Please click on 
  <Link to="/patientBookAppointment" style={{ color: "blue", textDecoration: "underline" }}>
    Appointment Link
  </Link>{" "}
  to book your appointment.
</span>

      );
    } else {
      return <span>{text}</span>;
    }
  };

  return (
    <>
      {!isChatOpen && (
        <button style={{
          ...styles.chatbotToggle,
          backgroundColor: '#0D3154', 
          borderRadius: '50%', 
          padding: '15px', 
          border: 'none', // Optional: removes button border if not needed
        }} onClick={() => setIsChatOpen(true)}>
          <FontAwesomeIcon icon={faComments} style={{ color: 'white',   fontSize: '1.5rem' }} /> 
        </button>
      )}

      {isChatOpen && (
        <div style={styles.chatContainer}>
          <div style={styles.chatHeader}>
          <span style={styles.chatTitle}>Chatbot</span>
          <button style={styles.closeButton} onClick={() => setIsChatOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <hr style={styles.separatorLine} />
          <div style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                style={
                  message.sender === "user" ? styles.userMessage : styles.botMessage
                }
              >
                <small>{message.sender === "user" ? "You" : "Chatbot"}</small>
                <div>
                  {message.sender === "bot" ? renderBotMessage(message.text) : message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputContainer}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={handleKeyPress}
              style={styles.inputField}
            />
            <button onClick={sendMessage} style={styles.sendButton}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "400px",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    position: "fixed",
    bottom: "70px",
    right: "20px",
    backgroundColor: "white",
    zIndex: 1000,
  },
  messagesContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    marginBottom: "10px",
  },
  
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#004080", 
    color: "white",
    borderRadius: "15px",
    padding: "10px",
    margin: "5px",
    maxWidth: "70%", 
    wordWrap: "break-word",
    textAlign: "left",             
    marginRight: "10px",    
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    borderRadius: "15px",
    padding: "10px",
    margin: "5px",
    maxWidth: "80%", 
    wordWrap: "break-word",
  },
  inputContainer: {
    display: "flex",
  },
  inputField: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "15px",
    marginRight: "10px",
  },
  sendButton: {
    padding: "10px 15px",
    backgroundColor: "#004080",
    color: "white",
    border: "none",
    borderRadius: "12px", 
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    width: "40px", 
    height: "40px",
    transition: "background-color 0.3s ease",
  },
  chatbotToggle: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#007bff",
    color: "white",
    padding: "15px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 1000,
    fontSize: "22px",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#ffffff",
    color: "black",
    borderRadius: "10px 10px 0 0", 
    width: "100%",
    boxSizing: "border-box", 
  },
  chatTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "transparent",
    color: "grey",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  separatorLine: {
    border: "none",
    borderTop: "1px solid #ccc", 
    margin: "0 0 10px 0",
  },
};

export default ChatbotComponent;
