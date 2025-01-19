import { Link } from "react-router-dom"

const Settings = () => {
    return (
        <div className="max-w-md mx-auto bg-white min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
                <div className="text-lg font-bold">
                    Settings
                </div>
                <div className="text-sm">
                    23:59
                </div>
            </div>
            {/* Search Bar */}
            <div className="p-4">
                <input className="w-full p-2 rounded bg-gray-200" placeholder="Search" type="text" />
            </div>
            {/* Profile Section */}
            <div className="flex items-center p-4 bg-white border-b">
                <img alt="Profile picture" className="w-12 h-12 rounded-full" src="https://placehold.co/50x50" />
                <div className="ml-4 flex-1">
                    <div className="font-bold">
                        Viona Azzahra
                    </div>
                    <div className="text-sm text-gray-500">
                        Hey there! I am using what...
                    </div>
                </div>
                <i className="fas fa-qrcode text-gray-500">
                </i>
            </div>
            {/* Avatar Section */}
            <div className="flex items-center p-4 bg-white border-b">
                <i className="fas fa-user-circle text-xl text-gray-500">
                </i>
                <div className="ml-4 flex-1">
                    Avatar
                </div>
                <i className="fas fa-chevron-right text-gray-500">
                </i>
            </div>
            {/* Menu Items */}
            <div className="bg-white mt-4">
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-bullhorn text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Broadcast Lists
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-star text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Starred Messages
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-laptop text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Linked Devices
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
            </div>
            {/* Account Settings */}
            <div className="bg-white mt-4">
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-key text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Account
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-lock text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Privacy
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
                <Link to="/chat-folders">
                    <div className="flex items-center p-4 border-b">
                        <i className="fas fa-folder text-xl text-gray-500">
                        </i>
                        <div className="ml-4 flex-1">
                            Chats Folder
                        </div>
                        <i className="fas fa-chevron-right text-gray-500">
                        </i>
                    </div>
                </Link>
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-comments text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Chats
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-bell text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Notifications
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-database text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Storage and Data
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
            </div>
            {/* Help Section */}
            <div className="bg-white mt-4">
                <div className="flex items-center p-4 border-b">
                    <i className="fas fa-info-circle text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Help
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
                <div className="flex items-center p-4">
                    <i className="fas fa-heart text-xl text-gray-500">
                    </i>
                    <div className="ml-4 flex-1">
                        Tell a Friend
                    </div>
                    <i className="fas fa-chevron-right text-gray-500">
                    </i>
                </div>
            </div>
            {/* Bottom Navigation */}
            <div className="bottom-icons row" id="bottomIcons">
                <div className="flex justify-around">
                    <div className="flex flex-col items-center p-2">
                        <i className="fas fa-circle-notch text-xl text-gray-500">
                        </i>
                        <span className="text-xs text-gray-500">
                            Updates
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                        <i className="fas fa-phone text-xl text-gray-500">
                        </i>
                        <span className="text-xs text-gray-500">
                            Calls
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                        <i className="fas fa-users text-xl text-gray-500">
                        </i>
                        <span className="text-xs text-gray-500">
                            Communities
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                        <a href="wa.html"><i className="fas fa-comment text-xl text-gray-500" /></a>
                        <span className="text-xs text-gray-500">
                            Chats
                        </span>
                        <span className="bg-green-500 text-white text-xs rounded-full px-1">
                            1
                        </span>
                    </div>
                    <div className="flex flex-col items-center p-2">
                        <i className="fas fa-cog text-xl text-black">
                        </i>
                        <span className="text-xs text-black">
                            Settings
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings