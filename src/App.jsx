import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getData } from "./utils/Api"
import Homepage from "./pages/Homepage"
import Chat from './pages/Chat';
import AddChat from './pages/AddChat';
import NewChat from './pages/NewChat';
import Settings from './pages/Settings';
import Folders from './pages/Folders';
import AddFolder from './pages/AddFolder';
import EditFolder from './pages/EditFolder';
import './App.css'

function App() {
  const [users, setUsers] = useState([]); // State for chats
  const [chats, setChats] = useState([]); // State for chats
  const [folders, setFolders] = useState([]); // State for folders
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Create an async function inside the useEffect
    const fetchData = async () => {
      try {
        const usersData = await getData("/user"); // Fetch folders
        setUsers(usersData); // Set folders in state

        const foldersData = await getData("/folder"); // Fetch folders
        setFolders(foldersData); // Set folders in state

        const chatsData = await getData("/chat"); // Fetch chats
        setChats(chatsData); // Set chats in state

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchData(); // Call the async function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  return (
    <>
      <RouterProvider router={
        createBrowserRouter(
          createRoutesFromElements(
            <Route path="/">
              <Route index element={<Homepage chats={chats} folders={folders} users={users} />} />
              <Route path="chat/:id" element={<Chat />} />
              <Route path="settings" element={<Settings />} />
              <Route path="new-chat"  >
                <Route index element={<AddChat />} />
                <Route path=":id" element={<NewChat />} />
              </Route>
              <Route path="chat-folders"  >
                <Route index element={<Folders folders={folders} chats={chats} />} />
                <Route path="add" element={<AddFolder />} />
                <Route path="edit/:id" element={<EditFolder users={users} />} />
              </Route>
            </Route>
          )
        )
      } />
    </>
  )
}

export default App
