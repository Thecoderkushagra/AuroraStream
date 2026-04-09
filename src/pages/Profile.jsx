import { useState } from "react";
import Overview from "../components/ProfOverview";
import Billing from "../components/ProfBilling";
import Settings from "../components/ProfSettings";
import Security from "../components/ProfSecurity";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const {logout} = useAppContext();
    const [activeTab, setActiveTab] = useState("overview");

    function handleLogout() {
        logout();
        navigate('/');
    }
    
    return (
        <div className="min-h-screen text-gray-100 p-6 flex gap-6">
            <aside className="w-64 bg-[#212529] rounded-lg p-4 flex-shrink-0 h-fit sticky top-6">
                <nav className="space-y-2">
                    <button onClick={() => setActiveTab("overview")} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-gray-300 transition-colors">
                        Overview
                    </button>
                    <button onClick={() => setActiveTab("settings")} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-gray-300 transition-colors">
                        Settings
                    </button>
                    <button onClick={() => setActiveTab("security")} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-gray-300 transition-colors">
                        Security
                    </button>
                    <button onClick={() => setActiveTab("billing")} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-gray-300 transition-colors">
                        Billing
                    </button>
                    <button onClick={handleLogout} className= "text-left px-3 py-2 rounded bg-red-700 hover:bg-red-800 text-gray-200 hover:text-white transition-colors">
                        Logout
                    </button>
                </nav>
            </aside>

            <main className="bg-[#212529] rounded-lg p-8 flex-grow ">
                {activeTab === "overview" && <Overview />}
                {activeTab === "settings" && <Settings />}
                {activeTab === "security" && <Security />}
                {activeTab === "billing" && <Billing />}
            </main>
        </div>
    );
}

export default Profile;