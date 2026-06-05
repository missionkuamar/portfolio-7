// components/TrustedBySection.jsx
import React from 'react';
import { useApp } from '../App';

export default function TrustedBySection() {
  const { theme } = useApp();
  const partners = ['Shopify', 'WooCommerce', 'Magento', 'BigCommerce', 'Salesforce', 'HubSpot', 'Stripe', 'PayPal'];

  return (
    <div className="text-center animate-on-scroll" id="trusted">
      <p className={`text-sm uppercase tracking-wider ${theme.textSecondary} mb-6`}>Trusted by 10,000+ businesses worldwide</p>
      <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
        {partners.map((partner, idx) => (
          <div key={idx} className={`text-lg font-semibold ${theme.textSecondary} hover:opacity-100 transition-all cursor-pointer`}>
            {partner}
          </div>
        ))}
      </div>
    </div>
  );
}