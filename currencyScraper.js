const axios = require("axios");
const cheerio = require("cheerio");

// Define the base and target currency codes
async function scrapeExchangeRate(toCurrency, divClass) {
  const url = `https://www.xe.com/currencyconverter/convert/?Amount=1&From=INR&To=${toCurrency.toUpperCase()}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const $ = cheerio.load(response.data);

    // Extract the exchange rate from the website
    const exchangeRate = $(`.${divClass}`).text();

    // Clean and format the exchange rate
    const cleanedRate = exchangeRate.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    if (cleanedRate) {
      return cleanedRate;
    } else {
      return "Error";
    }
  } catch (error) {
    return "Error";
  }
}

module.exports = scrapeExchangeRate;
