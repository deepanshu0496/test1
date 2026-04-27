import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export default async function handler(req, res) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless
    });

    const page = await browser.newPage();

    await page.goto("https://www.worldometers.info/world-population/", {
        waitUntil: "domcontentloaded"
    });

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

    await browser.close();

    res.status(200).json({ population });
}