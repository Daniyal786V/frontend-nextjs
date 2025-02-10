import React, { useState, useEffect } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import axios from '@/config/axios';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CustomerSupportChat = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [agentStatus, setAgentStatus] = useState('active');
  const [chatRoomId, setChatRoomId] = useState(null);
  const [error, setError] = useState(null);

  // Format timestamp
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Initialize chat when component opens
  useEffect(() => {
    if (isOpen && !chatRoomId) {
      initializeChat();
    }
  }, [isOpen]);

  // Load chat history when chatRoomId is available
  useEffect(() => {
    if (chatRoomId) {
      loadChatHistory();
      checkAgentStatus();
    }
  }, [chatRoomId]);

  const initializeChat = async () => {
    try {
      const response = await axios.post('/chat/initialize', { userId });
      console.log("chat room id ", response.data)
      setChatRoomId(response.data.chatRoomId);
    } catch (error) {
      setError('Failed to initialize chat. Please try again.');
      console.error('Chat initialization error:', error);
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await axios.get(`/chat/messages/${chatRoomId}`);
      console.log("chat history loaded", response.data)
      setMessages(response.data);
    } catch (error) {
      setError('Failed to load chat history.');
      console.error('Error loading chat history:', error);
    }
  };

  const checkAgentStatus = async () => {
    try {
      const response = await axios.get('/chat/status');
      setAgentStatus(response.data.status);
    } catch (error) {
      console.error('Error checking agent status:', error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !chatRoomId) return;

    const newMessage = {
      id: Date.now(),
      Content: message,
      sender: 'user',
      Timestamp: new Date(),
      chatRoomId
    };

    // Optimistically add message to UI
    setMessages(prev => [...prev, newMessage]);
    console.log(messages)
    setMessage('');

    try {
      // Send message to server
      await axios.post('/chat/message', {
        chatRoomId,
        content: message
      });
    } catch (error) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
      // Remove the message from UI if it failed to send
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-96 h-[500px] bg-white dark:bg-gray-900 rounded-lg shadow-xl flex flex-col border dark:border-gray-700">
          {/* Header */}
          <div className="p-4 bg-blue-600 dark:bg-gray-800 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Customer Support</h3>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                agentStatus === 'active' ? 'bg-green-400' : 'bg-yellow-400'
              }`} />
              <span className="text-sm">
                {agentStatus === 'active' ? 'Agent Online' : 'Agent Away'}
              </span>
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="m-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto dark:text-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-4 flex ${
                    !msg.IsAdminMessage  ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    !msg.IsAdminMessage ?
                      'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200'
                  }`}
                >
                  <p className="text-sm">{msg.Content}</p>
                  <p className="text-xs mt-1 opacity-75">{formatTime(msg.Timestamp)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                onClick={sendMessage}
                disabled={!chatRoomId}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupportChat;
