// components/admin/CustomersTab.jsx
import React, { useState, useMemo } from 'react';
import { 
  Search, ChevronLeft, ChevronRight, Eye, Mail, Phone, Calendar, 
  DollarSign, ShoppingCart, X, Send, MessageCircle, Paperclip, 
  Smile, Star, Award, Clock, MapPin, CreditCard, Download, 
  Filter, MoreVertical, CheckCircle, AlertCircle, Trash2,
  Reply, Forward, Archive, Flag, UserPlus, Bell
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CustomersTab({ theme, customers: initialCustomers }) {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageSubject, setMessageSubject] = useState('');
  const [messageType, setMessageType] = useState('email');
  const [conversations, setConversations] = useState({});
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Sample message history
  const messageHistory = {
    1: [
      { id: 1, from: 'customer', message: 'When will my order #ORD-001 be delivered?', date: '2024-01-10 10:30 AM', read: true },
      { id: 2, from: 'admin', message: 'Your order has been shipped and will arrive by Jan 15th.', date: '2024-01-10 11:00 AM', read: true },
      { id: 3, from: 'customer', message: 'Thank you for the update!', date: '2024-01-10 11:15 AM', read: true },
    ],
    2: [
      { id: 1, from: 'customer', message: 'Do you have any discount coupons?', date: '2024-01-12 02:30 PM', read: false },
      { id: 2, from: 'admin', message: 'Yes, use code WELCOME10 for 10% off!', date: '2024-01-12 03:00 PM', read: false },
    ]
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => 
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
    );
  }, [customers, searchTerm]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    const newMessage = {
      id: Date.now(),
      from: 'admin',
      message: messageText,
      date: new Date().toLocaleString(),
      read: true,
      subject: messageSubject || 'General Inquiry'
    };
    
    setConversations(prev => ({
      ...prev,
      [selectedCustomer.id]: [...(prev[selectedCustomer.id] || []), newMessage]
    }));
    
    toast.success(`Message sent to ${selectedCustomer.name} via ${messageType === 'email' ? 'Email' : 'SMS'}`);
    setMessageText('');
    setMessageSubject('');
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error('Please enter a reply');
      return;
    }
    
    const newReply = {
      id: Date.now(),
      from: 'admin',
      message: replyText,
      date: new Date().toLocaleString(),
      read: true
    };
    
    setConversations(prev => ({
      ...prev,
      [selectedCustomer.id]: [...(prev[selectedCustomer.id] || []), newReply]
    }));
    
    toast.success('Reply sent successfully');
    setReplyText('');
  };

  const handleBulkMessage = () => {
    toast.success(`Message sent to all active customers!`);
  };

  const getUnreadCount = (customerId) => {
    const conv = conversations[customerId] || messageHistory[customerId] || [];
    return conv.filter(m => m.from === 'customer' && !m.read).length;
  };

  return (
    <div className="space-y-6">
      {/* Header with Bulk Message Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${theme.text}`}>Customer Management</h2>
          <p className={`text-sm ${theme.textSecondary} mt-1`}>Manage customers and send messages</p>
        </div>
        <div className="flex gap-2">
          <button onClick={handleBulkMessage} className={`${theme.primary} text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm`}>
            <Mail size={16} /> Broadcast Message
          </button>
          <button className={`px-3 py-2 rounded-lg ${theme.cardHover} flex items-center gap-2 text-sm`}>
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme.textSecondary}`} size={18} />
          <input 
            type="text" 
            placeholder="Search customers by name, email, or phone..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`} 
          />
        </div>
        <select 
          value={itemsPerPage} 
          onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} 
          className={`px-3 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} text-sm`}
        >
          <option value={8}>Show 8</option>
          <option value={12}>Show 12</option>
          <option value={24}>Show 24</option>
        </select>
      </div>
      
      {/* Customers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {paginatedCustomers.map(customer => {
          const unreadCount = getUnreadCount(customer.id);
          return (
            <div 
              key={customer.id} 
              className={`${theme.card} rounded-xl p-4 hover:shadow-xl transition-all transform hover:-translate-y-1 border ${theme.border} cursor-pointer group`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg relative">
                  {customer.name.charAt(0)}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className={`font-semibold ${theme.text} truncate`}>{customer.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className={`text-xs ${theme.textSecondary}`}>4.5</span>
                    </div>
                  </div>
                  <p className={`text-xs ${theme.textSecondary} truncate`}>{customer.email}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-xs ${theme.textSecondary}`}>Orders: {customer.orders}</span>
                    <span className={`text-xs font-semibold ${theme.text}`}>${customer.spent}</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${customer.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}>
                      {customer.status}
                    </span>
                    <span className={`text-xs ${theme.textSecondary}`}>Since {customer.joinDate}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); setShowDetailModal(true); }} 
                      className="flex-1 py-1.5 rounded-lg border border-blue-500 text-blue-500 text-xs hover:bg-blue-500/10 transition-all flex items-center justify-center gap-1"
                    >
                      <Eye size={12} /> View
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedCustomer(customer); setShowMessageModal(true); }} 
                      className="flex-1 py-1.5 rounded-lg border border-purple-500 text-purple-500 text-xs hover:bg-purple-500/10 transition-all flex items-center justify-center gap-1"
                    >
                      <Mail size={12} /> Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50' : theme.cardHover}`}>
            <ChevronLeft size={20} />
          </button>
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) pageNum = currentPage - 3 + i;
            if (pageNum > totalPages) return null;
            return (
              <button key={i} onClick={() => setCurrentPage(pageNum)} className={`px-4 py-2 rounded-lg ${currentPage === pageNum ? theme.primary + ' text-white' : theme.cardHover}`}>
                {pageNum}
              </button>
            );
          })}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50' : theme.cardHover}`}>
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Customer Detail Modal with Message History */}
      {showDetailModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowDetailModal(false)}>
          <div className={`${theme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Customer Details</h2>
              <button onClick={() => setShowDetailModal(false)} className={`p-1 rounded-lg ${theme.cardHover}`}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Customer Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`text-2xl font-bold ${theme.text}`}>{selectedCustomer.name}</h3>
                  <div className="flex gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${selectedCustomer.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}>
                      {selectedCustomer.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <Star size={14} className="text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Mail size={16} className={theme.textSecondary} />
                  <div><p className={`text-xs ${theme.textSecondary}`}>Email</p><p className={theme.text}>{selectedCustomer.email}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className={theme.textSecondary} />
                  <div><p className={`text-xs ${theme.textSecondary}`}>Phone</p><p className={theme.text}>{selectedCustomer.phone}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className={theme.textSecondary} />
                  <div><p className={`text-xs ${theme.textSecondary}`}>Member Since</p><p className={theme.text}>{selectedCustomer.joinDate}</p></div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className={theme.textSecondary} />
                  <div><p className={`text-xs ${theme.textSecondary}`}>Last Order</p><p className={theme.text}>{selectedCustomer.lastOrder || 'No orders yet'}</p></div>
                </div>
              </div>
              
              {/* Purchase Stats */}
              <div className={`p-4 rounded-xl ${theme.cardHover} mb-6`}>
                <h3 className={`font-semibold mb-3 ${theme.text}`}>Purchase Statistics</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className={`text-2xl font-bold ${theme.text}`}>{selectedCustomer.orders}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>Total Orders</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold text-green-500`}>${selectedCustomer.spent}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>Total Spent</p>
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${theme.text}`}>${Math.round(selectedCustomer.spent / selectedCustomer.orders) || 0}</p>
                    <p className={`text-xs ${theme.textSecondary}`}>Avg Order Value</p>
                  </div>
                </div>
              </div>
              
              {/* Message History Section */}
              <div className={`rounded-xl ${theme.cardHover} overflow-hidden mb-4`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className={`font-semibold ${theme.text} flex items-center gap-2`}>
                    <MessageCircle size={18} /> Message History
                  </h3>
                  <button 
                    onClick={() => { setShowDetailModal(false); setShowMessageModal(true); }}
                    className={`px-3 py-1 rounded-lg ${theme.primary} text-white text-sm flex items-center gap-1`}
                  >
                    <Mail size={14} /> New Message
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                  {(conversations[selectedCustomer.id] || messageHistory[selectedCustomer.id] || []).length === 0 ? (
                    <p className={`text-center ${theme.textSecondary} py-4`}>No messages yet. Send a message to this customer.</p>
                  ) : (
                    (conversations[selectedCustomer.id] || messageHistory[selectedCustomer.id] || []).map(msg => (
                      <div key={msg.id} className={`flex ${msg.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] p-3 rounded-lg ${msg.from === 'admin' ? `${theme.primary} text-white` : `bg-gray-100 dark:bg-gray-800 ${theme.text}`}`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${msg.from === 'admin' ? 'text-blue-100' : theme.textSecondary}`}>{msg.date}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => { setShowDetailModal(false); setShowMessageModal(true); }}
                  className={`flex-1 ${theme.primary} text-white py-2 rounded-lg flex items-center justify-center gap-2`}
                >
                  <Mail size={18} /> Send Message
                </button>
                <button 
                  onClick={() => window.location.href = `tel:${selectedCustomer.phone}`}
                  className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text} flex items-center justify-center gap-2`}
                >
                  <Phone size={18} /> Call Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {showMessageModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => { setShowMessageModal(false); setMessageText(''); setMessageSubject(''); }}>
          <div className={`${theme.card} rounded-2xl max-w-2xl w-full`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
              <h2 className={`text-2xl font-bold ${theme.text}`}>Send Message to {selectedCustomer.name}</h2>
              <button onClick={() => { setShowMessageModal(false); setMessageText(''); setMessageSubject(''); }} className={`p-1 rounded-lg ${theme.cardHover}`}>
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Message Type Selection */}
              <div className="flex gap-3 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit">
                <button 
                  onClick={() => setMessageType('email')}
                  className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${messageType === 'email' ? `${theme.primary} text-white` : theme.textSecondary}`}
                >
                  <Mail size={16} /> Email
                </button>
                <button 
                  onClick={() => setMessageType('sms')}
                  className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${messageType === 'sms' ? `${theme.primary} text-white` : theme.textSecondary}`}
                >
                  <Phone size={16} /> SMS
                </button>
              </div>
              
              {/* Customer Info Display */}
              <div className={`p-3 rounded-lg ${theme.cardHover} flex items-center gap-3`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <p className={`font-medium ${theme.text}`}>{selectedCustomer.name}</p>
                  <p className={`text-xs ${theme.textSecondary}`}>{messageType === 'email' ? selectedCustomer.email : selectedCustomer.phone}</p>
                </div>
              </div>
              
              {/* Subject Line */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Subject</label>
                <input 
                  type="text" 
                  placeholder="Enter message subject..." 
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              {/* Message Body */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Message</label>
                <textarea 
                  rows={5}
                  placeholder="Type your message here..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                />
              </div>
              
              {/* Message Actions */}
              <div className="flex gap-2">
                <button className={`p-2 rounded-lg ${theme.cardHover}`}><Paperclip size={18} /></button>
                <button className={`p-2 rounded-lg ${theme.cardHover}`}><Smile size={18} /></button>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => { setShowMessageModal(false); setMessageText(''); setMessageSubject(''); }}
                  className={`flex-1 px-4 py-2 rounded-lg ${theme.cardHover} ${theme.text}`}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendMessage}
                  className={`flex-1 px-4 py-2 rounded-lg ${theme.primary} text-white flex items-center justify-center gap-2`}
                >
                  <Send size={18} /> Send {messageType === 'email' ? 'Email' : 'SMS'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}