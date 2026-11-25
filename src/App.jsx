import React, { useState, useEffect, useRef, useCallback } from "react";
import Header from "./components/Header";
import FormCard from "./components/FormCard";
import PreviewStage from "./components/PreviewStage";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import { PROGRESS_KEYS } from "./constants/academicData";
import {
  loadFormData,
  saveFormData,
  clearFormData,
  getDefaultFormData
} from "./utils/storage";
import { downloadPdf } from "./utils/pdfGenerator";

export default function App() {
  const [formData, setFormData] = useState(loadFormData);
  const [toastInfo, setToastInfo] = useState({ message: "", visible: false });
  const [isBusy, setIsBusy] = useState(false);
  const toastTimerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    saveFormData(formData);
  }, [formData]);

  const showToast = useCallback((message) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastInfo({ message, visible: true });
    toastTimerRef.current = setTimeout(() => {
      setToastInfo({ message: "", visible: false });
    }, 3200);
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    clearFormData();
    const defaults = getDefaultFormData();
    setFormData(defaults);
    showToast("Form has been reset");
  };

  const handleDownloadPdf = async () => {
    setIsBusy(true);
    try {
      await downloadPdf(formData, showToast);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong while generating the PDF.");
    } finally {
      setIsBusy(false);
    }
  };

  const handleSeePreview = () => {
    if (stageRef.current) {
      stageRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filledCount = PROGRESS_KEYS.filter((key) => {
    if (key === "faculty") {
      return Boolean(formData.faculty?.trim());
    }
    if (key === "dept") {
      return Boolean(formData.dept?.trim());
    }
    if (key === "sName") {
      if (formData.submissionType === "group") {
        return Boolean(formData.groupMembers && formData.groupMembers.some((m) => m.name?.trim()));
      }
      return Boolean(formData.sName?.trim());
    }
    if (key === "sId") {
      if (formData.submissionType === "group") {
        return Boolean(formData.groupMembers && formData.groupMembers.some((m) => m.id?.trim()));
      }
      return Boolean(formData.sId?.trim());
    }
    if (key === "sSession") {
      return formData.sSession === "Other"
        ? Boolean(formData.sSessionCustom?.trim())
        : Boolean((formData.sSession || "2023-2024")?.trim());
    }
    if (key === "sSem") {
      return formData.sSem === "Other"
        ? Boolean(formData.sSemCustom?.trim())
        : Boolean(formData.sSem?.trim());
    }
    const val = formData[key];
    return val && String(val).trim().length > 0;
  }).length;

  const completionPercent = Math.round((filledCount * 100) / PROGRESS_KEYS.length);
  const isReady = completionPercent === 100;

  return (
    <div className="wrap">
      <Header />

      <div className="grid">
        <FormCard
          formData={formData}
          onChange={handleChange}
          completionPercent={completionPercent}
          onSeePreview={handleSeePreview}
          onNotify={showToast}
        />

        <PreviewStage
          formData={formData}
          isReady={isReady}
          onDownloadPdf={handleDownloadPdf}
          onReset={handleReset}
          isBusy={isBusy}
          stageRef={stageRef}
        />
      </div>

      <Footer />

      <Toast message={toastInfo.message} visible={toastInfo.visible} />
    </div>
  );
}
