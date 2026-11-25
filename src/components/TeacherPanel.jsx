import React, { useState, useEffect } from "react";
import {
  FACULTIES,
  DEPTS,
  TEACHER_DESIGNATIONS,
  getTeachersForDept
} from "../constants/academicData";

export default function TeacherPanel({ formData, onChange, hidden, directionClass }) {
  const isDesigOther = formData.tDesig === "Other";

  const inferredTeacherFaculty =
    formData.tFaculty ||
    (formData.tDept ? Object.keys(DEPTS).find((f) => DEPTS[f]?.includes(formData.tDept)) : "") ||
    formData.faculty ||
    "";

  const teacherDept = formData.tDept || formData.dept || "";
  const teacherList = getTeachersForDept(teacherDept);
  const deptsForTeacherFaculty = DEPTS[inferredTeacherFaculty] || [];

  const isDifferentFromStudent = Boolean(
    formData.dept && teacherDept && teacherDept !== formData.dept
  );

  const isKnownTeacher = teacherList.includes(formData.tName);
  const [isCustomMode, setIsCustomMode] = useState(
    Boolean(formData.tName && !isKnownTeacher)
  );

  useEffect(() => {
    if (formData.tName && !teacherList.includes(formData.tName)) {
      setIsCustomMode(true);
    }
  }, [teacherList, formData.tName]);

  const handleTeacherFacultyChange = (e) => {
    const newFac = e.target.value;
    onChange("tFaculty", newFac);
    const availableDepts = DEPTS[newFac] || [];
    if (!availableDepts.includes(teacherDept)) {
      const defaultDept = availableDepts[0] || "";
      onChange("tDept", defaultDept);
      onChange("tName", "");
    }
  };

  const handleTeacherDeptChange = (e) => {
    const newDept = e.target.value;
    onChange("tDept", newDept);
    const fac =
      Object.keys(DEPTS).find((f) => DEPTS[f]?.includes(newDept)) || inferredTeacherFaculty;
    if (fac) onChange("tFaculty", fac);
    onChange("tName", "");
    setIsCustomMode(false);
  };

  const handleResetToStudentDept = () => {
    onChange("tFaculty", formData.faculty || "");
    onChange("tDept", formData.dept || "");
    onChange("tName", "");
    setIsCustomMode(false);
  };

  const handleTeacherSelect = (e) => {
    const val = e.target.value;
    if (val === "Other") {
      setIsCustomMode(true);
      onChange("tName", "");
    } else {
      setIsCustomMode(false);
      onChange("tName", val);

      if (val.startsWith("Prof.")) {
        onChange("tDesig", "Professor");
      }
    }
  };

  return (
    <div
      className={`tp ${directionClass || ""}`}
      id="p2"
      role="tabpanel"
      hidden={hidden}
    >
      <h2>Submitted To (Teacher)</h2>

      <div className="field full">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
          <label htmlFor="tFaculty" style={{ margin: 0 }}>Teacher's Faculty</label>
          {isDifferentFromStudent && (
            <button
              type="button"
              className="quiet"
              style={{ fontSize: "12px", height: "auto", padding: "0 4px", color: "var(--sky-deep)" }}
              onClick={handleResetToStudentDept}
              title="Reset teacher's department to student's department"
            >
              ↺ Same as student's dept
            </button>
          )}
        </div>
        <select
          id="tFaculty"
          value={inferredTeacherFaculty}
          onChange={handleTeacherFacultyChange}
        >
          <option value="">-- Select Teacher's Faculty --</option>
          {FACULTIES.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label htmlFor="tDept">Teacher's Department</label>
        <select
          id="tDept"
          value={teacherDept}
          onChange={handleTeacherDeptChange}
          disabled={!inferredTeacherFaculty}
        >
          <option value="">
            {inferredTeacherFaculty
              ? "-- Select Teacher's Department --"
              : "Select teacher faculty first"}
          </option>
          {deptsForTeacherFaculty.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label htmlFor="tName">Teacher's Name</label>

        {teacherList.length > 0 ? (
          <>
            <select
              id="tNameSelect"
              value={isCustomMode ? "Other" : (isKnownTeacher ? formData.tName : "")}
              onChange={handleTeacherSelect}
            >
              <option value="">
                -- Select Teacher from {teacherDept ? teacherDept.replace("Department of ", "") : "List"} ({teacherList.length}) --
              </option>
              {teacherList.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="Other">Other (Type custom teacher name)</option>
            </select>

            {isCustomMode && (
              <input
                id="tName"
                style={{ marginTop: "8px" }}
                placeholder="Type custom teacher's full name"
                value={formData.tName}
                onChange={(e) => onChange("tName", e.target.value)}
                autoFocus
              />
            )}
          </>
        ) : (
          <input
            id="tName"
            placeholder="e.g. Prof. Dr. Abu Kalam Md. Farid Uddin"
            value={formData.tName}
            onChange={(e) => onChange("tName", e.target.value)}
          />
        )}
      </div>

      <div className="field">
        <label htmlFor="tDesig">Designation</label>
        <select
          id="tDesig"
          value={formData.tDesig}
          onChange={(e) => onChange("tDesig", e.target.value)}
        >
          {TEACHER_DESIGNATIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {isDesigOther && (
        <div className="field" id="tDesigCustomWrap">
          <label htmlFor="tDesigCustom">Custom Designation</label>
          <input
            id="tDesigCustom"
            placeholder="e.g. Adjunct Faculty"
            value={formData.tDesigCustom}
            onChange={(e) => onChange("tDesigCustom", e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
