:root {
  color-scheme: light;
  --bg: #f7f3ea;
  --surface: #ffffff;
  --ink: #2a2a2a;
  --muted: #6d655a;
  --accent: #d97b4d;
  --accent-strong: #b35f36;
  --card-shadow: 0 14px 35px rgba(0, 0, 0, 0.12);
  --radius: 18px;
  --transition: 160ms ease;
  font-family: "Libre Baskerville", "Palatino Linotype", "Book Antiqua", Palatino, serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #ffffff 0%, #f7f0e2 42%, #ede3d2 100%);
  color: var(--ink);
  padding: 32px 20px;
}

.app {
  width: min(540px, 100%);
  background: var(--surface);
  border-radius: 28px;
  box-shadow: var(--card-shadow);
  padding: 32px;
  display: grid;
  gap: 24px;
}

.header h1 {
  margin: 0 0 6px;
  font-size: 2rem;
  letter-spacing: 0.5px;
}

.subtitle {
  margin: 0;
  color: var(--muted);
}

.status {
  background: #fff8ec;
  border-radius: var(--radius);
  padding: 16px 18px;
  display: grid;
  gap: 8px;
  border: 1px solid rgba(217, 123, 77, 0.2);
}

.status-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.label {
  color: var(--muted);
}

.cards {
  display: grid;
  gap: 18px;
}

.card {
  border: none;
  border-radius: var(--radius);
  padding: 20px;
  text-align: left;
  background: #fbfaf7;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  display: grid;
  gap: 8px;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
}

.card:hover,
.card:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  outline: none;
}

.card[aria-pressed="true"] {
  background: #fff1e7;
  border: 1px solid rgba(179, 95, 54, 0.3);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
}

.card-status {
  font-size: 1.05rem;
  color: var(--accent-strong);
}

.card-time {
  font-size: 0.9rem;
  color: var(--muted);
}

.actions {
  display: flex;
  justify-content: flex-end;
}

button.secondary {
  background: transparent;
  border: 1px solid rgba(42, 42, 42, 0.25);
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--transition);
}

button.secondary:hover,
button.secondary:focus-visible {
  background: rgba(42, 42, 42, 0.06);
  outline: none;
}

@media (max-width: 480px) {
  .app {
    padding: 24px;
  }

  .header h1 {
    font-size: 1.7rem;
  }
}
