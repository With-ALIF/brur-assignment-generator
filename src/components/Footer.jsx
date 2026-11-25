import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-card reveal">
      <div className="footer-accent"></div>

      <p className="footer-credit">
        Crafted with by{" "}
        <a
          href="https://alif.mnr.bd/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-author-link"
        >
          Alif
        </a>
        <span className="footer-separator">·</span>
        <a href="mailto:alifbrur16@gmail.com" className="footer-dept-tag">
          alifbrur16@gmail.com
        </a>
      </p>

      <div className="footer-bottom">
        <span>© {currentYear} All rights reserved.</span>
      </div>
    </footer>
  );
}
