const STORAGE_KEY = "pill-tracker-state";
const RESET_HOUR = 3; // 3 AM local time

const morningBtn = document.getElementById("morning-btn");
const nightBtn = document.getElementById("night-btn");
const morningStatus = document.getElementById("morning-status");
const nightStatus = document.getElementById("night-status");
const morningTime = document.getElementById("morning-time");
const nightTime = document.getElementById("night-time");
const dayLabel = document.getElementById("day-label");
const nextReset = document.getElementById("next-reset");
const streakCount = document.getElementById("streak-count");
const clearBtn = document.getElementById("clear-btn");

function getDayKey(date = new Date()) {
  const shifted = new Date(date);
  shifted.setHours(date.getHours() - RESET_HOUR, date.getMinutes(), date.getSeconds(), date.getMilliseconds());
  return shifted.toISOString().slice(0, 10);
}

function getNextReset(date = new Date()) {
  const next = new Date(date);
  next.setHours(RESET_HOUR, 0, 0, 0);
  if (date >= next) {
    next.setDate(next.getDate() + 1);
  }
  return next;
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw);
    return { ...createEmptyState(), ...parsed };
  } catch (error) {
    return createEmptyState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createEmptyState() {
  return {
    dayKey: getDayKey(),
    morningTaken: false,
    nightTaken: false,
    morningTimestamp: null,
    nightTimestamp: null,
    streakCount: 0,
    lastCompletedDayKey: null,
  };
}

function normalizeState(state) {
  const currentKey = getDayKey();
  if (state.dayKey !== currentKey) {
    return {
      ...createEmptyState(),
      streakCount: state.streakCount || 0,
      lastCompletedDayKey: state.lastCompletedDayKey || null,
    };
  }
  return state;
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "—";
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDayLabel(dayKey) {
  const date = new Date(dayKey + "T00:00:00");
  return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

function render(state) {
  const currentKey = getDayKey();
  dayLabel.textContent = formatDayLabel(currentKey);
  streakCount.textContent = state.streakCount === 1 ? "1 day" : `${state.streakCount} days`;
  nextReset.textContent = getNextReset().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  morningBtn.setAttribute("aria-pressed", String(state.morningTaken));
  nightBtn.setAttribute("aria-pressed", String(state.nightTaken));

  morningStatus.textContent = state.morningTaken ? "Taken" : "Not taken";
  nightStatus.textContent = state.nightTaken ? "Taken" : "Not taken";

  morningTime.textContent = formatTimestamp(state.morningTimestamp);
  nightTime.textContent = formatTimestamp(state.nightTimestamp);
}

let state = normalizeState(loadState());
render(state);

function getPreviousDayKey(dayKey) {
  const date = new Date(dayKey + "T00:00:00");
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

function updateStreak(state) {
  if (!(state.morningTaken && state.nightTaken)) return state;

  if (state.lastCompletedDayKey === state.dayKey) {
    return state;
  }

  const previousDayKey = state.lastCompletedDayKey ? getPreviousDayKey(state.dayKey) : null;
  if (state.lastCompletedDayKey && state.lastCompletedDayKey === previousDayKey) {
    state.streakCount += 1;
  } else {
    state.streakCount = 1;
  }
  state.lastCompletedDayKey = state.dayKey;
  return state;
}

function toggleDose(type) {
  const now = new Date();
  if (type === "morning") {
    state.morningTaken = !state.morningTaken;
    state.morningTimestamp = state.morningTaken ? now.toISOString() : null;
  } else {
    state.nightTaken = !state.nightTaken;
    state.nightTimestamp = state.nightTaken ? now.toISOString() : null;
  }
  state.dayKey = getDayKey();
  state = updateStreak(state);
  saveState(state);
  render(state);
}

function clearToday() {
  state = createEmptyState();
  saveState(state);
  render(state);
}

morningBtn.addEventListener("click", () => toggleDose("morning"));
nightBtn.addEventListener("click", () => toggleDose("night"));
clearBtn.addEventListener("click", clearToday);

setInterval(() => {
  state = normalizeState(loadState());
  state = updateStreak(state);
  saveState(state);
  render(state);
}, 60000);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
