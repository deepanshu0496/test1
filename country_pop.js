import puppeteer from "puppeteer";

async function start(country) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const slug = country.toLowerCase().replace(/\s+/g, "-");
    const url = `https://www.worldometers.info/world-population/${slug}-population/`;

    await page.goto(url, { waitUntil: "domcontentloaded" });

    const relValue = `${slug}-population`; // ✅ FIXED

    setInterval(async () => {
        const population = await page.evaluate((rel) => {
            const container = document.querySelector(
                `.rts-counter[rel="${rel}"]`
            );

            if (!container) return null;

            const parts = container.querySelectorAll(".rts-nr-int");

            return Array.from(parts)
                .map(el => el.innerText)
                .join(",");
        }, relValue);

        console.log(`${country} Population:`, population);
    }, 1000);
}

// Run
// start("India");
start("Nepal");