const input = document.getElementById('country-input');
const countryName = document.getElementById('country-name');
const countryCapital = document.getElementById('country-capital');
const countryPopulation = document.getElementById('country-population');
const countryCurrency = document.getElementById('country-currency');
const countryTimezone = document.getElementById('country-timezone');
const temp = document.getElementById('temp');
const feels = document.getElementById('feels');
const currencyTo = document.getElementById('currency-to');
const currencyFrom = document.getElementById('currency-from');
const quickCapital = document.getElementById('quick-capital');
const quickLang = document.getElementById('quick-lang');
const headline1 = document.getElementById('headline-1');
const headline2 = document.getElementById('headline-2');
const headline3 = document.getElementById('headline-3');
const headlineImage1 = document.getElementById('headline-img-1');
const headlineImage2 = document.getElementById('headline-img-2');
const headlineImage3 = document.getElementById('headline-img-3');

async function getCountry() {
  const country = input.value;

  try {
    // Country info
    let res = await fetch(`/api/country/${country}`);
    let c = (await res.json())[0];
    let capital = c.capital[0];
    let currency = Object.keys(c.currencies)[0];
    let lang = Object.values(c.languages)[0];
    let code = c.cca2.toLowerCase();

    countryName.textContent = c.name.common;
    countryCapital.textContent = `Capital: ${capital}`;
    countryPopulation.textContent = `Population: ${c.population.toLocaleString()}`;
    countryCurrency.textContent = `Currency: ${currency}`;
    countryTimezone.textContent = `Timezone: ${c.timezones[0]}`;
    quickCapital.textContent = `Capital: ${capital}`;
    quickLang.textContent = `Language: ${lang}`;

    // Weather
    res = await fetch(`/api/weather/${capital}`);
    let w = await res.json();
    temp.textContent = `Temperature: ${w.main.temp}°C`;
    feels.textContent = `Feels Like: ${w.main.feels_like}°C`;

    // Exchange
    res = await fetch(`/api/exchange/${currency}`);
    let e = await res.json();
    currencyTo.textContent = `1 USD = ${e.conversion_rates[currency]} ${currency}`;
    currencyFrom.textContent = `1 ${currency} = ${(1 / e.conversion_rates[currency]).toFixed(2)} USD`;

    // News
    res = await fetch(`/api/news/${code}`);
    let n = await res.json();
    headline1.textContent = n.articles[0]?.title || "No headline";
    headlineImage1.src = n.articles[0]?.urlToImage || "placeholder.jpg";
    headline2.textContent = n.articles[1]?.title || "No headline";
    headlineImage2.src = n.articles[1]?.urlToImage || "placeholder.jpg";
    headline3.textContent = n.articles[2]?.title || "No headline";
    headlineImage3.src = n.articles[2]?.urlToImage || "placeholder.jpg";

  } catch (error) {
    console.error(error);
    alert("Error loading data.");
  }
}
