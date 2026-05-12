export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;
  if (!prompt || prompt.length > 3000) return res.status(400).json({ error: "Ungültiger Prompt" });

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["IMAGE", "TEXT"] }
        })
      }
    );

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });

    const parts = data.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith("image/"));

    if (!imagePart) return res.status(500).json({ error: "Kein Bild erhalten – versuche es erneut" });

    res.status(200).json({ image: `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}` });

  } catch (err) {
    res.status(500).json({ error: "Serverfehler: " + err.message });
  }
}
