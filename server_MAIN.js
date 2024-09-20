const { GoogleGenerativeAI } = require('@google/generative-ai');
const readline = require('readline');
require('dotenv').config();
// Hardcoded API Key
const API_KEY = 'AIzaSyA9QYS4NC7T1O1ExKkXkeZK8044_I8sZ10'; 
const genAI = new GoogleGenerativeAI(API_KEY);

// Function to generate a response from the chatbot
async function getChatbotResponse(prompt) {
  try {
    // Generate response using GEMINI API
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Generate the content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('jarvis:', text);
  } catch (error) {
    console.error('Error generating response:', error);
  }
}



// This is terminal Related this is realted to our
// Set up readline to capture input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('You can start chatting now. Type "exit" to end the chat.');

function promptUser() {
  rl.question('Aradhy: ', async (input) => {
    if (input.toLowerCase() === 'exit') {
      rl.close();
      return;
    }
    
    // Construct the prompt for the chatbot
    const prompt = `User: ${input}\nChatbot:`;
    
    await getChatbotResponse(prompt);
    
    // Continue the chat
    promptUser();
  });
}

// Start the chat
promptUser();



