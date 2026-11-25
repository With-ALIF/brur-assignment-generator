import React, { useState } from "react";
import { SEMESTERS, SESSIONS } from "../constants/academicData";
import {
  getSavedStudentTemplates,
  saveStudentTemplate,
  deleteStudentTemplate
} from "../utils/storage";

export default function StudentPanel({ formData, onChange, hidden, directionClass, onNotify }) {
  const isSemOther = formData.sSem === "Other";
  const isSessionOther = formData.sSession === "Other";
  const isGroup = formData.submissionType === "group";

  const members = Array.isArray(formData.groupMembers) && formData.groupMembers.length > 0
    ? formData.groupMembers
    : [{ name: formData.sName || "", id: formData.sId || "", reg: formData.sReg || "" }];

  const [templates, setTemplates] = useState(getSavedStudentTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  const handleSaveTemplate = () => {
    const nameToSave = isGroup ? (members[0]?.name || "") : (formData.sName || "");
    const idToSave = isGroup ? (members[0]?.id || "") : (formData.sId || "");
    const regToSave = isGroup ? (members[0]?.reg || "") : (formData.sReg || "");

    if (!nameToSave.trim() && !idToSave.trim()) {
      if (onNotify) onNotify("Please enter at least Name or ID to save as template.");
      return;
    }

    const newTemplate = {
      id: selectedTemplateId || `tpl_${Date.now()}`,
      studentName: nameToSave.trim(),
      studentId: idToSave.trim(),
      reg: regToSave.trim(),
      session: formData.sSession || "2023-2024",
      sessionCustom: formData.sSessionCustom || "",
      sem: formData.sSem || "1st Year 1st Semester",
      semCustom: formData.sSemCustom || "",
      savedAt: new Date().toISOString()
    };

    const updated = saveStudentTemplate(newTemplate);
    setTemplates(updated);
    setSelectedTemplateId(newTemplate.id);
    if (onNotify) onNotify("Student profile saved to templates!");
  };

  const handleLoadTemplate = (tplId) => {
    setSelectedTemplateId(tplId);
    if (!tplId) return;

    const tpl = templates.find((item) => item.id === tplId);
    if (tpl) {
      if (tpl.studentName !== undefined) onChange("sName", tpl.studentName);
      if (tpl.studentId !== undefined) onChange("sId", tpl.studentId);
      if (tpl.reg !== undefined) onChange("sReg", tpl.reg);
      if (tpl.session !== undefined) onChange("sSession", tpl.session);
      if (tpl.sessionCustom !== undefined) onChange("sSessionCustom", tpl.sessionCustom);
      if (tpl.sem !== undefined) onChange("sSem", tpl.sem);
      if (tpl.semCustom !== undefined) onChange("sSemCustom", tpl.semCustom);

      if (isGroup) {
        const newMembers = [...members];
        newMembers[0] = {
          ...newMembers[0],
          name: tpl.studentName || "",
          id: tpl.studentId || "",
          reg: tpl.reg || ""
        };
        onChange("groupMembers", newMembers);
      }

      if (onNotify) onNotify(`Loaded profile: ${tpl.studentName || tpl.studentId}`);
    }
  };

  const handleDeleteTemplate = () => {
    if (!selectedTemplateId) return;
    const updated = deleteStudentTemplate(selectedTemplateId);
    setTemplates(updated);
    setSelectedTemplateId("");
    if (onNotify) onNotify("Template removed.");
  };

  const handleMemberFieldChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    onChange("groupMembers", updatedMembers);

    if (index === 0) {
      if (field === "name") onChange("sName", value);
      if (field === "id") onChange("sId", value);
      if (field === "reg") onChange("sReg", value);
    }
  };

  const handleAddMember = () => {
    const updatedMembers = [...members, { name: "", id: "", reg: "" }];
    onChange("groupMembers", updatedMembers);
    if (onNotify) onNotify(`Added Student ${updatedMembers.length}`);
  };

  const handleRemoveMember = (index) => {
    if (members.length <= 1) return;
    const updatedMembers = members.filter((_, i) => i !== index);
    onChange("groupMembers", updatedMembers);
    if (onNotify) onNotify("Removed participant");
  };

  const handleApplyTemplateToMember = (index, tplId) => {
    const tpl = templates.find((t) => t.id === tplId);
    if (!tpl) return;
    const updatedMembers = [...members];
    updatedMembers[index] = {
      ...updatedMembers[index],
      name: tpl.studentName || "",
      id: tpl.studentId || "",
      reg: tpl.reg || ""
    };
    onChange("groupMembers", updatedMembers);
    if (index === 0) {
      onChange("sName", tpl.studentName || "");
      onChange("sId", tpl.studentId || "");
      onChange("sReg", tpl.reg || "");
    }
    if (onNotify) onNotify(`Loaded into Student ${index + 1}`);
  };

  return (
    <div
      className={`tp ${directionClass || ""}`}
      id="p3"
      role="tabpanel"
      hidden={hidden}
    >
      <h2>Submitted By (Student)</h2>

      <div className="submission-type-tabs">
        <button
          type="button"
          className={`sub-tab-btn ${!isGroup ? "active" : ""}`}
          onClick={() => onChange("submissionType", "individual")}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Single Student
        </button>
        <button
          type="button"
          className={`sub-tab-btn ${isGroup ? "active" : ""}`}
          onClick={() => {
            onChange("submissionType", "group");
            if (!formData.groupMembers || formData.groupMembers.length === 0) {
              onChange("groupMembers", [
                { name: formData.sName || "", id: formData.sId || "", reg: formData.sReg || "" }
              ]);
            }
          }}
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Group Project / Participants ({isGroup ? members.length : "Multiple"})
        </button>
      </div>

      <div className="template-card">
        <div className="template-card-header">
          <span className="template-card-title">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            Saved Templates
          </span>
          <button
            type="button"
            className="btn-template-save"
            onClick={handleSaveTemplate}
            title="Save current student information as template"
          >
            Save as Template
          </button>
        </div>

        {templates.length > 0 && (
          <div className="template-card-controls">
            <div className="template-select-wrap">
              <select
                value={selectedTemplateId}
                onChange={(e) => handleLoadTemplate(e.target.value)}
                className="template-select"
                aria-label="Select saved student profile template"
              >
                <option value="">-- Load Saved Profile ({templates.length}) --</option>
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.studentName ? `${tpl.studentName} (${tpl.studentId || "No ID"})` : (tpl.studentId || "Profile")}
                  </option>
                ))}
              </select>
            </div>
            {selectedTemplateId && (
              <button
                type="button"
                className="btn-template-delete"
                onClick={handleDeleteTemplate}
                title="Delete this template"
              >
                Delete
              </button>
            )}
          </div>
        )}
      </div>

      {!isGroup ? (
        <>
          <div className="field full">
            <label htmlFor="sName">Student's Name</label>
            <input
              id="sName"
              placeholder="e.g. Abdullah Al Khalid"
              value={formData.sName || ""}
              onChange={(e) => {
                onChange("sName", e.target.value);
                const updated = [...members];
                updated[0] = { ...updated[0], name: e.target.value };
                onChange("groupMembers", updated);
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="sId">Student ID</label>
            <input
              id="sId"
              placeholder="e.g. 12305016"
              value={formData.sId || ""}
              onChange={(e) => {
                onChange("sId", e.target.value);
                const updated = [...members];
                updated[0] = { ...updated[0], id: e.target.value };
                onChange("groupMembers", updated);
              }}
            />
          </div>

          <div className="field">
            <label htmlFor="sReg">Registration No</label>
            <input
              id="sReg"
              placeholder="e.g. 0000 18533"
              value={formData.sReg || ""}
              onChange={(e) => {
                onChange("sReg", e.target.value);
                const updated = [...members];
                updated[0] = { ...updated[0], reg: e.target.value };
                onChange("groupMembers", updated);
              }}
            />
          </div>
        </>
      ) : (
        <div className="group-section">
          <div className="field full">
            <label htmlFor="groupName">Group / Team Name (Optional)</label>
            <input
              id="groupName"
              placeholder="e.g. Group 03 or Team Alpha"
              value={formData.groupName || ""}
              onChange={(e) => onChange("groupName", e.target.value)}
            />
          </div>

          <div className="group-members-list-input">
            <div className="group-members-header">
              <div className="group-members-title-wrap">
                <span className="group-members-title">
                  Group Members / Participants
                </span>
                <span className="members-count-badge">{members.length}</span>
              </div>
              <button
                type="button"
                className="btn-add-member"
                onClick={handleAddMember}
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                <span>Add Participant</span>
              </button>
            </div>

            {members.map((member, idx) => (
              <div key={idx} className="group-member-card">
                <div className="group-member-card-header">
                  <span className="member-index-badge">Participant {idx + 1}</span>
                  <div className="member-card-actions">
                    {templates.length > 0 && (
                      <select
                        className="member-template-select"
                        defaultValue=""
                        onChange={(e) => {
                          handleApplyTemplateToMember(idx, e.target.value);
                          e.target.value = "";
                        }}
                        title="Fill details from saved template"
                      >
                        <option value="" disabled>Fill from template...</option>
                        {templates.map((tpl) => (
                          <option key={tpl.id} value={tpl.id}>
                            {tpl.studentName || tpl.studentId}
                          </option>
                        ))}
                      </select>
                    )}
                    {members.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove-member"
                        onClick={() => handleRemoveMember(idx)}
                        title="Remove participant"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                <div className="member-inputs-grid">
                  <div className="field full">
                    <label>Name</label>
                    <input
                      placeholder="e.g. Md. Abdullah Al Khalid Alif"
                      value={member.name || ""}
                      onChange={(e) => handleMemberFieldChange(idx, "name", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Student ID</label>
                    <input
                      placeholder="e.g. 12305016"
                      value={member.id || ""}
                      onChange={(e) => handleMemberFieldChange(idx, "id", e.target.value)}
                    />
                  </div>
                  <div className="field">
                    <label>Registration No</label>
                    <input
                      placeholder="e.g. 0000 18533"
                      value={member.reg || ""}
                      onChange={(e) => handleMemberFieldChange(idx, "reg", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn-add-member-dashed"
              onClick={handleAddMember}
            >
              + Add Another Participant
            </button>
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="sSession">Session</label>
        <select
          id="sSession"
          value={formData.sSession || "2023-2024"}
          onChange={(e) => onChange("sSession", e.target.value)}
        >
          {SESSIONS.map((ses) => (
            <option key={ses} value={ses}>
              {ses}
            </option>
          ))}
        </select>
      </div>

      {isSessionOther && (
        <div className="field" id="sSessionCustomWrap">
          <label htmlFor="sSessionCustom">Custom Session</label>
          <input
            id="sSessionCustom"
            placeholder="e.g. 2018-2019"
            value={formData.sSessionCustom || ""}
            onChange={(e) => onChange("sSessionCustom", e.target.value)}
          />
        </div>
      )}

      <div className="field">
        <label htmlFor="sSem">Year / Semester</label>
        <select
          id="sSem"
          value={formData.sSem}
          onChange={(e) => onChange("sSem", e.target.value)}
        >
          {SEMESTERS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {isSemOther && (
        <div className="field" id="sSemCustomWrap">
          <label htmlFor="sSemCustom">Custom Semester / Year</label>
          <input
            id="sSemCustom"
            placeholder="e.g. Masters 1st Semester"
            value={formData.sSemCustom}
            onChange={(e) => onChange("sSemCustom", e.target.value)}
          />
        </div>
      )}

      <div className="field full">
        <label htmlFor="date">Date of Submission</label>
        <input
          type="date"
          id="date"
          value={formData.date}
          onChange={(e) => onChange("date", e.target.value)}
        />
      </div>
    </div>
  );
}
