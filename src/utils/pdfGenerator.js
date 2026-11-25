import { jsPDF } from "jspdf";
import { UNI, LOGO_PATH, LOGO_RATIO } from "../constants/academicData";
import { prettyDate } from "./dateUtils";

let cachedLogoDataUrl = null;

export async function getLogoDataUrl() {
  if (cachedLogoDataUrl) return cachedLogoDataUrl;
  try {
    const res = await fetch(LOGO_PATH);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        cachedLogoDataUrl = reader.result;
        resolve(cachedLogoDataUrl);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.error("Failed to fetch logo for PDF:", err);
    throw new Error("Could not load university logo");
  }
}

export function typeLabel(formData) {
  return formData.docType === "Other"
    ? formData.docCustom || "Document"
    : formData.docType || "Assignment";
}

export const rowText = (r) => (r.l ? r.l + ": " : "") + r.v;

export function exportModel(formData) {
  const dept = formData.dept || "";
  const desig = formData.tDesig === "Other" ? formData.tDesigCustom : formData.tDesig;
  const sem = formData.sSem === "Other" ? formData.sSemCustom : formData.sSem;

  let yearVal = "";
  let semVal = sem;
  if (sem) {
    const match = sem.match(/^(\d+(?:st|nd|rd|th)?\s+Year)\s+(.+)$/i);
    if (match) {
      yearVal = match[1];
      semVal = match[2];
    }
  }

  const sessionVal =
    formData.sSession === "Other"
      ? formData.sSessionCustom
      : formData.sSession || "2023-2024";

  const isGroup = formData.submissionType === "group";
  const members =
    isGroup && Array.isArray(formData.groupMembers) && formData.groupMembers.length > 0
      ? formData.groupMembers
      : [{ name: formData.sName, id: formData.sId, reg: formData.sReg }];

  const keep = (rows) => rows.filter((r) => r.v);

  let byRows = [];
  if (isGroup) {
    if (formData.groupName) {
      byRows.push({ l: "Group/Team", v: formData.groupName, bold: true });
    }
    members.forEach((m, idx) => {
      if (m.name || m.id) {
        byRows.push({ l: `${idx + 1}. Name`, v: m.name || "—", bold: true });
        const idParts = [];
        if (m.id) idParts.push(`ID: ${m.id}`);
        if (m.reg) idParts.push(`Reg: ${m.reg}`);
        if (idParts.length > 0) {
          byRows.push({ v: `   ${idParts.join("   |   ")}` });
        }
      }
    });
    if (yearVal) byRows.push({ l: "Year", v: yearVal });
    if (semVal) byRows.push({ l: "Semester", v: semVal });
    if (sessionVal) byRows.push({ l: "Session", v: sessionVal });
    if (dept) byRows.push({ v: dept, bold: true });
    byRows.push({ v: UNI, bold: true });
  } else {
    byRows = [
      { l: "Name", v: formData.sName },
      { l: "ID", v: formData.sId },
      { l: "Registration No", v: formData.sReg },
      ...(yearVal ? [{ l: "Year", v: yearVal }] : []),
      { l: "Semester", v: semVal },
      { l: "Session", v: sessionVal },
      ...(dept ? [{ v: dept, bold: true }] : []),
      { v: UNI, bold: true }
    ];
  }

  const toRows = [
    { v: formData.tName, bold: true },
    { v: desig },
    ...(formData.tDept
      ? [{ v: formData.tDept, bold: true }]
      : dept
      ? [{ v: dept, bold: true }]
      : []),
    { v: UNI, bold: true }
  ];

  return {
    uni: UNI,
    dept: dept,
    type: typeLabel(formData),
    topic: formData.topic,
    courseCode: formData.courseCode,
    courseTitle: formData.courseTitle,
    to: keep(toRows),
    by: keep(byRows),
    date: prettyDate(formData.date),
    bindMargin: formData.bindMargin !== false,
    isGroup: isGroup
  };
}

export function buildPdf(m, logo, ratio = LOGO_RATIO) {
  const doc = new jsPDF({ unit: "mm", format: "a4", compress: true });
  doc.setProperties({ title: m.type + " cover page" });

  const bindMargin = m.bindMargin !== false;
  const leftX = bindMargin ? 15 : 8;
  const boxW = bindMargin ? 187 : 194;
  const cx = bindMargin ? 108.5 : 105;
  const innerOffset = 2.2;

  doc.setLineWidth(0.9);
  doc.rect(leftX, 8, boxW, 281);
  doc.setLineWidth(0.25);
  doc.rect(leftX + innerOffset, 8 + innerOffset, boxW - innerOffset * 2, 281 - innerOffset * 2);

  const lh = 34, lw = lh * ratio;
  doc.addImage(logo, "PNG", cx - lw / 2, 16, lw, lh);

  const centered = (str, y, size, style, maxW) => {
    doc.setFont("times", style);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(str, maxW);
    const step = size * 0.3528 * 1.22;
    lines.forEach((t, i) => doc.text(t, cx, y + i * step, { align: "center" }));
    return y + (lines.length - 1) * step;
  };

  let y = centered(m.uni, 62, 22, "bold", 155);
  if (m.dept) y = centered(m.dept, y + 8.5, 14.5, "normal", 155);
  y += 6;
  doc.setLineWidth(0.25);
  doc.line(cx - 53, y, cx + 53, y);

  doc.setFont("times", "bold");
  doc.setFontSize(20);
  const typeText = m.type.toUpperCase();
  const bw = Math.min(145, Math.max(70, doc.getTextWidth(typeText) + 22));
  const top = y + 10;
  doc.setLineWidth(0.6);
  doc.rect(cx - bw / 2, top, bw, 14);
  doc.text(typeText, cx, top + 9.6, { align: "center" });
  y = top + 14;

  if (m.topic) y = centered(m.topic, y + 11, 13.5, "normal", 145);
  if (m.courseCode) y = centered("Course Code: " + m.courseCode, y + 11, 13.5, "normal", 145);
  if (m.courseTitle) y = centered("Course Title: " + m.courseTitle, y + (m.courseCode ? 7 : 11), 13.5, "normal", 145);

  let box1X, box1W, box2X, box2W;
  if (bindMargin) {
    box1X = 21;
    box1W = 83;
    box2X = 113;
    box2W = 83;
  } else {
    box1X = 17;
    box1W = 83;
    box2X = 108;
    box2W = 83;
  }

  const calcLines = (rows, w, fSize) => {
    doc.setFontSize(fSize);
    const contentW = w - 10;
    let linesCount = 0;
    rows.forEach((r) => {
      if (r.l) {
        const lblW = doc.getTextWidth(r.l + ": ");
        const valLines = doc.splitTextToSize(String(r.v || ""), contentW - lblW);
        linesCount += Math.max(1, valLines.length);
      } else {
        const valLines = doc.splitTextToSize(String(r.v || ""), contentW);
        linesCount += Math.max(1, valLines.length);
      }
    });
    return linesCount;
  };

  const rawByLines = calcLines(m.by, box1W, 11);
  const rawToLines = calcLines(m.to, box2W, 11);
  const maxLines = Math.max(rawByLines, rawToLines);

  let fontSize = 11;
  let step = 5.2;
  if (maxLines > 14) {
    fontSize = 9.2;
    step = 4.1;
  } else if (maxLines > 11) {
    fontSize = 10;
    step = 4.5;
  } else if (maxLines > 8) {
    fontSize = 10.5;
    step = 4.9;
  }

  const boxContentH = maxLines * step + 12;
  const boxH = Math.max(68, Math.min(88, boxContentH));
  const boxTop = y + (m.isGroup && maxLines > 10 ? 12 : 16);

  const drawBox = (x, heading, rows, w, h) => {
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.5);
    doc.roundedRect(x, boxTop, w, h, 2.5, 2.5, "S");

    doc.setFont("times", "bold");
    doc.setFontSize(13);
    const headText = heading.toUpperCase();
    const headW = doc.getTextWidth(headText);
    const headPad = 2.5;
    const headX = x + 7;

    doc.setFillColor(255, 255, 255);
    doc.rect(headX - headPad, boxTop - 2.5, headW + headPad * 2, 5, "F");

    doc.setTextColor(0, 0, 0);
    doc.text(headText, headX, boxTop + 1.2);

    let yy = boxTop + 8;
    const contentW = w - 10;
    const innerX = x + 5;

    rows.forEach((r) => {
      const isBold = r.bold || r.l === "Name";
      doc.setFont("times", isBold ? "bold" : "normal");
      doc.setFontSize(fontSize);

      if (r.l) {
        const lbl = r.l + ": ";
        doc.setFont("times", "bold");
        const lblW = doc.getTextWidth(lbl);
        doc.text(lbl, innerX, yy);

        doc.setFont("times", r.l === "Name" ? "bold" : "normal");
        const valLines = doc.splitTextToSize(String(r.v), contentW - lblW);
        valLines.forEach((vl, idx) => {
          doc.text(vl, innerX + (idx === 0 ? lblW : 0), yy);
          if (idx < valLines.length - 1) yy += step;
        });
      } else {
        const lines = doc.splitTextToSize(String(r.v), contentW);
        lines.forEach((line) => {
          doc.text(line, innerX, yy);
          yy += step;
        });
      }
      yy += step;
    });
  };

  drawBox(box1X, "SUBMITTED BY", m.by, box1W, boxH);
  drawBox(box2X, "SUBMITTED TO", m.to, box2W, boxH);

  if (m.date) {
    doc.setFont("times", "normal");
    doc.setFontSize(11.5);
    const dateY = Math.min(273, Math.max(265, boxTop + boxH + 7));
    doc.text("Date of Submission: " + m.date, cx, dateY, { align: "center" });
  }
  return doc;
}

export function getPdfFileName(m) {
  const bits = [m.type, m.courseCode, "Cover-Page"].filter(Boolean).join("-");
  return bits.replace(/[^\w.\- ]+/g, "").trim().replace(/\s+/g, "-") + ".pdf";
}

export async function downloadPdf(formData, notifyToast) {
  const m = exportModel(formData);
  const all = [m.faculty, m.dept, m.type, m.topic, m.courseCode, m.courseTitle, m.date]
    .concat(m.to.map(rowText), m.by.map(rowText))
    .join(" ");

  if (/[^\u0000-\u00ff\u2018-\u201d\u2013\u2014\u2022]/.test(all)) {
    if (notifyToast) notifyToast("Note: PDF uses Times New Roman for standard English cover pages.");
  }

  const logoDataUrl = await getLogoDataUrl();
  const doc = buildPdf(m, logoDataUrl, LOGO_RATIO);
  const blob = doc.output("blob");
  const fileName = getPdfFileName(m);

  let dl = null;
  try {
    dl = window.claude && window.claude.use ? await window.claude.use("downloads") : null;
  } catch (e) {
    dl = null;
  }
  if (dl) {
    try {
      await dl.save({ filename: fileName, data: blob });
      if (notifyToast) notifyToast("Saved " + fileName);
    } catch (e) {
      if (!e || e.code !== "declined") {
        if (notifyToast) notifyToast("Could not save the file here. Open the page in a browser tab and try again.");
      }
    }
    return;
  }

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  if (notifyToast) notifyToast("Downloading " + fileName);
}
