import { chromium } from "playwright";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const DESKTOP = { width: 1440, height: 900 };
const MOBILE  = { width: 390,  height: 844 };

const projects = [
  {
    id: "onthegojuice",
    url: "https://onthegojuice.vercel.app",
    viewport: DESKTOP,
    scrolls: [0, 700, 1500],
  },
  {
    id: "bcusca",
    url: "https://bcusca.org",
    viewport: DESKTOP,
    scrolls: [0, 700, 1500],
  },
  {
    id: "bridge",
    url: "https://bridge-final-web-version.vercel.app",
    viewport: DESKTOP,
    scrolls: [0, 700, 1500],
  },
  {
    id: "umrah-marketplace",
    url: "https://umrah-marketplace.vercel.app",
    viewport: DESKTOP,
    scrolls: [0, 700, 1500],
  },
  {
    id: "umrah-mobile",
    url: "https://umrah-marketplace-mobile-app.vercel.app",
    viewport: MOBILE,
    scrolls: [0, 800, 1600],
  },
  {
    id: "sizzleandseekh",
    url: "https://sizzleandseekh.vercel.app",
    viewport: DESKTOP,
    scrolls: [0, 700, 1500],
  },
];

async function capture() {
  const browser = await chromium.launch({ headless: true });

  for (const project of projects) {
    const outDir = join("public", "screenshots", project.id);
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

    const ctx = await browser.newContext({
      viewport: project.viewport,
      deviceScaleFactor: 1,
      // Block fonts/analytics to speed up load
      extraHTTPHeaders: { "Accept-Language": "en-US,en;q=0.9" },
    });

    const page = await ctx.newPage();

    // Block heavy 3rd-party resources that slow loading
    await page.route("**/*.{mp4,webm,woff,woff2}", (r) => r.abort());

    try {
      console.log(`\n→ ${project.id}`);
      await page.goto(project.url, { waitUntil: "domcontentloaded", timeout: 40000 });
      // Give JS/CSS time to render
      await page.waitForTimeout(3500);

      // Dismiss any cookie banners / popups
      for (const sel of [
        "[aria-label*='cookie' i]",
        "[class*='cookie' i] button",
        "[id*='cookie' i] button",
        "[class*='modal' i] button[aria-label*='close' i]",
        "[class*='popup' i] button",
      ]) {
        try { await page.click(sel, { timeout: 800 }); } catch { /* ignore */ }
      }

      for (let i = 0; i < project.scrolls.length; i++) {
        await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), project.scrolls[i]);
        await page.waitForTimeout(600);

        const path = join(outDir, `${i + 1}.jpg`);
        await page.screenshot({ path, type: "jpeg", quality: 88 });
        console.log(`  ✓ ${i + 1}.jpg`);
      }
    } catch (err) {
      console.error(`  ✗ ${err.message}`);
    }

    await ctx.close();
  }

  await browser.close();
  console.log("\n✅ All done.");
}

capture().catch(console.error);
