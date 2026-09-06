# GitHub Wrapped 🎉

A "Spotify Wrapped"-style recap for any public GitHub profile. Type in a username, swipe through an animated story of your stats, and get roasted with a joke "developer archetype" you can download as a shareable card.

![Intro slide](docs/screenshot-intro.png)

## Live demo

Deployed via GitHub Pages on every push to `main` — see the repo's **About** section for the link (or run it locally, see below).

## Why this exists

Portfolios are full of to-do apps and CRUD demos. This one is meant to be fun to actually use: it calls the public GitHub REST API straight from the browser, crunches your public stats into something shareable, and renders it as an Instagram-Stories-style card carousel — tap the right half to advance, the left half to go back.

## Features

- 🔍 **Any public GitHub username** — no login, no backend, no API key. Just the public GitHub REST API called client-side.
- 📖 **Story-style carousel** — Instagram-Stories-like navigation (tap/click sides, arrow keys), animated with Framer Motion, with a segmented progress bar.
- 🎭 **"Developer archetype" engine** — a rules-based personality generator (`src/utils/archetype.js`) that reads your top language, star count, follower ratio, account age, and fork behavior to assign you a joke title like *"The Notebook Wizard 🧙"* or *"Frontend Chaos Goblin 🧌"*.
- 📊 **Real stats** — account age, repo/star counts, top languages (with animated bars), your most-starred repo, and follower ratio commentary.
- 🎉 **Confetti + downloadable card** — the final slide fires confetti and lets you export your archetype card as a PNG (via `html-to-image`) to share.

## Tech stack

React 19 · Vite · Framer Motion · `html-to-image` · `canvas-confetti` · the public GitHub REST API

## Screenshots

| Language DNA | Your archetype |
|---|---|
| ![Languages slide](docs/screenshot-languages.png) | ![Archetype slide](docs/screenshot-archetype.png) |

## Project structure

```
src/
├── api/github.js         # fetches user + repos from api.github.com, derives stats
├── utils/archetype.js     # rules-based "developer personality" engine
├── utils/format.js
├── components/
│   ├── UsernameForm.jsx   # landing page / input
│   ├── StoryViewer.jsx     # carousel logic, keyboard nav, image export
│   └── ProgressBar.jsx
└── slides/                 # one component per story slide + gradient backgrounds
```

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL and type any public GitHub username (e.g. `torvalds`, `gaearon`, or your own).

### Build & deploy

```bash
npm run build
```

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes `dist/` to GitHub Pages. If you fork this, enable **Pages → GitHub Actions** as the source in the repo settings.

## Notes & limitations

- Calls are unauthenticated, so they're subject to GitHub's public rate limit (60 requests/hour per IP). That's plenty for personal/demo use but not for heavy traffic.
- The "archetype" is a rules-based joke, not a real personality assessment — don't take it too personally if it calls you a Chaos Goblin.

## License

MIT
