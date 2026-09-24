import { expect, test, type Page } from "@playwright/test";
import { PAGES } from "../src/app/lib/pages";
import { PROJECTS } from "../src/app/lib/projects";

const ROUTES = [
  ...PAGES.map((page) => page.href as string),
  ...PROJECTS.map((project) => `/projects/${project.slug}`),
];
const WIDTHS = [320, 360, 390, 768, 1440];

// A 1×1 transparent PNG.
const PIXEL = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
  "base64",
);

// Skill and contact icons come from other sites (jsDelivr, nmap.org). Serve a placeholder for them,
// so the tests check this site's own code and don't pass or fail with someone else's CDN.
test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin;
  await page.route(
    (url) =>
      url.origin !== origin ||
      (url.pathname === "/_next/image" && /^https?:/.test(url.searchParams.get("url") ?? "")),
    (route) =>
      route.request().resourceType() === "image"
        ? route.fulfill({ contentType: "image/png", body: PIXEL })
        : route.continue(),
  );
});

// Collects console errors and uncaught exceptions for the whole test.
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

// Loads a page, waits out the intro loader, then scrolls to the bottom so every
// scroll reveal and chart has mounted before anything is measured.
async function open(page: Page, route: string) {
  await page.goto(route);
  await page.waitForFunction(() => document.documentElement.dataset.appReady === "true");

  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = page.viewportSize()!.height / 2;
  for (let y = 0; y <= height; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(800);
}

// Anything wider than the screen: the page itself, an element poking past the right edge,
// or a heading whose text is wider than its own box (which overflow: clip would hide).
async function findOverflow(page: Page) {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const problems: string[] = [];
    const describe = (element: Element) =>
      `${element.tagName.toLowerCase()}.${String(element.className).split(" ")[0]} "${element.textContent?.trim().slice(0, 30)}"`;

    if (document.documentElement.scrollWidth > width) {
      problems.push(`page is ${document.documentElement.scrollWidth}px wide`);
    }
    for (const element of document.querySelectorAll("body *")) {
      // The skills marquee scrolls past both edges on purpose; the loader and wipe are overlays.
      if (element.closest(".marquee-wrap, .loader, .wipe")) continue;
      const box = element.getBoundingClientRect();
      if (box.width > 0 && box.right > width + 1) {
        problems.push(`${describe(element)} ends at ${Math.round(box.right)}px`);
      }
    }
    for (const heading of document.querySelectorAll("h1, h2, h3, .feature__title, .next-page__title")) {
      if (heading.scrollWidth > heading.clientWidth + 1) {
        problems.push(`${describe(heading)} text is ${heading.scrollWidth}px in ${heading.clientWidth}px`);
      }
    }
    return problems.slice(0, 10);
  });
}

for (const width of WIDTHS) {
  test.describe(`${width}px wide`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of ROUTES) {
      test(`${route} fits the screen with no errors`, async ({ page }) => {
        const errors = watchErrors(page);
        await open(page, route);
        expect(await findOverflow(page)).toEqual([]);
        expect(errors).toEqual([]);
      });
    }
  });
}

test.describe("with reduced motion", () => {
  test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });

  for (const route of ROUTES) {
    test(`${route} fits the screen with no errors`, async ({ page }) => {
      const errors = watchErrors(page);
      await open(page, route);
      expect(await findOverflow(page)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
});

test.describe("titles and share previews", () => {
  test("every page has its own title", async ({ page }) => {
    const titles = new Set<string>();
    for (const route of ROUTES) {
      await page.goto(route);
      titles.add(await page.title());
    }
    expect(titles.size).toBe(ROUTES.length);
  });

  for (const project of PROJECTS) {
    test(`/projects/${project.slug} has its own share tags and preview images`, async ({ page, request }) => {
      const path = `/projects/${project.slug}`;
      await page.goto(path);

      await expect(page).toHaveTitle(new RegExp(`^${project.name}`));
      await expect(page.locator("h1")).toHaveText(project.name);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new RegExp(`${path}$`));
      await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", project.summary);

      for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
        const url = new URL((await page.locator(selector).getAttribute("content"))!);
        expect(url.pathname.startsWith(`${path}/`)).toBe(true);
        const image = await request.get(url.pathname);
        expect(image.status()).toBe(200);
        expect(image.headers()["content-type"]).toBe("image/png");
      }
    });
  }

  test("an unknown project is a 404", async ({ request }) => {
    expect((await request.get("/projects/not-a-project")).status()).toBe(404);
  });

  test("the sitemap lists every project page", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();
    for (const project of PROJECTS) {
      expect(sitemap).toContain(`/projects/${project.slug}</loc>`);
    }
  });
});

test.describe("getting to a project", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("a card on /projects opens that project, with Projects marked in the nav", async ({ page }) => {
    const [project] = PROJECTS;
    await open(page, "/projects");
    await page.locator(`#${project.slug} a`).click();

    await expect(page).toHaveURL(`/projects/${project.slug}`);
    await expect(page.locator("h1")).toHaveText(project.name);
    await expect(page.locator('.nav__link[aria-current="true"]')).toHaveText("Projects");
  });

  test("the next-project link goes to the next project", async ({ page }) => {
    const [first, second] = PROJECTS;
    await open(page, `/projects/${first.slug}`);
    await page.getByRole("navigation", { name: "Next project" }).getByRole("link").click();

    await expect(page).toHaveURL(`/projects/${second.slug}`);
    await expect(page.locator("h1")).toHaveText(second.name);
  });

  test("the Experience page links the club role to its project page", async ({ page }) => {
    await open(page, "/experience");
    await page.getByRole("link", { name: /See the club website I built/ }).click();

    await expect(page).toHaveURL("/projects/bic-rec");
    await expect(page.locator("h1")).toHaveText("Blockchain Innovation Club, REC");
  });

  test("old /projects#slug links still land on that project's card", async ({ page }) => {
    await page.goto("/projects#bic-rec");
    await expect(page.locator("#bic-rec")).toBeInViewport();
  });
});
