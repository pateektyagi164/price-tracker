const { chromium } = require("playwright")

async function scrapeAmazon(product) {

    const browser = await chromium.launch()

    const page = await browser.newPage()

    const searchUrl = `https://www.amazon.in/s?k=${product}`

    await page.goto(searchUrl)

    const title = await page.locator(".a-size-medium").first().innerText()

    const price = await page.locator(".a-price-whole").first().innerText()

    await browser.close()

    return {
        name: title,
        price: parseFloat(price.replace(",", "")),
        store: "Amazon"
    }
}

module.exports = scrapeAmazon