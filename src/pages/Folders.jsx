import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteData, updateData } from "../utils/Api";
import { ToastContainer } from 'react-toastify';
import { ToastConfirm, ToastError } from "../utils/Toast";
import folderImage from "../assets/folder.png"

// eslint-disable-next-line react/prop-types
const Folders = ({ folders = [], chats = [] }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const isSelectChat = location.state?.select
    const selectedChat = location.state?.data
    const [chatCounts, setChatCounts] = useState({}); // State to store chat counts per folder


    // Calculate chat counts based on folder ID
    useEffect(() => {
        const counts = chats?.reduce((map, chat) => {
            const folderId = chat.folder_id?.Int16; // Ensure safe access
            if (folderId) {
                map[folderId] = (map[folderId] || 0) + 1; // Count chats in folder
            }
            return map;
        }, {});
        setChatCounts(counts);
    }, [chats]);

    // Function to delete a folder
    const handleDeleteFolder = useCallback(async (folderID) => {
        if (!folderID) return;

        try {
            await deleteData(folderID, "/folder");
        } catch (error) {
            ToastError(String(error))
        }
    }, []);

    const addChat = useCallback(async (folderID) => {
        if (selectedChat) {
            try {
                for (const chat of selectedChat) {
                    const chatWithoutDates = Object.keys(chat)
                        .filter(key => !['updated_at', 'created_at'].includes(key))
                        .reduce((obj, key) => {
                            obj[key] = chat[key];
                            return obj;
                        }, {});
                    const data = { ...chatWithoutDates, folder_id: folderID }
                    console.log(JSON.stringify(data, null, 2));

                    await updateData(chat.id, "/chat", data);

                    navigate('/', { state: { folderID: folderID } })
                }
            } catch (error) {
                ToastError(String(error))
            }
        }
    }, []);

    // Render loading state if no folders available
    // if (!folders?.length) return <div>Loading Fetch Folders....</div>

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Header */}
            <div className="flex items-center mb-4">
                <Link to="/" aria-label="Back to home">
                    <i className="fas fa-arrow-left text-xl" />
                </Link>
                <h1 className="text-xl font-semibold ml-4">Chat Folders</h1>
            </div>

            {/* Folder Icon */}
            <div className="flex justify-center mb-4">
                <img
                    alt="Folder icon"
                    className="w-24 h-24"
                    src={folderImage}
                />
            </div>

            {/* Description */}
            <p className="text-center text-gray-500 mb-4">
                Create folders for different groups of chats and quickly switch between them.
            </p>

            {/* Create Folder Button */}
            <div className="flex justify-center mb-6">
                <Link
                    to="add"
                    className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center"
                >
                    <i className="fas fa-plus mr-2" />
                    Create Folder
                </Link>
            </div>

            {/* Folders List */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-green-500 font-semibold mb-2">Folders</h2>
                <ul>
                    {folders?.map((folder) => (
                        <li key={folder?.id}>
                            <div
                                role={isSelectChat ? "button" : "div"}
                                className="flex justify-between mb-2 items-center"
                                onClick={isSelectChat ? () => { addChat(folder.id) } : undefined}
                            >
                                <div className="flex flex-col">
                                    <span className="font-medium">{folder.name}</span>
                                    {chatCounts && chatCounts[folder?.id] !== undefined ? (
                                        <span className="text-gray-500 text-sm">
                                            {chatCounts[folder?.id]} chats
                                        </span>
                                    ) : (
                                        <span className="text-gray-500 text-sm">
                                            0 chats
                                        </span>
                                    )}
                                </div>
                                <div className="flex space-x-2">
                                    {/* Edit Folder */}
                                    <Link
                                        to={`edit/${folder.id}`}
                                        state={{
                                            folderData: folder,
                                            folderChats: chats?.filter(chat => chat?.folder_id?.Int16 === folder?.id),
                                        }}
                                        aria-label={`Edit folder ${folder.name}`}
                                    >
                                        <i className="fas fa-pen text-green-500 hover:text-green-700 cursor-pointer" />
                                    </Link>
                                    {/* Delete Folder */}
                                    <button
                                        onClick={() => ToastConfirm(folder.id, handleDeleteFolder)}
                                        aria-label={`Delete folder ${folder.name}`}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <i className="fas fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Folders;