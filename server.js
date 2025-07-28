import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "public")));


app.get("/api/weather/:city", async (req, res) => {
  const { city } = req.params;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: "Weather API failed" });
  }
});


app.get("/api/news/:countryCode", async (req, res) => {
  const { countryCode } = req.params;
  const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEWSAPI_KEY}`;
  try {
    const response = await fetch(url);
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: "News API failed" });
  }
});


app.get("/api/exchange/:currencyCode", async (req, res) => {
  const { currencyCode } = req.params;
  const url = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_KEY}/latest/${currencyCode}`;
  try {
    const response = await fetch(url);
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: "Exchange API failed" });
  }
});


app.get("/api/country/:countryName", async (req, res) => {
  const { countryName } = req.params;
  const url = `https://restcountries.com/v3.1/name/${countryName}`;
  try {
    const response = await fetch(url);
    res.json(await response.json());
  } catch (err) {
    res.status(500).json({ error: "Country API failed" });
  }
});


app.listen(PORT, () => {
  console.log(`🌍 Server running at http://localhost:${PORT}`);
});
