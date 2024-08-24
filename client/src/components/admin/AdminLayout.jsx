import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from './AdminNav';

const AdminLayout = () => {
  return (
    <div className="w-full flex bg-primary min-h-screen">
      <AdminNav />
      <main className="flex-1 ml-16 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;