import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// layouts
import AuthLayout from "./layout/AuthLayout";
import UserLayout from "./features/user/layout/UserLayout";

// public pages
import Landing from "./features/public/pages/Landing";
import Login from "./features/public/pages/Login";
import Signup from "./features/public/pages/Signup";
import ForgotPassword from "./features/public/pages/ForgotPassword";
import Terms from "./features/public/pages/Terms";
import Privacy from "./features/public/pages/Privacy";
import Pricing from "./features/public/pages/Pricing";

// user pages
import Home from "./features/user/pages/explore/Home";
import Movies from "./features/user/pages/explore/Movies";
import Series from "./features/user/pages/explore/Series";
import MyList from "./features/user/pages/explore/MyList";
import WatchHistory from "./features/user/pages/explore/WatchHistory";

// profile pages
import Overview from "./features/user/pages/profile/Overview";
import Settings from "./features/user/pages/profile/Settings";
import Security from "./features/user/pages/profile/Security";
import Billing from "./features/user/pages/profile/Billing";

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
                    <Route path="/forgotpasswd" element={<ForgotPassword />} />
                </Route>

                {/* User Layout */}
                <Route path="/user" element={<UserLayout />}>
                    <Route path="home" element={<Home />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="series" element={<Series />} />
                    <Route path="my-list" element={<MyList />} />
                    <Route path="watch-history" element={<WatchHistory />} />
                    
                    {/* Profile */}
                    <Route path="profile">
                        <Route index element={<Navigate to="overview" replace />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="security" element={<Security />} />
                        <Route path="billing" element={<Billing />} />
                    </Route>
                </Route>

                {/* Legal */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

            </Routes>
        </BrowserRouter>
    );
}