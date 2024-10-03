import React, { useState, useEffect } from 'react';
import { FaCalendar, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(10);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockPayments = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      amount: Math.floor(Math.random() * 10000) / 100,
      status: Math.random() > 0.5 ? 'approved' : 'pending',
      date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
      description: `Payment for service ${i + 1}`
    }));
    setPayments(mockPayments);
  }, []);

  useEffect(() => {
    filterPayments();
  }, [payments, statusFilter, dateFilter]);

  const filterPayments = () => {
    let filtered = payments;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    // Date filter
    const today = new Date().toISOString().split('T')[0];
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    switch (dateFilter) {
      case 'today':
        filtered = filtered.filter(payment => payment.date === today);
        break;
      case 'weekly':
        filtered = filtered.filter(payment => payment.date >= oneWeekAgo);
        break;
      case 'monthly':
        filtered = filtered.filter(payment => payment.date >= oneMonthAgo);
        break;
      default:
        break;
    }

    setFilteredPayments(filtered);
    setTotalAmount(filtered.reduce((sum, payment) => sum + payment.amount, 0));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Get current payments
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(indexOfFirstPayment, indexOfLastPayment);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-primary text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Payment History</h1>
      
      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <FaFilter className="mr-2" />
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-primarySupp text-white p-2 rounded"
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="flex items-center">
          <FaCalendar className="mr-2" />
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-primarySupp text-white p-2 rounded"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="weekly">This Week</option>
            <option value="monthly">This Month</option>
          </select>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-primarySupp p-4 rounded mb-6">
        <h2 className="text-xl font-bold">Total Amount</h2>
        <p className="text-2xl">${totalAmount.toFixed(2)}</p>
      </div>

      {/* Payments Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-primarySupp">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentPayments.map(payment => (
              <tr key={payment.id} className="border-b border-primarySupp hover:bg-primarySupp">
                <td className="px-6 py-4">{payment.id}</td>
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">{payment.description}</td>
                <td className="px-6 py-4">${payment.amount.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded ${payment.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm">
          Showing {indexOfFirstPayment + 1} to {Math.min(indexOfLastPayment, filteredPayments.length)} of {filteredPayments.length} entries
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
            disabled={indexOfLastPayment >= filteredPayments.length}
            className="px-4 py-2 bg-primarySupp rounded-r-lg hover:bg-secondary hover:text-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;