import React from 'react';

const AdminHome = () => {
  return (
    <main className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-400">
        Here you can manage users, view statistics, and oversee workout plans.
      </p>
      
      {/* Additional Dashboard Content */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-seconderySupp p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">Total Users</h3>
            <p className="text-2xl">150</p>
          </div>
          <div className="bg-seconderySupp p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">Active Workouts</h3>
            <p className="text-2xl">75</p>
          </div>
          <div className="bg-seconderySupp p-4 rounded-lg text-center">
            <h3 className="text-lg font-bold">Pending Approvals</h3>
            <p className="text-2xl">10</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminHome;
