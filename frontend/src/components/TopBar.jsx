import React from 'react';
import { Phone, Mail, Award, Truck } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="container top-bar-container">
        <div className="top-bar-left">
          <Truck size={14} color="#52b788" />
          <span>Quality Bags & Floor Mats</span>
          <span className="top-bar-divider hide-on-mobile">|</span>
          <span className="hide-on-mobile">Bhavani Manufacturer</span>
          <span className="top-bar-divider hide-on-mobile">|</span>
          <span className="top-bar-highlight hide-on-mobile">Wholesale & Export</span>
        </div>

        <div className="top-bar-contact">
          <a
            href="tel:+919842270384"
            className="top-bar-link top-bar-phone"
          >
            <Phone size={13} color="#52b788" />
            <span>+91 98422 70384</span>
          </a>
          <span className="top-bar-dot hide-on-mobile">•</span>
          <a
            href="mailto:shreeyasudarshantradingcompany@gmail.com"
            className="top-bar-link top-bar-email"
          >
            <Mail size={13} color="#52b788" />
            <span>shreeyasudarshantradingcompany@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
