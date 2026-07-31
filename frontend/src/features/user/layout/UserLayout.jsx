import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';
import { UserProvider } from '../../../context/UserContext';

const UserLayout = () => {
  return (
    <UserProvider>
      <div className="flex bg-black h-screen text-white font-sans overflow-hidden">
        <UserSidebar />
        <main className="flex-1 p-8 overflow-y-auto h-full scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </UserProvider>
  );
};

export default UserLayout;
