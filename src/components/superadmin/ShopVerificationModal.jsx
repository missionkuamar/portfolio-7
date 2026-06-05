// components/superadmin/ShopVerificationModal.jsx
import React, { useState } from 'react';
import { X, Upload, Check, XCircle, FileText, User, Mail, Phone, MapPin, Calendar, DollarSign, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ShopVerificationModal({ theme, shop, onClose, onVerify, onReject }) {
  const [verificationNote, setVerificationNote] = useState('');
  const [documents, setDocuments] = useState({
    panCard: null,
    gstCertificate: null,
    addressProof: null,
    businessLicense: null
  });

  const handleDocumentUpload = (type, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocuments(prev => ({ ...prev, [type]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVerify = () => {
    onVerify(shop.id, verificationNote);
    toast.success(`Shop ${shop.name} verified successfully!`);
    onClose();
  };

  const handleReject = () => {
    if (!verificationNote) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    onReject(shop.id, verificationNote);
    toast.error(`Shop ${shop.name} rejected!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`${theme.card} rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className={`text-2xl font-bold ${theme.text}`}>Verify Shop: {shop.name}</h2>
          <button onClick={onClose} className={`p-1 rounded-lg ${theme.cardHover}`}><X size={24} /></button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Shop Information */}
          <div className={`p-4 rounded-xl ${theme.cardHover}`}>
            <h3 className={`font-semibold mb-3 ${theme.text} flex items-center gap-2`}><Store size={18} /> Shop Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div><p className={`text-xs ${theme.textSecondary}`}>Shop Name</p><p className={theme.text}>{shop.name}</p></div>
              <div><p className={`text-xs ${theme.textSecondary}`}>Owner Name</p><p className={theme.text}>{shop.owner}</p></div>
              <div><p className={`text-xs ${theme.textSecondary}`}>Email</p><p className={theme.text}>{shop.email}</p></div>
              <div><p className={`text-xs ${theme.textSecondary}`}>Phone</p><p className={theme.text}>{shop.phone}</p></div>
              <div><p className={`text-xs ${theme.textSecondary}`}>Address</p><p className={theme.text}>{shop.address}</p></div>
              <div><p className={`text-xs ${theme.textSecondary}`}>Registered On</p><p className={theme.text}>{shop.registeredDate}</p></div>
            </div>
          </div>
          
          {/* Document Upload Section */}
          <div className={`p-4 rounded-xl ${theme.cardHover}`}>
            <h3 className={`font-semibold mb-3 ${theme.text} flex items-center gap-2`}><FileText size={18} /> Verification Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { key: 'panCard', label: 'PAN Card', required: true },
                { key: 'gstCertificate', label: 'GST Certificate', required: true },
                { key: 'addressProof', label: 'Address Proof', required: true },
                { key: 'businessLicense', label: 'Business License', required: false }
              ].map(doc => (
                <div key={doc.key} className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                  <label className="cursor-pointer">
                    <Upload size={24} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">{doc.label} {doc.required && <span className="text-red-500">*</span>}</p>
                    <input type="file" className="hidden" accept="image/*,.pdf" onChange={(e) => handleDocumentUpload(doc.key, e.target.files[0])} />
                  </label>
                  {documents[doc.key] && <p className="text-xs text-green-500 mt-1">✓ Uploaded</p>}
                </div>
              ))}
            </div>
          </div>
          
          {/* Verification Note */}
          <div className={`p-4 rounded-xl ${theme.cardHover}`}>
            <label className={`block text-sm font-medium mb-2 ${theme.text}`}>Verification Note / Rejection Reason</label>
            <textarea 
              rows={3} 
              value={verificationNote}
              onChange={(e) => setVerificationNote(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${theme.border} ${theme.card} ${theme.text} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Add notes about verification or reason for rejection..."
            />
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button onClick={handleReject} className="flex-1 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all flex items-center justify-center gap-2">
              <XCircle size={18} /> Reject Shop
            </button>
            <button onClick={handleVerify} className="flex-1 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all flex items-center justify-center gap-2">
              <Check size={18} /> Verify Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}