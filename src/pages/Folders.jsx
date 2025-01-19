import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { deleteData } from "../utils/Api";

// eslint-disable-next-line react/prop-types
const Folders = ({ folders = [], chats = [] }) => {
    const [chatMap, setChatMap] = useState({}); // State to map folder_id to chat count

    useEffect(() => {
        // Map chats to their respective folder_id and count the occurrences
        const mapChat = chats.reduce((map, chat) => {
            const folderId = chat.folder_id.Int16; // Assuming chat has a 'folder_id' field
            if (folderId) {
                map[folderId] = (map[folderId] || 0) + 1; // Increment chat count for this folder_id
            }
            return map;
        }, {});
        setChatMap(mapChat);
    }, [chats]);

    const deleteFolder = useCallback(async (folderID) => {
        try {
            const response = await deleteData(folderID, "/folder");
            console.log("Folder deleted successfully:", response);
        } catch (error) {
            console.error("Error deleting folder:", error.message);
        }
    }, []);

    if (!folders.length) {
        return <div>Loading folders...</div>; // Handle loading state
    }

    return (
        <div className="max-w-md mx-auto p-4">
            {/* Header */}
            <div className="flex items-center mb-4">
                <Link to="/">
                    <i className="fas fa-arrow-left text-xl" />
                </Link>
                <h1 className="text-xl font-semibold">Chat Folders</h1>
            </div>
            {/* Folder Image */}
            <div className="flex justify-center mb-4">
                <img alt="Folder icon" className="w-24 h-24" src="https://placehold.co/100x100" />
            </div>
            {/* Description */}
            <p className="text-center text-gray-500 mb-4">
                Create folders for different groups of chats and quickly switch between them.
            </p>
            {/* Create Folder Button */}
            <div className="flex justify-center mb-6">
                <Link to="add" className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center">
                    <i className="fas fa-plus mr-2" />
                    Create Folder
                </Link>
            </div>
            {/* Folders List */}
            <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-green-500 font-semibold mb-2">Folders</h2>
                <ul>
                    {folders.map((folder) => (
                        <li key={folder.id} className="flex justify-between mb-2">
                            <div className="flex flex-col">
                                <span>{folder.name}</span>
                                <span className="text-gray-500">{chatMap[folder.id] || 0} chats</span>
                            </div>
                            <div className="flex justify-around items-center">
                                <button>
                                    <i className="fa-duotone fa-solid fa-pen-to-square p-2" />
                                </button>
                                <button onClick={() => { deleteFolder(folder.id) }}>
                                    <i className="fa-duotone fa-solid fa-trash p-2" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Folders;
