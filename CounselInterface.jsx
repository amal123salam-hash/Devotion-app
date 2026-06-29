// src/components/CounselInterface.jsx
import React, { useState, useEffect } from 'react';
import { generateCounsel, speakCounsel } from '../services/counselService';

const CounselInterface = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'jesus', text: "Peace be with you. What burdens your heart today? Speak freely, and I shall give you counsel." }
  ]);

  // Essential for Web Speech API initialization quirks in some browsers
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to log
    const userMessage = { sender: 'user', text: input };
    setChatLog(prev => [...prev, userMessage]);

    // Generate Jesus' response
    const counselResult = generateCounsel(input);
    
    const jesusMessage = { sender: 'jesus', text: counselResult.fullText };
    
    // Slight delay to mimic thinking/processing rhythm
    setTimeout(() => {
      setChatLog(prev => [...prev, jesusMessage]);
      speakCounsel(counselResult.fullText);
    }, 600);

    setInput('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <div style={styles.header}>
          <h2>Divine Counsel</h2>
          <p>Speak, for He is listening...</p>
        </div>
        
        <div style={styles.messagesContainer}>
          {chatLog.map((msg, index) => (
            <div 
              key={index} 
              style={{
                ...styles.messageBubble,
                ...(msg.sender === 'jesus' ? styles.jesusBubble : styles.userBubble)
              }}
            >
              <strong>{msg.sender === 'jesus' ? 'Christ' : 'You'}:</strong>
              <p style={{ margin: '5px 0 0 0' }}>{msg.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your worries, questions or feelings here..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Seek Counsel</button>
        </form>
      </div>
    </div>
  );
};

// Simple embedded styling for instant deployment
const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' },
  chatBox: { width: '100%', maxWidth: '600px', border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
  header: { backgroundColor: '#2c3e50', color: 'white', padding: '15px', textAlign: 'center' },
  messagesContainer: { height: '400px', overflowY: 'auto', padding: '20px', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '15px' },
  messageBubble: { padding: '12px 16px', borderRadius: '15px', maxWidth: '80%', lineHeight: '1.4' },
  jesusBubble: { backgroundColor: '#fff', border: '1px solid #e0d0b0', alignSelf: 'flex-start', color: '#4a3b32' },
  userBubble: { backgroundColor: '#3498db', color: 'white', alignSelf: 'flex-end' },
  form: { display: 'flex', borderTop: '1px solid #ddd' },
  input: { flex: 1, padding: '15px', border: 'none', outline: 'none', fontSize: '16px' },
  button: { padding: '0 25px', backgroundColor: '#e74c3c', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }
};

export default CounselInterface;