import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { deleteData } from "../utils/Api";

// eslint-disable-next-line react/prop-types
const Folders = ({ folders = [], chats = [] }) => {
    const [chatCounts, setChatCounts] = useState({}); // State to store chat counts per folder

    // Calculate chat counts based on folder ID
    useEffect(() => {
        const counts = chats.reduce((map, chat) => {
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
            const response = await deleteData(folderID, "/folder");
            console.log("Folder deleted successfully:", response);
        } catch (error) {
            console.error("Error deleting folder:", error.message);
            alert("Failed to delete folder. Please try again.");
        }
    }, []);

    // Render loading state if no folders available
    if (!folders.length) {
        return <div>Loading folders...</div>;
    }

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
                    src="https://placehold.co/100x100"
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
                    {folders.map((folder) => (
                        <li key={folder.id} className="flex justify-between mb-2 items-center">
                            <div className="flex flex-col">
                                <span className="font-medium">{folder.name}</span>
                                <span className="text-gray-500 text-sm">
                                    {chatCounts[folder.id] || 0} chats
                                </span>
                            </div>
                            <div className="flex space-x-2">
                                {/* Edit Folder */}
                                <Link
                                    to={`edit/${folder.id}`}
                                    state={{
                                        folderData: folder,
                                        folderChats: chats.filter(chat => chat.folder_id?.Int16 === folder.id),
                                    }}
                                    aria-label={`Edit folder ${folder.name}`}
                                >
                                    <i className="fas fa-pen text-green-500 hover:text-green-700 cursor-pointer" />
                                </Link>
                                {/* Delete Folder */}
                                <button
                                    onClick={() => handleDeleteFolder(folder.id)}
                                    aria-label={`Delete folder ${folder.name}`}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <i className="fas fa-trash" />
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