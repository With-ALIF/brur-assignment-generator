import React, { useState } from "react";
import Progress from "./Progress";
import Tabs from "./Tabs";
import DocumentPanel from "./DocumentPanel";
import AcademicPanel from "./AcademicPanel";
import TeacherPanel from "./TeacherPanel";
import StudentPanel from "./StudentPanel";

export default function FormCard({ formData, onChange, completionPercent, onSeePreview, onNotify }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [direction, setDirection] = useState("");

  const handleSelectTab = (newTab) => {
    if (newTab === currentTab) return;
    setDirection(newTab > currentTab ? "from-right" : "from-left");
    setCurrentTab(newTab);
  };

  const handleNext = () => {
    if (currentTab < 3) {
      handleSelectTab(currentTab + 1);
    } else if (onSeePreview) {
      onSeePreview();
    }
  };

  const handleBack = () => {
    if (currentTab > 0) {
      handleSelectTab(currentTab - 1);
    }
  };

  return (
    <form id="form" className="card reveal" onSubmit={(e) => e.preventDefault()}>
      <Progress percent={completionPercent} />

      <Tabs currentTab={currentTab} onSelectTab={handleSelectTab} />

      <DocumentPanel
        formData={formData}
        onChange={onChange}
        hidden={currentTab !== 0}
        directionClass={currentTab === 0 ? direction : ""}
      />

      <AcademicPanel
        formData={formData}
        onChange={onChange}
        hidden={currentTab !== 1}
        directionClass={currentTab === 1 ? direction : ""}
      />

      <TeacherPanel
        formData={formData}
        onChange={onChange}
        hidden={currentTab !== 2}
        directionClass={currentTab === 2 ? direction : ""}
      />

      <StudentPanel
        formData={formData}
        onChange={onChange}
        hidden={currentTab !== 3}
        directionClass={currentTab === 3 ? direction : ""}
        onNotify={onNotify}
      />

      <div className="nav">
        <button
          type="button"
          id="btnBack"
          disabled={currentTab === 0}
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          id="btnNext"
          className="primary"
          onClick={handleNext}
        >
          {currentTab === 3 ? "See preview" : "Next"}
        </button>
      </div>
    </form>
  );
}
