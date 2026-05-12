import { useState } from "react";

/* ============================================================
   AUSWAHL-OPTIONEN
   ============================================================ */
const architectureStyles = [
  { id: "european", label: "Europäisch", emoji: "🏛️", desc: "Klassische Altstadt, Gründerzeit" },
  { id: "asian", label: "Asiatisch", emoji: "🏯", desc: "Pagoden, dichte Märkte" },
  { id: "futuristic", label: "Futuristisch", emoji: "🚀", desc: "Glas, Stahl, schwebende Strukturen" },
  { id: "american", label: "Amerikanisch", emoji: "🗽", desc: "Skyline, Wolkenkratzer, Suburbs" },
  { id: "mediterranean", label: "Mediterran", emoji: "🌊", desc: "Weiße Häuser, enge Gassen" },
  { id: "nordic", label: "Nordisch", emoji: "🌲", desc: "Holz, Natur, Minimalismus" },
];
const climates = [
  { id: "tropical", label: "Tropisch", emoji: "🌴" },
  { id: "desert", label: "Wüste", emoji: "🏜️" },
  { id: "temperate", label: "Gemäßigt", emoji: "🌤️" },
  { id: "arctic", label: "Arktisch", emoji: "❄️" },
  { id: "rainy", label: "Regenreich", emoji: "🌧️" },
];
const daytimes = [
  { id: "dawn", label: "Morgendämmerung", emoji: "🌅" },
  { id: "day", label: "Tagsüber", emoji: "☀️" },
  { id: "golden", label: "Goldene Stunde", emoji: "🌇" },
  { id: "night", label: "Nacht", emoji: "🌃" },
  { id: "storm", label: "Sturm", emoji: "⛈️" },
];
const moods = [
  { id: "vibrant", label: "Lebendig", emoji: "🎉" },
  { id: "peaceful", label: "Ruhig", emoji: "🕊️" },
  { id: "mysterious", label: "Geheimnisvoll", emoji: "🌫️" },
  { id: "industrial", label: "Industrial", emoji: "🏭" },
  { id: "romantic", label: "Romantisch", emoji: "💫" },
];
const taxModels = [
  { id: "low", label: "Niedrigsteuer", emoji: "💸", desc: "Schlanker Staat, wenig Umverteilung" },
  { id: "balanced", label: "Ausgewogen", emoji: "⚖️", desc: "Mittlere Steuern, solide Daseinsvorsorge" },
  { id: "social", label: "Sozialstaat", emoji: "🤝", desc: "Hohe Steuern, breite Leistungen" },
  { id: "corporate", label: "Wirtschaftsfreundlich", emoji: "🏢", desc: "Niedrige Unternehmenssteuern" },
];

const STEPS = [
  "Willkommen", "Charakter", "Architektur", "Atmosphäre",
  "Bevölkerung", "Mobilität", "Wirtschaft & Energie",
  "Finanzen", "Zusammenfassung", "Deine Stadt"
];

/* ============================================================
   PROMPT-BUILDER  (EIN kombinierter 3-Panel-Prompt)
   ============================================================ */
function buildCombinedPrompt(city) {
  const styleMap = {
    european: "European classical architecture",
    asian: "Asian architecture with pagodas",
    futuristic: "futuristic sci-fi architecture with glass and steel",
    american: "American urban skyline",
    mediterranean: "Mediterranean white-washed buildings",
    nordic: "Nordic minimalist wooden architecture",
  };
  const climateMap = {
    tropical: "tropical lush vegetation", desert: "arid desert landscape",
    temperate: "temperate green surroundings", arctic: "snowy arctic environment",
    rainy: "rainy misty atmosphere",
  };
  const timeMap = {
    dawn: "at dawn with soft pink light", day: "in bright daylight",
    golden: "in golden hour warm light", night: "at night with glowing city lights",
    storm: "during a dramatic storm",
  };
  const moodMap = {
    vibrant: "vibrant and lively", peaceful: "calm and peaceful",
    mysterious: "dark and mysterious", industrial: "industrial and gritty",
    romantic: "romantic and atmospheric",
  };
  const style = styleMap[city.archStyle] || "mixed architecture";
  const climate = climateMap[city.climate] || "temperate climate";
  const time = timeMap[city.daytime] || "in daylight";
  const mood = moodMap[city.mood] || "lively";
  const density = city.density > 66 ? "densely packed urban" : city.density > 33 ? "medium density" : "sparse low-rise";
  const greenery = city.greenery > 66 ? "with lots of parks and trees" : city.greenery > 33 ? "with some greenery" : "with minimal vegetation";
  const modern = city.modernity > 66 ? "ultra-modern" : city.modernity > 33 ? "blend of old and new" : "historic and traditional";
  const wealth = city.wealth > 66 ? "wealthy and affluent" : city.wealth > 33 ? "middle-class" : "working-class";
  const age = city.ageProfile > 60 ? "elderly population" : city.ageProfile < 40 ? "young population" : "mixed-age population";

  return (
    `Three-panel triptych collage of the city ${city.name}, seamless cinematic composition, ` +
    `LEFT PANEL: photorealistic wide-angle street-level view of ${density} downtown, ${style}, ${modern}, ${greenery}, ${mood}, ${time}; ` +
    `CENTER PANEL: photorealistic portrait of a typical resident, ${wealth} ${age}, dressed reflecting ${style} culture and ${climate}, candid street photography, natural lighting; ` +
    `RIGHT PANEL: breathtaking aerial bird's-eye drone view from 500m, ${style}, ${density} layout, ${climate}, ${greenery}, ${time}; ` +
    `consistent color palette across all three panels, ultra-detailed, 8K, hyperrealistic, cinematic lighting, professional photography`
  );
}

const makeUrl = (prompt, w, h) => {
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&nologo=true&model=flux&seed=${seed}`;
};

/* ============================================================
   PIE-CHART KOMPONENTE (Pure SVG, keine Lib nötig)
   ============================================================ */
const PieChart = ({ title, data, size = 180 }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const cx = size / 2, cy = size / 2, r = size / 2 - 4;
  let acc = 0;
  const slices = data.map((d, i) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    const large = end - start > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    return { path, color: d.color, label: d.label, value: d.value, pct: Math.round((d.value / total) * 100) };
  });
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 800, color: "#1f2937", textAlign: "center" }}>{title}</h4>
      <div style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((s, i) => (
            <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="2" />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12 }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 12, height: 12, borderRadius: 3, background: s.color, display: "inline-block" }} />
              <span style={{ color: "#374151", fontWeight: 600 }}>{s.label}</span>
              <span style={{ color: "#6b7280", marginLeft: "auto" }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   GROßES BILD-CARD (3-Panel)
   ============================================================ */
const BigImageCard = ({ prompt, url, onGenerate }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [prevUrl, setPrevUrl] = useState(null);
  if (url !== prevUrl) { setPrevUrl(url); setLoaded(false); setError(false); }
  return (
    <div style={{ borderRadius: 24, border: "2px solid #6366f1", overflow: "hidden", marginBottom: 24, background: "#0f172a" }}>
      <div style={{ padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #6366f1" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>🎨</span>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#f1f5f9" }}>3-Panel Stadtansicht (Innenstadt · Bewohner · Vogelperspektive)</span>
        </div>
        {url && loaded && (
          <button onClick={onGenerate} style={{ fontSize: 12, padding: "6px 14px", borderRadius: 10, border: "1px solid #6366f1", background: "transparent", color: "#a5b4fc", cursor: "pointer", fontWeight: 700 }}>🔁 Neu generieren</button>
        )}
      </div>
      <div style={{ minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        {!url && (
          <div style={{ padding: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 64 }}>🏙️</span>
            <button onClick={onGenerate} style={{ padding: "16px 36px", borderRadius: 16, border: "none", background: "#6366f1", color: "#fff", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
              ✨ Stadtbild generieren
            </button>
            <span style={{ color: "#94a3b8", fontSize: 12 }}>Ein einziges großes Bild — schont den Server</span>
          </div>
        )}
        {url && !loaded && !error && (
          <div style={{ padding: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div style={{ width: 56, height: 56, border: "4px solid #6366f1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
            <span style={{ color: "#94a3b8", fontSize: 14 }}>KI generiert dein Stadtbild… (kann 30–60 Sek. dauern)</span>
          </div>
        )}
        {error && (
          <div style={{ padding: 50, textAlign: "center" }}>
            <div style={{ fontSize: 42, marginBottom: 10 }}>⚠️</div>
            <p style={{ color: "#f87171", fontSize: 14, margin: "0 0 14px" }}>Generierung fehlgeschlagen.</p>
            <button onClick={onGenerate} style={{ padding: "11px 26px", borderRadius: 12, border: "none", background: "#6366f1", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Nochmals versuchen</button>
          </div>
        )}
        {url && (
          <img src={url} alt="Stadt-Triptychon" onLoad={() => setLoaded(true)} onError={() => { setError(true); setLoaded(false); }} style={{ width: "100%", display: loaded ? "block" : "none" }} />
        )}
      </div>
      <details style={{ padding: "8px 18px 12px", borderTop: "1px solid #1e293b" }}>
        <summary style={{ fontSize: 11, color: "#64748b", cursor: "pointer", userSelect: "none" }}>Prompt anzeigen</summary>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#94a3b8", lineHeight: 1.7, marginTop: 8, wordBreak: "break-word" }}>{prompt}</div>
      </details>
    </div>
  );
};

/* ============================================================
   FORMULAR-BAUSTEINE
   ============================================================ */
const SliderField = ({ label, value, onChange, leftLabel, rightLabel }) => (
  <div style={{ marginBottom: 22 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: "#374151" }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 800, padding: "2px 10px", borderRadius: 999, background: "#6366f1", color: "#fff" }}>{value}%</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 11, color: "#9ca3af", width: 90, textAlign: "right" }}>{leftLabel}</span>
      <input type="range" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))} style={{ flex: 1, accentColor: "#6366f1" }} />
      <span style={{ fontSize: 11, color: "#9ca3af", width: 90 }}>{rightLabel}</span>
    </div>
  </div>
);

/* Mehrere Slider, deren Summe normalisiert auf 100 angezeigt wird */
const MixSliders = ({ title, values, setValues, fields }) => {
  const total = fields.reduce((s, f) => s + (values[f.key] || 0), 0) || 1;
  return (
    <div style={{ marginBottom: 16 }}>
      <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 12 }}>{title}</p>
      {fields.map(f => {
        const pct = Math.round(((values[f.key] || 0) / total) * 100);
        return (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "#374151" }}>{f.emoji} {f.label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: f.color }}>{pct}%</span>
            </div>
            <input type="range" min={0} max={100} value={values[f.key] || 0}
              onChange={e => setValues({ ...values, [f.key]: Number(e.target.value) })}
              style={{ width: "100%", accentColor: f.color }} />
          </div>
        );
      })}
      <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>Werte werden automatisch auf 100 % normalisiert.</p>
    </div>
  );
};

const ChoiceCard = ({ item, selected, onSelect }) => (
  <button onClick={() => onSelect(item.id)} style={{
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "16px 12px", borderRadius: 16, border: selected ? "2px solid #6366f1" : "2px solid #e5e7eb",
    background: selected ? "#eef2ff" : "#fff", cursor: "pointer", transition: "all 0.15s",
    boxShadow: selected ? "0 4px 20px rgba(99,102,241,0.15)" : "none",
    transform: selected ? "scale(1.04)" : "scale(1)"
  }}>
    <span style={{ fontSize: 32, marginBottom: 6 }}>{item.emoji}</span>
    <span style={{ fontWeight: 700, fontSize: 13, color: "#1f2937" }}>{item.label}</span>
    {item.desc && <span style={{ fontSize: 11, color: "#6b7280", marginTop: 4, textAlign: "center" }}>{item.desc}</span>}
  </button>
);
const SingleSelect = ({ items, selected, onSelect }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
    {items.map(item => <ChoiceCard key={item.id} item={item} selected={selected === item.id} onSelect={onSelect} />)}
  </div>
);

const ProgressBar = ({ step, total }) => (
  <div style={{ display: "flex", gap: 5, marginBottom: 28, justifyContent: "center" }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? "#6366f1" : "#e5e7eb", transition: "background 0.3s", maxWidth: 50 }} />
    ))}
  </div>
);

const Card = ({ children }) => (
  <div style={{ background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>
    {children}
  </div>
);

const SectionTitle = ({ icon, title, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ fontSize: 40, marginBottom: 8 }}>{icon}</div>
    <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1f2937" }}>{title}</h2>
    {sub && <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>{sub}</p>}
  </div>
);

const NavButtons = ({ onBack, onNext, nextLabel = "Weiter →", canNext = true }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
    <button onClick={onBack} style={{ padding: "12px 24px", borderRadius: 12, border: "2px solid #e5e7eb", background: "#fff", color: "#374151", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>← Zurück</button>
    <button onClick={onNext} disabled={!canNext} style={{ padding: "12px 28px", borderRadius: 12, border: "none", background: canNext ? "#6366f1" : "#d1d5db", color: "#fff", fontWeight: 800, cursor: canNext ? "pointer" : "not-allowed", fontSize: 14 }}>{nextLabel}</button>
  </div>
);

/* ============================================================
   HAUPTKOMPONENTE
   ============================================================ */
export default function CityDesigner() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState({
    name: "",
    density: 50, modernity: 50, greenery: 50,
    archStyle: "", climate: "", daytime: "day", mood: "",
    wealth: 50, diversity: 50, ageProfile: 50,
    // Mobilität
    mobility: { car: 30, bike: 25, transit: 30, foot: 15 },
    // Energie
    energy: { renewable: 40, fossil: 35, nuclear: 15, other: 10 },
    // Wirtschaft
    economy: { services: 45, industry: 25, tech: 20, agri: 10 },
    // Finanzen
    taxModel: "balanced",
    incomeTax: 35, corpTax: 25, vat: 19,
    debt: 40, // in % vom BIP
  });
  const [prompt, setPrompt] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const set = (key) => (val) => setCity(c => ({ ...c, [key]: val }));
  const setObj = (key) => (val) => setCity(c => ({ ...c, [key]: val }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const startGeneration = () => {
    const p = buildCombinedPrompt(city);
    setPrompt(p);
    setImgUrl(null);
    setStep(STEPS.length - 1);
  };
  const generateImage = () => {
    if (!prompt) return;
    setImgUrl(makeUrl(prompt, 1536, 640)); // breites Triptychon
  };

  const reset = () => {
    setStep(0);
    setCity({
      name: "", density: 50, modernity: 50, greenery: 50,
      archStyle: "", climate: "", daytime: "day", mood: "",
      wealth: 50, diversity: 50, ageProfile: 50,
      mobility: { car: 30, bike: 25, transit: 30, foot: 15 },
      energy: { renewable: 40, fossil: 35, nuclear: 15, other: 10 },
      economy: { services: 45, industry: 25, tech: 20, agri: 10 },
      taxModel: "balanced", incomeTax: 35, corpTax: 25, vat: 19, debt: 40,
    });
    setPrompt(null); setImgUrl(null);
  };

  const summaryRow = (label, value) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ color: "#6b7280", fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>{value}</span>
    </div>
  );

  /* --- Daten für Pie-Charts auf der Ergebnisseite --- */
  const mobilityPie = [
    { label: "Auto", value: city.mobility.car, color: "#ef4444" },
    { label: "Fahrrad", value: city.mobility.bike, color: "#10b981" },
    { label: "ÖPNV", value: city.mobility.transit, color: "#3b82f6" },
    { label: "Fußgänger", value: city.mobility.foot, color: "#f59e0b" },
  ];
  const energyPie = [
    { label: "Erneuerbar", value: city.energy.renewable, color: "#22c55e" },
    { label: "Fossil", value: city.energy.fossil, color: "#6b7280" },
    { label: "Atom", value: city.energy.nuclear, color: "#eab308" },
    { label: "Sonstiges", value: city.energy.other, color: "#a855f7" },
  ];
  const economyPie = [
    { label: "Dienstleistung", value: city.economy.services, color: "#0ea5e9" },
    { label: "Industrie", value: city.economy.industry, color: "#f97316" },
    { label: "Tech / IT", value: city.economy.tech, color: "#8b5cf6" },
    { label: "Landwirtschaft", value: city.economy.agri, color: "#84cc16" },
  ];
  const populationPie = [
    { label: "Wohlhabend", value: city.wealth, color: "#6366f1" },
    { label: "Mittelschicht", value: Math.max(0, 100 - city.wealth), color: "#cbd5e1" },
  ];
  const taxPie = [
    { label: "Einkommensteuer", value: city.incomeTax, color: "#6366f1" },
    { label: "Unternehmenssteuer", value: city.corpTax, color: "#10b981" },
    { label: "Mehrwertsteuer", value: city.vat, color: "#f59e0b" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; }`}</style>
      <div style={{ width: "100%", maxWidth: step === STEPS.length - 1 ? 1200 : 680 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 4 }}>🏙️</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#1f2937", letterSpacing: -0.5 }}>CityDesigner</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Erschaffe deine Traumstadt – Schritt für Schritt</p>
        </div>
        <ProgressBar step={step} total={STEPS.length} />

        {step === 0 && (
          <Card>
            <SectionTitle icon="✨" title="Willkommen!" sub="Gib deiner Stadt zuerst einen Namen." />
            <input value={city.name} onChange={e => setCity(c => ({ ...c, name: e.target.value }))} placeholder="z.B. Nova Lumina, Eisenhafen, ..."
              style={{ width: "100%", padding: "16px 18px", borderRadius: 14, border: "2px solid #4f46e5", fontSize: 18, fontWeight: 700, color: "#ffffff", background: "#1e1b4b", outline: "none", marginBottom: 8 }} />
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>Der Name prägt die gesamte Persönlichkeit deiner Stadt.</p>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
              <button onClick={next} disabled={!city.name.trim()} style={{ padding: "14px 32px", borderRadius: 14, border: "none", background: city.name.trim() ? "#6366f1" : "#d1d5db", color: "#fff", fontWeight: 800, fontSize: 16, cursor: city.name.trim() ? "pointer" : "not-allowed" }}>Loslegen →</button>
            </div>
          </Card>
        )}

        {step === 1 && (
          <Card>
            <SectionTitle icon="🎚️" title="Stadtcharakter" sub="Wie fühlt sich deine Stadt an?" />
            <SliderField label="Bebauungsdichte" value={city.density} onChange={set("density")} leftLabel="Weitläufig" rightLabel="Megacity" />
            <SliderField label="Modernität" value={city.modernity} onChange={set("modernity")} leftLabel="Historisch" rightLabel="Futuristisch" />
            <SliderField label="Grünanteil" value={city.greenery} onChange={set("greenery")} leftLabel="Betonwüste" rightLabel="Grünoase" />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 2 && (
          <Card>
            <SectionTitle icon="🏗️" title="Architekturstil" sub="Welcher Stil prägt das Erscheinungsbild?" />
            <SingleSelect items={architectureStyles} selected={city.archStyle} onSelect={set("archStyle")} />
            <NavButtons onBack={back} onNext={next} canNext={!!city.archStyle} />
          </Card>
        )}

        {step === 3 && (
          <Card>
            <SectionTitle icon="🌤️" title="Atmosphäre" sub="Klima, Tageszeit und Stimmung deiner Stadt." />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Klima</p>
            <SingleSelect items={climates} selected={city.climate} onSelect={set("climate")} />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "20px 0 10px" }}>Tageszeit</p>
            <SingleSelect items={daytimes} selected={city.daytime} onSelect={set("daytime")} />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "20px 0 10px" }}>Stimmung</p>
            <SingleSelect items={moods} selected={city.mood} onSelect={set("mood")} />
            <NavButtons onBack={back} onNext={next} canNext={!!city.climate && !!city.mood} />
          </Card>
        )}

        {step === 4 && (
          <Card>
            <SectionTitle icon="👥" title="Bevölkerung" sub="Wer wohnt in deiner Stadt?" />
            <SliderField label="Wohlstand" value={city.wealth} onChange={set("wealth")} leftLabel="Arbeiterklasse" rightLabel="Wohlhabend" />
            <SliderField label="Diversität" value={city.diversity} onChange={set("diversity")} leftLabel="Homogen" rightLabel="Kosmopolit" />
            <SliderField label="Altersstruktur" value={city.ageProfile} onChange={set("ageProfile")} leftLabel="Jung & dynamisch" rightLabel="Erfahren & reif" />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 5 && (
          <Card>
            <SectionTitle icon="🚲" title="Mobilität" sub="Wie bewegen sich die Menschen fort?" />
            <MixSliders title="Verkehrsmittel-Mix" values={city.mobility} setValues={setObj("mobility")} fields={[
              { key: "car", label: "Auto", emoji: "🚗", color: "#ef4444" },
              { key: "bike", label: "Fahrrad", emoji: "🚲", color: "#10b981" },
              { key: "transit", label: "ÖPNV", emoji: "🚇", color: "#3b82f6" },
              { key: "foot", label: "Fußgänger", emoji: "🚶", color: "#f59e0b" },
            ]} />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 6 && (
          <Card>
            <SectionTitle icon="⚡" title="Wirtschaft & Energie" sub="Womit verdient deine Stadt ihr Geld – und woher kommt der Strom?" />
            <MixSliders title="Energiemix" values={city.energy} setValues={setObj("energy")} fields={[
              { key: "renewable", label: "Erneuerbar", emoji: "🌬️", color: "#22c55e" },
              { key: "fossil", label: "Fossil", emoji: "🛢️", color: "#6b7280" },
              { key: "nuclear", label: "Atomkraft", emoji: "☢️", color: "#eab308" },
              { key: "other", label: "Sonstiges", emoji: "🔋", color: "#a855f7" },
            ]} />
            <div style={{ height: 1, background: "#f3f4f6", margin: "12px 0 18px" }} />
            <MixSliders title="Wirtschaftssektoren" values={city.economy} setValues={setObj("economy")} fields={[
              { key: "services", label: "Dienstleistung", emoji: "💼", color: "#0ea5e9" },
              { key: "industry", label: "Industrie", emoji: "🏭", color: "#f97316" },
              { key: "tech", label: "Tech / IT", emoji: "💻", color: "#8b5cf6" },
              { key: "agri", label: "Landwirtschaft", emoji: "🌾", color: "#84cc16" },
            ]} />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 7 && (
          <Card>
            <SectionTitle icon="💰" title="Steuern & Finanzen" sub="Wie finanziert sich deine Stadt?" />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Steuermodell</p>
            <SingleSelect items={taxModels} selected={city.taxModel} onSelect={set("taxModel")} />
            <div style={{ height: 18 }} />
            <SliderField label="Einkommensteuer (Spitzensatz)" value={city.incomeTax} onChange={set("incomeTax")} leftLabel="0 %" rightLabel="100 %" />
            <SliderField label="Unternehmenssteuer" value={city.corpTax} onChange={set("corpTax")} leftLabel="0 %" rightLabel="100 %" />
            <SliderField label="Mehrwertsteuer" value={city.vat} onChange={set("vat")} leftLabel="0 %" rightLabel="100 %" />
            <SliderField label="Staatsverschuldung (% BIP)" value={city.debt} onChange={set("debt")} leftLabel="Schuldenfrei" rightLabel="Hochverschuldet" />
            <NavButtons onBack={back} onNext={next} canNext={!!city.taxModel} />
          </Card>
        )}

        {step === 8 && (
          <Card>
            <SectionTitle icon="📋" title={`"${city.name}" – Zusammenfassung`} sub="Überprüfe alles und starte dann die Generierung." />
            <div style={{ background: "#f9fafb", borderRadius: 14, padding: 20, marginBottom: 8 }}>
              {summaryRow("Stadtname", city.name)}
              {summaryRow("Bebauungsdichte", `${city.density}%`)}
              {summaryRow("Modernität", `${city.modernity}%`)}
              {summaryRow("Grünanteil", `${city.greenery}%`)}
              {summaryRow("Architekturstil", architectureStyles.find(s => s.id === city.archStyle)?.label || "—")}
              {summaryRow("Klima", climates.find(s => s.id === city.climate)?.label || "—")}
              {summaryRow("Tageszeit", daytimes.find(s => s.id === city.daytime)?.label || "—")}
              {summaryRow("Stimmung", moods.find(s => s.id === city.mood)?.label || "—")}
              {summaryRow("Wohlstand", `${city.wealth}%`)}
              {summaryRow("Diversität", `${city.diversity}%`)}
              {summaryRow("Altersstruktur", `${city.ageProfile}%`)}
              {summaryRow("Steuermodell", taxModels.find(s => s.id === city.taxModel)?.label || "—")}
              {summaryRow("Einkommensteuer", `${city.incomeTax}%`)}
              {summaryRow("Unternehmenssteuer", `${city.corpTax}%`)}
              {summaryRow("Mehrwertsteuer", `${city.vat}%`)}
              {summaryRow("Staatsverschuldung", `${city.debt}% BIP`)}
            </div>
            <NavButtons onBack={back} onNext={startGeneration} nextLabel="🏙️ Stadt erstellen →" />
          </Card>
        )}

        {step === STEPS.length - 1 && prompt && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 6 }}>🎉</div>
              <h2 style={{ margin: 0, fontSize: 26, fontWeight: 900, color: "#1f2937" }}>{city.name}</h2>
              <p style={{ color: "#6b7280", fontSize: 13, margin: "6px 0 0" }}>Ein einziges KI-Bild zeigt Innenstadt, typischen Bewohner und Vogelperspektive.</p>
            </div>

            <BigImageCard prompt={prompt} url={imgUrl} onGenerate={generateImage} />

            {/* ECKDATEN-INFOKASTEN */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 24, marginBottom: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800, color: "#1f2937" }}>📊 Eckdaten von {city.name}</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
                <Stat label="Architektur" value={architectureStyles.find(s => s.id === city.archStyle)?.label || "—"} emoji="🏗️" />
                <Stat label="Klima" value={climates.find(s => s.id === city.climate)?.label || "—"} emoji="🌤️" />
                <Stat label="Stimmung" value={moods.find(s => s.id === city.mood)?.label || "—"} emoji="✨" />
                <Stat label="Bebauungsdichte" value={`${city.density}%`} emoji="🏢" />
                <Stat label="Grünanteil" value={`${city.greenery}%`} emoji="🌳" />
                <Stat label="Modernität" value={`${city.modernity}%`} emoji="🚀" />
                <Stat label="Steuermodell" value={taxModels.find(s => s.id === city.taxModel)?.label || "—"} emoji="💰" />
                <Stat label="Staatsverschuldung" value={`${city.debt}% BIP`} emoji="📉" />
              </div>
            </div>

            {/* PIE-CHARTS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 18, marginBottom: 24 }}>
              <PieChart title="🚲 Mobilitätsmix" data={mobilityPie} />
              <PieChart title="⚡ Energiemix" data={energyPie} />
              <PieChart title="💼 Wirtschaftssektoren" data={economyPie} />
              <PieChart title="💰 Steuern (Sätze)" data={taxPie} />
              <PieChart title="👥 Wohlstandsverteilung" data={populationPie} />
            </div>

            <button onClick={reset} style={{ width: "100%", padding: "14px", borderRadius: 14, border: "2px solid #e5e7eb", background: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, color: "#374151" }}>🔄 Neue Stadt entwerfen</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   KLEINE STAT-KACHEL für den Eckdaten-Infokasten
   ============================================================ */
function Stat({ label, value, emoji }) {
  return (
    <div style={{ background: "#f9fafb", borderRadius: 12, padding: "12px 14px" }}>
      <div style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{emoji} {label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#1f2937" }}>{value}</div>
    </div>
  );
}
