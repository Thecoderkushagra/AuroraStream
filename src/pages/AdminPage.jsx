import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import AdminCtl from "../components/AdminCtl";
import MasterCtl from "../components/MasterCtl";

const Admin = () =>{
    const [active , setActive] = useState("dashboard");

    return(
        <div className="min-h-screen text-gray-100 p-6 flex gap-6">
            <aside className="w-64 bg-[#212529] rounded-lg p-4 flex-shrink-0 h-fit sticky top-6">
                <nav className="space-y-2">
                    <button onClick={() => setActive("dashboard")} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-gray-300 transition-colors">
                        Application Dashboard
                    </button>
                    <button onClick={() => setActive("admin")} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-gray-300 transition-colors">
                        Admin Controller
                    </button>
                    <button onClick={() => setActive("master")} className="w-full text-left px-3 py-2 rounded hover:bg-gray-700 text-red-300 transition-colors">
                        MASTER CONTROLLER
                    </button>

                </nav>
            </aside>

            <main className="bg-[#212529] rounded-lg p-8 flex-grow ">
                {active === "dashboard" && <Dashboard />}
                {active === "admin" && <AdminCtl />}
                {active === "master" && <MasterCtl />}
            </main>
        </div>
    );
}
export default Admin;