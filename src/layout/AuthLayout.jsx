// layout/AuthLayout.jsx
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1a1d20]">
            <div className="w-full max-w-md p-6 bg-[#22262b] rounded-2xl shadow-lg">
                <Outlet />
            </div>
        </div>
    );
}