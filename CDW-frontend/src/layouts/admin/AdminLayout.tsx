import AdminHeader from './AdminHeader.tsx';
import AdminSidebar from './AdminSidebar.tsx';
import React from 'react';

const AdminLayout= ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AdminSidebar />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out lg:ml-[290px]`}
      >
        <AdminHeader />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
