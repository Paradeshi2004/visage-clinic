# VISAGE — Professional Website Guide

## Project structure

- `index.html` — Home page
- `treatments.html` — Treatment library
- `treatment-*.html` — Individual treatment pages
- `doctor-profile.html` — Doctor page
- `care.html` — Care page
- `clinic.html` — Clinic page
- `visit.html` — Visit/contact page
- `appointments.html` — Appointment enquiry page
- `styles.css` — Shared professional stylesheet
- `script.js` — Shared interactions and navigation behaviour
- `assets/` — Logo, clinic, doctor and hero images

## Editing the design

### Brand colours
At the top of `styles.css`, edit the CSS variables:

```css
:root {
  --paper: #f6f2e9;
  --paper-deep: #ece5d8;
  --ink: #171a17;
  --muted: #6d716a;
  --green: #0b5148;
  --green-dark: #0d3e39;
}
```

### Home hero text
Edit the `<section class="hero">` area in `index.html`.

### Navigation
Every page shares the same navigation structure. `script.js` handles the current-page state using `aria-current="page"`.

### Treatment images
The current project still uses several external image URLs. For production, save each approved treatment image inside `assets/` and point the relevant `.treatment-image-*` class to the local file.

## Before deployment

1. Replace remaining placeholder/external treatment imagery with approved local assets.
2. Verify the clinic phone number and WhatsApp number.
3. Add the production domain to canonical and Open Graph metadata if used.
4. Test every page on mobile, tablet and desktop.
5. Compress large JPG/PNG assets and consider WebP/AVIF copies.
6. Run the site through an accessibility and performance audit.

## Important editing rule

`styles.css` has been reformatted for readability while preserving CSS cascade order so the current visual design remains unchanged. When making future changes, edit the relevant existing rule instead of repeatedly appending another override at the end of the file.

## Treatment images
The available generated treatment images are now stored locally in `assets/` and referenced by `styles.css`. This improves reliability compared with remote image URLs. A few treatment categories still need their own final local images; those can be added later without changing the page structure.
