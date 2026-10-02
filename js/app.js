async function init() {
  const res = await fetch("portfolio.json");
  const items = await res.json();
  const grid = document.getElementById("grid");
  const esc = (s) => s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
  const fmtDate = (s) => new Date(s.replace(" ", "T")).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

  grid.innerHTML = items.map((p) => {
    const cap = p.caption || "";
    const short = cap.length > 140 ? cap.slice(0, 137) + "…" : cap;
    const img = p.photo
      ? `<div class="pf-img has-photo"><img loading="lazy" src="photos/${p.photo}" alt="${esc(cap.slice(0, 80))}"></div>`
      : `<div class="pf-img">📷<br>Portfolio photo<br>coming soon</div>`;
    return `<article class="pf-card">${img}
      <div class="pf-cap">${esc(short) || "—"}</div>
      <div class="pf-meta">${fmtDate(p.date)} · <a href="${p.url}" target="_blank" rel="noopener">View on Instagram ↗</a></div>
    </article>`;
  }).join("");

  // about photo placeholder (replaced when Diana's photo arrives)
  const about = document.getElementById("aboutPhoto");
  about.src = "about.jpg";
  about.onerror = () => about.remove();
}

init();
