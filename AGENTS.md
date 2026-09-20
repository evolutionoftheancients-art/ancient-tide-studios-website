# Ancient Tide Studios website

## Website specialist
For website design and implementation, use the `aaa-game-website` skill installed at `C:/Users/joshp/.codex/skills/aaa-game-website/SKILL.md`. A reusable personal agent is defined at `C:/Users/joshp/.codex/agents/aaa_game_website.toml`. If the custom agent is unavailable in the current session, follow the skill directly. This is a website specialist workflow, not a requirement to spawn additional agents.

## Project context
- Studio: Ancient Tide Studios, an independent Australian game studio.
- Game: Evolution of the Ancients.
- Existing site describes multiplayer dinosaur survival with growth, herds, armour, nesting, and legacy. Verify current feature availability before expanding these claims.
- Quality target: professional AAA-style presentation with cinematic game imagery, confident typography, responsive layouts, and polished interactions. Do not describe the studio or game as AAA as a factual production claim.
- Current implementation: a custom static site in `index.html`, `assets/css/studio.css`, and `assets/js/studio.js`. The unused HTML5 UP Dimension source remains in the repository with its licensing notices, but is excluded from the production build.
- Original assets: `images/ancienttidestudios.png`, `images/primary_logo.png`, and `images/bg.jpg`. Optimised derivatives and official Steam imagery live in `images/game/` and the additional WebP files under `images/`. Asset filename case must match exactly on production hosting.
- Steam, Discord, YouTube, TikTok, press kit, and contact destinations are in `index.html`. Preserve them unless an authorized change or verification establishes a replacement.

## Design and delivery
Use the game's prehistoric survival world to guide the visual direction. Prioritize authentic game imagery and a clear Steam action, with community and press access easy to find. Do not invent release dates, platform support, testimonials, gameplay footage, or unconfirmed mechanics.

Keep the current static architecture unless the requested functionality justifies a change. Inspect desktop and mobile previews and verify interactions before claiming completion. Do not treat the existing client-side contact checkbox as real bot protection. Report missing production assets and checks that could not be run. Deployment is a separate action governed by the user's requested scope.

Run `npm run check` and `npm run build`; use `npm run dev` for a local preview. Cloudflare Pages must publish `dist`, which contains only the allowlisted files from `scripts/files.mjs`. Keep every individual deployed file below 25 MiB. The contact section uses a direct email link. The owner declined R2 due to usage-based billing: do not activate R2 or upload videos there. Trailer links open the official Steam page in local previews and production. No embedded player or large video files are loaded or deployed. The native-player prototype is preserved locally in `.work/deferred-trailer/` and optimised videos in `.work/video/` for a future selected hosting service that avoids open-ended usage charges. The preview server serves `dist` without video injection or local media routes. See `README.md` for deployment settings and asset provenance.
