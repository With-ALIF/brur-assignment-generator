import { todayISO } from "./dateUtils";

export const STORAGE_KEY = "brur-cover-page-v1";

export function getDefaultFormData() {
  return {
    docType: "Assignment",
    docCustom: "",
    topic: "",
    courseCode: "",
    courseTitle: "",
    bindMargin: true,
    faculty: "",
    facultyCustom: "",
    dept: "",
    deptCustom: "",
    tFaculty: "",
    tName: "",
    tDesig: "Professor",
    tDesigCustom: "",
    tDept: "",
    submissionType: "individual",
    groupName: "",
    groupMembers: [
      { name: "", id: "", reg: "" }
    ],
    sName: "",
    sId: "",
    sReg: "",
    sSession: "2023-2024",
    sSessionCustom: "",
    sYear: "1st Year",
    sYearCustom: "",
    sSemester: "1st Semester",
    sSemesterCustom: "",
    sSem: "1st Year 1st Semester",
    sSemCustom: "",
    coverTemplate: "classic",
    coverColor: "#111111",
    date: todayISO()
  };
}

export function loadFormData() {
  const defaults = getDefaultFormData();
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaults;
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object") return defaults;

    return {
      ...defaults,
      ...parsed,
      sYear: parsed.sYear || (parsed.sSem?.match(/^(\d+(?:st|nd|rd|th)?\s+Year)/i)?.[1]) || defaults.sYear,
      sYearCustom: parsed.sYearCustom || "",
      sSemester: parsed.sSemester || (parsed.sSem?.match(/Year\s+(.+)$/i)?.[1]) || defaults.sSemester,
      sSemesterCustom: parsed.sSemesterCustom || "",
      bindMargin: parsed.bindMargin !== undefined ? Boolean(parsed.bindMargin) : true,
      submissionType: parsed.submissionType || "individual",
      groupName: parsed.groupName || "",
      groupMembers: Array.isArray(parsed.groupMembers) && parsed.groupMembers.length > 0
        ? parsed.groupMembers
        : [{ name: parsed.sName || "", id: parsed.sId || "", reg: parsed.sReg || "" }],
      coverTemplate: parsed.coverTemplate || "classic",
      coverColor: parsed.coverColor || "#111111",
      date: parsed.date !== undefined ? parsed.date : defaults.date
    };
  } catch (err) {
    console.error("Failed to load saved form data:", err);
    return defaults;
  }
}

export function saveFormData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save form data to localStorage:", err);
  }
}

export function clearFormData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear form data from localStorage:", err);
  }
}

export const STUDENT_TEMPLATES_KEY = "brur_student_templates_v1";

export function getSavedStudentTemplates() {
  try {
    const raw = localStorage.getItem(STUDENT_TEMPLATES_KEY);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (err) {
    console.error("Failed to load student templates:", err);
    return [];
  }
}

export function saveStudentTemplate(template) {
  try {
    const list = getSavedStudentTemplates();
    const existingIndex = list.findIndex(
      (item) => item.id === template.id || (template.studentId && item.studentId === template.studentId)
    );

    const templateWithId = {
      ...template,
      id: template.id || `st_${Date.now()}`
    };

    let updatedList;
    if (existingIndex >= 0) {
      updatedList = [...list];
      updatedList[existingIndex] = templateWithId;
    } else {
      updatedList = [templateWithId, ...list];
    }

    localStorage.setItem(STUDENT_TEMPLATES_KEY, JSON.stringify(updatedList));
    return updatedList;
  } catch (err) {
    console.error("Failed to save student template:", err);
    return [];
  }
}

export function deleteStudentTemplate(id) {
  try {
    const list = getSavedStudentTemplates();
    const updatedList = list.filter((item) => item.id !== id);
    localStorage.setItem(STUDENT_TEMPLATES_KEY, JSON.stringify(updatedList));
    return updatedList;
  } catch (err) {
    console.error("Failed to delete student template:", err);
    return [];
  }
}
