import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { StringDecoder } from "string_decoder";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, "ai"))); // serve frontend folder

app.get("/api/chat/stream", async (req, res) => {
  const userMessage = req.query.message;
  if (!userMessage) return res.status(400).send("No message provided");

  // SSE headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  res.write(": connected\n\n");

  try {
    const ollamaRes = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3.2:1b",
        prompt: userMessage,
        stream: true,
      }),
    });

    const decoder = new StringDecoder("utf8");
    let buffer = "";

    for await (const chunk of ollamaRes.body) {
      buffer += decoder.write(chunk);

      // Ollama streams text lines as JSON per line or raw
      // Try to parse each line safely
      let lines = buffer.split("\n");
      buffer = lines.pop() || ""; // incomplete line remains

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.response) {
            // Send character by character to avoid overlapping text
            for (const char of json.response) {
              res.write(`data: ${char}\n\n`);
            }
          }
        } catch {
          // If not JSON, treat as raw text
          for (const char of line) {
            res.write(`data: ${char}\n\n`);
          }
        }
      }
    }

    // Flush remaining buffer
    if (buffer.trim()) {
      try {
        const json = JSON.parse(buffer);
        if (json.response) {
          for (const char of json.response) {
            res.write(`data: ${char}\n\n`);
          }
        }
      } catch {
        for (const char of buffer) res.write(`data: ${char}\n\n`);
      }
    }

    // End SSE
    res.write("event: done\ndata: \n\n");
    res.end();
  } catch (err) {
    console.error("Error streaming from Ollama:", err);
    res.write("event: done\ndata: ❌ Error talking to Ollama\n\n");
    res.end();
  }
});

app.get("/", (req, res) => {
  res.send("✅ Server running. Use /api/chat/stream?message=hi");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("✅ Server running at http://localhost:3000");
});
