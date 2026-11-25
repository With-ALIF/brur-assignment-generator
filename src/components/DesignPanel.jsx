import React from "react";

const COLOR_PRESETS = [
  { name: "Black", color: "#111111" },
  { name: "Navy", color: "#22478B" },
  { name: "Green", color: "#23745D" },
  { name: "Brown", color: "#87483D" },
  { name: "Charcoal", color: "#514C59" }
];

const TEMPLATES = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" }
];

export default function DesignPanel({ formData, onChange, hidden, directionClass }) {
  const selectedTemplate = formData.coverTemplate || "classic";
  const selectedColor = (formData.coverColor || "#111111").toUpperCase();

  const matchedPreset = COLOR_PRESETS.find(
    (p) => p.color.toUpperCase() === selectedColor
  );
  const colorStatusText = matchedPreset
    ? `Selected: ${matchedPreset.name}`
    : `Selected: Custom (${selectedColor})`;

  return (
    <div
      className={`tp ${directionClass || ""}`}
      id="p4"
      role="tabpanel"
      hidden={hidden}
    >
      <div className="section">
        <h3 className="section-title">
          <span className="section-number">05</span> Cover Design
        </h3>

        <div className="template-options" role="group" aria-label="Choose cover design">
          {TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              className={`template-btn ${selectedTemplate === tpl.id ? "active" : ""}`}
              type="button"
              aria-pressed={selectedTemplate === tpl.id}
              onClick={() => onChange("coverTemplate", tpl.id)}
            >
              <span className={`template-swatch swatch-${tpl.id}`}></span>
              {tpl.label}
            </button>
          ))}
        </div>

        <div className="cover-colors">
          <label className="color-heading">
            Cover Border &amp; Design Color
          </label>
          <div className="color-options" role="group" aria-label="Choose border and design color">
            {COLOR_PRESETS.map((p) => {
              const isSelected = selectedColor === p.color.toUpperCase();
              return (
                <button
                  key={p.name}
                  type="button"
                  className={`color-btn ${isSelected ? "active" : ""}`}
                  aria-pressed={isSelected}
                  title={p.name}
                  onClick={() => onChange("coverColor", p.color)}
                >
                  <span className="color-dot" style={{ background: p.color }}></span>
                  <span>{p.name}</span>
                </button>
              );
            })}

            <label
              className={`color-btn custom-color-btn ${!matchedPreset ? "active" : ""}`}
              htmlFor="accentColorPicker"
              title="Custom color"
            >
              <span
                className="color-dot"
                style={{ background: formData.coverColor || "#111111" }}
              ></span>
              <span>Custom</span>
              <input
                type="color"
                id="accentColorPicker"
                value={formData.coverColor || "#111111"}
                aria-label="Custom cover border and design color"
                onChange={(e) => onChange("coverColor", e.target.value)}
              />
            </label>
          </div>
          <div className="color-status" id="colorStatus" aria-live="polite">
            {colorStatusText}
          </div>
        </div>
      </div>
    </div>
  );
}
