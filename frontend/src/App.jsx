import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// layouts
import ApplicationLayout from "./layout/ApplicationLayout";
import AuthLayout from "./layout/AuthLayout";
import UserLayout from "./features/user/layout/UserLayout";

// creator components
import CreatorSidebar from "./features/creator/layout/CreatorSidebar";
import CreatorOverview from "./features/creator/pages/dashboard/Overview";
import MyVideos from "./features/creator/pages/videos/MyVideos";
import UploadMovie from "./features/creator/pages/videos/UploadMovie";
import CreateSeries from "./features/creator/pages/videos/CreateSeries";
import UploadEpisode from "./features/creator/pages/videos/UploadEpisode";
import PublicProfile from "./features/creator/pages/profile/PublicProfile";
import CreatorSettings from "./features/creator/pages/profile/Settings";

// admin components
import AdminSidebar, { currentAdmin } from "./features/admin/layout/AdminSidebar";
import AdminOverview from "./features/admin/pages/dashboard/Overview";
import ManageUsers from "./features/admin/pages/manage/ManageUsers";
import ManageCreators from "./features/admin/pages/manage/ManageCreators";
import Moderation from "./features/admin/pages/content/Moderation";
import ReportsQueue from "./features/admin/pages/reports/ReportsQueue";
import Transactions from "./features/admin/pages/payments/Transactions";
import ManageAdmins from "./features/admin/pages/manage/ManageAdmins";
import AdminProfile from "./features/admin/pages/profile/AdminProfile";

// public pages
import Landing from "./features/public/pages/Landing";
import Login from "./features/public/pages/Login";
import Signup from "./features/public/pages/Signup";
import ForgotPassword from "./features/public/reset/ForgotPassword";
import Terms from "./features/public/pages/Terms";
import Privacy from "./features/public/pages/Privacy";
import Pricing from "./features/public/pages/Pricing";

// user pages
import Home from "./features/user/pages/explore/Home";
import Movies from "./features/user/pages/explore/Movies";
import Series from "./features/user/pages/explore/Series";
import MyList from "./features/user/pages/explore/MyList";
import WatchHistory from "./features/user/pages/explore/WatchHistory";
import Following from "./features/user/pages/explore/Following";
import Plans from "./features/user/pages/subscription/Plans";
import Search from "./features/user/pages/search/Search";

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
                    <Route index element={<Navigate to="home" replace />} />
                    <Route path="home" element={<Home />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="series" element={<Series />} />
                    <Route path="my-list" element={<MyList />} />
                    <Route path="watch-history" element={<WatchHistory />} />
                    <Route path="following" element={<Following />} />
                    <Route path="creator/:id" element={<PublicProfile />} />
                    <Route path="subscription" element={<Plans />} />
                    <Route path="search" element={<Search />} />
                    
                    {/* Profile */}
                    <Route path="profile">
                        <Route index element={<Navigate to="overview" replace />} />
                        <Route path="overview" element={<Overview />} />
                        <Route path="settings" element={<Settings />} />
                        <Route path="security" element={<Security />} />
                        <Route path="billing" element={<Billing />} />
                    </Route>
                </Route>

                {/* Creator Layout */}
                <Route path="/creator" element={<ApplicationLayout Sidebar={CreatorSidebar} />}>
                    <Route index element={<CreatorOverview />} />
                    <Route path="videos" element={<MyVideos />} />
                    <Route path="upload-movie" element={<UploadMovie />} />
                    <Route path="create-series" element={<CreateSeries />} />
                    <Route path="upload-episode" element={<UploadEpisode />} />
                    <Route path="profile" element={<PublicProfile />} />
                    <Route path="settings" element={<CreatorSettings />} />
                </Route>

                {/* Admin Layout */}
                <Route path="/admin" element={<ApplicationLayout Sidebar={AdminSidebar} />}>
                    <Route index element={<AdminOverview />} />
                    <Route path="manage/users" element={<ManageUsers />} />
                    <Route path="manage/creators" element={<ManageCreators />} />
                    <Route path="content" element={<Moderation />} />
                    <Route path="reports" element={<ReportsQueue />} />
                    <Route path="payments" element={<Transactions />} />
                    <Route path="profile" element={<AdminProfile />} />
                    <Route 
                        path="manage/admins" 
                        element={
                            currentAdmin.role === "master_admin" 
                                ? <ManageAdmins /> 
                                : <Navigate to="/admin" replace />
                        } 
                    />
                </Route>

                {/* Legal */}
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

            </Routes>
        </BrowserRouter>
    );
}