// components/Footer.jsx
import React from 'react';
import { useApp } from '../App';
import {  Mail, Phone, MapPin, Store } from 'lucide-react';
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
export default function Footer() {
  const { theme } = useApp();

  return (
    <footer className={`${theme.card} border-t ${theme.border} mt-16 py-12`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Store className="text-blue-500" size={24} />
              <h3 className={`text-lg font-bold ${theme.text}`}>MujahSaaS</h3>
            </div>
            <p className={`text-sm ${theme.textSecondary} mb-4`}>
              Enterprise e-commerce solution for modern businesses.
            </p>
            <div className="flex gap-3">
              <FaFacebook  size={18} className={`${theme.textSecondary} cursor-pointer hover:${theme.text}`} />
              <FaXTwitter size={18} className={`${theme.textSecondary} cursor-pointer hover:${theme.text}`} />
              <FaInstagram size={18} className={`${theme.textSecondary} cursor-pointer hover:${theme.text}`} />
              <FaLinkedin size={18} className={`${theme.textSecondary} cursor-pointer hover:${theme.text}`} />
              <FaGithub size={18} className={`${theme.textSecondary} cursor-pointer hover:${theme.text}`} />
            </div>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-3 ${theme.text}`}>Quick Links</h4>
            <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Contact</li>
              <li className="hover:underline cursor-pointer">Blog</li>
              <li className="hover:underline cursor-pointer">Careers</li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-3 ${theme.text}`}>Legal</h4>
            <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">Terms of Service</li>
              <li className="hover:underline cursor-pointer">Cookie Policy</li>
              <li className="hover:underline cursor-pointer">GDPR</li>
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-3 ${theme.text}`}>Contact</h4>
            <ul className={`space-y-2 text-sm ${theme.textSecondary}`}>
              <li className="flex items-center gap-2"><Mail size={14} /> support@mujahsaas.com</li>
              <li className="flex items-center gap-2"><Phone size={14} /> +1 (555) 123-4567</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> San Francisco, CA</li>
            </ul>
          </div>
        </div>
        
        <div className={`text-center pt-8 mt-8 border-t ${theme.border} text-sm ${theme.textSecondary}`}>
          <p>© 2024 Mujah E-Commerce SaaS. All rights reserved. | Enterprise Grade Platform v4.0</p>
        </div>
      </div>
    </footer>
  );
}