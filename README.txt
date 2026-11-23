# SAPHYRAEN SMP Community Website

A responsive, dark-purple community website for a Minecraft Bedrock SMP.

## Included
- Home / community landing page
- Bedrock server status lookup (via the public mcsrvstat.us API)
- Manually editable player leaderboard
- Events, news & announcements, and staff sections
- Discord invite link setting
- Browser-based demo admin dashboard
- Responsive mobile navigation

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. Click the gear button in the lower-right corner to open Admin Dashboard.
4. In General, enter the Bedrock server address, port (usually `19132`), and Discord invite URL.
5. Save settings.

The status widget requires an internet connection. Some hosts or browsers may block requests to third-party APIs.

## Free hosting with GitHub Pages
1. Create/sign in to a GitHub account.
2. Create a public repository, e.g. `saphyraen-smp`.
3. Upload `index.html`, `style.css`, and `script.js` to the repository root.
4. Open repository **Settings → Pages**.
5. Under Build and deployment, choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then Save.
7. Wait for the published URL shown in the Pages section.

## Important limitations
- The dashboard is a front-end demo. Its edits are stored in the current browser's `localStorage`, so they do not automatically appear for other visitors or other admins.
- Do not treat the current dashboard as secure admin authentication. Anyone who can access the website can inspect or modify front-end code/data.
- Leaderboards, events, news, and staff are manually entered; they do not automatically sync with your Minecraft server.
- For shared admin editing, real accounts, secure permissions, and automatic in-game statistics, connect a backend/database and a trusted Bedrock server integration.
- Replace the sample player/event/staff content with your real community information.
