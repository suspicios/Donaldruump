import React, { useState } from 'react';
import { Home, Users, DollarSign, User, Menu, LogOut, CheckCircle, Clock, XCircle, Plus, Upload, FileText } from 'lucide-react';

export default function XPayDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const [newAccount, setNewAccount] = useState({ userId: '', bank: '', accountNumber: '', ifsc: '' });

  const validCredentials = { username: 'admin', password: 'xpay2024' };

  const [accounts, setAccounts] = useState([
    { id: 1, userId: 'USER001', bank: 'ICICI Bank', status: 'verified', addedDate: 'Today', accountNumber: '****4521', running: true },
    { id: 2, userId: 'USER002', bank: 'HDFC Bank', status: 'pending', addedDate: 'Today', accountNumber: '****7892', running: false },
    { id: 3, userId: 'USER003', bank: 'SBI', status: 'pending', addedDate: 'Today', accountNumber: '****3456', running: false },
    { id: 4, userId: 'USER004', bank: 'Axis Bank', status: 'verified', addedDate: '2024-09-30', accountNumber: '****9087', running: true },
    { id: 5, userId: 'USER005', bank: 'Kotak', status: 'rejected', addedDate: '2024-10-01', accountNumber: '****6543', running: false },
  ]);

  const [apkUsers, setApkUsers] = useState([
    { id: 1, userId: 'USER001', connected: true, isTeam: false, lastActive: '2 mins ago', linkedAccount: 1 },
    { id: 2, userId: 'USER006', connected: true, isTeam: true, lastActive: '5 mins ago', linkedAccount: null },
    { id: 3, userId: 'USER007', connected: true, isTeam: false, lastActive: '10 mins ago', linkedAccount: 4 },
    { id: 4, userId: 'USER008', connected: false, isTeam: false, lastActive: '2 hours ago', linkedAccount: null },
    { id: 5, userId: 'USER009', connected: true, isTeam: true, lastActive: '1 min ago', linkedAccount: null },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, userId: 'USER001', bank: 'ICICI Bank', amount: 50000, type: 'DMR', creditDebit: 'Credit', source: 'NEFT', mqr: 'With MQR', status: 'completed', date: 'Today 10:30 AM', txnId: 'TXN001234' },
    { id: 2, userId: 'USER004', bank: 'Axis Bank', amount: 75000, type: 'DMR', creditDebit: 'Debit', source: 'RTGS', mqr: 'Without MQR', status: 'completed', date: 'Today 09:15 AM', txnId: 'TXN001235' },
    { id: 3, userId: 'USER001', bank: 'ICICI Bank', amount: 30000, type: 'DMR', creditDebit: 'Credit', source: 'IMPS', mqr: 'With MQR', status: 'pending', date: 'Today 08:45 AM', txnId: 'TXN001236' },
    { id: 4, userId: 'USER004', bank: 'Axis Bank', amount: 100000, type: 'DMR', creditDebit: 'Credit', source: 'NEFT', mqr: 'Without MQR', status: 'completed', date: 'Yesterday 05:20 PM', txnId: 'TXN001237' },
    { id: 5, userId: 'USER007', bank: 'HDFC Bank', amount: 45000, type: 'DMR', creditDebit: 'Debit', source: 'UPI', mqr: 'With MQR', status: 'completed', date: 'Today 11:20 AM', txnId: 'TXN001238' },
  ]);

  const [withdrawals] = useState([
    { id: 1, userId: 'USER001', amount: 5000, commission: 250, status: 'pending', date: 'Today' },
    { id: 2, userId: 'USER003', amount: 3000, commission: 150, status: 'completed', date: '2024-10-01' },
    { id: 3, userId: 'USER007', amount: 8000, commission: 400, status: 'pending', date: 'Today' },
    { id: 4, userId: 'USER002', amount: 2000, commission: 100, status: 'completed', date: '2024-09-30' },
  ]);

  const [showWithdrawRequest, setShowWithdrawRequest] = useState(false);
  const [withdrawRequest, setWithdrawRequest] = useState({ usdtWallet: '', amount: '' });
  const withdrawalBalance = 500000;

  const handleWithdrawRequest = () => {
    if (withdrawRequest.usdtWallet && withdrawRequest.amount) {
      alert(`Withdrawal request submitted!\nUSDT Wallet: ${withdrawRequest.usdtWallet}\nAmount: ₹${withdrawRequest.amount}`);
      setWithdrawRequest({ usdtWallet: '', amount: '' });
      setShowWithdrawRequest(false);
    }
  };

  const handleLogin = () => {
    if (loginForm.username === validCredentials.username && 
        loginForm.password === validCredentials.password) {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials! Use username: admin, password: xpay2024');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginForm({ username: '', password: '' });
  };

  const toggleTeamStatus = (id) => {
    setApkUsers(apkUsers.map(user => 
      user.id === id ? { ...user, isTeam: !user.isTeam } : user
    ));
  };

  const markAsVerified = (id) => {
    setAccounts(accounts.map(acc => 
      acc.id === id ? { ...acc, status: 'verified', running: true } : acc
    ));
  };

  const handleAddAccount = () => {
    if (newAccount.userId && newAccount.bank) {
      const account = {
        id: accounts.length + 1,
        userId: newAccount.userId,
        bank: newAccount.bank,
        status: 'pending',
        addedDate: 'Today',
        accountNumber: '****' + Math.floor(1000 + Math.random() * 9000),
        running: false
      };
      setAccounts([...accounts, account]);
      setNewAccount({ userId: '', bank: '', accountNumber: '', ifsc: '' });
      setShowAddAccount(false);
    }
  };

  const linkAccountToUser = (userId, accountId) => {
    setApkUsers(apkUsers.map(user => 
      user.userId === userId ? { ...user, linkedAccount: accountId } : user
    ));
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">X支付</h1>
            <p className="text-gray-400">Admin Dashboard Login</p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Username</label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter password"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              Login
            </button>
            <div className="text-center text-xs text-gray-500 mt-4">
              Demo: admin / xpay2024
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderHome = () => {
    const verified = accounts.filter(a => a.status === 'verified').length;
    const pending = accounts.filter(a => a.status === 'pending').length;
    const rejected = accounts.filter(a => a.status === 'rejected').length;
    const runningAccounts = accounts.filter(a => a.running).length;
    const totalCommission = 1500000;

    return (
      <div className="space-y-6">
        <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-3 mb-4">
          <p className="text-yellow-500 text-center font-semibold text-sm">⚠️ You are in DEMO MODE - Kindly activate XPay to avail all features</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBulkAdd(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
            >
              <Upload size={16} />
              Bulk Add
            </button>
            <button
              onClick={() => setShowAddAccount(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
            >
              <Plus size={16} />
              Add Account
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-xs">Verified</p>
                <p className="text-2xl font-bold text-white mt-1">{verified}</p>
              </div>
              <CheckCircle className="text-white opacity-80" size={28} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-xs">Pending</p>
                <p className="text-2xl font-bold text-white mt-1">{pending}</p>
              </div>
              <Clock className="text-white opacity-80" size={28} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs">Rejected</p>
                <p className="text-2xl font-bold text-white mt-1">{rejected}</p>
              </div>
              <XCircle className="text-white opacity-80" size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Running AC</p>
                <p className="text-2xl font-bold text-white mt-1">{runningAccounts}</p>
              </div>
              <CheckCircle className="text-white opacity-80" size={28} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs">Commission</p>
                <p className="text-xl font-bold text-white mt-1">₹15L</p>
              </div>
              <DollarSign className="text-white opacity-80" size={28} />
            </div>
          </div>
        </div>

        {showAddAccount && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Add Bank Account</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">User ID</label>
                  <input
                    type="text"
                    value={newAccount.userId}
                    onChange={(e) => setNewAccount({ ...newAccount, userId: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter User ID"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Bank Name</label>
                  <input
                    type="text"
                    value={newAccount.bank}
                    onChange={(e) => setNewAccount({ ...newAccount, bank: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter Bank Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Account Number</label>
                  <input
                    type="text"
                    value={newAccount.accountNumber}
                    onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter Account Number"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">IFSC Code</label>
                  <input
                    type="text"
                    value={newAccount.ifsc}
                    onChange={(e) => setNewAccount({ ...newAccount, ifsc: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Enter IFSC Code"
                  />
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleAddAccount}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Add Account
                  </button>
                  <button
                    onClick={() => setShowAddAccount(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showBulkAdd && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Bulk Account Addition</h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                  <p className="text-gray-400 text-sm mb-2">Upload CSV or Excel file</p>
                  <p className="text-gray-500 text-xs">Format: UserID, Bank, Account Number, IFSC</p>
                  <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Choose File
                  </button>
                </div>
                <button
                  onClick={() => setShowBulkAdd(false)}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">Bank Account Additions</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Bank</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Account</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date Added</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {accounts.map((acc) => (
                  <tr key={acc.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 text-sm text-gray-300">{acc.userId}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{acc.bank}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{acc.accountNumber}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        acc.status === 'verified' ? 'bg-green-900 text-green-300' :
                        acc.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}>
                        {acc.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{acc.addedDate}</td>
                    <td className="px-6 py-4">
                      {acc.status === 'pending' && (
                        <button
                          onClick={() => markAsVerified(acc.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors"
                        >
                          Mark Verified
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderAPKConnections = () => {
    const connected = apkUsers.filter(u => u.connected).length;
    const teamMembers = apkUsers.filter(u => u.isTeam).length;
    const pendingAccounts = accounts.filter(a => a.status === 'pending');

    return (
      <div className="space-y-6">
        <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-3 mb-4">
          <p className="text-yellow-500 text-center font-semibold text-sm">⚠️ You are in DEMO MODE - Kindly activate XPay to avail all features</p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">APK Connections</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Connected Users</p>
                <p className="text-2xl font-bold text-white mt-1">{connected}</p>
              </div>
              <Users className="text-white opacity-80" size={36} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-xs">Team Members</p>
                <p className="text-2xl font-bold text-white mt-1">{teamMembers}</p>
              </div>
              <User className="text-white opacity-80" size={36} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-xl font-semibold text-white">User Connections</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Linked Account</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Team Member</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {apkUsers.map((user) => {
                  const linkedAcc = accounts.find(a => a.id === user.linkedAccount);
                  return (
                    <tr key={user.id} className="hover:bg-gray-750">
                      <td className="px-6 py-4 text-sm text-gray-300">{user.userId}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.connected ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
                        }`}>
                          {user.connected ? 'CONNECTED' : 'OFFLINE'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">{user.lastActive}</td>
                      <td className="px-6 py-4">
                        <select
                          value={user.linkedAccount || ''}
                          onChange={(e) => linkAccountToUser(user.userId, parseInt(e.target.value))}
                          className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm border border-gray-600 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Account</option>
                          {pendingAccounts.map(acc => (
                            <option key={acc.id} value={acc.id}>
                              {acc.userId} - {acc.bank}
                            </option>
                          ))}
                        </select>
                        {linkedAcc && (
                          <div className="text-xs text-gray-400 mt-1">
                            {linkedAcc.bank} - {linkedAcc.accountNumber}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleTeamStatus(user.id)}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                            user.isTeam 
                              ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                          }`}
                        >
                          {user.isTeam ? 'TEAM' : 'REGULAR'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderDMRReport = () => {
    const totalTransactions = transactions.reduce((sum, t) => sum + t.amount, 0);
    const completedTransactions = transactions.filter(t => t.status === 'completed').length;

    return (
      <div className="space-y-6">
        <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-3 mb-4">
          <p className="text-yellow-500 text-center font-semibold text-sm">⚠️ You are in DEMO MODE - Kindly activate XPay to avail all features</p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">DMR Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-xs">Total Transactions</p>
                <p className="text-2xl font-bold text-white mt-1">₹{(totalTransactions/1000).toFixed(0)}K</p>
              </div>
              <FileText className="text-white opacity-80" size={36} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal-100 text-xs">Completed</p>
                <p className="text-2xl font-bold text-white mt-1">{completedTransactions}</p>
              </div>
              <CheckCircle className="text-white opacity-80" size={36} />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Transaction History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">TXN ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Bank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Credit/Debit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">MQR Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-750">
                    <td className="px-4 py-3 text-xs text-gray-300 font-mono">{txn.txnId}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">{txn.userId}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">{txn.bank}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-blue-400">₹{txn.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">{txn.type}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        txn.creditDebit === 'Credit' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                      }`}>
                        {txn.creditDebit}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-300">{txn.source}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        txn.mqr === 'With MQR' ? 'bg-purple-900 text-purple-300' : 'bg-gray-700 text-gray-300'
                      }`}>
                        {txn.mqr}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        txn.status === 'completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {txn.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-300">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderWithdrawals = () => {
    const totalCommission = withdrawals.reduce((sum, w) => sum + w.commission, 0);
    const pendingCommission = withdrawals.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.commission, 0);

    return (
      <div className="space-y-6">
        <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-3 mb-4">
          <p className="text-yellow-500 text-center font-semibold text-sm">⚠️ You are in DEMO MODE - Kindly activate XPay to avail all features</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">USDT Withdraw Commission</h2>
          <button
            onClick={() => setShowWithdrawRequest(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm"
          >
            <DollarSign size={16} />
            Request Withdrawal
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs">Withdrawal Balance</p>
                <p className="text-2xl font-bold text-white mt-1">₹{withdrawalBalance.toLocaleString()}</p>
              </div>
              <DollarSign className="text-white opacity-80" size={36} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs">Total Commission</p>
                <p className="text-2xl font-bold text-white mt-1">₹{totalCommission}</p>
              </div>
              <CheckCircle className="text-white opacity-80" size={36} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-xs">Pending Commission</p>
                <p className="text-2xl font-bold text-white mt-1">₹{pendingCommission}</p>
              </div>
              <Clock className="text-white opacity-80" size={36} />
            </div>
          </div>
        </div>

        {showWithdrawRequest && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Request Withdrawal Settlement</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">USDT Wallet Address</label>
                  <input
                    type="text"
                    value={withdrawRequest.usdtWallet}
                    onChange={(e) => setWithdrawRequest({ ...withdrawRequest, usdtWallet: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                    placeholder="Enter USDT Wallet Address"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2 text-sm">Withdrawal Amount (₹)</label>
                  <input
                    type="number"
                    value={withdrawRequest.amount}
                    onChange={(e) => setWithdrawRequest({ ...withdrawRequest, amount: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500"
                    placeholder="Enter Amount"
                    max={withdrawalBalance}
                  />
                  <p className="text-xs text-gray-400 mt-1">Available Balance: ₹{withdrawalBalance.toLocaleString()}</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleWithdrawRequest}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors"
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={() => setShowWithdrawRequest(false)}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Withdrawal History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Commission</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="hover:bg-gray-750">
                    <td className="px-4 py-3 text-xs text-gray-300">{withdrawal.userId}</td>
                    <td className="px-4 py-3 text-xs text-gray-300">₹{withdrawal.amount}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-green-400">₹{withdrawal.commission}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        withdrawal.status === 'completed' ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {withdrawal.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-300">{withdrawal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderProfiler = () => {
    return (
      <div className="space-y-6">
        <div className="bg-yellow-500/10 border-2 border-yellow-500 rounded-lg p-3 mb-4">
          <p className="text-yellow-500 text-center font-semibold text-sm">⚠️ You are in DEMO MODE - Kindly activate XPay to avail all features</p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Admin Profile</h2>
        
        <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User size={48} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Administrator</h3>
              <p className="text-gray-400">admin@xpay.com</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Username</p>
              <p className="text-white font-semibold">admin</p>
            </div>
            
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Role</p>
              <p className="text-white font-semibold">Super Admin</p>
            </div>
            
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Last Login</p>
              <p className="text-white font-semibold">Today, 10:30 AM</p>
            </div>
            
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <p className="text-gray-400 text-sm mb-1">Access Level</p>
              <p className="text-white font-semibold">Full Access</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700 rounded-lg">
            <h4 className="text-white font-semibold mb-2">System Permissions</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle size={16} className="text-green-400 mr-2" />
                <span className="text-gray-300 text-sm">Manage Bank Accounts</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-green-400 mr-2" />
                <span className="text-gray-300 text-sm">View APK Connections</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-green-400 mr-2" />
                <span className="text-gray-300 text-sm">Process Withdrawals</span>
              </div>
              <div className="flex items-center">
                <CheckCircle size={16} className="text-green-400 mr-2" />
                <span className="text-gray-300 text-sm">System Configuration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-800 border-r border-gray-700 transition-all duration-300 relative`}>
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-2xl font-bold text-white">X支付</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
            <Menu size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setCurrentPage('home')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'home' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Home size={20} />
            {sidebarOpen && <span>Home</span>}
          </button>
          
          <button
            onClick={() => setCurrentPage('apk')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'apk' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Users size={20} />
            {sidebarOpen && <span>APK Connections</span>}
          </button>

          <button
            onClick={() => setCurrentPage('dmr')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'dmr' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <FileText size={20} />
            {sidebarOpen && <span>DMR Report</span>}
          </button>
          
          <button
            onClick={() => setCurrentPage('withdrawals')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'withdrawals' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <DollarSign size={20} />
            {sidebarOpen && <span>Withdrawals</span>}
          </button>
          
          <button
            onClick={() => setCurrentPage('profile')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              currentPage === 'profile' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <User size={20} />
            {sidebarOpen && <span>Profile</span>}
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {currentPage === 'home' && renderHome()}
          {currentPage === 'apk' && renderAPKConnections()}
          {currentPage === 'dmr' && renderDMRReport()}
          {currentPage === 'withdrawals' && renderWithdrawals()}
          {currentPage === 'profile' && renderProfiler()}
        </div>
      </div>
    </div>
  );
}