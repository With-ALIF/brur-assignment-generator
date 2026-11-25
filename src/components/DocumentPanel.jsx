import React from "react";
import { DOC_TYPES } from "../constants/academicData";

export default function DocumentPanel({ formData, onChange, hidden, directionClass }) {
  return (
    <div
      className={`tp ${directionClass || ""}`}
      id="p0"
      role="tabpanel"
      hidden={hidden}
    >
      <h2>Document Details</h2>

      <div className="field">
        <label htmlFor="docType">Document Type</label>
        <select
          id="docType"
          value={formData.docType}
          onChange={(e) => onChange("docType", e.target.value)}
        >
          {DOC_TYPES.map((type) => (
            <option key={type} value={type}>
              {type === "Other" ? "Other (type your own)" : type}
            </option>
          ))}
        </select>
      </div>

      {formData.docType === "Other" && (
        <div className="field" id="customWrap">
          <label htmlFor="docCustom">Custom Document Type</label>
          <input
            id="docCustom"
            placeholder="e.g. Field Work Report"
            value={formData.docCustom}
            onChange={(e) => onChange("docCustom", e.target.value)}
          />
        </div>
      )}

      <div className="field full">
        <label htmlFor="topic">
          Topic / Title <small>(Optional)</small>
        </label>
        <input
          id="topic"
          placeholder="e.g. Implementation of Graph Algorithms"
          value={formData.topic}
          onChange={(e) => onChange("topic", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="courseCode">Course Code</label>
        <input
          id="courseCode"
          placeholder="e.g. CSE-2101"
          value={formData.courseCode}
          onChange={(e) => onChange("courseCode", e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="courseTitle">Course Title</label>
        <input
          id="courseTitle"
          placeholder="e.g. Data Structures and Algorithms"
          value={formData.courseTitle}
          onChange={(e) => onChange("courseTitle", e.target.value)}
        />
      </div>

      <div className="field full">
        <label className="checkbox-field" htmlFor="bindMargin">
          <input
            type="checkbox"
            id="bindMargin"
            checked={formData.bindMargin}
            onChange={(e) => onChange("bindMargin", e.target.checked)}
          />
          <span>1.5cm Left Margin for Binding / Punching</span>
        </label>
      </div>
    </div>
  );
}
