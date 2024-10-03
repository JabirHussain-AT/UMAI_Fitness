import React, { useState, useEffect } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight, FaPlus, FaEye, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import axios from 'axios';

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [newMember, setNewMember] = useState({ 
    name: '', 
    email: '', 
    phoneNumber: '', 
    address: '', 
    status: 'active' 
  });

  // Mock data - replace this with actual API call
  useEffect(() => {
    const mockMembers = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Member ${i + 1}`,
      email: `member${i + 1}@example.com`,
      phoneNumber: `123-456-78${(i % 10).toString().padStart(2, '0')}`,
      address: `${i + 1} Example Street, City, Country`,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString(),
      status: Math.random() > 0.5 ? 'active' : 'inactive',
    }));
    setMembers(mockMembers);
  }, []);

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current members for pagination
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = filteredMembers.slice(indexOfFirstMember, indexOfLastMember);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle new member form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      try {
        // Make API call to update member
        await axios.put(`/api/members/${selectedMember.id}`, newMember);
        // Update local state
        setMembers(members.map(member => 
          member.id === selectedMember.id ? { ...member, ...newMember } : member
        ));
      } catch (error) {
        console.error("Error updating member:", error);
      }
    } else {
      const newId = members.length > 0 ? members[members.length - 1].id + 1 : 1;
      const memberToAdd = {
        ...newMember,
        id: newId,
        joinDate: new Date().toLocaleDateString()
      };
      setMembers([...members, memberToAdd]);
      setCurrentPage(Math.ceil((members.length + 1) / membersPerPage));
    }
    setNewMember({ name: '', email: '', phoneNumber: '', address: '', status: 'active' });
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  // Handle status change
  const handleStatusChange = (id) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, status: member.status === 'active' ? 'inactive' : 'active' } : member
    ));
  };

  // Handle edit button click
  const handleEdit = (member) => {
    setSelectedMember(member);
    setNewMember({ ...member });
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-primary text-white p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Member Info</h1>
        <button
          onClick={() => {
            setIsEditMode(false);
            setNewMember({ name: '', email: '', phoneNumber: '', address: '', status: 'active' });
            setIsModalOpen(true);
          }}
          className=" bg-secondery text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors duration-300 flex items-center"
        >
          <FaPlus className="inline mr-2" /> Add New Member
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search members..."
          className="w-full p-3 pl-10 bg-primarySupp text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs uppercase bg-primarySupp">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Phone Number</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">Join Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map(member => (
              <tr key={member.id} className="border-b border-primarySupp hover:bg-primarySupp">
                <td className="px-6 py-4">{member.id}</td>
                <td className="px-6 py-4">{member.name}</td>
                <td className="px-6 py-4">{member.email}</td>
                <td className="px-6 py-4">{member.phoneNumber}</td>
                <td className="px-6 py-4">{member.address}</td>
                <td className="px-6 py-4">{member.joinDate}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded ${member.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center">
                  <button className="mr-2 text-blue-400 hover:text-blue-600">
                    <FaEye />
                  </button>
                  <button 
                    className="mr-2 text-yellow-400 hover:text-yellow-600"
                    onClick={() => handleEdit(member)}
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleStatusChange(member.id)}
                    className={`${member.status === 'active' ? 'text-green-400 hover:text-green-600' : 'text-red-400 hover:text-red-600'}`}
                  >
                    {member.status === 'active' ? <FaToggleOn /> : <FaToggleOff />}
                  </button>
                </td>
              </tr>
            ))}
            {currentMembers.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">No members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm">
          Showing {indexOfFirstMember + 1} to {Math.min(indexOfLastMember, filteredMembers.length)} of {filteredMembers.length} entries
        </p>
        <div className="flex">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-primarySupp rounded-l-lg hover:bg-secondary hover:text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastMember >= filteredMembers.length}
            className="px-4 py-2 bg-primarySupp rounded-r-lg hover:bg-secondary hover:text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Add/Edit Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-primary p-8 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Member' : 'Add New Member'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full p-2 bg-primarySupp text-white rounded"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  className="w-full p-2 bg-primarySupp text-white rounded"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="phoneNumber">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={newMember.phoneNumber}
                  onChange={(e) => setNewMember({...newMember, phoneNumber: e.target.value})}
                  className="w-full p-2 bg-primarySupp text-white rounded"
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={newMember.address}
                  onChange={(e) => setNewMember({...newMember, address: e.target.value})}
                  className="w-full p-2 bg-primarySupp text-white rounded"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  value={newMember.status}
                  onChange={(e) => setNewMember({...newMember, status: e.target.value})}
                  className="w-full p-2 bg-primarySupp text-white rounded"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-secondery text-black rounded hover:bg-opacity-80"
                >
                  {isEditMode ? 'Save Changes' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;