# H-Details

Marketing and booking site for a mobile car-detailing business in Houston.

**Live:** https://emman5.github.io/H-details/

## What it does

Local detailing shops lose bookings because customers can't see pricing, can't tell
whether they're inside the service area, and have to call during business hours to
book. This site answers all three without the owner picking up the phone.

- **Service catalog** — seven detail packages (interior, exterior, polishing,
  headlight restoration, engine bay, ceramic coating) with what's included in each
- **Mobile service area** — customers confirm they're in range before booking
- **Booking** — integrated PocketSuite scheduling; customers book and pay without
  a phone call
- **FAQ** — hover/click accordion covering the questions that used to come in as texts
- **Work showcase** — before/after gallery plus a live Instagram feed so the
  portfolio updates itself when the owner posts

## Built with

Vanilla HTML, CSS, and JavaScript — no framework. Deployed via GitHub Actions to
GitHub Pages (`.github/workflows/deploy-pages.yml`).

The animation work is hand-rolled, no library: hero opacity driven by a scroll
listener, and staggered reveal on the services grid via IntersectionObserver.

## Notes

Background video is served from `background-video/`, images from `pictures/`.
Filenames are lowercase and space-free — GitHub Pages serves from a case-sensitive
filesystem, so assets that resolved fine locally 404'd in production until they
were normalized.
