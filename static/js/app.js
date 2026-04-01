const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const clearChatBtn = document.getElementById("clearChatBtn");
const bmiForm = document.getElementById("bmiForm");
const bmiResult = document.getElementById("bmiResult");
const skinForm = document.getElementById("skinForm");
const skinImage = document.getElementById("skinImage");
const skinSymptoms = document.getElementById("skinSymptoms");
const skinPreview = document.getElementById("skinPreview");
const skinPreviewWrap = document.getElementById("skinPreviewWrap");
const skinResult = document.getElementById("skinResult");
const themeToggle = document.getElementById("themeToggle");
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".panel, .panel-grid");
const languageSelect = document.getElementById("languageSelect");
const logoutBtn = document.getElementById("logoutBtn");
const micBtn = document.getElementById("micBtn");
const voiceStatusBadge = document.getElementById("voiceStatusBadge");
const speakReplyBtn = document.getElementById("speakReplyBtn");
const quickNavs = document.querySelectorAll(".quick-nav");
const addWaterBtn = document.getElementById("addWaterBtn");
const resetWaterBtn = document.getElementById("resetWaterBtn");
const waterProgressText = document.getElementById("waterProgressText");
const waterProgressBar = document.getElementById("waterProgressBar");
const sidebarWaterCount = document.getElementById("sidebarWaterCount");
const medicineForm = document.getElementById("medicineForm");
const medicineInput = document.getElementById("medicineInput");
const medicineList = document.getElementById("medicineList");
const sidebarMedicineCount = document.getElementById("sidebarMedicineCount");
const dailyFocusCard = document.getElementById("dailyFocusCard");
const refreshFocusBtn = document.getElementById("refreshFocusBtn");
const todayDateChip = document.getElementById("todayDateChip");
const sidebar = document.getElementById("sidebar");
const toggleSidebarBtn = document.getElementById("toggleSidebarBtn");
const layout = document.querySelector(".layout");

const STORAGE_KEY = "mediassist_pro_chat";
const LANGUAGE_KEY = "mediassist_language";
const THEME_KEY = "mediassist_theme";
const WATER_KEY = "mediassist_water";
const MEDICINE_KEY = "mediassist_medicines";
const SIDEBAR_KEY = "mediassist_sidebar_collapsed";

const DAILY_FOCUS = [
  { title: "Hydration boost", text: "Drink one glass of water after waking up and one with lunch." },
  { title: "Move a little", text: "Walk for 10 minutes after sitting for a long time." },
  { title: "Sleep check", text: "Try to keep your sleep time regular tonight." },
  { title: "Medication habit", text: "Keep medicines in one safe place and tick them after use." },
  { title: "Food balance", text: "Add one fruit or vegetable to your next meal." },
  { title: "Stress reset", text: "Take 5 slow deep breaths before starting a busy task." },
];

let lastBotReply = "";
let lastFocusIndex = 0;

function saveMessages(messages) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

function loadMessages() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatPlainTextReply(text) {
  return escapeHtml(text).replace(/\n/g, "<br>");
}

function compactList(items) {
  if (!Array.isArray(items)) return [];
  return items.map((item) => String(item || "").trim()).filter(Boolean).slice(0, 5);
}

function compactLine(label, value) {
  if (!value) return "";
  return `<div class="mini-line"><span class="mini-label">${escapeHtml(label)}:</span> <span>${escapeHtml(value)}</span></div>`;
}

function compactListLine(label, items) {
  const clean = compactList(items);
  if (!clean.length) return "";
  return `
    <div class="mini-line stack-line">
      <span class="mini-label">${escapeHtml(label)}:</span>
      <ul class="mini-list">${clean.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </div>
  `;
}

function buildStructuredReplyCard(data) {
  const concern = data?.likely_concern || data?.condition || "";
  const medicines = compactList(data?.medicines || data?.medicine);
  const remedies = compactList(data?.basic_home_remedies || data?.symptoms);
  const diet = compactList(data?.diet_plan || data?.diet);
  const precautions = compactList(data?.precautions);
  const doctor = compactList(data?.when_to_see_doctor || data?.doctor);
  const note = data?.disclaimer || "";

  return `
    <div class="answer-card-wide">
      ${compactLine("Likely concern", concern)}
      ${compactListLine("Medicines", medicines)}
      ${compactListLine("Basic home remedies", remedies)}
      ${compactListLine("Diet plan", diet)}
      ${compactListLine("Precaution", precautions)}
      ${compactListLine("When to see a doctor", doctor)}
      ${note ? `<div class="answer-note">${escapeHtml(note)}</div>` : ""}
    </div>
  `;
}

function addMessage(message, sender) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;

  if (typeof message === "object" && message !== null) {
    if (sender === "bot" && message.structured_reply) {
      div.innerHTML = buildStructuredReplyCard(message.structured_reply);
      lastBotReply = message.reply || div.textContent.trim();
    } else if (message.text) {
      div.innerHTML = formatPlainTextReply(message.text);
      if (sender === "bot") lastBotReply = message.text;
    } else {
      div.textContent = "";
    }
  } else {
    div.innerHTML = formatPlainTextReply(message);
    if (sender === "bot") lastBotReply = String(message);
  }

  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function renderSavedMessages() {
  const messages = loadMessages();
  chatMessages.innerHTML = "";

  if (!messages.length) {
    addMessage(
      `Hello ${window.MEDIASSIST_BOOT?.userName || "there"}. I am MediAssist Pro. Ask a health question, use the mic, track water, manage medicines, calculate BMI, upload a skin photo, or find nearby care.`,
      "bot"
    );
    return;
  }

  messages.forEach((msg) => addMessage(msg, msg.sender));
}

function setLanguageFromStorage() {
  languageSelect.value = localStorage.getItem(LANGUAGE_KEY) || "en";
}

function setThemeFromStorage() {
  if ((localStorage.getItem(THEME_KEY) || "dark") === "light") {
    document.body.classList.add("light");
  }
}

function setSidebarState(isCollapsed) {
  if (!sidebar || !layout || !toggleSidebarBtn) return;

  sidebar.classList.toggle("collapsed", isCollapsed);
  layout.classList.toggle("sidebar-collapsed", isCollapsed);
  toggleSidebarBtn.textContent = isCollapsed ? "⏩" : "⏪";
  toggleSidebarBtn.setAttribute("aria-label", isCollapsed ? "Show Health Hub" : "Hide Health Hub");
  localStorage.setItem(SIDEBAR_KEY, isCollapsed ? "true" : "false");
}

function loadSidebarState() {
  const isCollapsed = localStorage.getItem(SIDEBAR_KEY) === "true";
  setSidebarState(isCollapsed);
}

function openSection(target) {
  navButtons.forEach((btn) => btn.classList.toggle("active", btn.dataset.target === target));
  sections.forEach((section) => {
    section.classList.add("section-hidden");
    section.classList.remove("section-visible");
  });
  const el = document.getElementById(target);
  if (!el) return;
  el.classList.remove("section-hidden");
  el.classList.add("section-visible");
  if (target === "mapSection") setTimeout(() => map.invalidateSize(), 180);
}

function getTodayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function loadWaterData() {
  try {
    const data = JSON.parse(localStorage.getItem(WATER_KEY) || "{}");
    if (data.date !== getTodayKey()) {
      return { date: getTodayKey(), count: 0 };
    }
    return data;
  } catch {
    return { date: getTodayKey(), count: 0 };
  }
}

function saveWaterData(data) {
  localStorage.setItem(WATER_KEY, JSON.stringify(data));
}

function updateWaterUI() {
  const data = loadWaterData();
  const count = Math.min(Number(data.count || 0), 8);
  const percent = (count / 8) * 100;
  waterProgressText.textContent = `${count} / 8 glasses`;
  sidebarWaterCount.textContent = `${count} / 8`;
  waterProgressBar.style.width = `${percent}%`;
}

function loadMedicines() {
  try {
    return JSON.parse(localStorage.getItem(MEDICINE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveMedicines(items) {
  localStorage.setItem(MEDICINE_KEY, JSON.stringify(items));
}

function renderMedicineList() {
  const items = loadMedicines();
  const doneCount = items.filter((item) => item.done).length;
  sidebarMedicineCount.textContent = `${doneCount} done`;

  if (!items.length) {
    medicineList.className = "task-list empty-state slim-empty";
    medicineList.textContent = "No medicines added yet.";
    return;
  }

  medicineList.className = "task-list";
  medicineList.innerHTML = items.map((item, index) => `
    <div class="task-item ${item.done ? "done" : ""}">
      <label>
        <input type="checkbox" data-medicine-check="${index}" ${item.done ? "checked" : ""}>
        <span>${escapeHtml(item.name)}</span>
      </label>
      <button type="button" class="task-delete" data-medicine-delete="${index}">✕</button>
    </div>
  `).join("");
}

function renderDailyFocus(forceNext = false) {
  if (forceNext) {
    lastFocusIndex = (lastFocusIndex + 1) % DAILY_FOCUS.length;
  } else {
    lastFocusIndex = new Date().getDate() % DAILY_FOCUS.length;
  }
  const item = DAILY_FOCUS[lastFocusIndex];
  dailyFocusCard.innerHTML = `<strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.text)}</p>`;
}

function setTodayChip() {
  const now = new Date();
  todayDateChip.textContent = now.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

}
function setGreetingChip() {
  const greetingChip = document.getElementById("greetingChip");
  if (!greetingChip) return;

  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else if (hour >= 17 && hour < 21) {
    greeting = "Good evening";
  } else {
    greeting = "Good night";
  }

  const userName = window.MEDIASSIST_BOOT?.userName || "User";
  greetingChip.textContent = `${greeting}, ${userName}`;
}

renderSavedMessages();
setLanguageFromStorage();
setThemeFromStorage();
updateWaterUI();
renderMedicineList();
renderDailyFocus();
setTodayChip();
setGreetingChip();
loadSidebarState();

languageSelect.addEventListener("change", () => {
  localStorage.setItem(LANGUAGE_KEY, languageSelect.value);
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(THEME_KEY, document.body.classList.contains("light") ? "light" : "dark");
});

clearChatBtn.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderSavedMessages();
});

logoutBtn.addEventListener("click", async () => {
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } finally {
    window.location.href = "/login";
  }
});

quickNavs.forEach((btn) => {
  btn.addEventListener("click", () => openSection(btn.dataset.open));
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => openSection(button.dataset.target));
});

addWaterBtn.addEventListener("click", () => {
  const data = loadWaterData();
  data.count = Math.min(Number(data.count || 0) + 1, 8);
  data.date = getTodayKey();
  saveWaterData(data);
  updateWaterUI();
});

resetWaterBtn.addEventListener("click", () => {
  saveWaterData({ date: getTodayKey(), count: 0 });
  updateWaterUI();
});

medicineForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = medicineInput.value.trim();
  if (!value) return;
  const items = loadMedicines();
  items.push({ name: value, done: false });
  saveMedicines(items);
  medicineInput.value = "";
  renderMedicineList();
});

medicineList.addEventListener("click", (e) => {
  const deleteIndex = e.target.dataset.medicineDelete;
  if (deleteIndex !== undefined) {
    const items = loadMedicines();
    items.splice(Number(deleteIndex), 1);
    saveMedicines(items);
    renderMedicineList();
    return;
  }

  const checkboxIndex = e.target.dataset.medicineCheck;
  if (checkboxIndex !== undefined) {
    const items = loadMedicines();
    items[Number(checkboxIndex)].done = e.target.checked;
    saveMedicines(items);
    renderMedicineList();
  }
});

refreshFocusBtn.addEventListener("click", () => renderDailyFocus(true));

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  const messages = loadMessages();
  const userMessage = { sender: "user", text: message };
  messages.push(userMessage);
  saveMessages(messages);
  addMessage(userMessage, "user");
  chatInput.value = "";

  const thinkingMessage = { sender: "bot", text: "Thinking..." };
  addMessage(thinkingMessage, "bot");
  const thinkingNode = chatMessages.lastElementChild;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, language: languageSelect.value })
    });

    const data = await res.json();
    thinkingNode.remove();

    const botMessage = {
      sender: "bot",
      text: data.reply || data.error || "No response available.",
      structured_reply: data.structured_reply || null
    };

    messages.push(botMessage);
    saveMessages(messages);
    addMessage(botMessage, "bot");
  } catch {
    thinkingNode.remove();
    const botMessage = { sender: "bot", text: "The chat service is unavailable right now." };
    messages.push(botMessage);
    saveMessages(messages);
    addMessage(botMessage, "bot");
  }
});

bmiForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const height_cm = Number(document.getElementById("heightCm").value);
  const weight_kg = Number(document.getElementById("weightKg").value);

  const res = await fetch("/api/bmi", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ height_cm, weight_kg })
  });

  const data = await res.json();
  if (data.error) {
    bmiResult.innerHTML = `<strong>Error:</strong> ${escapeHtml(data.error)}`;
    return;
  }

  bmiResult.innerHTML = `
    <div class="metric-card">
      <div><strong>BMI:</strong> ${escapeHtml(data.bmi)}</div>
      <div><strong>Category:</strong> ${escapeHtml(data.category)}</div>
      <div><strong>Tip:</strong> ${escapeHtml(data.tip)}</div>
    </div>
  `;
});

skinImage.addEventListener("change", () => {
  const file = skinImage.files?.[0];
  if (!file) return;
  skinPreview.src = URL.createObjectURL(file);
  skinPreviewWrap.classList.remove("hidden");
});

function renderSkinResult(result) {
  const care = compactList(result.care || []);
  skinResult.innerHTML = `
    <div class="answer-card-wide">
      ${compactLine("Analysis", result.analysis || "Not available")}
      ${compactListLine("Care", care)}
      ${compactLine("Warning", result.warning || "This is not a confirmed diagnosis.")}
      ${compactLine("Doctor", result.see_doctor_when || "If symptoms get worse or do not improve.")}
    </div>
  `;
}

skinForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = skinImage.files?.[0];
  if (!file) {
    skinResult.textContent = "Please choose an image first.";
    return;
  }

  const formData = new FormData();
  formData.append("image", file);
  formData.append("symptoms", skinSymptoms.value.trim());
  formData.append("language", languageSelect.value);
  skinResult.textContent = "Scanning image...";

  try {
    const res = await fetch("/api/skin-scan", { method: "POST", body: formData });
    const data = await res.json();

    if (data.error) {
      skinResult.innerHTML = `<strong>Error:</strong> ${escapeHtml(data.error)}`;
      return;
    }

    renderSkinResult(data.result || {});
  } catch {
    skinResult.textContent = "Skin scan service is unavailable right now.";
  }
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
let isListening = false;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.continuous = false;

  function getSpeechLang(code) {
    const map = {
      en: "en-US",
      hi: "hi-IN",
      mr: "mr-IN",
      es: "es-ES",
      fr: "fr-FR",
      de: "de-DE"
    };
    return map[code] || "en-US";
  }

  recognition.addEventListener("start", () => {
    isListening = true;
    micBtn.classList.add("active");
    voiceStatusBadge.textContent = "Listening...";
  });

  recognition.addEventListener("end", () => {
    isListening = false;
    micBtn.classList.remove("active");
    voiceStatusBadge.textContent = "Mic ready";
  });

  recognition.addEventListener("error", () => {
    isListening = false;
    micBtn.classList.remove("active");
    voiceStatusBadge.textContent = "Mic error";
  });

  recognition.addEventListener("result", (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      transcript += event.results[i][0].transcript;
    }
    chatInput.value = transcript.trim();
  });

  micBtn.addEventListener("click", () => {
    recognition.lang = getSpeechLang(languageSelect.value);
    if (isListening) {
      recognition.stop();
      return;
    }
    recognition.start();
  });
} else {
  micBtn.disabled = true;
  voiceStatusBadge.textContent = "Mic not supported";
}

speakReplyBtn.addEventListener("click", () => {
  if (!lastBotReply || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(lastBotReply);
  utterance.lang = ({ en: "en-US", hi: "hi-IN", mr: "mr-IN", es: "es-ES", fr: "fr-FR", de: "de-DE" })[languageSelect.value] || "en-US";
  window.speechSynthesis.speak(utterance);
});

const map = L.map("map").setView([20.5937, 78.9629], 5);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);
let userMarker = null;
let placeMarkers = [];

function clearMapMarkers() {
  placeMarkers.forEach((marker) => map.removeLayer(marker));
  placeMarkers = [];
}

function formatDistance(km) {
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
}

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function findNearbyPlaces(lat, lon) {
  const type = document.getElementById("placeType").value;
  const radiusKm = Number(document.getElementById("radiusKm").value);
  const radiusM = radiusKm * 1000;
  const mapResults = document.getElementById("mapResults");

  mapResults.textContent = "Loading nearby places...";
  clearMapMarkers();

  const query = `
    [out:json][timeout:25];
    (
      node[amenity=${type}](around:${radiusM},${lat},${lon});
      way[amenity=${type}](around:${radiusM},${lat},${lon});
      relation[amenity=${type}](around:${radiusM},${lat},${lon});
    );
    out center 25;
  `;

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `data=${encodeURIComponent(query)}`
    });

    const data = await res.json();
    const items = (data.elements || []).map((el) => {
      const itemLat = el.lat ?? el.center?.lat;
      const itemLon = el.lon ?? el.center?.lon;
      if (!itemLat || !itemLon) return null;
      return {
        name: el.tags?.name || type,
        phone: el.tags?.phone || "Not available",
        lat: itemLat,
        lon: itemLon,
        distance: calculateDistanceKm(lat, lon, itemLat, itemLon)
      };
    }).filter(Boolean).sort((a, b) => a.distance - b.distance).slice(0, 12);

    if (!items.length) {
      mapResults.textContent = "No places found. Try a larger radius.";
      return;
    }

    mapResults.innerHTML = items.map((item, index) => `
      <div class="place-item">
        <strong>${index + 1}. ${escapeHtml(item.name)}</strong><br>
        <span class="small-muted">${formatDistance(item.distance)} away</span><br>
        <span class="small-muted">Phone: ${escapeHtml(item.phone)}</span>
      </div>
    `).join("");

    items.forEach((item, index) => {
      const marker = L.marker([item.lat, item.lon]).addTo(map);
      marker.bindPopup(`<strong>${index + 1}. ${escapeHtml(item.name)}</strong><br>${formatDistance(item.distance)} away`);
      placeMarkers.push(marker);
    });

    map.setView([lat, lon], radiusKm > 20 ? 10 : 12);
  } catch {
    mapResults.textContent = "Could not load nearby places right now.";
  }
}

document.getElementById("findNearbyBtn").addEventListener("click", () => {
  if (!navigator.geolocation) {
    document.getElementById("mapResults").textContent = "Geolocation is not supported in this browser.";
    return;
  }

  document.getElementById("mapResults").textContent = "Getting your location...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      if (userMarker) map.removeLayer(userMarker);
      userMarker = L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();
      map.setView([latitude, longitude], 13);
      findNearbyPlaces(latitude, longitude);
    },
    () => {
      document.getElementById("mapResults").textContent = "Location access denied or unavailable.";
    },
    { enableHighAccuracy: true, timeout: 12000 }
  );
});

if (toggleSidebarBtn) {
  toggleSidebarBtn.addEventListener("click", () => {
    const willCollapse = !sidebar.classList.contains("collapsed");
    setSidebarState(willCollapse);
  });
}