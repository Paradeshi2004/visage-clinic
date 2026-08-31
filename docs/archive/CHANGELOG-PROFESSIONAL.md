# Professional Cleanup — Changelog

## CSS maintenance cleanup

- Reformatted the shared stylesheet into readable, one-property-per-line CSS.
- Added a top-level stylesheet guide.
- Preserved rule order and cascade behaviour to avoid changing the current visual design.
- Kept responsive rules and accessibility rules intact.

## Project maintenance documentation

- Added `README-PROJECT-GUIDE.md` with page structure, editing guidance and deployment checklist.

## Existing professional improvements retained

- Multi-page navigation system.
- Automatic active navigation state.
- Navigation hover and focus behaviour.
- Appointment form status handling.
- Reduced-motion support.
- Responsive layout rules.

## Recommended next cleanup

The next safe improvement is to consolidate historical duplicate override blocks in `styles.css` one section at a time, with visual testing after each consolidation. This should be done carefully because later rules currently intentionally override earlier rules.

## CSS consolidation and local image update
- Removed exact duplicate top-level CSS rules while preserving the latest cascade position.
- Retained non-identical overrides intentionally to avoid visual regressions.
- Added locally stored treatment images for available generated treatment assets.
- Kept unavailable treatment categories on their existing fallback images until matching local assets are added.

## Multi-page consistency pass
- Added the shared `script.js` to pages that were missing it so current-page navigation works consistently.
- Added `Home` to footer navigation where it was missing.
