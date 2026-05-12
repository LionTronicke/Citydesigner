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

const STEPS = ["Willkommen","Charakter","Architektur","Atmosphäre","Bevölkerung","Zusammenfassung","Deine Stadt"];

function buildPrompts(city) {
  const styleMap = { european: "European classical architecture", asian: "Asian architecture with pagodas", futuristic: "futuristic sci-fi architecture with glass and steel", american: "American urban skyline", mediterranean: "Mediterranean white-washed buildings", nordic: "Nordic minimalist wooden architecture" };
  const climateMap = { tropical: "tropical lush vegetation", desert: "arid desert landscape", temperate: "temperate green surroundings", arctic: "snowy arctic environment", rainy: "rainy misty atmosphere" };
  const timeMap = { dawn: "at dawn with soft pink light", day: "in bright daylight", golden: "in golden hour warm light", night: "at night with glowing city lights", storm: "during a dramatic storm" };
  const moodMap = { vibrant: "vibrant and lively", peaceful: "calm and peaceful", mysterious: "dark and mysterious", industrial: "industrial and gritty", romantic: "romantic and atmospheric" };
  const style = styleMap[city.archStyle] || "mixed architecture";
  const climate = climateMap[city.climate] || "temperate climate";
  const time = timeMap[city.daytime] || "in daylight";
  const mood = moodMap[city.mood] || "lively";
  const density = city.density > 66 ? "densely packed urban" : city.density > 33 ? "medium density" : "sparse low-rise";
  const greenery = city.greenery > 66 ? "with lots of parks and trees" : city.greenery > 33 ? "with some greenery" : "with minimal vegetation";
  const modern = city.modernity > 66 ? "ultra-modern" : city.modernity > 33 ? "blend of old and new" : "historic and traditional";
  const wealth = city.wealth > 66 ? "wealthy and affluent" : city.wealth > 33 ? "middle-class" : "working-class";
  const age = city.ageProfile > 60 ? "elderly population" : city.ageProfile < 40 ? "young population" : "mixed-age population";
  return {
    street: `Photorealistic wide-angle street-level view of a ${density} city named ${city.name}, ${style}, ${modern}, ${climate}, ${greenery}, ${mood} atmosphere, ${time}, cinematic lighting, ultra-detailed, 8K, hyperrealistic photography`,
    aerial: `Breathtaking aerial bird's-eye view of ${city.name} city from 500 meters altitude, ${style}, ${density} urban layout, ${climate}, ${greenery}, ${time}, drone photography, ultra sharp, 8K, photorealistic`,
    resident: `Photorealistic portrait of a typical resident of ${city.name}, ${wealth} ${age}, dressed in local style reflecting ${style} culture and ${climate} climate, candid street photography, natural lighting, 8K, ultra-detailed face`
  };
}

const makeUrl = (prompt, w, h) => {
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&nologo=true&model=flux&seed=${seed}`;
};

const ImageCard = ({ label, emoji, colorBorder, prompt, url, onGenerate, genLabel }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [prevUrl, setPrevUrl] = useState(null);
  if (url !== prevUrl) { setPrevUrl(url); setLoaded(false); setError(false); }

  return (
    <div style={{ borderRadius: 20, border: `2px solid ${colorBorder}`, overflow: "hidden", marginBottom: 20, background: "#0f172a" }}>
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `2px solid ${colorBorder}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22 }}>{emoji}</span>
          <span style={{ fontWeight: 800, fontSize: 15, color: "#f1f5f9" }}>{label}</span>
        </div>
        {url && loaded && (
          <button onClick={onGenerate} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, border: `1px solid ${colorBorder}`, background: "transparent", color: colorBorder, cursor: "pointer" }}>🔁 Neu</button>
        )}
      </div>
      <div style={{ minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        {!url && (
          <div style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 40 }}>🎨</span>
            <button onClick={onGenerate} style={{ padding: "13px 28px", borderRadius: 14, border: "none", background: colorBorder, color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer" }}>{genLabel}</button>
          </div>
        )}
        {url && !loaded && !error && (
          <div style={{ padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 42, height: 42, border: `3px solid ${colorBorder}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.9s linear infinite" }} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>KI generiert Bild… (kann 20–40 Sek. dauern)</span>
          </div>
        )}
        {error && (
          <div style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
            <p style={{ color: "#f87171", fontSize: 13, margin: "0 0 12px" }}>Generierung fehlgeschlagen.</p>
            <button onClick={onGenerate} style={{ padding: "9px 22px", borderRadius: 10, border: "none", background: colorBorder, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>Nochmals versuchen</button>
          </div>
        )}
        {url && (
          <img src={url} alt={label} onLoad={() => setLoaded(true)} onError={() => { setError(true); setLoaded(false); }} style={{ width: "100%", display: loaded ? "block" : "none" }} />
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

const ProgressBar = ({ step }) => (
  <div style={{ display: "flex", gap: 6, marginBottom: 32, justifyContent: "center" }}>
    {STEPS.map((s, i) => (
      <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? "#6366f1" : "#e5e7eb", transition: "background 0.3s", maxWidth: 60 }} />
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

export default function CityDesigner() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState({ name: "", density: 50, modernity: 50, greenery: 50, archStyle: "", climate: "", daytime: "day", mood: "", wealth: 50, diversity: 50, ageProfile: 50 });
  const [prompts, setPrompts] = useState(null);
  const [urls, setUrls] = useState({ street: null, aerial: null, resident: null });

  const set = (key) => (val) => setCity(c => ({ ...c, [key]: val }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const startGeneration = () => {
    const p = buildPrompts(city);
    setPrompts(p);
    setUrls({ street: null, aerial: null, resident: null });
    setStep(6);
  };

  const genImage = (key, w, h) => {
    if (!prompts) return;
    setUrls(prev => ({ ...prev, [key]: makeUrl(prompts[key], w, h) }));
  };

  const reset = () => {
    setStep(0);
    setCity({ name: "", density: 50, modernity: 50, greenery: 50, archStyle: "", climate: "", daytime: "day", mood: "", wealth: 50, diversity: 50, ageProfile: 50 });
    setPrompts(null);
    setUrls({ street: null, aerial: null, resident: null });
  };

  const summaryRow = (label, value) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ color: "#6b7280", fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>{value}</span>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #eef2ff 0%, #f0fdf4 100%)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", fontFamily: "system-ui, sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; }`}</style>
      <div style={{ width: "100%", maxWidth: 640 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 4 }}>🏙️</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: "#1f2937", letterSpacing: -0.5 }}>CityDesigner</h1>
          <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>Erschaffe deine Traumstadt – Schritt für Schritt</p>
        </div>
        <ProgressBar step={step} />

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
            <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", margin: "
