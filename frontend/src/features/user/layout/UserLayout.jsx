import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from './UserSidebar';

const UserLayout = () => {
  return (
    <div className="flex bg-black h-screen text-white font-sans overflow-hidden">
      <UserSidebar />
      <main className="flex-1 p-8 overflow-y-auto h-full scrollbar-hide">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
