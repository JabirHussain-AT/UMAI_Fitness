import React, { useEffect, useState } from "react";
import { Loader2, DollarSign, Calendar, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sample mock data for payment details
  const mockData = {
    balanceAmount: 25000,
    dueDate: "2024-10-15",
    paymentHistory: [
      { id: 1, date: "2024-01-15", amount: 10000, status: "Paid" },
      { id: 2, date: "2024-02-15", amount: 15000, status: "Pending" },
      { id: 3, date: "2024-03-15", amount: 20000, status: "Paid" },
      { id: 4, date: "2024-04-15", amount: 12000, status: "Paid" },
      { id: 5, date: "2024-05-15", amount: 17000, status: "Pending" },
      { id: 6, date: "2024-06-15", amount: 18000, status: "Paid" },
      { id: 7, date: "2024-07-15", amount: 13000, status: "Pending" },
    ],
  };

  // Fetch payment details from the API
  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/payment-details");
        if (response.ok) {
          const data = await response.json();
          setPaymentDetails(data);
        } else {
          setPaymentDetails(mockData);
        }
      } catch (err) {
        console.error(err);
        setError("Could not load payment details. Displaying dummy data.");
        setPaymentDetails(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/process-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: paymentDetails.balanceAmount }),
      });

      if (!response.ok) {
        throw new Error("Failed to process payment");
      }

      const data = await response.json();
      alert(data.message);
    } catch (err) {
      alert("Error processing payment: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentDetails.paymentHistory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(paymentDetails.paymentHistory.length / itemsPerPage);

  return (
    <div className="p-6 bg-primary min-h-screen font-serif text-white">
      <div className="bg-secondary rounded-lg shadow-md mb-6 p-6">
        <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="text-green-500" />
            <span className="text-lg font-semibold">
              Balance Amount: ₹{paymentDetails.balanceAmount.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-500" />
            <span className="text-lg">Due Date: {paymentDetails.dueDate}</span>
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Pay Now
        </button>
      </div>

      <div className="bg-secondary rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-secondar border-2 border-white rounded-md">
            <thead className="bg-primary ">
              <tr className="border">
                <th className="py-2 px-4 text-left">Payment ID</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Amount (₹)</th>
                <th className="py-2 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-400 hover:bg-primary">
                  <td className="border py-2 px-4">{payment.id}</td>
                  <td className="border py-2 px-4">{payment.date}</td>
                  <td className="border py-2 px-4">{payment.amount.toLocaleString('en-IN')}</td>
                  <td className="border py-2 px-4">
                    <div className="flex items-center space-x-2">
                      {payment.status === "Paid" ? (
                        <CheckCircle className="text-green-500" />
                      ) : (
                        <XCircle className="text-yellow-500" />
                      )}
                      <span>{payment.status}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          >
            <ChevronLeft />
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;