import React from "react";
import { FACULTIES, DEPTS } from "../constants/academicData";

export default function AcademicPanel({ formData, onChange, hidden, directionClass }) {
  const deptsForFaculty = DEPTS[formData.faculty] || [];

  const handleFacultyChange = (e) => {
    const newFac = e.target.value;
    onChange("faculty", newFac);
    const list = DEPTS[newFac] || [];
    if (!list.includes(formData.dept)) {
      onChange("dept", "");
    }
    if (!formData.tFaculty || formData.tFaculty === formData.faculty) {
      onChange("tFaculty", newFac);
    }
  };

  const handleDeptChange = (e) => {
    const val = e.target.value;
    onChange("dept", val);
    if (!formData.tDept || formData.tDept === formData.dept) {
      onChange("tDept", val);
      onChange("tFaculty", formData.faculty);
    }
  };

  return (
    <div
      className={`tp ${directionClass || ""}`}
      id="p1"
      role="tabpanel"
      hidden={hidden}
    >
      <h2>Academic Information</h2>

      <div className="field full">
        <label htmlFor="faculty">Faculty</label>
        <select
          id="faculty"
          value={formData.faculty || ""}
          onChange={handleFacultyChange}
        >
          <option value="">Select a faculty</option>
          {FACULTIES.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </div>

      <div className="field full" id="deptWrap">
        <label htmlFor="dept">Department</label>
        <select
          id="dept"
          disabled={!formData.faculty}
          value={formData.dept || ""}
          onChange={handleDeptChange}
        >
          <option value="">
            {formData.faculty ? "Select a department" : "Select a faculty first"}
          </option>
          {deptsForFaculty.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
