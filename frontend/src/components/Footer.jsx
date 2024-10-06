import React from "react";
import "./Footer.scss"; // Use SCSS for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            We help you manage your finances with ease. Track your income,
            expenses, and savings in one place to stay on top of your budget.
          </p>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@budgettracker.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 Budget Tracker | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
