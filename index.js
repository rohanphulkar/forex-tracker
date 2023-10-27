const express = require("express");
const scrapeExchangeRate = require("./currencyScraper.js"); // Require the function
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get("/convert/:currency/:div", async (req, res) => {
  try {
    const { currency, div } = req.params;

    if (!currency) {
      return res.status(400).json({ error: "Missing currency code" });
    }

    const exchangeRate = await scrapeExchangeRate(currency, div);

    if (exchangeRate === "Error") {
      return res.status(500).json({ error: "Error scraping exchange rate" });
    }

    res.json({
      currency,
      exchangeRate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
