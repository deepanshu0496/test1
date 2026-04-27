import puppeteer from "puppeteer";

const URL = "https://www.worldometers.info/world-population/";

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(URL, { waitUntil: "domcontentloaded" });

    setInterval(async () => {
        const population = await page.evaluate(() => {
            const container = document.querySelector(
                '.rts-counter[rel="current_population"]'
            );

            if (!container) return null;

            const parts = container.querySelectorAll(".rts-nr-int");

            return Array.from(parts)
                .map(el => el.innerText)
                .join(",");
        });

        console.log("World Population:", population);
    }, 1000);
}

start();