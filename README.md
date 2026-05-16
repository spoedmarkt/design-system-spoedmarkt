# Spoedmarkt Design System

Soft Pro design tokens, token audit, and component library for the
SpoedMarktplaats mobile app.

## Pages

| File                       | What it is                                          |
| -------------------------- | --------------------------------------------------- |
| `index.html`               | Landing page with links to the three pages         |
| `component-library.html`   | Base + signature components, light + dark           |
| `audit.html`               | Archaeological token audit of the mobile codebase   |
| `tokens.html`              | The full `tokens.ts` source, syntax-highlighted     |

## Deployment

This repo is a static site — no build step. Vercel auto-detects and serves
the HTML files directly. The deployed URL has:

- `/`                        → `index.html`
- `/component-library.html`  → full showcase
- `/audit.html`              → token audit

## Local preview

```bash
# any static server works
python3 -m http.server 4000
# → http://localhost:4000
```
