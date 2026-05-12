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
   PROMPT-BUILDER – 3 separate Prompts
   ============================================================ */
function buildPrompts(city) {
  const styleMap = {
    european: "European classical architecture with ornate facades, cobblestone streets, baroque and neoclassical buildings",
    asian: "Asian architecture with traditional pagodas, red lanterns, dense street markets, and ornamental gates",
    futuristic: "futuristic sci-fi architecture with glass skyscrapers, neon lights, floating structures, and advanced technology",
    american: "American urban architecture with glass and steel skyscrapers, wide boulevards, and suburban sprawl",
    mediterranean: "Mediterranean architecture with white-washed cubic buildings, terracotta roofs, narrow alleyways, and bougainvillea",
    nordic: "Nordic minimalist wooden architecture with clean lines, pitched roofs, natural materials, and Scandinavian design",
  };
  const climateMap = {
    tropical: "lush tropical vegetation, palm trees, humid atmosphere, vibrant colors",
    desert: "arid desert landscape, sandstone, warm golden tones, sparse vegetation",
    temperate: "temperate green surroundings, deciduous trees, mild light",
    arctic: "snowy arctic environment, frost, cold blue tones, evergreen trees",
    rainy: "rainy misty atmosphere, wet streets, reflections, grey sky",
  };
  const timeMap = {
    dawn: "at dawn with soft pink and orange light, early morning mist",
    day: "in bright daylight with clear blue sky",
    golden: "in golden hour with warm amber light and long shadows",
    night: "at night with glowing city lights, neon signs, illuminated windows",
    storm: "during a dramatic storm with dark clouds, lightning, rain",
  };
  const moodMap = {
    vibrant: "vibrant and lively atmosphere, busy streets, colorful",
    peaceful: "calm and peaceful, quiet streets, serene",
    mysterious: "dark and mysterious, moody, atmospheric shadows",
    industrial: "industrial and gritty, smoke, heavy machinery visible",
    romantic: "romantic and atmospheric, soft glow, intimate",
  };
  const style = styleMap[city.archStyle] || "mixed architecture";
  const climate = climateMap[city.climate] || "temperate climate";
  const time = timeMap[city.daytime] || "in daylight";
  const mood = moodMap[city.mood] || "lively";
  const density = city.density > 66 ? "densely packed urban high-rise" : city.density > 33 ? "medium density mixed-use" : "sparse low-rise suburban";
  const greenery = city.greenery > 66 ? "abundant parks, tree-lined streets, green roofs, urban gardens" : city.greenery > 33 ? "some parks and street trees" : "minimal vegetation, mostly concrete";
  const modern = city.modernity > 66 ? "ultra-modern contemporary" : city.modernity > 33 ? "blend of historic and modern" : "historic and traditional";
  const wealth = city.wealth > 66 ? "wealthy and affluent" : city.wealth > 33 ? "middle-class" : "working-class";
  const age = city.ageProfile > 60 ? "elderly population, retirement-oriented" : city.ageProfile < 40 ? "young dynamic population, students and professionals" : "mixed-age diverse population";
  const diversity = city.diversity > 66 ? "highly multicultural and cosmopolitan" : city.diversity > 33 ? "moderately diverse" : "culturally homogeneous";
  const mobNote = city.mobility.transit > 40 ? "prominent tram lines, metro stations, bus stops" : city.mobility.car > 50 ? "wide roads, parking lots, car-dominated" : "bike lanes, pedestrian zones";
  const energyNote = city.energy.renewable > 50 ? "solar panels on rooftops, wind turbines visible on the horizon" : city.energy.fossil > 50 ? "industrial chimneys, power plant in the background" : "";

  const base = `photorealistic, ultra-detailed, 8K, cinematic lighting, professional photography, ${style}, ${modern}, ${climate}, ${time}, ${mood}, ${greenery}`;

  return {
    downtown: `${base}, wide-angle street-level view of ${density} downtown district of the city ${city.name}, ${mobNote}, ${energyNote}, bustling city center with shops and pedestrians, dramatic perspective`,
    resident: `${base}, candid portrait photograph of a typical resident of ${city.name}, ${wealth} ${age}, ${diversity}, dressed in clothing reflecting the local culture and ${city.climate} climate, standing on a characteristic street of the city, shallow depth of field, natural ambient light, ${time}`,
    aerial: `${base}, breathtaking aerial bird's-eye drone view from 400 meters altitude over ${city.name}, ${density} urban layout, ${greenery}, ${mobNote}, city infrastructure clearly visible, rivers or parks if present, ${energyNote}, sweeping panoramic cityscape`,
  };
}

/* ============================================================
   PIE-CHART KOMPONENTE
   ============================================================ */
const PieChart = ({ title, data, size = 160 }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const cx = size / 2, cy = size / 2, r = size / 2 - 6;
  let acc = 0;
  const slices = data.map((d) => {
    const start = (acc / total) * Math.PI * 2 - Math.PI / 2;
    acc += d.value;
    const end = (acc / total) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + r * Math.cos(start), y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end), y2 = cy + r * Math.sin(end);
    const large = end - start > Math.PI ? 1 : 0;
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    return { path, color: d.color, label: d.label, pct: Math.round((d.value / total) * 100) };
  });
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 18px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid #f1f5f9" }}>
      <h4 style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 800, color: "#1f2937", textAlign: "center", textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</h4>
      <div style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} stroke="#fff" strokeWidth="2" />)}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 7, fontSize: 12 }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, display: "inline-block", flexShrink: 0 }} />
              <span style={{ color: "#374151", fontWeight: 600 }}>{s.label}</span>
              <span style={{ color: "#6b7280", marginLeft: "auto", fontWeight: 700 }}>{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   EINZELNES BILD-CARD mit eigenem Generier-Button
   ============================================================ */
const ImageCard = ({ title, icon, prompt, label }) => {
  const [imgData, setImgData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setImgData(null);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setImgData(data.image);
    } catch (e) {
      setError(e.message || "Generierung fehlgeschlagen");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ borderRadius: 20, border: "2px solid #e5e7eb", overflow: "hidden", background: "#0f172a", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{icon}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#f1f5f9" }}>{title}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{label}</div>
          </div>
        </div>
        {imgData && !loading && (
          <button onClick={generate} style={{ fontSize: 11, padding: "5px 12px", borderRadius: 8, border: "1px solid #334155", background: "transparent", color: "#94a3b8", cursor: "pointer", fontWeight: 700 }}>🔁 Neu</button>
        )}
      </div>
      <div style={{ minHeight: 260, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flex: 1 }}>
        {!imgData && !loading && !error && (
          <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <button onClick={generate} style={{ padding: "13px 28px", borderRadius: 14, border: "none", background: "#6366f1", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: "0 4px 18px rgba(99,102,241,0.4)" }}>
              ✨ {title} generieren
            </button>
          </div>
        )}
        {loading && (
          <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 48, height: 48, border: "4px solid #6366f1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>KI generiert… (10–30 Sek.)</span>
          </div>
        )}
        {error && (
          <div style={{ padding: 30, textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>⚠️</div>
            <p style={{ color: "#f87171", fontSize: 13, margin: "0 0 12px", maxWidth: 260 }}>{error}</p>
            <button onClick={generate} style={{ padding: "9px 20px", borderRadius: 10, border: "none", background: "#6366f1", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Nochmals versuchen</button>
          </div>
        )}
        {imgData && (
          <img src={imgData} alt={title} style={{ width: "100%", display: "block" }} />
        )}
      </div>
      <details style={{ padding: "6px 14px 10px", borderTop: "1px solid #1e293b" }}>
        <summary style={{ fontSize: 10, color: "#475569", cursor: "pointer", userSelect: "none" }}>Prompt anzeigen</summary>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#64748b", lineHeight: 1.6, marginTop: 6, wordBreak: "break-word" }}>{prompt}</div>
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

function Stat({ label, value, emoji }) {
  return (
    <div style={{ background: "#f8fafc", borderRadius: 12, padding: "12px 14px", border: "1px solid #e5e7eb" }}>
      <div style={{ fontSize: 10, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4, fontWeight: 600 }}>{emoji} {label}</div>
      <div style={{ fontSize: 15, fontWeight: 800, color: "#1f2937" }}>{value}</div>
    </div>
  );
}

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
    mobility: { car: 30, bike: 25, transit: 30, foot: 15 },
    energy: { renewable: 40, fossil: 35, nuclear: 15, other: 10 },
    economy: { services: 45, industry: 25, tech: 20, agri: 10 },
    taxModel: "balanced",
    incomeTax: 35, corpTax: 25, vat: 19,
    debt: 40,
  });
  const [prompts, setPrompts] = useState(null);

  const set = (key) => (val) => setCity(c => ({ ...c, [key]: val }));
  const setObj = (key) => (val) => setCity(c => ({ ...c, [key]: val }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const startGeneration = () => {
    setPrompts(buildPrompts(city));
    setStep(STEPS.length - 1);
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
    setPrompts(null);
  };

  const summaryRow = (label, value) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ color: "#6b7280", fontSize: 13 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 13, color: "#1f2937" }}>{value}</span>
    </div>
  );

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
  const taxPie = [
    { label: "Einkommensteuer", value: city.incomeTax, color: "#6366f1" },
    { label: "Unternehmenssteuer", value: city.corpTax, color: "#10b981" },
    { label: "Mehrwertsteuer", value: city.vat, color: "#f59e0b" },
  ];
  const populationPie = [
    { label: "Wohlhabend", value: city.wealth, color: "#6366f1" },
    { label: "Mittelschicht / Arbeiterklasse", value: 100 - city.wealth, color: "#cbd5e1" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; }`}</style>
      <div style={{ width: "100%", maxWidth: step === STEPS.length - 1 ? 1280 : 680 }}>
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
            <MixSliders title="Verkehrsmittel-Mix (Modal Split)" values={city.mobility} setValues={setObj("mobility")} fields={[
              { key: "car", label: "MIV – Motorisierter Individualverkehr", emoji: "🚗", color: "#ef4444" },
              { key: "bike", label: "Fahrrad / Mikromobilität", emoji: "🚲", color: "#10b981" },
              { key: "transit", label: "ÖPNV (Bus, Tram, Metro)", emoji: "🚇", color: "#3b82f6" },
              { key: "foot", label: "Fußgänger", emoji: "🚶", color: "#f59e0b" },
            ]} />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 6 && (
          <Card>
            <SectionTitle icon="⚡" title="Wirtschaft & Energie" sub="Womit verdient deine Stadt ihr Geld – und woher kommt der Strom?" />
            <MixSliders title="Energiemix (Stromerzeugung)" values={city.energy} setValues={setObj("energy")} fields={[
              { key: "renewable", label: "Erneuerbare Energien (PV, Wind, Wasser)", emoji: "🌬️", color: "#22c55e" },
              { key: "fossil", label: "Fossile Energie (Kohle, Öl, Gas)", emoji: "🛢️", color: "#6b7280" },
              { key: "nuclear", label: "Kernkraft", emoji: "☢️", color: "#eab308" },
              { key: "other", label: "Sonstiges / Importe", emoji: "🔋", color: "#a855f7" },
            ]} />
            <div style={{ height: 1, background: "#f3f4f6", margin: "12px 0 18px" }} />
            <MixSliders title="Wirtschaftssektoren (Beschäftigungsanteile)" values={city.economy} setValues={setObj("economy")} fields={[
              { key: "services", label: "Dienstleistungssektor (tertiär)", emoji: "💼", color: "#0ea5e9" },
              { key: "industry", label: "Industrie & Produktion (sekundär)", emoji: "🏭", color: "#f97316" },
              { key: "tech", label: "Technologie / IT / Wissenssektor", emoji: "💻", color: "#8b5cf6" },
              { key: "agri", label: "Landwirtschaft & Rohstoffe (primär)", emoji: "🌾", color: "#84cc16" },
            ]} />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 7 && (
          <Card>
            <SectionTitle icon="💰" title="Steuern & Finanzen" sub="Wie finanziert sich deine Stadt? Fiskal- und Haushaltspolitik." />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Steuermodell / Staatsform</p>
            <SingleSelect items={taxModels} selected={city.taxModel} onSelect={set("taxModel")} />
            <div style={{ height: 18 }} />
            <SliderField label="Einkommensteuer (Spitzensatz)" value={city.incomeTax} onChange={set("incomeTax")} leftLabel="0 %" rightLabel="100 %" />
            <SliderField label="Unternehmenssteuer (Körperschaftssteuer)" value={city.corpTax} onChange={set("corpTax")} leftLabel="0 %" rightLabel="100 %" />
            <SliderField label="Mehrwertsteuer / Konsumsteuer" value={city.vat} onChange={set("vat")} leftLabel="0 %" rightLabel="100 %" />
            <SliderField label="Staatsverschuldung (% des BIP)" value={city.debt} onChange={set("debt")} leftLabel="Schuldenfrei" rightLabel="Hochverschuldet" />
            <NavButtons onBack={back} onNext={next} canNext={!!city.taxModel} />
          </Card>
        )}

        {step === 8 && (
          <Card>
            <SectionTitle icon="📋" title={`"${city.name}" – Zusammenfassung`} sub="Überprüfe alle Angaben und starte dann die KI-Bildgenerierung." />
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
            <div style={{ background: "#fef3c7", borderRadius: 10, padding: "10px 14px", marginBottom: 8, fontSize: 12, color: "#92400e" }}>
              ⚠️ Jedes der 3 Bilder wird separat per Knopfdruck generiert – so sparst du Tokens und kannst einzelne Bilder neu erstellen.
            </div>
            <NavButtons onBack={back} onNext={startGeneration} nextLabel="🏙️ Stadt erstellen →" />
          </Card>
        )}

        {step === STEPS.length - 1 && prompts && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 42, marginBottom: 6 }}>🎉</div>
              <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#1f2937" }}>{city.name}</h2>
              <p style={{ color: "#6b7280", fontSize: 13, margin: "6px 0 0" }}>Generiere die drei Stadtansichten einzeln per Knopfdruck — jedes Bild kostet einen Token.</p>
            </div>

            {/* 3 BILD-CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20, marginBottom: 32 }}>
              <ImageCard title="Innenstadt" icon="🏙️" label="Straßenperspektive · Stadtbild · Architektur" prompt={prompts.downtown} />
              <ImageCard title="Typischer Bewohner" icon="👤" label="Portrait · Sozialstruktur · Kultur" prompt={prompts.resident} />
              <ImageCard title="Vogelperspektive" icon="🛸" label="Drohnenaufnahme · Stadtstruktur · Raumplanung" prompt={prompts.aerial} />
            </div>

            {/* ECKDATEN */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, marginBottom: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#1f2937" }}>📊 Stadtprofil: {city.name}</h3>
              <p style={{ margin: "0 0 20px", fontSize: 12, color: "#6b7280" }}>Eckdaten für die Stadtplanung · Geographie-Schulprojekt</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#6366f1", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10, borderBottom: "2px solid #6366f1", paddingBottom: 4 }}>🏗️ Raum & Stadtstruktur</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <Stat label="Architekturstil" value={architectureStyles.find(s => s.id === city.archStyle)?.label || "—"} emoji="🏛️" />
                    <Stat label="Bebauungsdichte" value={city.density > 66 ? "Hoch (urban verdichtet)" : city.density > 33 ? "Mittel (gemischt)" : "Niedrig (suburban)"} emoji="🏢" />
                    <Stat label="Grünflächenanteil" value={city.greenery > 66 ? "Hoch (> 30 %)" : city.greenery > 33 ? "Mittel (15–30 %)" : "Niedrig (< 15 %)"} emoji="🌳" />
                    <Stat label="Modernität / Baualter" value={city.modernity > 66 ? "Modern (Neubau dominant)" : city.modernity > 33 ? "Gemischt (Alt- und Neubau)" : "Historisch (Altbau dominant)"} emoji="🕰️" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#10b981", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10, borderBottom: "2px solid #10b981", paddingBottom: 4 }}>👥 Bevölkerung & Sozialstruktur</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <Stat label="Wohlstandsniveau" value={city.wealth > 66 ? "Hoch (wohlhabend)" : city.wealth > 33 ? "Mittel (Mittelschicht)" : "Niedrig (Arbeiterklasse)"} emoji="💰" />
                    <Stat label="Kulturelle Diversität" value={city.diversity > 66 ? "Sehr hoch (kosmopolitisch)" : city.diversity > 33 ? "Mittel (multikulturell)" : "Niedrig (homogen)"} emoji="🌍" />
                    <Stat label="Altersstruktur" value={city.ageProfile > 66 ? "Überalternd (Seniorenanteil hoch)" : city.ageProfile < 34 ? "Jung (Studenten- / Arbeitsstadt)" : "Ausgeglichen"} emoji="📊" />
                    <Stat label="Klima / Lage" value={climates.find(s => s.id === city.climate)?.label || "—"} emoji="🌤️" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#f59e0b", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10, borderBottom: "2px solid #f59e0b", paddingBottom: 4 }}>💰 Fiskal- & Finanzpolitik</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <Stat label="Steuermodell" value={taxModels.find(s => s.id === city.taxModel)?.label || "—"} emoji="⚖️" />
                    <Stat label="Einkommensteuer (Spitzensatz)" value={`${city.incomeTax} %`} emoji="📈" />
                    <Stat label="Körperschaftssteuer" value={`${city.corpTax} %`} emoji="🏢" />
                    <Stat label="Mehrwertsteuer" value={`${city.vat} %`} emoji="🧾" />
                    <Stat label="Staatsverschuldung" value={`${city.debt} % des BIP`} emoji="📉" />
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#8b5cf6", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10, borderBottom: "2px solid #8b5cf6", paddingBottom: 4 }}>✨ Atmosphäre & Identität</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <Stat label="Stadtcharakter / Stimmung" value={moods.find(s => s.id === city.mood)?.label || "—"} emoji="🎭" />
                    <Stat label="Tageszeit / Lichtcharakter" value={daytimes.find(s => s.id === city.daytime)?.label || "—"} emoji="🕐" />
                  </div>
                </div>
              </div>
            </div>

            {/* PIE CHARTS */}
            <div style={{ background: "#fff", borderRadius: 20, padding: 28, marginBottom: 24, boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid #e5e7eb" }}>
              <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 900, color: "#1f2937" }}>📈 Datenanalyse: {city.name}</h3>
              <p style={{ margin: "0 0 20px", fontSize: 12, color: "#6b7280" }}>Kreisdiagramme zur Visualisierung der Stadtplanung · Geographie-Schulprojekt</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                <PieChart title="Modal Split – Verkehrsmittelwahl" data={mobilityPie} />
                <PieChart title="Energiemix – Stromerzeugung" data={energyPie} />
                <PieChart title="Wirtschaftsstruktur – Sektoren" data={economyPie} />
                <PieChart title="Steuerstruktur – Steuerarten" data={taxPie} />
                <PieChart title="Sozialstruktur – Wohlstandsverteilung" data={populationPie} />
              </div>
            </div>

            <button onClick={reset} style={{ width: "100%", padding: "14px", borderRadius: 14, border: "2px solid #e5e7eb", background: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, color: "#374151" }}>🔄 Neue Stadt entwerfen</button>
          </div>
        )}
      </div>
    </div>
  );
}
