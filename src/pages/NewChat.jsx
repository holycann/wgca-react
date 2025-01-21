import { useEffect, useState } from "react"
import { getData, postData } from "../utils/Api"
import { useParams, Link, useNavigate } from "react-router-dom"
import { ToastConfirm, ToastError } from "../utils/Toast"
import { ToastContainer } from "react-toastify"

const NewChat = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [userName, setUserName] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const userData = await getData(`/user/${id}`)
                setUserName(userData.name)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [id])

    const handleInputMessage = (event) => {
        setMessage(event.target.value);
    };

    const createChat = async () => {
        const data = {
            user_id: parseInt(id),
            folder_id: 1,
            message: message
        }

        try {
            const response = await postData(data, "/chat")
            ToastConfirm(String(response))
            await navigate("/")
        } catch (error) {
            ToastError(String(error))
        }
    }

    if (!userName) {
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
            </div>
            <div className="bg-gray-100 p-4 flex items-center sticky">
                <i className="fas fa-plus text-xl">
                </i>
                <input className="bg-gray-200 text-black flex-1 mx-2 p-2 pl-5 rounded-full" placeholder="Type a message" type="text" onChange={handleInputMessage} value={message} />
                <button className="pl-2" onClick={createChat}>
                    <i className="fa-light fa-paper-plane-top"></i>
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default NewChat