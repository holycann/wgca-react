import { Link, useLocation } from "react-router-dom";
import { getData, postData, updateData } from "../utils/Api";
import { useState, useEffect } from "react";

const AddFolder = () => {
    const location = useLocation();
    const selectedChatsData = location.state?.data;
    const [users, setUsers] = useState([]); // Ubah menjadi array untuk menyimpan banyak pengguna
    const [folderName, setFolderName] = useState(""); // Ubah menjadi array untuk menyimpan banyak pengguna

    useEffect(() => {
        (async () => {
            if (selectedChatsData && selectedChatsData.length > 0) { // Periksa panjang array
                try {
                    const usersData = []; // Array untuk menyimpan data pengguna
                    for (const chat of selectedChatsData) {
                        const userData = await getData(`/user/${chat.user_id}`);
                        usersData.push(userData); // Menambahkan data pengguna ke dalam array
                    }
                    setUsers(usersData); // Set data pengguna setelah loop selesai
                } catch (error) {
                    console.error('Error fetching chat details:', error);
                }
            }
        })();
    }, [selectedChatsData]);

    const handleInputChange = (event) => {
        setFolderName(event.target.value); // Update state dengan nilai input
    };


    const submitFolder = async () => {
        const data = {
            name: folderName
        }
        try {
            const response = await postData(data, "/folder")
            console.log(response)
            return response.id
        } catch (error) {
            console.error(error)
        }
    }

    const updateChatFolder = async (folderID, chat) => {
        const data = {
            id: chat.id,
            user_id: chat.user_id,
            folder_id: folderID,
            message: chat.message
        }

        try {
            const response = await updateData(chat.id, "/chat", data)
            return response
        } catch (error) {
            console.error(error)
        }
    }

    const submitData = async () => {
        if (folderName != "") {
            const folderID = await submitFolder()
            if (folderID > 0 && selectedChatsData && selectedChatsData.length > 0) {
                for (const chat of selectedChatsData) {
                    await updateChatFolder(folderID, chat)
                }
            }

            window.location.href = "/chat-folders"
        }
    }



    return (
        <div>
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <Link to="/chat-folders">
                    <div className="flex items-center">
                        <i className="fas fa-arrow-left text-gray-600">
                        </i>
                    </div>
                </Link>
                <div className="text-center flex-1">
                    <span className="text-lg font-semibold">
                        Add Folder
                    </span>
                </div>
                <div className="flex items-center" onClick={submitData}>
                    <i className="fas fa-check text-green-500">
                    </i>
                </div>
            </div>
            {/* Content */}
            <div className="flex flex-col items-center px-4 py-6">
                <img alt="Folder icon" className="mb-4" src="https://placehold.co/100x100" />
                <p className="text-center text-gray-600 mb-4">
                    Choose chats and types of chats that will appear and never appear in this folder.
                </p>
                <div className="w-full mb-4">
                    <input className="w-full border rounded-lg px-4 py-2" type="text" placeholder="Folder Name" onChange={handleInputChange} />
                </div>
                <div className="w-full bg-gray-100 p-4 rounded-lg">
                    <p className="text-green-600 mb-2">
                        Included Chats
                    </p>
                    <Link to="/" state={{ selectChat: true, path: "add-folder" }}>
                        <div className="flex items-center text-gray-600">
                            <i className="fas fa-plus mr-2"></i>
                            <span>Add Chats</span>
                        </div>
                    </Link>
                    {/* Render users if available */}
                    {users.length > 0 && (
                        users.map((user) => (
                            <div key={user.id} className="flex items-center text-gray-600">
                                <img src={user.image_url} alt={user.name} className="w-5 h-5 rounded-full mr-2" />
                                <span>{user.name}</span>
                            </div>
                        ))
                    )}
                </div>
                <p className="text-center text-gray-400 mt-4">
                    Choose chats or types of chats that will appear in this folder.
                </p>
            </div>
        </div>
    );
};

export default AddFolder;