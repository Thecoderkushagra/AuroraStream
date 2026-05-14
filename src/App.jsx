import { BrowserRouter, Routes, Route } from "react-router-dom";

// layouts
import AuthLayout from "./layout/AuthLayout";

// public pages
import Landing from "./features/public/pages/Landing";
import Login from "./features/public/pages/Login";
import Signup from "./features/public/pages/Signup";
import Terms from "./features/public/pages/Terms";
import Privacy from "./features/public/pages/Privacy";
import Pricing from "./features/public/pages/Pricing";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public */}
                <Route path="/" element={<Landing />} />
                <Route path="/pricing" element={<Pricing />} />

                {/* Auth Layout */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>

                {/* Legal */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

            </Routes>
        </BrowserRouter>
    );
}