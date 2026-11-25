import React from "react";
import { LOGO_PATH } from "../constants/academicData";

export default function Header() {
  return (
    <header className="topbar reveal">
      <div className="brand">
        <div className="brand-mark">
          <img src={LOGO_PATH} alt="BRUR university logo" />
        </div>
        <div className="brand-copy">
          <div className="brand-title">BRUR Cover Studio</div>
        </div>
      </div>
      <div className="header-note">Free • All Departments • No Login Required</div>
    </header>
  );
}
