# V27 — Complete Website Polish Update

## Included
- Enhanced multi-doctor page with a clear active state and richer selected profile details.
- Added shareable doctor hashes: `#neeraja`, `#sravya`, `#mounika`.
- Browser back/forward handling for doctor selection.
- Added optional preferred doctor, email, date and time fields to the consultation request.
- Date preference cannot be set in the past.
- WhatsApp enquiry now includes all supplied preferences.
- Added global robots/locale metadata and async image decoding.
- Added reduced-motion support and stronger form feedback.

## Important before launch
1. Replace the temporary Dr. Sravya and Dr. Mounika profile images.
2. Replace the generic profile labels with clinic-approved qualifications/specialties.
3. Connect the appointment flow to a backend only if the clinic wants server-side submissions; the current form honestly sends via WhatsApp.
4. Set the final public domain before adding canonical URLs and absolute Open Graph images.
5. Test every link and form on mobile before deployment.
