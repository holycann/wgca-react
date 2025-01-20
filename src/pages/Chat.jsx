import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getData, updateData } from "../utils/Api"
const Chat = () => {
    const { id } = useParams()
    const [chat, setChats] = useState({})
    const [userName, setUserName] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const chatData = await getData(`/chat/${id}`)
                setChats(chatData)

                const userData = await getData(`/user/${chatData.user_id}`)
                setUserName(userData.name)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [id])

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

    const handleInputMessage = (event) => {
        setMessage(event.target.value);
    };

    const sendChat = async (chatID) => {
        const chatWithoutDates = Object.keys(chat)
            .filter(key => !['updated_at', 'created_at'].includes(key))
            .reduce((obj, key) => {
                obj[key] = chat[key];
                return obj;
            }, {});
        const data = { ...chatWithoutDates, message: message, folder_id: chat.folder_id.Int16 }
        try {
            const response = await updateData(chatID, "/chat", data)
            console.log(response)
            setMessage("")
        } catch (error) {
            console.error(error)
        }
    }

    if (!chat || !userName) {
        return <div>Loading....</div>
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-y-auto">
                <div className="flex items-center justify-between bg-gray-100 p-4 sticky top-0 z-10">
                    <div className="flex items-center">
                        <Link to="/">
                            <i className="fas fa-arrow-left text-xl">
                            </i>
                        </Link>
                        <img alt="Profile picture of a woman" className="rounded-full w-10 h-10 mx-2" height={40} src="https://placehold.co/40x40" width={40} />
                        <div>
                            <p className="text-lg">
                                {userName}
                            </p>
                            <p className="text-sm text-gray-500">
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <i className="fas fa-video text-xl">
                        </i>
                        <i className="fas fa-phone text-xl">
                        </i>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 bg-gray-300 h-full">
                    <div className="space-y-4">
                        <div className="flex justify-end">
                            <div className="bg-green-200 px-5 py-3 rounded-3xl max-w-xs">
                                <p>
                                    {chat?.message}
                                </p>
                                <p className="text-right text-xs text-gray-500">
                                    {chat?.updated_at?.Valid ? formatTimeWithAMPM(chat?.updated_at?.Time) : formatTimeWithAMPM(chat?.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-100 p-4 flex items-center sticky">
                <i className="fas fa-plus text-xl">
                </i>
                <input className="bg-gray-200 text-black flex-1 mx-2 p-2 pl-5 rounded-full" placeholder="Type a message" type="text" onChange={handleInputMessage} value={message}/>
                <button className="pl-2" onClick={() => { sendChat(chat.id) }}>
                    <i className="fa-light fa-paper-plane-top"></i>
                </button>
            </div>
        </div>
    )
}

export default Chat