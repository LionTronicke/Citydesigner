import { useState } from "react";

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
const visualStyles = [
  { id: "realistic", label: "Realistisch", emoji: "📷", desc: "Fotorealistisch, cineastisch" },
  { id: "isometric", label: "Isometrisch", emoji: "🧊", desc: "Wie SimCity / Diorama" },
  { id: "illustrative", label: "Illustrativ", emoji: "🎨", desc: "Skizze / Aquarell" },
  { id: "blueprint", label: "Planerisch", emoji: "📐", desc: "Architektur-Visualisierung" },
];
const cityGoals = [
  { id: "climate", label: "Klimaanpassung", emoji: "🌍" },
  { id: "affordable", label: "Bezahlbar Wohnen", emoji: "🏠" },
  { id: "transit", label: "Starker ÖPNV", emoji: "🚊" },
  { id: "industry", label: "Wirtschaft/Industrie", emoji: "🏭" },
  { id: "tourism", label: "Tourismus", emoji: "🗺️" },
  { id: "education", label: "Bildung", emoji: "🎓" },
];
const taxStrategies = [
  { id: "low", label: "Niedrige Steuern", emoji: "💸", desc: "Unternehmen anziehen" },
  { id: "balanced", label: "Ausgewogen", emoji: "⚖️", desc: "Mittlerer Weg" },
  { id: "strong", label: "Hohe Steuern", emoji: "🏛️", desc: "Starke öffentliche Leistungen" },
];
const energyOptions = [
  { id: "pv", label: "PV-Dächer", emoji: "☀️" },
  { id: "wind", label: "Windkraft", emoji: "🌬️" },
  { id: "geothermal", label: "Geothermie", emoji: "🌋" },
  { id: "districtheat", label: "Fernwärme", emoji: "♨️" },
  { id: "sponge", label: "Schwammstadt", emoji: "💧" },
];

const STEPS = [
  "Willkommen", "Charakter", "Architektur", "Atmosphäre",
  "Bevölkerung", "Verkehr", "Wirtschaft", "Energie",
  "Finanzen", "Stil", "Zusammenfassung", "Deine Stadt"
];

// ─── Prompt-Builder: EIN Collage-Prompt ────────────────────────────────────
function buildCollagePrompt(city) {
  const styleMap = {
    european: "European classical architecture",
    asian: "Asian architecture with pagodas",
    futuristic: "futuristic sci-fi architecture",
    american: "American urban skyline",
    mediterranean: "Mediterranean white-washed buildings",
    nordic: "Nordic minimalist wooden architecture",
  };
  const climateMap = {
    tropical: "tropical lush vegetation",
    desert: "arid desert landscape",
    temperate: "temperate green surroundings",
    arctic: "snowy arctic environment",
    rainy: "rainy misty atmosphere",
  };
  const timeMap = {
    dawn: "at dawn",
    day: "in bright daylight",
    golden: "in golden hour",
    night: "at night with city lights",
    storm: "during a dramatic storm",
  };
  const visualMap = {
    realistic: "photorealistic cinematic urban photography, ultra-detailed, 8K",
    isometric: "isometric diorama illustration, SimCity-like, clean vector style",
    illustrative: "watercolor architectural illustration, hand-drawn, soft colors",
    blueprint: "architectural visualization render, clean planning style, soft daylight",
  };

  const style = styleMap[city.archStyle] || "mixed architecture";
  const climate = climateMap[city.climate] || "temperate climate";
  const time = timeMap[city.daytime] || "in daylight";
  const visual = visualMap[city.visualStyle] || visualMap.realistic;

  const density = city.density > 66 ? "dense urban" : city.density > 33 ? "medium density" : "sparse low-rise";
  const greenery = city.greenery > 66 ? "lots of parks and trees" : city.greenery > 33 ? "some greenery" : "minimal vegetation";

  return (
    `A single image divided into THREE clear horizontal panels, separated by thin white dividers, ` +
    `urban planning visualization for the city "${city.name}", ${visual}. ` +
    `LEFT PANEL — RESIDENT VIEW: a typical citizen of ${city.name} in everyday street life, ${style}, ${climate}, ${time}, friendly atmosphere. ` +
    `MIDDLE PANEL — BIRD'S EYE VIEW: aerial drone view of ${city.name} showing ${density} urban layout, ${greenery}, district structure with green corridors and main transport axes, ${style}. ` +
    `RIGHT PANEL — CITY CENTER VIEW: street-level view of the inner city of ${city.name}, lively pedestrian zone, public transit, ${style}, ${climate}, ${time}. ` +
    `BELOW the three panels: a clean dark info bar across the full width with white sans-serif text showing key urban planning data of ${city.name} ` +
    `(population, density, modal split, green share, energy goal, social housing, budget priorities). ` +
    `Cohesive lighting, consistent style across all three panels, professional urban planning poster look.`
  );
}

const makeUrl = (prompt, w, h) => {
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&nologo=true&model=flux&seed=${seed}`;
};

// ─── Bild-Karte für die Collage ────────────────────────────────────────────
const CollageCard = ({ prompt, url, onGenerate }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [prevUrl, setPrevUrl] = useState(null);
  if (url !== prevUrl) { setPrevUrl(url); setLoaded(false); setError(false); }

  return (
    <div style={{ borderRadius: 20, border: "2px solid #6366f1", overflow: "hidden", marginBottom: 20, background: "#0f172a" }}>
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "2px solid #6366f1" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>🖼️</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: "#f1f5f9" }}>3-Panel Stadtplanungs-Collage</span>
        </div>
        {url && loaded && (
          <button onClick={onGenerate} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, border: "1px solid #6366f1", background: "transparent", color: "#6366f1", cursor: "pointer" }}>🔁 Neu generieren</button>
        )}
      </div>
      <div style={{ minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        {!url && (
          <div style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 40 }}>🎨</span>
            <button onClick={onGenerate} style={{ padding: "13px 28px", borderRadius: 14, border: "none", background: "#6366f1", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>🖼️ Collage generieren</button>
          </div>
        )}
        {url && !loaded && !error && (
          <div style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, border: "3px solid #6366f1", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>KI generiert Collage… (kann 30–60 Sek. dauern)</span>
          </div>
        )}
        {error && (
          <div style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
            <p style={{ color: "#f87171", fontSize: 13, margin: "0 0 12px" }}>Generierung fehlgeschlagen.</p>
            <button onClick={onGenerate} style={{ padding: "9px 22px", borderRadius: 10, border: "none", background: "#6366f1", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Nochmals versuchen</button>
          </div>
        )}
        {url && (
          <img src={url} alt="Stadtplanungs-Collage" onLoad={() => setLoaded(true)} onError={() => { setError(true); setLoaded(false); }} style={{ width: "100%", display: loaded ? "block" : "none" }} />
        )}
      </div>
      <details style={{ padding: "6px 16px 10px", borderTop: "1px solid #1e293b" }}>
        <summary style={{ fontSize: 11, color: "#4b5563", cursor: "pointer", userSelect: "none" }}>Prompt anzeigen</summary>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280", lineHeight: 1.7, marginTop: 6, wordBreak: "break-word" }}>{prompt}</div>
      </details>
    </div>
  );
};

const SliderField = ({ label, value, onChange, leftLabel, rightLabel }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: "#374151" }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 800, padding: "2px 10px", borderRadius: 999, background: "#6366f1", color: "#fff" }}>{value}%</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 11, color: "#9ca3af", width: 80, textAlign: "right" }}>{leftLabel}</span>
      <input type="range" min={0} max={100} value={value} onChange={e => onChange(Number(e.target.value))} style={{ flex: 1, accentColor: "#6366f1" }} />
      <span style={{ fontSize: 11, color: "#9ca3af", width: 80 }}>{rightLabel}</span>
    </div>
  </div>
);

const NumberField = ({ label, value, onChange, placeholder, suffix }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ display: "block", fontWeight: 700, fontSize: 13, color: "#374151", marginBottom: 6 }}>{label}</label>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "2px solid #e5e7eb", fontSize: 14, color: "#1f2937", background: "#fff", outline: "none" }} />
      {suffix && <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 600 }}>{suffix}</span>}
    </div>
  </div>
);

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

const MultiSelect = ({ items, selected, onToggle }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 12 }}>
    {items.map(item => (
      <ChoiceCard key={item.id} item={item} selected={selected.includes(item.id)} onSelect={() => onToggle(item.id)} />
    ))}
  </div>
);

const ProgressBar = ({ step }) => (
  <div style={{ display: "flex", gap: 4, marginBottom: 32, justifyContent: "center" }}>
    {STEPS.map((s, i) => (
      <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? "#6366f1" : "#e5e7eb", transition: "background 0.3s", maxWidth: 50 }} />
    ))}
  </div>
);

const Card = ({ children }) => (
  <div style={{ background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>{children}</div>
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

export default function CityDesigner() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState({
    name: "",
    // Charakter
    density: 50, modernity: 50, greenery: 50,
    // Stil & Atmosphäre
    archStyle: "", climate: "", daytime: "day", mood: "", visualStyle: "realistic",
    // Bevölkerung
    wealth: 50, diversity: 50, ageProfile: 50,
    popNow: "", popTarget: "", socialHousing: "25",
    // Verkehr
    modalTransit: 30, modalBike: 25, modalWalk: 25, modalCar: 20,
    parkingPolicy: "managed",
    // Wirtschaft
    mainIndustry: "", goals: [],
    // Energie / Klima
    energyOptions: [], energyYear: "2040",
    // Finanzen / Steuern
    taxStrategy: "balanced", budgetTop1: "", budgetTop2: "", budgetTop3: "",
  });
  const [prompt, setPrompt] = useState(null);
  const [url, setUrl] = useState(null);

  const set = (key) => (val) => setCity(c => ({ ...c, [key]: val }));
  const toggleArr = (key) => (id) => setCity(c => ({ ...c, [key]: c[key].includes(id) ? c[key].filter(x => x !== id) : [...c[key], id] }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const startGeneration = () => {
    const p = buildCollagePrompt(city);
    setPrompt(p);
    setUrl(null);
    setStep(11);
  };

  const genImage = () => {
    if (!prompt) return;
    setUrl(makeUrl(prompt, 1280, 720));
  };

  const reset = () => {
    setStep(0);
    setCity({
      name: "", density: 50, modernity: 50, greenery: 50,
      archStyle: "", climate: "", daytime: "day", mood: "", visualStyle: "realistic",
      wealth: 50, diversity: 50, ageProfile: 50,
      popNow: "", popTarget: "", socialHousing: "25",
      modalTransit: 30, modalBike: 25, modalWalk: 25, modalCar: 20,
      parkingPolicy: "managed",
      mainIndustry: "", goals: [],
      energyOptions: [], energyYear: "2040",
      taxStrategy: "balanced", budgetTop1: "", budgetTop2: "", budgetTop3: "",
    });
    setPrompt(null); setUrl(null);
  };

  const summaryRow = (label, value) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6", gap: 12 }}>
      <span style={{ color: "#6b7280", fontSize: 13 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 13, color: "#1f2937", textAlign: "right" }}>{value}</span>
    </div>
  );

  const goalsLabel = city.goals.map(id => cityGoals.find(g => g.id === id)?.label).filter(Boolean).join(", ") || "—";
  const energyLabel = city.energyOptions.map(id => energyOptions.find(g => g.id === id)?.label).filter(Boolean).join(", ") || "—";
  const taxLabel = taxStrategies.find(t => t.id === city.taxStrategy)?.label || "—";
  const visualLabel = visualStyles.find(v => v.id === city.visualStyle)?.label || "—";
  const modalSum = city.modalTransit + city.modalBike + city.modalWalk + city.modalCar;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; }`}</style>
      <div style={{ width: "100%", maxWidth: 720 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 4 }}>🏙️</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#1f2937", letterSpacing: -0.5 }}>CityDesigner</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Stadtplanung für dein Geographie-Projekt</p>
        </div>
        <ProgressBar step={step} />

        {/* 0 — Willkommen */}
        {step === 0 && (
          <Card>
            <SectionTitle icon="✨" title="Willkommen!" sub="Gib deiner Stadt einen Namen." />
            <input value={city.name} onChange={e => setCity(c => ({ ...c, name: e.target.value }))} placeholder="z.B. Nova Lumina, Eisenhafen, ..."
              style={{ width: "100%", padding: "16px 18px", borderRadius: 14, border: "2px solid #4f46e5", fontSize: 18, fontWeight: 700, color: "#fff", background: "#1e1b4b", outline: "none", marginBottom: 8 }} />
            <p style={{ fontSize: 12, color: "#9ca3af", margin: 0 }}>Real oder fiktiv – egal.</p>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 28 }}>
              <button onClick={next} disabled={!city.name.trim()} style={{ padding: "14px 32px", borderRadius: 14, border: "none", background: city.name.trim() ? "#6366f1" : "#d1d5db", color: "#fff", fontWeight: 800, fontSize: 16, cursor: city.name.trim() ? "pointer" : "not-allowed" }}>Loslegen →</button>
            </div>
          </Card>
        )}

        {/* 1 — Charakter */}
        {step === 1 && (
          <Card>
            <SectionTitle icon="🎚️" title="Stadtcharakter" sub="Wie dicht, wie modern, wie grün?" />
            <SliderField label="Bebauungsdichte" value={city.density} onChange={set("density")} leftLabel="Weitläufig" rightLabel="Megacity" />
            <SliderField label="Modernität" value={city.modernity} onChange={set("modernity")} leftLabel="Historisch" rightLabel="Futuristisch" />
            <SliderField label="Grünanteil" value={city.greenery} onChange={set("greenery")} leftLabel="Betonwüste" rightLabel="Grünoase" />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {/* 2 — Architektur */}
        {step === 2 && (
          <Card>
            <SectionTitle icon="🏗️" title="Architekturstil" sub="Welcher Stil prägt das Bild?" />
            <SingleSelect items={architectureStyles} selected={city.archStyle} onSelect={set("archStyle")} />
            <NavButtons onBack={back} onNext={next} canNext={!!city.archStyle} />
          </Card>
        )}

        {/* 3 — Atmosphäre */}
        {step === 3 && (
          <Card>
            <SectionTitle icon="🌤️" title="Atmosphäre" sub="Klima, Tageszeit und Stimmung." />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Klima</p>
            <SingleSelect items={climates} selected={city.climate} onSelect={set("climate")} />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "20px 0 10px" }}>Tageszeit</p>
            <SingleSelect items={daytimes} selected={city.daytime} onSelect={set("daytime")} />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "20px 0 10px" }}>Stimmung</p>
            <SingleSelect items={moods} selected={city.mood} onSelect={set("mood")} />
            <NavButtons onBack={back} onNext={next} canNext={!!city.climate && !!city.mood} />
          </Card>
        )}

        {/* 4 — Bevölkerung */}
        {step === 4 && (
          <Card>
            <SectionTitle icon="👥" title="Bevölkerung & Soziales" sub="Wer wohnt in deiner Stadt?" />
            <NumberField label="Einwohner heute" value={city.popNow} onChange={set("popNow")} placeholder="z.B. 80000" />
            <NumberField label="Einwohner Zieljahr (z.B. 2035)" value={city.popTarget} onChange={set("popTarget")} placeholder="z.B. 110000" />
            <NumberField label="Anteil Sozialwohnungen" value={city.socialHousing} onChange={set("socialHousing")} placeholder="z.B. 25" suffix="%" />
            <SliderField label="Wohlstand" value={city.wealth} onChange={set("wealth")} leftLabel="Arbeiterklasse" rightLabel="Wohlhabend" />
            <SliderField label="Diversität" value={city.diversity} onChange={set("diversity")} leftLabel="Homogen" rightLabel="Kosmopolit" />
            <SliderField label="Altersstruktur" value={city.ageProfile} onChange={set("ageProfile")} leftLabel="Jung" rightLabel="Älter" />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {/* 5 — Verkehr */}
        {step === 5 && (
          <Card>
            <SectionTitle icon="🚦" title="Verkehr & Mobilität" sub="Modal Split: Wie verteilen sich die Wege? (Summe ≈ 100 %)" />
            <SliderField label={`ÖPNV (Bus/Tram)`} value={city.modalTransit} onChange={set("modalTransit")} leftLabel="0%" rightLabel="100%" />
            <SliderField label="Rad" value={city.modalBike} onChange={set("modalBike")} leftLabel="0%" rightLabel="100%" />
            <SliderField label="Fußgänger" value={city.modalWalk} onChange={set("modalWalk")} leftLabel="0%" rightLabel="100%" />
            <SliderField label="Auto" value={city.modalCar} onChange={set("modalCar")} leftLabel="0%" rightLabel="100%" />
            <p style={{ fontSize: 12, color: modalSum === 100 ? "#10b981" : "#f59e0b", marginTop: -10, marginBottom: 18, fontWeight: 700 }}>
              Summe: {modalSum}% {modalSum === 100 ? "✓" : "(empfohlen: 100%)"}
            </p>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "8px 0 10px" }}>Parkraumpolitik</p>
            <SingleSelect items={[
              { id: "free", label: "Viele freie Plätze", emoji: "🅿️" },
              { id: "managed", label: "Parkmanagement", emoji: "🚙", desc: "Parkhäuser am Rand" },
              { id: "restrictive", label: "Auto-arm", emoji: "🚫", desc: "City-Maut, kaum Parken" },
            ]} selected={city.parkingPolicy} onSelect={set("parkingPolicy")} />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {/* 6 — Wirtschaft & Ziele */}
        {step === 6 && (
          <Card>
            <SectionTitle icon="🏭" title="Wirtschaft & Ziele" sub="Was ist die Priorität deiner Stadt?" />
            <NumberField label="Hauptbranche / Wirtschaftszweig" value={city.mainIndustry} onChange={set("mainIndustry")} placeholder="z.B. IT, Tourismus, Hafen" />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "12px 0 10px" }}>Top-Ziele (max. 3 wählen)</p>
            <MultiSelect items={cityGoals} selected={city.goals} onToggle={(id) => {
              if (city.goals.includes(id)) toggleArr("goals")(id);
              else if (city.goals.length < 3) toggleArr("goals")(id);
            }} />
            <NavButtons onBack={back} onNext={next} canNext={city.goals.length > 0} />
          </Card>
        )}

        {/* 7 — Energie & Klima */}
        {step === 7 && (
          <Card>
            <SectionTitle icon="🌱" title="Energie & Klima" sub="Welche Maßnahmen sollen umgesetzt werden?" />
            <NumberField label="Klimaneutral bis Jahr" value={city.energyYear} onChange={set("energyYear")} placeholder="z.B. 2040" />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "12px 0 10px" }}>Maßnahmen (mehrere möglich)</p>
            <MultiSelect items={energyOptions} selected={city.energyOptions} onToggle={toggleArr("energyOptions")} />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {/* 8 — Finanzen / Steuern */}
        {step === 8 && (
          <Card>
            <SectionTitle icon="💰" title="Steuerstrategie & Budget" sub="Wie finanziert sich deine Stadt?" />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Steuerstrategie</p>
            <SingleSelect items={taxStrategies} selected={city.taxStrategy} onSelect={set("taxStrategy")} />
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "20px 0 10px" }}>Budget-Prioritäten (Top 3)</p>
            <NumberField label="Priorität 1" value={city.budgetTop1} onChange={set("budgetTop1")} placeholder="z.B. ÖPNV-Ausbau" />
            <NumberField label="Priorität 2" value={city.budgetTop2} onChange={set("budgetTop2")} placeholder="z.B. Schulen" />
            <NumberField label="Priorität 3" value={city.budgetTop3} onChange={set("budgetTop3")} placeholder="z.B. Klimaschutz" />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {/* 9 — Visualisierungsstil */}
        {step === 9 && (
          <Card>
            <SectionTitle icon="🎨" title="Bildstil" sub="Wie soll die Collage aussehen?" />
            <SingleSelect items={visualStyles} selected={city.visualStyle} onSelect={set("visualStyle")} />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {/* 10 — Zusammenfassung */}
        {step === 10 && (
          <Card>
            <SectionTitle icon="📋" title={`"${city.name}" – Zusammenfassung`} sub="Alle Eckdaten auf einen Blick." />
            <div style={{ background: "#f9fafb", borderRadius: 14, padding: 20, marginBottom: 8 }}>
              {summaryRow("Stadtname", city.name)}
              {summaryRow("Einwohner heute → Ziel", `${city.popNow || "?"} → ${city.popTarget || "?"}`)}
              {summaryRow("Sozialwohnungen", `${city.socialHousing}%`)}
              {summaryRow("Bebauungsdichte", `${city.density}%`)}
              {summaryRow("Modernität", `${city.modernity}%`)}
              {summaryRow("Grünanteil", `${city.greenery}%`)}
              {summaryRow("Architekturstil", architectureStyles.find(s => s.id === city.archStyle)?.label || "—")}
              {summaryRow("Klima", climates.find(s => s.id === city.climate)?.label || "—")}
              {summaryRow("Tageszeit", daytimes.find(s => s.id === city.daytime)?.label || "—")}
              {summaryRow("Stimmung", moods.find(s => s.id === city.mood)?.label || "—")}
              {summaryRow("Modal Split (ÖPNV/Rad/Fuß/Auto)", `${city.modalTransit}/${city.modalBike}/${city.modalWalk}/${city.modalCar}%`)}
              {summaryRow("Parkraumpolitik", city.parkingPolicy)}
              {summaryRow("Hauptbranche", city.mainIndustry || "—")}
              {summaryRow("Top-Ziele", goalsLabel)}
              {summaryRow("Klimaneutral bis", city.energyYear)}
              {summaryRow("Energie-Maßnahmen", energyLabel)}
              {summaryRow("Steuerstrategie", taxLabel)}
              {summaryRow("Budget Top-3", [city.budgetTop1, city.budgetTop2, city.budgetTop3].filter(Boolean).join(", ") || "—")}
              {summaryRow("Bildstil", visualLabel)}
            </div>
            <NavButtons onBack={back} onNext={startGeneration} nextLabel="🖼️ Collage erstellen →" />
          </Card>
        )}

        {/* 11 — Ergebnis: 1 Collage + Eckdaten */}
        {step === 11 && prompt && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 6 }}>🎉</div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 900, color: "#1f2937" }}>{city.name} – Stadtplanungs-Collage</h2>
              <p style={{ color: "#6b7280", fontSize: 13, margin: "6px 0 0" }}>3 Perspektiven in 1 Bild – nur 1 Generierung, geringere Serverlast.</p>
            </div>

            <CollageCard prompt={prompt} url={url} onGenerate={genImage} />

            {/* Eckdaten als Textblock */}
            <Card>
              <SectionTitle icon="📊" title="Eckdaten der Stadt" sub="Wichtige Kennzahlen für die Planung" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
                <FactBox label="👥 Einwohner" value={`${city.popNow || "?"} → ${city.popTarget || "?"}`} />
                <FactBox label="🏠 Sozialwohnungen" value={`${city.socialHousing}%`} />
                <FactBox label="🌳 Grünanteil" value={`${city.greenery}%`} />
                <FactBox label="🏗️ Dichte" value={`${city.density}%`} />
                <FactBox label="🚊 Modal Split" value={`ÖPNV ${city.modalTransit}% · Rad ${city.modalBike}% · Fuß ${city.modalWalk}% · Auto ${city.modalCar}%`} />
                <FactBox label="🅿️ Parken" value={city.parkingPolicy} />
                <FactBox label="🏭 Wirtschaft" value={city.mainIndustry || "—"} />
                <FactBox label="🎯 Ziele" value={goalsLabel} />
                <FactBox label="🌱 Klimaneutral" value={city.energyYear} />
                <FactBox label="⚡ Energie" value={energyLabel} />
                <FactBox label="💰 Steuern" value={taxLabel} />
                <FactBox label="📊 Budget Top-3" value={[city.budgetTop1, city.budgetTop2, city.budgetTop3].filter(Boolean).join(", ") || "—"} />
              </div>
            </Card>

            <button onClick={reset} style={{ width: "100%", marginTop: 20, padding: "14px", borderRadius: 14, border: "2px solid #e5e7eb", background: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, color: "#374151" }}>🔄 Neue Stadt entwerfen</button>
          </div>
        )}
      </div>
    </div>
  );
}

const FactBox = ({ label, value }) => (
  <div style={{ background: "#f9fafb", borderRadius: 12, padding: "12px 14px", border: "1px solid #e5e7eb" }}>
    <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
    <div style={{ fontSize: 14, color: "#1f2937", fontWeight: 700, lineHeight: 1.4 }}>{value}</div>
  </div>
);
