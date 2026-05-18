import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

const ChevronUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

const UserSidebar = () => {
  const [isExploreExpanded, setIsExploreExpanded] = useState(true);
  const [isAccountExpanded, setIsAccountExpanded] = useState(true);

  const exploreLinks = [
    { path: '/user/home', label: 'Home' },
    { path: '/user/movies', label: 'Movies' },
    { path: '/user/series', label: 'Series' },
    { path: '/user/my-list', label: 'My List' },
    { path: '/user/watch-history', label: 'Watch History' },
  ];

  const accountLinks = [
    { path: '/user/profile/overview', label: 'Overview' },
    { path: '/user/profile/settings', label: 'Settings' },
    { path: '/user/profile/security', label: 'Security' },
    { path: '/user/profile/billing', label: 'Billing' },
  ];

  return (
    <aside className="w-64 bg-zinc-900 min-h-screen text-white p-4 flex flex-col gap-6">
      <div className="flex items-center gap-3 px-2 py-4">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold text-xl">A</div>
        <span className="text-xl font-bold tracking-wider">Aurora</span>
      </div>

      <nav className="flex flex-col gap-6">
        <div>
          <button 
            onClick={() => setIsExploreExpanded(!isExploreExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <CompassIcon />
              <span className="font-semibold tracking-wide uppercase text-sm">Explore</span>
            </div>
            {isExploreExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {isExploreExpanded && (
            <div className="flex flex-col gap-1 mt-2 ml-4">
              {exploreLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? 'bg-white text-black font-semibold' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-zinc-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <div>
          <button 
            onClick={() => setIsAccountExpanded(!isAccountExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-gray-300 hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
              <UserIcon />
              <span className="font-semibold tracking-wide uppercase text-sm">Account</span>
            </div>
            {isAccountExpanded ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {isAccountExpanded && (
            <div className="flex flex-col gap-1 mt-2 ml-4">
              {accountLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-lg transition-colors duration-200 ${
                      isActive 
                        ? 'bg-white text-black font-semibold' 
                        : 'text-gray-400 hover:text-gray-200 hover:bg-zinc-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <NavLink
          to="/user/subscription"
          className={({ isActive }) =>
            `w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? 'bg-white text-black font-semibold'
                : 'text-gray-300 hover:text-white hover:bg-zinc-800'
            }`
          }
        >
          <div className="flex items-center gap-3">
            <CreditCardIcon />
            <span className="font-semibold tracking-wide uppercase text-sm">Subscription</span>
          </div>
        </NavLink>
      </nav>
    </aside>
  );
};

export default UserSidebar;
