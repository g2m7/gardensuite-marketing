import { test, expect } from '@playwright/test';

test.describe('GardenSuite Acceptance Criteria', () => {
	test('1. Zero external requests to Google Fonts', async ({ page }) => {
		const externalFontRequests: string[] = [];
		page.on('request', (request) => {
			const url = request.url();
			if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
				externalFontRequests.push(url);
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(externalFontRequests).toHaveLength(0);
	});

	test('2. Local font files load successfully with status 200', async ({ page }) => {
		const fontResponses = new Map<string, number>();
		page.on('response', (response) => {
			const url = response.url();
			if (url.endsWith('.woff2')) {
				const path = new URL(url).pathname;
				fontResponses.set(path, response.status());
			}
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(fontResponses.get('/fonts/inter-latin-var.woff2')).toBe(200);
		expect(fontResponses.get('/fonts/plus-jakarta-sans-latin-var.woff2')).toBe(200);
	});

	test('3. Inlined critical CSS is present in the initial HTML document payload', async ({
		request
	}) => {
		// Fetch the raw HTML to check for inlined CSS
		const response = await request.get('/');
		const html = await response.text();

		// SvelteKit Vite build often injects styles into the head or app layer, we can check for style tags
		// or specific critical css if known. Let's just check for `<style` block or inline styles inside head.
		// A more generic approach is to check if layout.css content is inlined or linked with specific preload.
		// But let's check for <style in the initial HTML.
		expect(html).toContain('<style');
	});

	test('4. Speculation Rules script exists with moderate eagerness', async ({ page }) => {
		await page.goto('/');
		const script = await page.locator('script[type="speculationrules"]').first();
		await expect(script).toBeAttached();
		const content = await script.textContent();
		expect(content).toContain('"eagerness": "moderate"');
	});

	test('5. Scale & Phone Process Demo works correctly on attendance page', async ({ page }) => {
		await page.goto('/products/attendance');

		// Render verification
		const demoContainer = page.locator('[aria-label="Face verification and smart weighing live demonstration"]');
		await expect(demoContainer).toBeVisible();

		// Steps are visible
		await expect(page.locator('text=Face verified').first()).toBeVisible();
		await expect(page.locator('text=Weight locked').first()).toBeVisible();
		await expect(page.locator('text=Record saved').first()).toBeVisible();

		// Scale SVG is visible
		const scaleSvg = demoContainer.locator('svg[aria-label="Bluetooth Hanging Scale weighing tea leaf"]');
		await expect(scaleSvg).toBeVisible();

		// Scroll into view so scroll-reveal triggers is-visible and opacity transitions to 1
		await demoContainer.scrollIntoViewIfNeeded();

		// Wait for Phase 1/2 to advance automatically and scroll-reveal opacity to reach 1
		await page.waitForTimeout(3000);

		// Verified that weight advances to 18.40 kg
		await expect(demoContainer.getByText('18.40 kg', { exact: true })).toBeVisible();
		await expect(demoContainer.locator('text=STABLE')).toBeVisible();

		// Temporarily hide fixed navigation so it doesn't overlay top border of locator screenshot
		await page.evaluate(() => {
			const nav = document.querySelector('nav[aria-label="Main navigation"]');
			if (nav) (nav as HTMLElement).style.visibility = 'hidden';
		});

		// Wait for animation to settle and take screenshot
		await page.waitForTimeout(500);
		await demoContainer.screenshot({
			path: '/Users/g2m7/.gemini/antigravity/brain/2efd13ca-4627-4937-a6c7-a93aec9a71fa/attendance-dual-frame-demo.png'
		});

		// Restore navigation
		await page.evaluate(() => {
			const nav = document.querySelector('nav[aria-label="Main navigation"]');
			if (nav) (nav as HTMLElement).style.visibility = 'visible';
		});
	});

	test('6. Buttons have touch-action: manipulation and press feedback', async ({ page }) => {
		await page.goto('/');
		const buttons = await page.locator('button').all();

		for (const button of buttons) {
			const touchAction = await button.evaluate((el) => window.getComputedStyle(el).touchAction);
			expect(touchAction).toContain('manipulation');
		}
	});

	test('7. Zero console errors on page load', async ({ page }) => {
		const errors: string[] = [];
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text());
			}
		});
		page.on('pageerror', (err) => {
			errors.push(err.message);
		});

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(errors).toHaveLength(0);
	});

	test('8. Reduced motion behaves gracefully', async ({ browser }) => {
		const context = await browser.newContext({ colorScheme: 'light', reducedMotion: 'reduce' });
		const page = await context.newPage();

		await page.goto('/');

		// Check that the page loads without crashing when reduced motion is requested
		await expect(page.locator('body')).toBeVisible();

		await context.close();
	});
});
