// components/ShopModal.jsx - Detailed Shop Modal
import React from 'react';
import { Store, Star, MapPin, Package, Eye, DollarSign, Mail, Phone, Globe,  Calendar, Check, X, ExternalLink, Heart, Share2, Award } from 'lucide-react';
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
export default function ShopModal({ shop, onClose, theme }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`${theme.card} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-inherit">
          <h2 className={`text-2xl font-bold ${theme.text}`}>{shop.name}</h2>
          <button onClick={onClose} className={`p-2 rounded-lg ${theme.cardHover}`}><X size={24} /></button>
        </div>
        
        <div className="p-6">
          <img src={shop.image} alt={shop.name} className="w-full h-64 object-cover rounded-xl mb-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${theme.text}`}>Shop Information</h3>
              <div className="space-y-2">
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><Store size={18} /> Owner: {shop.owner}</p>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><MapPin size={18} /> Location: {shop.location}</p>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><Package size={18} /> Products: {shop.products}</p>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><Eye size={18} /> Total Views: {shop.views.toLocaleString()}</p>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><DollarSign size={18} /> Revenue: ${shop.revenue.toLocaleString()}</p>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><Calendar size={18} /> Established: {shop.established}</p>
              </div>
            </div>
            
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${theme.text}`}>Contact Information</h3>
              <div className="space-y-2">
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><Mail size={18} /> {shop.email}</p>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><Phone size={18} /> {shop.phone}</p>
                <p className={`flex items-center gap-2 ${theme.textSecondary}`}><Globe size={18} /> {shop.website}</p>
              </div>
              <div className="flex gap-3 mt-4">
                <a href="#" className={`p-2 rounded-lg ${theme.cardHover}`}><FaSquareInstagram size={20} /></a>
                <a href="#" className={`p-2 rounded-lg ${theme.cardHover}`}><FaXTwitter size={20} /></a>
                <a href="#" className={`p-2 rounded-lg ${theme.cardHover}`}><FaFacebook  size={20} /></a>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className={`text-lg font-semibold mb-2 ${theme.text}`}>About</h3>
            <p className={theme.textSecondary}>{shop.description}</p>
          </div>
          
          <div className="mt-6">
            <h3 className={`text-lg font-semibold mb-2 ${theme.text}`}>Tags</h3>
            <div className="flex flex-wrap gap-2">{shop.tags.map(tag => (<span key={tag} className={`px-3 py-1 rounded-full text-sm ${theme.cardHover} ${theme.textSecondary}`}>#{tag}</span>))}</div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button className={`flex-1 ${theme.primary} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2`}><ExternalLink size={18} /> Visit Shop</button>
            <button className={`px-4 py-3 rounded-xl ${theme.cardHover} flex items-center gap-2`}><Heart size={18} /></button>
            <button className={`px-4 py-3 rounded-xl ${theme.cardHover} flex items-center gap-2`}><Share2 size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}