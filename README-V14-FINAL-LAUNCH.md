# Visage Website — V14 Final Launch Edition

## What was completed
- Checked local HTML links across the site.
- Confirmed one consistent clinic phone number and WhatsApp number in the project.
- Added missing mobile navigation to `treatment-dandruff.html` and `treatment-tags-warts.html`.
- Kept the three-line hamburger button on mobile and desktop navigation on larger screens.
- Removed the obsolete duplicate emergency mobile-menu JavaScript function.
- Added touch-target, focus-visible and reduced-motion accessibility polish.
- Added `netlify.toml` for simple Netlify deployment.

## Before publishing
1. Open `robots.txt` and replace the example sitemap line with your real domain.
2. Open `sitemap.xml` and replace every `https://YOUR-DOMAIN.com` with your real domain.
3. Test the site locally in desktop and mobile widths.

## Deploy with Netlify
1. Create a Netlify account.
2. Add a new site and choose manual deploy.
3. Upload the complete project folder contents, including `assets`, HTML files, CSS, JS, `robots.txt`, `sitemap.xml`, and `netlify.toml`.
4. Test the generated Netlify URL.
5. Connect your custom domain when ready.
6. Update `robots.txt` and `sitemap.xml` to that final domain and redeploy.

## Final smoke test
- Every main navigation link opens the correct page.
- Mobile hamburger opens and closes on every page.
- Book consultation opens `appointments.html`.
- Appointment form validates name, phone and concern, then opens WhatsApp.
- Visit page directions and phone/WhatsApp links work.
