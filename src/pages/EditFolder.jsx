/* eslint-disable react/prop-types */
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { getData, updateData } from "../utils/Api";
import { useState, useEffect, useMemo } from "react";

const EditFolder = ({ users }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const selectedChats = location.state?.data;
    const chats = useMemo(() => location.state?.folderChats || [], [location.state?.folderChats]);
    const [folderName, setFolderName] = useState("");
    const [filteredChat, setFilteredChat] = useState([])


    useEffect(() => {
        const fetchFolderAndUpdateChat = async () => {
            try {
                // Fetch folder data
                const response = await getData(`/folder/${id}`);
                setFolderName(response.name); // Assuming 'response' contains 'name'

                const filteredUsers = (users || []).filter(user => {
                    let filter = [];

                    // Choose the appropriate chat array (selectedChats or chats)
                    if (selectedChats?.length > 0) {
                        filter = selectedChats;
                    } else {
                        filter = chats;
                    }

                    // Check if there's a match for user_id in any chat
                    return filter.some(chat => {
                        // Check if chat is an array
                        if (Array.isArray(chat)) {
                            return chat.some(c => c.user_id === user.id);
                        }
                        // Check if it's a single chat object
                        return chat.user_id === user.id;
                    });
                });

                // Set the filtered users
                setFilteredChat(filteredUsers);

            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchFolderAndUpdateChat(); // Trigger function when 'id' is available
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Add dependencies to rerun effect when any change

    const handleInputChange = (event) => {
        setFolderName(event.target.value);
    };

    const submitFolder = async () => {
        const data = { name: folderName };
        try {
            const response = await updateData(id, "/folder", data);
            return response?.id;
        } catch (error) {
            console.error(error);
        }
    };

    const updateChatFolder = async (folderID, chatData) => {
        const data = { ...chatData, folder_id: folderID };
        try {
            await updateData(chatData?.id, "/chat", data);
        } catch (error) {
            console.error(error);
        }
    };

    const removeChat = (userID) => {
        const newChatList = filteredChat.filter(user => user?.id !== userID);
        setFilteredChat(newChatList);
    };

    const submitData = async () => {
        try {
            let folderID = await submitFolder();

            if (folderID > 0 && chats.length) {
                await Promise.all(chats.map(chat => updateChatFolder(folderID, chat)));
            }

            navigate("/chat-folders");
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    };


    return (
        <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <Link to="/chat-folders">
                    <i className="fas fa-arrow-left text-gray-600" />
                </Link>
                <span className="text-lg font-semibold">Edit Folder</span>
                <i className="fas fa-check text-green-500" onClick={submitData} />
            </div>

            {/* Content */}
            <div className="flex flex-col items-center px-4 py-6">
                <img alt="Folder icon" className="mb-4" src="https://placehold.co/100x100" />
                <p className="text-center text-gray-600 mb-4">
                    Choose chats and types of chats that will appear in this folder.
                </p>
                <input
                    className="w-full border rounded-lg px-4 py-2 mb-4"
                    type="text"
                    placeholder="Folder Name"
                    value={folderName}
                    onChange={handleInputChange}
                />
                <div className="w-full bg-gray-100 p-4 rounded-lg">
                    <p className="text-green-600 mb-2">Included Chats</p>
                    <Link to="/" state={{ selectChat: true, path: "edit-folder", folderID: id }}>
                        <div className="flex items-center text-gray-600">
                            <i className="fas fa-plus mr-2" />
                            <span>Add Chats</span>
                        </div>
                    </Link>
                    {filteredChat.map(user => (
                        <div key={user?.id} className="flex items-center justify-between text-gray-600 p-2">
                            <div className="flex">
                                <img src={user.image_url} alt={user.name} className="w-5 h-5 rounded-full mr-2" />
                                <span>{user.name}</span>
                            </div>
                            <button
                                onClick={() => { removeChat(user?.id) }}
                                aria-label={`Delete chat ${user.name}`}
                                className="text-red-500 hover:text-red-700"
                            >
                                <i className="fas fa-trash" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default EditFolder;