import React from "react";
import { LOGO_PATH } from "../constants/academicData";

export default function Header() {
  return (
    <header className="reveal">
      <div className="logo-card">
        <img
          id="brandLogo"
          src={LOGO_PATH}
          className="brand-logo"
          alt="BRUR Logo"
        />
      </div>
      <div>
        <span className="pill">BRUR Cover Page</span>
        <h1>Begum Rokeya University, Rangpur</h1>
        <p>Assignment &amp; Report Cover Page Generator with Live A4 Preview</p>
      </div>
    </header>
  );
}
