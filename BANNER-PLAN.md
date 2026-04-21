# Homepage Hero Banner — Build Plan

**Status: APPROVED TO BUILD (pending Matthew's sign-off)**
**DO NOT BUILD without Matthew saying "go"**

---

## What It Is

A flowing ribbon banner that lives inside the homepage hero area — over the hero image, below the GallantryAI logo, above or beside the main h1. Personal message from the builder. Toggle on/off from Studio. Database-driven. Text auto-fits.

This is SEPARATE from the existing site-wide AnnouncementBanner (which sits above the nav on every page). That one stays as-is.

---

## Placement

- Positioned INSIDE the hero section, overlaid on the hero image
- Does NOT cover the GallantryAI logo
- Does NOT cover the buffalo or sloth faces (they are in the center/right of the hero image)
- Sits in the lower portion of the hero area, above the h1 text OR as a ribbon that runs horizontally across the hero at roughly 60–70% height
- On mobile: stacks cleanly, stays readable

**If Matthew doesn't like placement:** Change is a 1-line CSS adjustment (`top`, `bottom`, `translateY`). Takes 2 minutes. Matthew describes where he wants it ("higher", "lower", "left side") and I move it.

---

## Visual Design

- Orange ribbon with slight transparency (rgba ~0.85 opacity) so hero image shows through underneath
- Slow horizontal scroll animation — text drifts gently left to right, loops seamlessly (like a field report ticker)
- Playfair Display font (matches site typography)
- Text color: white
- Subtle drop shadow so it reads against any background
- Fade in when toggled ON, fade out when toggled OFF
- Dismiss X button (visitor can close it for the session)

---

## Text Boundaries

- Text is contained within the ribbon — never overflows
- Font size uses `clamp()`: starts large (1.1rem), shrinks automatically if message is too long
- Hard cap: 280 characters max (enforced in Studio input)
- If text is very short, font stays large and centered

---

## Studio Controls (what Matthew edits)

- Toggle ON/OFF
- Text input (280 char max, live character counter)
- Color picker (default orange #E8520A)
- Animation speed: slow / medium / off (static)
- Live preview in Studio tab shows the ribbon as it will appear

---

## Database

- Stored in `site_settings` table (same as existing banner)
- New keys: `heroBannerEnabled`, `heroBannerText`, `heroBannerColor`, `heroBannerSpeed`
- No schema migration needed — site_settings is key/value pairs

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Banner covers faces in hero image | Medium | Visual | Placement is CSS — easy to adjust after Matthew sees it |
| Text overflows ribbon | Low | Visual | `clamp()` + 280 char cap prevents this |
| Animation distracts from content | Low | UX | Speed control: Matthew can set to "off" for static |
| Breaks mobile layout | Low | UX | Test on mobile before checkpoint |
| Conflicts with existing AnnouncementBanner | None | — | They are in different locations, independent |

**Confidence: HIGH** — This is standard CSS + React. No complex dependencies.

---

## Build Steps (when approved)

1. Add `heroBanner*` keys to site_settings DB (no migration needed)
2. Create `HeroAnnouncementBanner.tsx` component
3. Add it to `Home.tsx` inside the hero section
4. Add Studio controls to `StudioSiteBannerManager.tsx` (new section below existing banner)
5. Test on dev server
6. Save checkpoint

---

## What Matthew Needs to Know

- The existing site-wide banner (above nav, every page) stays and still works
- This new banner is ONLY on the homepage hero
- If he doesn't like where it sits, one sentence description ("move it lower") = 2 minute fix
- Toggle is in Studio → Site Banner tab (same place as the existing one, new section below it)
