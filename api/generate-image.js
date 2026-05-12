export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;
  if (!prompt || prompt.length > 3000) return res.status(400).json({ error: "Ungültiger Prompt" });

  const apiKey = process.env.GEMINI_API_KEY;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: {
            sampleCount: 1,
            aspectRatio: "16:9"
          }
        })
      }
    );

    const data = await response.json();

    // Fehler von Google direkt weitergeben
    if (data.error) return res.status(500).json({ error: data.error.message });

    const base64 = data.predictions?.[0]?.bytesBase64Encoded;
    if (!base64) return res.status(500).json({ error: "Kein Bild erhalten" });

    res.status(200).json({ image: `data:image/png;base64,${base64}` });

  } catch (err) {
    res.status(500).json({ error: "Server Fehler" });
  }
}
