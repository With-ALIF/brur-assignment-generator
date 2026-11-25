export function todayISO() {
  const n = new Date();
  return (
    n.getFullYear() +
    "-" +
    String(n.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(n.getDate()).padStart(2, "0")
  );
}

export function prettyDate(v) {
  if (!v) return "";
  const d = new Date(v + "T00:00:00");
  return isNaN(d)
    ? ""
    : d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
}
