# Ancient Tide Studios

Static studio website for **Evolution of the Ancients**, built with HTML, CSS, and vanilla JavaScript. No runtime framework, package dependencies, tracking scripts, or client-side API keys.

## Preview

Requires Node.js 18 or later. No package installation is needed.

```sh
npm run check
npm run build
npm run dev
```

Open http://127.0.0.1:4173. Rebuild and refresh after source changes. `PORT` overrides the preview port.

For a phone on the same Wi-Fi, set `HOST` to the computer's Wi-Fi IPv4 address (from `ipconfig`) before starting the server. In PowerShell: `$env:HOST='192.168.x.x'; $env:PORT='4174'; npm run dev`. Replace the example IP with the computer's actual address, then open `http://<that-address>:4174` on the phone. The default host stays local to the computer.

## Cloudflare Pages + GitHub

In the existing Pages project's build settings:

- Framework preset: **None**
- Build command: **npm run check && npm run build**
- Build output directory: **dist**
- Root directory: repository root

Keep the existing production branch and custom-domain settings. Publishing commits to that branch may trigger a production deployment. Preview locally or use a preview branch before publishing.

The build copies only the explicit files in `scripts/files.mjs`. Original artwork, the unused legacy template, `.work`, and project instructions are excluded. Every published file is checked against the 25 MiB Cloudflare Pages asset limit. Do not select the repository root as the deployment output directory.

Images and fonts are hosted with the website. Videos stay outside `dist`. The owner declined Cloudflare R2 because of usage-based billing; do not activate R2 or upload videos there. Until a replacement video service is selected and verified, the trailer link opens the official Steam page.

## Steam referral tracking

All five Steam links in `index.html` include these static UTM parameters:

| Parameter | Value |
| --- | --- |
| `utm_source` | `ancienttidestudios.com` |
| `utm_medium` | `website` |
| `utm_campaign` | `eota` |
| `utm_content` | `nav_wishlist`, `hero_wishlist`, `game_trailers`, `game_wishlist` or `community_steam` |

In Steamworks, open **Evolution of the Ancients → Marketing & Visibility → UTM Analytics**, then filter by the source above. Steam enables UTM reporting by default; access requires **View Marketing Traffic Data** permission. Use **Test a UTM Link** there to validate a copied destination.

Steam updates visits hourly, attributes eligible conversions within 72 hours and finalises conversions after four days. Consent preferences, login status, switching apps/browsers and minimum reporting thresholds affect coverage. See [Valve's UTM documentation](https://partner.steamgames.com/doc/marketing/utm_analytics).

These links identify website referrals and button placements. They add no scripts, cookies or image-service dependencies to this site. Live-site links change only after deployment; clicking tagged links in a local preview can also register test visits. Local checks validate the URLs, not actual Steamworks reporting.

## Trailer hosting decision

The trailer action opens the official Steam page in both the local preview and production. The website does not load an embedded player or deliver video files. No R2 subscription was activated and no videos were uploaded.

The native-player prototype is preserved locally in `.work/deferred-trailer/`, and the optimised video files remain in `.work/video/`. Neither folder is loaded by the page or included in `dist`; `.work` is ignored by Git. The preview server serves the built site without injecting video configuration or exposing the local video files.

A future video host must avoid open-ended usage charges. Select and verify the provider before uploading, then adapt the archived player work to its supported playback URLs or embed. Services such as YouTube require their official embed, not a watch-page URL in a native video's source. Run the checks and build, then test desktop and mobile playback after any future integration.

Prepared from the owner-provided masters on 20 September 2026:

| Video | Web file size | Format |
| --- | ---: | --- |
| Cinematic | 68,213,346 bytes (65.05 MiB) | 1920 × 1080, 25 fps, 67.24 seconds |
| Gameplay | 48,173,612 bytes (45.94 MiB) | 1920 × 1080, 30 fps, 46.87 seconds |

Both use H.264 High / yuv420p, stereo AAC and fast-start MP4 metadata. The original files are unchanged. Encoding details and verification records are in `.work/video/manifest.json`. The archived prototype was previously checked for local playback, trailer switching and closing at desktop and phone widths; those checks do not validate any future production video host.

## Editing

- Page content, destinations, metadata: `index.html`
- Design tokens and responsive styles: `assets/css/studio.css`
- Mobile navigation, feature disclosures, and accessible gallery: `assets/js/studio.js`
- Optimised production media: `images/game/`
- Deployable file list: `scripts/files.mjs`

Keep the native links and disclosures usable without JavaScript. Feature screenshots sit inside each disclosure below 960px, so the selected description and image stay together without scripting. Test at 390px and 1440px, keyboard navigation, gallery dismissal, and reduced motion when changing interactions.

## Asset provenance and licences

The game screenshots were retrieved from the studio's public Steam listing for app **3606840** on 19 September 2026. They are in-development game imagery, not newly generated artwork. The studio crest and game logo came from this repository. Their rights remain with their respective owners. Optimised WebP derivatives retain the original content.

### Image delivery

On 20 September 2026 the game screenshots were re-encoded directly from the cached Steam JPEG originals, with no changes to composition. Full-size WebP files use quality 78; the 640px and 960px responsive versions use quality 80. The game logo uses quality 87 with 480px and 900px versions made from `images/primary_logo.png`. The original PNGs and cached Steam source files remain unchanged. The studio crest and masthead mark retain their existing sizes and encoding.

The ten existing image files re-encoded in this pass total 1,902,558 bytes, down from 2,564,840 bytes (25.8%). This is a file-size comparison, not a measured page-load time. Responsive variants add files to the deployment, but a visitor's browser chooses one appropriate image per slot, accounting for screen density and the cropped display area. For example, `pack.webp` fell from 620,376 to 429,374 bytes; its 640px and 960px variants are 72,088 and 149,664 bytes.

The hero remains high priority. Lower-page images remain lazy-loaded. Mobile feature disclosures load their inline images without preloading the hidden desktop image; changing to desktop synchronises the selected feature. Gallery thumbnails use responsive versions, while the enlargement links retain the full-size files. `scripts/check.mjs` validates each `srcset` candidate against the deployment manifest. Keep `sizes` in step with any future layout/crop changes.

Local audit material, the before/after comparison and encoding recipe are in `.work/image-optimisation/` and `.work/optimise-images.py`; they are excluded from deployment. This optimisation does not add an image service or change hosting.

Barlow Condensed and Manrope are self-hosted from Google Fonts, with their SIL Open Font Licences included in `assets/fonts/`. Cormorant Garamond from an alternate design is retained with its licence.

The new page, stylesheet, and script were written afresh. Legacy HTML5 UP Dimension assets remain in the repository but are not loaded or deployed by the new build. Their original `LICENSE.txt`, `README.txt`, and source notices are retained.

## Content status

The primary conversion is a Steam wishlist. The site states that the game is in development and coming to Steam, without promising a fixed release date. Verify gameplay claims against current development before publishing future updates. The studio description is proposed brand copy for review. Contact uses the existing public studio email; no form backend or simulated CAPTCHA is used.

The website wording follows the owner-supplied description from 20 September 2026: dinosaurs taking their first steps towards civilisation, growing from hatchling to herd leader, recruiting AI dinosaurs, crafting armour for the herd, nesting and raising young in a persistent multiplayer world. The retrieved Steam page still showed an older description during this update; the owner-supplied wording is the current copy source. Civilisation remains the development vision, not a claim of completed settlement-building systems.
