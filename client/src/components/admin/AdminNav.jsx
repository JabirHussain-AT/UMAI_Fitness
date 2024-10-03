import React, { useState } from 'react';
import { FaUsers, FaMoneyBillWave, FaDumbbell, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', icon: <FaUsers />, path: '/admin/home'  },
    { name: 'Members', icon: <FaUsers />, path: '/admin/members' },
    { name: 'Payments', icon: <FaMoneyBillWave />, path: '/admin/payments' },
    { name: 'Workouts', icon: <FaDumbbell />, path: '/admin/workouts' },
    { name: 'Logout', icon: <FaSignOutAlt />, path: '/logout' },
  ];

  return (
    <nav className={`z-50 bg-primarySupp text-white h-screen fixed left-0 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-center">
          <FaBars size={24} />
        </button>
      </div>
      <ul className="mt-8">
        {navItems.map((item, index) => (
          <li key={index} className="mb-4">
            <Link to={item.path} className="flex items-center p-4 hover:bg-secondery hover:text-black transition-colors duration-300">
              <span className="text-2xl">{item.icon}</span>
              {isOpen && <span className="ml-4">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNav;