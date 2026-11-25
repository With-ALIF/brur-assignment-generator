import React, { useRef, useEffect } from "react";
import ActionButtons from "./ActionButtons";
import { UNI, LOGO_PATH } from "../constants/academicData";
import { typeLabel } from "../utils/pdfGenerator";
import { prettyDate } from "../utils/dateUtils";

export default function PreviewStage({
  formData,
  isReady,
  onDownloadPdf,
  onReset,
  isBusy,
  stageRef
}) {
  const localStageRef = useRef(null);
  const paperRef = useRef(null);
  const actualStageRef = stageRef || localStageRef;

  useEffect(() => {
    const stage = actualStageRef.current;
    const paper = paperRef.current;
    if (!stage || !paper) return;

    function fit() {
      const s = stage.clientWidth / 794;
      paper.style.transform = `scale(${s})`;
      stage.style.height = `${Math.round(1123 * s)}px`;
    }

    fit();

    let observer = null;
    if (window.ResizeObserver) {
      observer = new ResizeObserver(fit);
      observer.observe(stage);
    } else {
      window.addEventListener("resize", fit);
    }

    return () => {
      if (observer) observer.disconnect();
      else window.removeEventListener("resize", fit);
    };
  }, [actualStageRef]);

  const ph = (val, hint) =>
    val ? val : <span className="ph">{hint}</span>;

  const deptDisplay = formData.dept || "";

  const tDesigDisplay =
    formData.tDesig === "Other"
      ? formData.tDesigCustom
      : formData.tDesig;

  const sSemDisplay =
    formData.sSem === "Other"
      ? formData.sSemCustom
      : formData.sSem;

  let yearDisplay = "";
  let semDisplay = sSemDisplay;
  if (sSemDisplay) {
    const match = sSemDisplay.match(/^(\d+(?:st|nd|rd|th)?\s+Year)\s+(.+)$/i);
    if (match) {
      yearDisplay = match[1];
      semDisplay = match[2];
    }
  }

  const isBind = formData.bindMargin !== false;
  const docTypeTitle = typeLabel(formData);
  const dateFormatted = prettyDate(formData.date);
  const sessionDisplay =
    formData.sSession === "Other"
      ? formData.sSessionCustom
      : formData.sSession || "2023-2024";

  const isGroup = formData.submissionType === "group";
  const members =
    isGroup && Array.isArray(formData.groupMembers) && formData.groupMembers.length > 0
      ? formData.groupMembers
      : [{ name: formData.sName, id: formData.sId, reg: formData.sReg }];

  return (
    <div className="preview-col reveal">
      <div className="card">
        <ActionButtons
          onDownloadPdf={onDownloadPdf}
          onReset={onReset}
          isBusy={isBusy}
        />

        <p className="hint">Live A4 preview · Vector PDF export</p>

        <div
          className={`stage ${isReady ? "ready" : ""}`}
          id="stage"
          ref={actualStageRef}
        >
          <div
            className={`paper ${isBind ? "bind-margin" : ""}`}
            id="paper"
            ref={paperRef}
          >
            <div className="frame"></div>
            <div className="frame2"></div>
            <div className="sheet">
              <img className="logo" alt="BRUR Logo" src={LOGO_PATH} />
              <div className="uni">{UNI}</div>
              <div className="dep">{ph(deptDisplay, "Department name")}</div>
              <hr className="rule" />

              <div className="dtype">{docTypeTitle}</div>

              {formData.topic && (
                <div className="topic">Topic: {formData.topic}</div>
              )}

              <div className="course">
                <div>Course Code: {ph(formData.courseCode, "Code")}</div>
                <div>Course Title: {ph(formData.courseTitle, "Title")}</div>
              </div>

              <div className="people-boxes">
                <div className={`people-box ${isGroup ? "group-mode" : ""}`}>
                  <span className="people-box-header">SUBMITTED BY</span>
                  {isGroup ? (
                    <>
                      {formData.groupName && (
                        <p className="row group-team-name">
                          <b>Group: </b>
                          <b>{formData.groupName}</b>
                        </p>
                      )}
                      <div className="preview-group-members">
                        {members.map((m, idx) => (
                          <div key={idx} className="preview-group-member">
                            <p className="row member-name-row">
                              <b>{idx + 1}. Name: </b>
                              {m.name ? <b>{m.name}</b> : <span className="ph">Member {idx + 1} Name</span>}
                            </p>
                            <p className="row member-meta-row">
                              <span><b>ID:</b> {m.id || <span className="ph">ID</span>}</span>
                              {m.reg && <span> &nbsp;|&nbsp; <b>Reg:</b> {m.reg}</span>}
                            </p>
                          </div>
                        ))}
                      </div>
                      {yearDisplay && (
                        <p className="row">
                          <b>Year: </b>
                          {yearDisplay}
                        </p>
                      )}
                      <p className="row">
                        <b>Semester: </b>
                        {semDisplay ? semDisplay : <span className="ph">Semester</span>}
                      </p>
                      <p className="row">
                        <b>Session: </b>
                        {sessionDisplay ? sessionDisplay : <span className="ph">Session</span>}
                      </p>
                      <p className="row">
                        <b>{ph(deptDisplay, "Department of ...")}</b>
                      </p>
                      <p className="row">
                        <b>{UNI}</b>
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="row">
                        <b>Name: </b>
                        {formData.sName ? <b>{formData.sName}</b> : <span className="ph">Your name</span>}
                      </p>
                      <p className="row">
                        <b>ID: </b>
                        {formData.sId ? formData.sId : <span className="ph">Your ID</span>}
                      </p>
                      <p className="row">
                        <b>Registration No: </b>
                        {formData.sReg ? formData.sReg : <span className="ph">Reg. number</span>}
                      </p>
                      {yearDisplay && (
                        <p className="row">
                          <b>Year: </b>
                          {yearDisplay}
                        </p>
                      )}
                      <p className="row">
                        <b>Semester: </b>
                        {semDisplay ? semDisplay : <span className="ph">Semester</span>}
                      </p>
                      <p className="row">
                        <b>Session: </b>
                        {sessionDisplay ? sessionDisplay : <span className="ph">Session</span>}
                      </p>
                      <p className="row">
                        <b>{ph(deptDisplay, "Department of ...")}</b>
                      </p>
                      <p className="row">
                        <b>{UNI}</b>
                      </p>
                    </>
                  )}
                </div>

                <div className="people-box">
                  <span className="people-box-header">SUBMITTED TO</span>
                  <p className="row">
                    <b>{formData.tName ? formData.tName : <span className="ph">Teacher name</span>}</b>
                  </p>
                  <p className="row">{ph(tDesigDisplay, "Designation")}</p>
                  <p className="row">
                    <b>{ph(formData.tDept || deptDisplay, "Department of ...")}</b>
                  </p>
                  <p className="row">
                    <b>{UNI}</b>
                  </p>
                </div>
              </div>

              <div className="date">
                Date of Submission: {ph(dateFormatted, "Date")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
