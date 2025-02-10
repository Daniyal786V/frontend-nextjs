import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import axios from '@/config/axios';

export const ChatPanel = () => {
  const [status, setStatus] = useState('active');
  const [pendingChats, setPendingChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPendingChats = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/admin/pending-chats');
      setPendingChats(data);
      setError(null);
    } catch (error) {
      setError('Error fetching chats: ' + error.message);
      console.error('Error fetching chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async () => {
    const newStatus = status === 'active' ? 'away' : 'active';
    try {
      await axios.put('/admin/status', { status: newStatus });
      setStatus(newStatus);
      setError(null);
    } catch (error) {
      setError('Error updating status: ' + error.message);
      console.error('Error updating status:', error);
    }
  };

  const fetchMessages = async (chatRoomId) => {
    try {
      const { data } = await axios.get(`/chat/messages/${chatRoomId}`);
      setMessages(data);
      setError(null);
    } catch (error) {
      setError('Error fetching messages: ' + error.message);
      console.error('Error fetching messages:', error);
    }
  };

  const selectChat = (chatRoomId) => {
    setSelectedChat(chatRoomId);
    fetchMessages(chatRoomId);
  };

  const sendResponse = async () => {
    if (!response.trim() || !selectedChat) return;

    try {
      await axios.post('/admin/respond', {
        chatRoomId: selectedChat,
        content: response,
      });
      setResponse('');
      fetchMessages(selectedChat);
      setError(null);
    } catch (error) {
      setError('Error sending response: ' + error.message);
      console.error('Error sending response:', error);
    }
  };

  useEffect(() => {
    fetchPendingChats();
    // Set up polling for new messages
    const interval = setInterval(fetchPendingChats, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="m-4 h-[calc(100vh-2rem)] flex flex-col">
      <CardHeader>
        <CardTitle>Chat Support</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex gap-4 p-4 h-full overflow-hidden">
        {/* Status and error alerts */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Sidebar with pending chats */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800 rounded-lg border dark:border-gray-700">
          <div className="p-4">
            <button
              onClick={toggleStatus}
              className={`w-full p-2 rounded-lg text-white transition-colors ${
                status === 'active' 
                  ? 'bg-blue-500 hover:bg-blue-600' 
                  : 'bg-yellow-500 hover:bg-yellow-600'
              }`}
            >
              Status: {status}
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(100%-4rem)]">
            {loading ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                Loading chats...
              </div>
            ) : pendingChats.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No pending chats
              </div>
            ) : (
              pendingChats.map((chat) => (
                <div
                  key={chat.ChatRoomId}
                  onClick={() => selectChat(chat.ChatRoomId)}
                  className={`p-4 border-b dark:border-gray-700 cursor-pointer 
                    hover:bg-gray-100 dark:hover:bg-gray-700 
                    transition-colors ${
                      selectedChat === chat.ChatRoomId 
                        ? 'bg-blue-50 dark:bg-gray-700' 
                        : ''
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare size={20} className="dark:text-gray-300" />
                    <span className="dark:text-gray-200">
                      User: {chat.UserName || chat.UserId}
                    </span>
                  </div>
                  {chat.UnreadCount > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 
                        text-red-800 dark:text-red-200 text-xs rounded-full">
                        {chat.UnreadCount} unread
                      </span>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Last message: {chat.LastMessage?.substring(0, 30)}...
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-lg border dark:border-gray-700">
          {selectedChat ? (
            <>
              <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg) => (
                  <div
                    key={msg.MessageId}
                    className={`mb-4 ${msg.IsAdminMessage ? 'text-right' : 'text-left'}`}
                  >
                    <div
                      className={`inline-block max-w-[70%] p-3 rounded-lg ${
                        msg.IsAdminMessage
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 dark:text-gray-200'
                      }`}
                    >
                      {msg.Content}
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(msg.Timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendResponse()}
                    className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                      dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    placeholder="Type your response..."
                  />
                  <button
                    onClick={sendResponse}
                    disabled={!response.trim()}
                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
              Select a chat to start responding
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatPanel;