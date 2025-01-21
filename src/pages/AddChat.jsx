import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getData } from "../utils/Api"

const AddChat = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const response = await getData("/user")
                setUsers(response)
            } catch (error) {
                console.error(error)
            }
        })()
    })

    return (
        <div>
            <div className="max-w-md mx-auto bg-white h-screen">
                {/* Header */}
                <div className="bg-white shadow-md py-2 px-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">
                        New chat
                    </h1>
                    <Link to="/">
                        <i className="fas fa-times text-gray-500">
                        </i>
                    </Link>
                </div>
                {/* Search Bar */}
                <div className="bg-gray-100 px-4 py-2">
                    <div className="bg-white flex items-center rounded-full px-3 py-2">
                        <i className="fas fa-search text-gray-500">
                        </i>
                        <input className="ml-2 bg-transparent outline-none w-full" placeholder="Search name or number" type="text" />
                    </div>
                </div>
                {/* Contacts List */}
                <div className="px-4 py-2">
                    <h2 className="text-gray-500 text-sm mb-2">
                        Contacts on WhatsApp
                    </h2>
                    <div className="space-y-4">
                        {/* Contact Item */}
                        {users.map(user => (
                            <Link to={`${user.id}`} key={user.id} className="flex items-center space-x-4">
                                <img alt="Profile picture of A Iqbal" className="w-10 h-10 rounded-full" height={40} src={user.image_url} width={40} />
                                <div>
                                    <p className="font-semibold">
                                        {user.name}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddChat