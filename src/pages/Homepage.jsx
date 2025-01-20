import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const Homepage = ({ chats = [], folders = [], users = [] }) => {
    const location = useLocation();
    const isSelectChat = location.state?.selectChat;
    const path = location.state?.path;
    const folderID = location.state?.folderID;
    const [selectedChats, setSelectedChats] = useState([]);
    const [userMap, setUserMap] = useState({});// State for chats

    useEffect(() => {
        const mapUser = (users || []).reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});
        setUserMap(mapUser);
    }, [users]);

    const handleCheckboxChange = (chat) => {
        setSelectedChats(prevState => {
            if (prevState.includes(chat)) {
                return prevState.filter(id => id !== chat); // Uncheck
            } else {
                return [...prevState, chat]; // Check
            }
        });
    };

    const formatTimeWithAMPM = (timestamp) => {
        const date = new Date(timestamp);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert 24-hour time to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // '0' should be '12'

        return `${hours}:${minutes} ${ampm}`;
    };

    if (!chats || !folders) {
        return <div>Loading...</div>; // Loading state sementara data di-fetch
    }

    return (
        <div className="max-w-md mx-auto">
            {/* Chats Header */}
            {isSelectChat ? (
                <div className="flex justify-between items-center p-4">
                    <button className="text-gray-500 font-bold">
                        Done
                    </button>
                    <h1 className="text-2xl font-bold">
                        {selectedChats.length} Selected
                    </h1>
                </div>
            ) : (
                <div className="flex justify-between items-center p-4">
                    <div className="flex flex-col items-start">
                        <h1 className="text-2xl font-bold">
                            Chats
                        </h1>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <i className="fas fa-camera text-gray-500">
                        </i>
                        <div className="w-4 h-4 bg-green-500 rounded-full">
                        </div>
                    </div>
                </div>
            )}

            {/* Tabs */}
            <div className="flex justify-start overflow-x-scroll p-2" id="folder_tabs">
                {folders.map((folder) => (
                    <div key={folder.id} className="inline-flex justify-start p-1 whitespace-nowrap">
                        <button className="bg-green-100 text-green-600 px-4 py-1 rounded-full text-xs">
                            {folder.name}
                        </button>
                    </div>
                ))}
            </div>

            {/* Archived */}
            <div className="p-4 text-gray-500">
                Archived
            </div>
            {/* Chat List */}
            <div className="space-y-4 ">
                {chats.map((chat) => {
                    const user = userMap[chat.user_id];
                    return (
                        user && (
                            <div className="flex pl-4 items-center">
                                {isSelectChat && (
                                    <input
                                        className="form-checkbox h-5 w-5 text-gray-600"
                                        type="checkbox"
                                        checked={selectedChats.some(c => c.id === chat.id)}
                                        onChange={() => handleCheckboxChange(chat)}
                                    />
                                )}
                                <Link to={`chat/${chat.id}`} key={chat.id} className="flex justify-between items-center w-full px-4">
                                    <div className="flex items-center space-x-4">
                                        {/* Display User Avatar */}
                                        <img
                                            alt="User avatar"
                                            className="w-10 h-10 rounded-full"
                                            src={user.image_url}
                                        />

                                        <div>
                                            {/* Display User Name */}
                                            <div className="font-bold">{user.name}</div>
                                            {/* Display Last Message */}
                                            <div className="text-gray-500 text-sm">{chat.message}</div>
                                        </div>
                                    </div>

                                    {/* Display Time */}
                                    <div className="text-right">
                                        <div className="text-gray-500 text-sm">
                                            {chat?.updated_at?.Valid ? formatTimeWithAMPM(chat?.updated_at?.Time) : formatTimeWithAMPM(chat?.created_at)}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    );
                })}
            </div>
            {/* Footer */}
            {isSelectChat ? (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
                    <button className="text-gray-700">
                        Archive
                    </button>
                    <button className="text-gray-700">
                        Read
                    </button>
                    {path == "add-folder" ? (
                        <Link className="text-gray-700" to="/chat-folders/add" state={{ data: selectedChats }}>
                            Add To Folder
                        </Link>
                    ) : (
                        <Link className="text-gray-700" to={`/chat-folders/edit/${folderID}`} state={{ data: selectedChats }}>
                            Add To Folder
                        </Link>
                    )}
                    <button className="text-gray-700">
                        Delete
                    </button>
                </div>
            ) : (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
                    <div className="flex justify-around p-2">
                        <div className="flex flex-col items-center">
                            <i className="fas fa-circle-notch text-gray-500"></i>
                            <span className="text-xs text-gray-500">Updates</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-phone-alt text-gray-500"></i>
                            <span className="text-xs text-gray-500">Calls</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-users text-gray-500"></i>
                            <span className="text-xs text-gray-500">Communities</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <i className="fas fa-comments text-green-500"></i>
                            <span className="text-xs text-green-500">Chats</span>
                        </div>
                        <Link to="/settings">
                            <div className="flex flex-col items-center">
                                <i className="fas fa-cog text-gray-500"></i>
                                <span className="text-xs text-gray-500">Settings</span>
                            </div>
                        </Link>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Homepage