import React, { useRef, useEffect } from "react";

const TABS = [
  { id: "t0", label: "Document" },
  { id: "t1", label: "Academic" },
  { id: "t2", label: "Teacher" },
  { id: "t3", label: "Student" },
  { id: "t4", label: "Design" }
];

export default function Tabs({ currentTab, onSelectTab }) {
  const tabsRef = useRef(null);
  const indRef = useRef(null);
  const tabButtonRefs = useRef([]);

  useEffect(() => {
    const activeBtn = tabButtonRefs.current[currentTab];
    const ind = indRef.current;
    if (activeBtn && ind) {
      ind.style.width = `${activeBtn.offsetWidth}px`;
      ind.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
    }
  }, [currentTab]);

  useEffect(() => {
    function handleResize() {
      const activeBtn = tabButtonRefs.current[currentTab];
      const ind = indRef.current;
      if (activeBtn && ind) {
        ind.style.width = `${activeBtn.offsetWidth}px`;
        ind.style.transform = `translateX(${activeBtn.offsetLeft}px)`;
      }
    }
    window.addEventListener("resize", handleResize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [currentTab]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onSelectTab(Math.min(4, currentTab + 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onSelectTab(Math.max(0, currentTab - 1));
    }
  };

  return (
    <div
      className="tabs"
      id="tabs"
      role="tablist"
      ref={tabsRef}
      onKeyDown={handleKeyDown}
    >
      <div className="ind" id="ind" ref={indRef}></div>
      {TABS.map((tab, idx) => (
        <button
          key={tab.id}
          ref={(el) => (tabButtonRefs.current[idx] = el)}
          className="tab"
          id={tab.id}
          role="tab"
          type="button"
          aria-selected={currentTab === idx ? "true" : "false"}
          tabIndex={currentTab === idx ? 0 : -1}
          onClick={() => onSelectTab(idx)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
