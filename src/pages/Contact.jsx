import React from "react";
import "../styles/ss.css";

function Contact() {
  return (
    <div className="page-container">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">
        We'd love to hear from you. Reach out anytime!
      </p>

      <div className="contact-info">
        <p>
          <strong>Email:</strong> support@shorely.com
        </p>
        <p>
          <strong>Phone:</strong> +1 (234) 567-890
        </p>
        <p>
          <strong>Location:</strong> Marina Bay, Seaside City
        </p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
