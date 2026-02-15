import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Menubar from "./components/Menubar";

import Home from "./pages/Home";
import Series from "./pages/SreirsPage";
import Movies from "./pages/MoviePage";
import MyList from "./pages/MyListPage";

import Search from "./pages/Search";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

import VideoPlayer from "./pages/VideoPlayer";

import Publisher from "./pages/PublisherPage"
import Admin from "./pages/AdminPage";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  switch (currentUser) {
    case "viewer":
      return (
        <BrowserRouter>
          <Menubar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/series" element={<Series />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/mylist" element={<MyList />} />

            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/video" element={<VideoPlayer />} />
          </Routes>
        </BrowserRouter>
      )
    case "publisher":
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Publisher />} />
          </Routes>
        </BrowserRouter>
      )
    case "admin":
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      )
    default:
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
          </Routes>
        </BrowserRouter>
      )
  }
}

export default App;
