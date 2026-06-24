const API_BASE = window.location.origin;

async function apiFetch(endpoint, options) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, options || {});
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function renderFeatures() {
  const grid = document.getElementById("features-grid");
  APP_INFO.features.forEach((f) => {
    const card = document.createElement("article");
    card.className = "feature-card";
    card.innerHTML = `<div class="feature-icon">${f.icon}</div><h3>${f.title}</h3><p>${f.desc}</p>`;
    grid.appendChild(card);
  });
}

function renderSteps() {
  const list = document.getElementById("steps-list");
  APP_INFO.steps.forEach((s) => {
    const div = document.createElement("div");
    div.className = "step";
    div.innerHTML = `<span class="step-number">${s.num}</span><div><h3>${s.title}</h3><p>${s.desc}</p></div>`;
    list.appendChild(div);
  });
}

function renderTrends(trends) {
  const list = document.getElementById("trends-list");
  list.innerHTML = "";

  (trends || TRENDS_DATA).forEach((t, i) => {
    const card = document.createElement("article");
    card.className = "trend-card";
    card.style.setProperty("--accent", t.color || "#d93900");

    card.innerHTML = `
      <div class="trend-header">
        <span class="trend-number" style="background:${t.color || "#d93900"}">${t.icon || "🔥"}</span>
        <div class="trend-info">
          <span class="trend-tag ${t.tagClass || "tag-ai"}">${t.tag || "General"}</span>
          <h3>${t.title}</h3>
          <p>${t.description || ""}</p>
        </div>
      </div>
      ${t.script ? `<button class="script-btn" data-index="${i}">🎬 Ver guión</button>` : ""}
    `;
    list.appendChild(card);
  });

  document.querySelectorAll(".script-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      const trend = (trends || TRENDS_DATA)[idx];
      if (trend?.script) openModal(trend);
    });
  });
}

function openModal(trend) {
  const overlay = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");

  let rows = trend.script.scenes
    .map(
      (s) => `
    <div class="modal-scene">
      <div class="scene-time">${s.time}</div>
      <div class="scene-body">
        <div class="scene-visual"><strong>Visual:</strong> ${s.visual}</div>
        <div class="scene-voice"><strong>Voz:</strong> ${s.voice}</div>
      </div>
    </div>`
    )
    .join("");

  content.innerHTML = `
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-header">
      <span class="modal-tag" style="background:${trend.color || "#d93900"}">${trend.tag || "Trend"}</span>
      <h2>${trend.icon || "🔥"} ${trend.title}</h2>
    </div>
    <div class="modal-scenes">${rows}</div>
    <div class="modal-hashtags">${trend.script.hashtags || ""}</div>
  `;

  overlay.classList.add("visible");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("visible");
}

async function loadStats() {
  const el = document.getElementById("stats-bar");
  if (!el) return;

  const data = await apiFetch("/api/data/stats");
  if (!data) return;

  el.innerHTML = `
    📊 <strong>${data.total_trends}</strong> trends · 
    <strong>${data.total_messages}</strong> mensajes ·
    ${(data.page_views || []).map((p) => `${p.page}: ${p.count}`).join(" · ") || "0 visitas"}
  `;
}

async function loadDynamicTrends() {
  const dbTrends = await apiFetch("/api/data/trends");
  if (!dbTrends?.data?.length) return;

  const mapped = dbTrends.data.map((t) => ({
    title: t.title,
    description: t.description || "",
    tag: t.category || "General",
    tagClass: "tag-ai",
    color: "#d93900",
    icon: "📊",
    heat: t.heat,
    script: null,
  }));

  renderTrends(mapped);

  const badge = document.querySelector(".badge-trends");
  if (badge) badge.textContent = "📊 Desde MySQL";
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("contact-feedback");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    feedback.textContent = "Enviando...";
    const result = await apiFetch("/api/data/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (result?.ok) {
      feedback.textContent = "✅ Mensaje recibido (guardado en MySQL)";
      form.reset();
      loadStats();
    } else {
      feedback.textContent = "❌ Error al enviar (¿el backend está corriendo?)";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeatures();
  renderSteps();
  renderTrends();

  loadDynamicTrends();
  loadStats();
  setupContactForm();

  apiFetch("/api/data/pageview?page=/").catch(() => {});

  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
