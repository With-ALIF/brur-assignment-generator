import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-card reveal">
      <div className="footer-accent"></div>

      <p className="footer-credit">
        Crafted with <span className="heart">♥</span> by{" "}
        <a
          href="https://alif.mnr.bd/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-author-link"
        >
          Alif
        </a>
        <span className="footer-separator">·</span>
        <span className="footer-dept-tag">BRUR CSE 16</span>
      </p>

      <p className="footer-note">
        Vector PDF renders directly with exact margins (1.5cm left binding margin) for crisp print quality on standard A4 paper.
      </p>

      <div className="footer-bottom">
        <span>© {currentYear} All rights reserved.</span>
      </div>
    </footer>
  );
}
