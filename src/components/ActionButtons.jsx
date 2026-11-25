import React from "react";

export default function ActionButtons({ onDownloadPdf, onReset, isBusy }) {
  return (
    <div className="actions">
      <button
        type="button"
        id="btnPdf"
        className={`primary ${isBusy ? "busy" : ""}`}
        disabled={isBusy}
        onClick={onDownloadPdf}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="12" y1="18" x2="12" y2="12"></line>
          <line x1="9" y1="15" x2="12" y2="18"></line>
          <line x1="15" y1="15" x2="12" y2="18"></line>
        </svg>
        {isBusy ? "Generating..." : "Download PDF"}
      </button>

      <button
        type="button"
        id="btnReset"
        className="quiet"
        disabled={isBusy}
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}
