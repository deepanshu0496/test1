import axios from "axios";
import * as cheerio from "cheerio";

const URL = "https://www.worldometers.info/world-population/population-by-country/";

async function fetchCountries() {
    try {
        const { data } = await axios.get(URL, {
            headers: {
                "User-Agent": "Mozilla/5.0",
            },
        });

        const $ = cheerio.load(data);

        const countries = [];

        $("table tbody tr").each((i, row) => {
            const cols = $(row).find("td");

            const country = $(cols[1]).text().trim();
            const population = $(cols[2]).text().trim();

            if (country && population) {
                countries.push({ country, population });
            }
        });

        console.log(countries);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

fetchCountries();