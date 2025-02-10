// "use client"
// import React, { useState, useEffect } from 'react';
// import { MessageSquare, Send } from 'lucide-react';
// import axios from '@/config/axios'; // Assuming axios instance is configured
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// const AdminPanel = () => {
//   const [status, setStatus] = useState('active');
//   const [pendingChats, setPendingChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [response, setResponse] = useState('');
//   const [messages, setMessages] = useState([]);

//   // Fetch pending chats
//   const fetchPendingChats = async () => {
//     try {
//       const { data } = await axios.get('/admin/pending-chats');
//       setPendingChats(data);
//     } catch (error) {
//       console.error('Error fetching chats:', error);
//     }
//   };

//   // Toggle admin status
//   const toggleStatus = async () => {
//     const newStatus = status === 'active' ? 'away' : 'active';
//     try {
//       await axios.put('/admin/status', { status: newStatus });
//       setStatus(newStatus);
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   // Fetch messages for selected chat
//   const fetchMessages = async (chatRoomId) => {
//     try {
//       const { data } = await axios.get(`/chat/messages/${chatRoomId}`);
//       setMessages(data);
//     } catch (error) {
//       console.error('Error fetching messages:', error);
//     }
//   };

//   // Handle chat selection
//   const selectChat = (chatRoomId) => {
//     console.log(chatRoomId)
//     setSelectedChat(chatRoomId);
//     fetchMessages(chatRoomId);
//   };

//   // Send admin response
//   const sendResponse = async () => {
//     if (!response.trim() || !selectedChat) return;

//     try {
//       await axios.post('/admin/respond', {
//         chatRoomId: selectedChat,
//         content: response,
//       });
//       setResponse('');
//       fetchMessages(selectedChat); // Refresh messages after sending
//     } catch (error) {
//       console.error('Error sending response:', error);
//     }
//   };

//   useEffect(() => {
//     fetchPendingChats();
//   }, []);

//   return (
//     <div className="flex h-screen dark:bg-gray-900">
//       {/* Sidebar with pending chats */}
//       <div className="w-64 border-r bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
//         <div className="p-4">
//           <button
//             onClick={toggleStatus}
//             className={`w-full p-2 rounded text-white ${
//               status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
//             }`}
//           >
//             Status: {status}
//           </button>
//         </div>

//         <div className="overflow-y-auto">
//           {pendingChats.map((chat) => (
//             <div
//               key={chat.ChatRoomId}
//               onClick={() => selectChat(chat.ChatRoomId)}
//               className={`p-4 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${
//                 selectedChat === chat.ChatRoomId ? 'bg-blue-50 dark:bg-gray-600' : ''
//               }`}
//             >
//               <div className="flex items-center gap-2">
//                 <MessageSquare size={20} className="dark:text-gray-300" />
//                 <span className="dark:text-white">User: {chat.UserId}</span>
//               </div>
//               {chat.UnreadCount > 0 && (
//                 <span className="text-sm text-red-500">
//                   {chat.UnreadCount} unread
//                 </span>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Chat area */}
//       <div className="flex-1 flex flex-col dark:bg-gray-900">
//         {selectedChat ? (
//           <>
//             <div className="flex-1 p-4 overflow-y-auto">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.MessageId}
//                   className={`mb-4 ${msg.IsAdminMessage ? 'text-right' : 'text-left'}`}
//                 >
//                   <div
//                     className={`inline-block p-3 rounded-lg ${
//                       msg.IsAdminMessage
//                         ? 'bg-blue-500 text-white'
//                         : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     {msg.Content}
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="p-4 border-t dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
//               <div className="flex gap-2">
//                 <input
//                   type="text"
//                   value={response}
//                   onChange={(e) => setResponse(e.target.value)}
//                   className="flex-1 p-2 border rounded focus:outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
//                   placeholder="Type your response..."
//                 />
//                 <button
//                   onClick={sendResponse}
//                   className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-gray-700 dark:hover:bg-gray-600"
//                 >
//                   <Send size={20} />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
//             Select a chat to start responding
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Layers, Users, Shield, MessageSquare, Settings, Plus } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import axios from '@/config/axios';
import { UserManagement } from '@/components/userManagemnt';
import { ClaimsPanel } from '@/components/claimsManagemnet';
import { PoliciesPanel } from '@/components/policiesManagement';
import ChatPanel from '@/components/chatManagement';

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('chat');
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get user from localStorage
    const storedUser =  JSON.parse(localStorage.getItem('user'));
    console.log(storedUser)
    if (!storedUser || storedUser.Role !== 'admin') {
      router.push('/unauthorized');
      return;
    }
    setUser(storedUser);
  }, []);

  const Navigation = () => (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r dark:border-gray-700 p-4">
      <div className="space-y-2">
        <button
          onClick={() => setActiveTab('chat')}
          className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors
            ${activeTab === 'chat' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
        >
          <MessageSquare size={20} />
          <span>Chat Support</span>
        </button>
        
        <button
          onClick={() => setActiveTab('users')}
          className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors
            ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
        >
          <Users size={20} />
          <span>User Management</span>
        </button>

        <button
          onClick={() => setActiveTab('policies')}
          className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors
            ${activeTab === 'policies' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
        >
          <Shield size={20} />
          <span>Policies</span>
        </button>

        <button
          onClick={() => setActiveTab('claims')}
          className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors
            ${activeTab === 'claims' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
        >
          <Layers size={20} />
          <span>Claims Management</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-2 p-3 rounded-lg transition-colors
            ${activeTab === 'settings' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
        >
          <Settings size={20} />
          <span>Admin Settings</span>
        </button>
      </div>
    </div>
  );

//   const ChatPanel = () => {
//     // Your existing chat panel code here
//     return <div>Chat Panel Content</div>;
//   };

//   const UserManagement = () => {
//     const [users, setUsers] = useState([]);
//     const [newAdmin, setNewAdmin] = useState({ username: '', email: '', role: 'admin' });

//     const fetchUsers = async () => {
//       try {
//         const { data } = await axios.get('/admin/users');
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     const createAdmin = async () => {
//       try {
//         await axios.post('/admin/create', newAdmin);
//         fetchUsers();
//       } catch (error) {
//         console.error('Error creating admin:', error);
//       }
//     };

//     return (
//       <Card className="m-4">
//         <CardHeader>
//           <CardTitle>User Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             <div className="flex gap-4">
//               <input 
//                 type="text"
//                 placeholder="Username"
//                 className="p-2 border rounded"
//                 value={newAdmin.username}
//                 onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
//               />
//               <input 
//                 type="email"
//                 placeholder="Email"
//                 className="p-2 border rounded"
//                 value={newAdmin.email}
//                 onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
//               />
//               <button 
//                 onClick={createAdmin}
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//               >
//                 Create Admin
//               </button>
//             </div>
            
//             <table className="w-full">
//               <thead>
//                 <tr>
//                   <th className="text-left p-2">Username</th>
//                   <th className="text-left p-2">Email</th>
//                   <th className="text-left p-2">Role</th>
//                   <th className="text-left p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map(user => (
//                   <tr key={user.id} className="border-t">
//                     <td className="p-2">{user.username}</td>
//                     <td className="p-2">{user.email}</td>
//                     <td className="p-2">{user.role}</td>
//                     <td className="p-2">
//                       <button className="text-red-500 hover:text-red-700">Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     );
//   };

//   const PoliciesPanel = () => {
//     const [policies, setPolicies] = useState([]);
    
//     return (
//       <Card className="m-4">
//         <CardHeader>
//           <CardTitle>Policy Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Policy management content */}
//         </CardContent>
//       </Card>
//     );
//   };

//   const ClaimsPanel = () => {
//     const [claims, setClaims] = useState([]);
    
//     return (
//       <Card className="m-4">
//         <CardHeader>
//           <CardTitle>Claims Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {/* Claims management content */}
//         </CardContent>
//       </Card>
//     );
//   };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Navigation />
      
      <div className="flex-1 overflow-auto">
        {activeTab === 'chat' && <ChatPanel />}
        {activeTab === 'users' && <UserManagement />}
        {activeTab === 'policies' && <PoliciesPanel />}
        {activeTab === 'claims' && <ClaimsPanel />}
        {activeTab === 'settings' && (
          <Card className="m-4">
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Admin settings content */}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;