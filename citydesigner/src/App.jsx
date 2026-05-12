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

const ProgressBar = ({ step }) => (
  <div style={{ display: "flex", gap: 6, marginBottom: 32, justifyContent: "center" }}>
    {STEPS.map((s, i) => (
      <div key={i} style={{ flex: 1, height: 4, borderRadius: 999, background: i <= step ? "#6366f1" : "#e5e7eb", transition: "background 0.3s", maxWidth: 60 }} />
    ))}
  </div>
);

const Card = ({ children, style: extraStyle }) => (
  <div style={{ background: "#fff", borderRadius: 24, padding: 32, boxShadow: "0 4px 32px rgba(0,0,0,0.08)", ...extraStyle }}>
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

const ImageCard = ({ label, emoji, src, colorBorder, prompt }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div style={{ borderRadius: 20, border: `2px solid ${colorBorder}`, overflow: "hidden", marginBottom: 20, background: "#0f172a" }}>
      <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `2px solid ${colorBorder}` }}>
        <span style={{ fontSize: 22 }}>{emoji}</span>
        <span style={{ fontWeight: 800, fontSize: 15, color: "#f1f5f9" }}>{label}</span>
      </div>
      <div style={{ position: "relative", minHeight: 220, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {!loaded && !error && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: 32 }}>
            <div style={{ width: 40, height: 40, border: `3px solid ${colorBorder}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
            <span style={{ color: "#94a3b8", fontSize: 13 }}>Bild wird generiert…</span>
          </div>
        )}
        {error && (
          <div style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>⚠️</div>
            <span style={{ color: "#f87171", fontSize: 13 }}>Generierung fehlgeschlagen. Bitte nochmals versuchen.</span>
          </div>
        )}
        {src && (
          <img src={src} alt={label}
            onLoad={() => setLoaded(true)}
            onError={() => { setError(true); setLoaded(false); }}
            style={{ width: "100%", display: loaded ? "block" : "none" }}
          />
        )}
      </div>
      <details style={{ padding: "10px 16px", borderTop: "1px solid #1e293b" }}>
        <summary style={{ fontSize: 11, color: "#64748b", cursor: "pointer", userSelect: "none" }}>Prompt anzeigen</summary>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#94a3b8", lineHeight: 1.7, marginTop: 8, wordBreak: "break-word" }}>{prompt}</div>
      </details>
    </div>
  );
};

export default function CityDesigner() {
  const [step, setStep] = useState(0);
  const [city, setCity] = useState({ name: "", density: 50, modernity: 50, greenery: 50, archStyle: "", climate: "", daytime: "day", mood: "", wealth: 50, diversity: 50, ageProfile: 50 });
  const [prompts, setPrompts] = useState(null);
  const [images, setImages] = useState({ street: null, aerial: null, resident: null });

  const set = (key) => (val) => setCity(c => ({ ...c, [key]: val }));
  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);

  const generate = () => {
    const p = buildPrompts(city);
    setPrompts(p);
    setImages({ street: null, aerial: null, resident: null });
    setStep(6);
    const encode = (txt) => encodeURIComponent(txt);
    const base = "https://image.pollinations.ai/prompt/";
    const params = "?width=896&height=512&nologo=true&enhance=true&model=flux";
    const portraitParams = "?width=512&height=768&nologo=true&enhance=true&model=flux";
    setTimeout(() => {
      setImages({
        street: `${base}${encode(p.street)}${params}&seed=${Math.floor(Math.random()*99999)}`,
        aerial: `${base}${encode(p.aerial)}${params}&seed=${Math.floor(Math.random()*99999)}`,
        resident: `${base}${encode(p.resident)}${portraitParams}&seed=${Math.floor(Math.random()*99999)}`
      });
    }, 100);
  };

  const resetCity = () => {
    setStep(0);
    setCity({ name: "", density: 50, modernity: 50, greenery: 50, archStyle: "", climate: "", daytime: "day", mood: "", wealth: 50, diversity: 50, ageProfile: 50 });
    setPrompts(null);
    setImages({ street: null, aerial: null, resident: null });
  };

  const summaryRow = (label, value) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ color: "#6b7280", fontSize: 14 }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 14, color: "#1f2937" }}>{value}</span>
    </div>
  );

  const styleName = (id) => architectureStyles.find(s => s.id === id)?.label || "—";
  const climateName = (id) => climates.find(s => s.id === id)?.label || "—";
  const timeName = (id) => daytimes.find(s => s.id === id)?.label || "—";
  const moodName = (id) => moods.find(s => s.id === id)?.label || "—";

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
            <SectionTitle icon="✨" title="Willkommen!" sub="Gib deiner Stadt zuerst einen Namen. Dann gestalten wir gemeinsam alles andere." />
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
            <SectionTitle icon="🎚️" title="Stadtcharakter" sub="Wie fühlt sich deine Stadt an? Ziehe die Regler in die gewünschte Richtung." />
            <SliderField label="Bebauungsdichte" value={city.density} onChange={set("density")} leftLabel="Weitläufig" rightLabel="Megacity" />
            <SliderField label="Modernität" value={city.modernity} onChange={set("modernity")} leftLabel="Historisch" rightLabel="Futuristisch" />
            <SliderField label="Grünanteil" value={city.greenery} onChange={set("greenery")} leftLabel="Betonwüste" rightLabel="Grünoase" />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 2 && (
          <Card>
            <SectionTitle icon="🏗️" title="Architekturstil" sub="Welcher Stil prägt das Erscheinungsbild deiner Stadt?" />
            <SingleSelect items={architectureStyles} selected={city.archStyle} onSelect={set("archStyle")} />
            <NavButtons onBack={back} onNext={next} canNext={!!city.archStyle} />
          </Card>
        )}

        {step === 3 && (
          <Card>
            <SectionTitle icon="🌤️" title="Atmosphäre" sub="Klima, Tageszeit und Stimmung – wie wirkt deine Stadt?" />
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Klima</p>
              <SingleSelect items={climates} selected={city.climate} onSelect={set("climate")} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Tageszeit</p>
              <SingleSelect items={daytimes} selected={city.daytime} onSelect={set("daytime")} />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 14, color: "#374151", marginBottom: 10 }}>Stimmung</p>
              <SingleSelect items={moods} selected={city.mood} onSelect={set("mood")} />
            </div>
            <NavButtons onBack={back} onNext={next} canNext={!!city.climate && !!city.mood} />
          </Card>
        )}

        {step === 4 && (
          <Card>
            <SectionTitle icon="👥" title="Bevölkerung" sub="Wer wohnt in deiner Stadt? Forme die Gesellschaft." />
            <SliderField label="Wohlstand" value={city.wealth} onChange={set("wealth")} leftLabel="Arbeiterklasse" rightLabel="Wohlhabend" />
            <SliderField label="Diversität" value={city.diversity} onChange={set("diversity")} leftLabel="Homogen" rightLabel="Kosmopolit" />
            <SliderField label="Altersstruktur" value={city.ageProfile} onChange={set("ageProfile")} leftLabel="Jung & dynamisch" rightLabel="Erfahren & reif" />
            <NavButtons onBack={back} onNext={next} />
          </Card>
        )}

        {step === 5 && (
          <Card>
            <SectionTitle icon="📋" title={`"${city.name}" – Deine Stadt`} sub="Überprüfe alle Einstellungen und starte dann die Generierung." />
            <div style={{ background: "#f9fafb", borderRadius: 14, padding: 20, marginBottom: 8 }}>
              {summaryRow("Stadtname", city.name)}
              {summaryRow("Bebauungsdichte", `${city.density}%`)}
              {summaryRow("Modernität", `${city.modernity}%`)}
              {summaryRow("Grünanteil", `${city.greenery}%`)}
              {summaryRow("Architekturstil", styleName(city.archStyle))}
              {summaryRow("Klima", climateName(city.climate))}
              {summaryRow("Tageszeit", timeName(city.daytime))}
              {summaryRow("Stimmung", moodName(city.mood))}
              {summaryRow("Wohlstand", `${city.wealth}%`)}
              {summaryRow("Diversität", `${city.diversity}%`)}
              {summaryRow("Altersstruktur", `${city.ageProfile}%`)}
            </div>
            <NavButtons onBack={back} onNext={generate} nextLabel="🏙️ Stadt generieren" />
          </Card>
        )}

        {step === 6 && prompts && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 6 }}>🎉</div>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: "#1f2937" }}>{city.name} wird erschaffen!</h2>
              <p style={{ color: "#6b7280", fontSize: 14, margin: "6px 0 0" }}>Die Bilder werden direkt von der KI generiert – einen Moment Geduld.</p>
            </div>
            <ImageCard label="1. Innenstadt-Ansicht" emoji="🏙️" src={images.street} prompt={prompts.street} colorBorder="#6366f1" />
            <ImageCard label="2. Luftbild / Vogelperspektive" emoji="🛩️" src={images.aerial} prompt={prompts.aerial} colorBorder="#10b981" />
            <ImageCard label="3. Typischer Bewohner" emoji="👤" src={images.resident} prompt={prompts.resident} colorBorder="#f59e0b" />
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button onClick={resetCity} style={{ flex: 1, padding: "14px", borderRadius: 14, border: "2px solid #e5e7eb", background: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14, color: "#374151" }}>🔄 Neue Stadt</button>
              <button onClick={generate} style={{ flex: 1, padding: "14px", borderRadius: 14, border: "none", background: "#6366f1", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>🔁 Neu generieren</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
