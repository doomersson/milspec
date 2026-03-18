// ==UserScript==
// @name         Tanki Ratings — MILSPEC Tactical Theme
// @namespace    github.com/doomersson/milspec/
// @version      1.1.3
// @description  Dark military-industrial tactical UI for ratings.tankionline.com. Gunmetal blacks, olive drab, threat-orange accents, hard geometry.
// @author       Borz
// @icon         https://raw.githubusercontent.com/doomersson/milspec/refs/heads/main/milspecicon.png
// @match        https://ratings.tankionline.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // ── CONFIG ──────────────────────────────────────────────────────────────
    // Default accent color: #d2781e  (threat-orange)
    // Default font pack:    "tech"   (Share Tech Mono + Rajdhani + Oswald)
    // Asset swaps (XT):     enabled
    // Change these to customise without touching the rest of the script.
    const ACC       = '#d2781e';           // accent hex
    const ACC_RGB   = '210, 120, 30';      // RGB components of ACC for rgba()
    const FONT_PACK = 'mono';              // 'tech' | 'mono'
    const XT        = true;               // enable tank/gun skin swaps
    // ── FONT IMPORT ─────────────────────────────────────────────────────────
    function injectFonts() {
        const link = document.createElement('link');
        link.rel  = 'stylesheet';
        if (FONT_PACK === 'mono') {
            link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Fira+Code:wght@300;400;500;600&display=swap';
        } else {
            link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap';
        }
        document.head.appendChild(link);
    }
    // ── CSS BUILDER ─────────────────────────────────────────────────────────
    // Resolves all Stylus-preprocessor syntax:
    //   rgba(acc, X)  → rgba(ACC_RGB, X)
    //   acc           → ACC
    //   hwb(acc …)    → hwb(…) with literal value
    function buildCSS() {
        const fontFamilyMono = '"JetBrains Mono", "Fira Code", "Courier New", monospace';
        const fontFamilyTech = '"Share Tech Mono", "Rajdhani", "Oswald", sans-serif';
        const fontFamily = FONT_PACK === 'mono' ? fontFamilyMono : fontFamilyTech;

        return `
/* ============================================================
   RESET & ROOT — Bunker atmosphere
   ============================================================ */
*, *::before, *::after { box-sizing: border-box; }

body, body.fonts-ready {
    font-family: ${fontFamily};
}
input[type=search] {
    font-family: ${fontFamily};
}

html, body {
    background-color: #050804 !important;
    color: #c8cfc0 !important;
    scrollbar-color: rgba(${ACC_RGB}, 0.35) rgba(10, 14, 10, 0.8);
    scrollbar-width: thin;
}
html {
    filter: brightness(110%);
}

/* Kill parallax background */
.parallax {
    background: #0d1009 !important;
    background-image: none !important;
}

/* ============================================================
   NAVBAR — Command deck strip
   ============================================================ */
.navbar {
    background: rgba(6, 9, 5, 0.98) !important;
    border-bottom: 1px solid rgba(${ACC_RGB}, 0.3) !important;
    box-shadow: 0 2px 16px rgba(0,0,0,0.8) !important;
    backdrop-filter: blur(4px);
    position: sticky !important;
    top: 0;
    z-index: 100;
}

.portal-navigation__link {
    color: #8a9a7a !important;
    text-transform: uppercase !important;
    font-size: 0.75rem !important;
    letter-spacing: 0.12em !important;
    transition: color 0.15s ease, border-color 0.15s ease !important;
    border-bottom: 2px solid transparent !important;
    padding-bottom: 2px !important;
}
.portal-navigation__link:hover {
    color: #c8cfc0 !important;
    border-bottom-color: rgba(${ACC_RGB}, 0.5) !important;
}
.portal-navigation__link.active {
    color: ${ACC} !important;
    border-bottom-color: ${ACC} !important;
}
/*Font*/
.portal-navigation__link {
    font-size: 1.6em;
}

/* Nav icons */
.portal-navigation__icon {
    filter: grayscale(0.7) brightness(0.7) !important;
    transition: filter 0.15s ease !important;
}
.portal-navigation__link:hover .portal-navigation__icon,
.portal-navigation__link.active .portal-navigation__icon {
    filter: grayscale(0) brightness(1) !important;
}

/* ============================================================
   SITE LOGO
   ============================================================ */
.site-logo { display: none; }

.site-logo a img {
    filter: brightness(0.75) saturate(0.6) !important;
    transition: filter 0.2s ease !important;
}
.site-logo a:hover img {
    filter: brightness(1) saturate(0.85) !important;
}

/* ============================================================
   CONTENT WRAPPER
   ============================================================ */
.content {
    position: relative;
    padding-bottom: 0.5em;
}

/* Tactical grid overlay */
.content::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
        linear-gradient(rgba(${ACC_RGB}, 0.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(${ACC_RGB}, 0.025) 1px, transparent 1px);
    background-size: 64px 64px;
    z-index: 0;
}

/* ============================================================
   GENERIC BOX — Armored panel
   ============================================================ */
.generic-box {
    background-color: rgba(12, 18, 10, 0.97) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.2) !important;
    box-shadow:
        0 4px 24px rgba(0,0,0,0.7),
        inset 0 1px 0 rgba(210,120,30,0.08) !important;
    transition: border-color 0.15s, box-shadow 0.15s !important;
    border-radius: 0 10px 0 10px / 0 10px 0 10px;
}
.generic-box:hover {
    border-color: rgba(${ACC_RGB}, 0.35) !important;
}

/* ============================================================
   SEARCH PANEL — Intel query terminal
   ============================================================ */
.search-panel__label {
    color: #6a7560 !important;
    text-transform: uppercase !important;
    font-size: 0.7rem !important;
    letter-spacing: 0.15em !important;
}
.generic-input {
    background: rgba(0,0,0,.65);
    border-radius: 0;
    padding: .6rem 1rem;
}
.generic-input,
.search-panel__input {
    background-color: rgba(5, 8, 4, 0.95) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.25) !important;
    color: #c8cfc0 !important;
    transition: border-color 0.15s, box-shadow 0.15s !important;
    box-shadow: none !important;
}
.generic-input:focus,
.search-panel__input:focus {
    border-color: rgba(${ACC_RGB}, 0.7) !important;
    box-shadow: 0 0 8px rgba(${ACC_RGB}, 0.2) !important;
    outline: none !important;
}
.generic-input::placeholder,
.search-panel__input::placeholder {
    color: #4a5340 !important;
    text-transform: uppercase;
    font-size: 0.8rem;
    letter-spacing: 0.08em;
}

/* Search / generic button */
.generic-button,
.search-panel__button-search {
    background: rgba(${ACC_RGB}, 0.15) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.5) !important;
    color: ${ACC} !important;
    text-transform: uppercase !important;
    letter-spacing: 0.12em !important;
    font-size: 0.8rem !important;
    border-radius: 0 !important;
    clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
    transition: background 0.15s, border-color 0.15s, box-shadow 0.15s !important;
    box-shadow: none !important;
}
.generic-button:hover,
.search-panel__button-search:hover {
    background: rgba(${ACC_RGB}, 0.28) !important;
    border-color: rgba(${ACC_RGB}, 0.8) !important;
    box-shadow: 0 0 12px rgba(${ACC_RGB}, 0.2) !important;
}
.generic-button:active,
.search-panel__button-search:active {
    background: rgba(${ACC_RGB}, 0.4) !important;
}

/* ============================================================
   GENERIC HEADER — Section callsign
   ============================================================ */
.generic-header {
    color: ${ACC} !important;
    text-transform: uppercase !important;
    letter-spacing: 0.15em !important;
    font-size: 0.75rem !important;
    border-bottom: 1px solid rgba(${ACC_RGB}, 0.3) !important;
    padding-bottom: 0.4em !important;
    margin-bottom: 0.3em !important;
}

/* ============================================================
   LEADERBOARD — Tactical kill-board
   ============================================================ */
.leaderboard {
    background: rgba(10, 14, 8, 0.98) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.18) !important;
}
.leaderboard__head {
    background: rgba(8, 11, 6, 1) !important;
    border-bottom: 1px solid rgba(${ACC_RGB}, 0.3) !important;
}
.leaderboard__title {
    color: #c8cfc0 !important;
    font-size: 0.85rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
}
.leaderboard__timer {
    color: #6a7560 !important;
    font-size: 0.7rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
}
.leaderboard__timer-values {
    color: ${ACC} !important;
    font-size: 0.9rem !important;
    letter-spacing: 0.08em !important;
}
.leaderboard__list { list-style: none !important; }
.leaderboard__entry {
    border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
    transition: background 0.1s !important;
}
.leaderboard__entry:hover {
    background: rgba(${ACC_RGB}, 0.07) !important;
}

/* Top 3 rank indicators */
.leaderboard__entry:nth-child(1) .leaderboard__entry-index {
    color: #d4a017 !important;
    font-weight: 700 !important;
    text-shadow: 0 0 8px rgba(212, 160, 23, 0.5) !important;
}
.leaderboard__entry:nth-child(2) .leaderboard__entry-index {
    color: #8fa8b0 !important;
    font-weight: 700 !important;
    text-shadow: 0 0 6px rgba(143, 168, 176, 0.4) !important;
}
.leaderboard__entry:nth-child(3) .leaderboard__entry-index {
    color: #a06030 !important;
    font-weight: 700 !important;
}
.leaderboard__entry-index {
    color: #4a5340 !important;
    font-size: 0.72rem !important;
    letter-spacing: 0.04em !important;
    min-width: 2em !important;
    font-variant-numeric: tabular-nums !important;
}
.leaderboard__entry-link {
    color: #dcdcdc !important;
    text-decoration: none !important;
    font-size: 0.85rem !important;
    letter-spacing: 0.02em !important;
    transition: color 0.12s !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 0.4em !important;
}
.leaderboard__entry-link:hover { color: ${ACC} !important; }

/* Score number */
.formatted-number {
    color: ${ACC} !important;
    font-variant-numeric: tabular-nums !important;
    letter-spacing: 0.05em !important;
    font-size: 0.88rem !important;
}

.generic-entry__spacer {
    border-bottom: 1px dashed rgba(${ACC_RGB}, 0.15) !important;
    margin: 0 0.5em !important;
}
.generic-entry__text-label { color: #b0bca8 !important; }

/* ============================================================
   LANG / GENERIC SELECTOR — Dropdown panels
   ============================================================ */
.generic-selector__itself,
.lang-selector__itself,
.my-favorites__itself {
    background: rgba(8, 12, 6, 0.9) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.2) !important;
    color: #8a9a7a !important;
    border-radius: 0 !important;
    transition: border-color 0.15s !important;
}
.generic-selector__itself:hover,
.lang-selector__itself:hover,
.my-favorites__itself:hover {
    border-color: rgba(${ACC_RGB}, 0.5) !important;
    color: #c8cfc0 !important;
}
.lang-selector__list,
.my-favorites__list {
    background: rgba(6, 9, 5, 0.99) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.3) !important;
    border-radius: 0 !important;
    box-shadow: 4px 4px 20px rgba(0,0,0,0.9) !important;
}
.lang-selector__list-item:hover,
.my-favorites__list-item:hover,
.my-favorites__item-link:hover {
    background: rgba(${ACC_RGB}, 0.12) !important;
    color: ${ACC} !important;
}

/* ============================================================
   USER PROFILE — Intel dossier page
   ============================================================ */
.user-info-panel {
    background: rgba(10, 14, 8, 0.98) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.2) !important;
    box-shadow: 0 4px 28px rgba(0,0,0,0.8) !important;
}
.user-info-panel__head {
    border-bottom: 1px solid rgba(${ACC_RGB}, 0.25) !important;
    background: rgba(6, 9, 5, 0.98) !important;
}
.user-info-panel__rankname {
    color: ${ACC} !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
}
.user-info-panel__link {
    color: ${ACC} !important;
    letter-spacing: 0.08em !important;
}
.stats-panel__foot {
    background: rgba(8, 11, 6, 0.95) !important;
    border-top: 1px solid rgba(${ACC_RGB}, 0.18) !important;
}
.current-stats { background: rgba(10, 14, 8, 0.95) !important; }
.current-stats__title {
    color: #6a7560 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.12em !important;
    font-size: 0.7rem !important;
    border-bottom: 1px solid rgba(${ACC_RGB}, 0.15) !important;
    padding-bottom: 0.3em !important;
}
.current-stats__entry {
    border-bottom: 1px solid rgba(255, 255, 255, 0.035) !important;
    transition: background 0.1s !important;
}
.current-stats__entry:hover { background: rgba(${ACC_RGB}, 0.06) !important; }

/* Ratings table */
.ratings-panel {
    background: rgba(10, 14, 8, 0.97) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.18) !important;
}
.current-ratings__table { border-collapse: collapse !important; }
.current-ratings__table th {
    color: #6a7560 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    font-size: 0.7rem !important;
    border-bottom: 1px solid rgba(${ACC_RGB}, 0.25) !important;
    background: rgba(6, 9, 5, 0.98) !important;
}
.current-ratings__table td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.035) !important;
    color: #b0bca8 !important;
}
.current-ratings__table tr:hover td { background: rgba(${ACC_RGB}, 0.06) !important; }
.current-ratings__diff_positive { color: #6a9a4a !important; }
.current-ratings__diff_negative { color: #c04040 !important; }

/* Progress bar */
.progress-bar {
    background: rgba(6, 9, 5, 0.9) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.2) !important;
}
.progress-bar__bar {
    background: linear-gradient(90deg, rgba(${ACC_RGB}, 0.8), rgba(${ACC_RGB}, 0.4)) !important;
    box-shadow: 0 0 8px rgba(${ACC_RGB}, 0.3) !important;
    border-radius: 3px;
}
.progress-bar__values {
    top: 0.5em;
    width: unset;
    color: #8a9a7a !important;
    font-size: 0.72rem !important;
    letter-spacing: 0.05em !important;
}

/* Gearscore */
.gearscore__title {
    color: #6a7560 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    font-size: 0.7rem !important;
}
.gearscore__value {
    color: ${ACC} !important;
    font-size: 1.1rem !important;
    letter-spacing: 0.05em !important;
}

/* ============================================================
   ACHIEVEMENTS — Commendation board
   ============================================================ */
.user-achievements { background: rgba(10, 14, 8, 0.95) !important; }
.user-achievements__link-back {
    color: #8a9a7a !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    font-size: 0.75rem !important;
    border-bottom: 1px solid rgba(${ACC_RGB}, 0.2) !important;
    padding-bottom: 0.2em !important;
    transition: color 0.15s, border-color 0.15s !important;
}
.user-achievements__link-back:hover {
    color: ${ACC} !important;
    border-bottom-color: rgba(${ACC_RGB}, 0.6) !important;
}
.achievements-item {
    background: rgba(8, 12, 6, 0.95) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.12) !important;
    transition: border-color 0.15s, box-shadow 0.15s !important;
}
.achievements-item:hover {
    border-color: rgba(${ACC_RGB}, 0.4) !important;
    box-shadow: 0 0 12px rgba(${ACC_RGB}, 0.15) !important;
}
.achievements-item__overlay { background: rgba(5, 8, 4, 0.7) !important; }
.achievements-item__overlay_darkened { background: rgba(5, 8, 4, 0.85) !important; }
.achievements-item__texts_bleached { opacity: 0.35 !important; }
.achievements-item__title {
    color: #b0bca8 !important;
    font-size: 0.7rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
}
.stats-panel__achievements-icon {
    filter: grayscale(0.6) brightness(0.7) !important;
    transition: filter 0.15s !important;
}
.stats-panel__achievements-icon:hover {
    filter: grayscale(0) brightness(1) !important;
}

/* ============================================================
   PROFILE ENTITY CARDS — Equipment loadout
   ============================================================ */
.profile-entity-card {
    background: rgba(8, 12, 6, 0.97) !important;
    border: 1px solid rgba(${ACC_RGB}, 0.15) !important;
    transition: border-color 0.15s, box-shadow 0.15s !important;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
}
.profile-entity-card:hover {
    border-color: rgba(${ACC_RGB}, 0.4) !important;
    box-shadow: 0 0 16px rgba(${ACC_RGB}, 0.12) !important;
}
.profile-entity-image { background: rgba(5, 8, 4, 0.8) !important; }

/* ============================================================
   ERROR / NOTIFICATION BOX
   ============================================================ */
.error-box {
    background: rgba(80, 10, 10, 0.2) !important;
    border: 1px solid rgba(200, 50, 50, 0.4) !important;
    color: #c07070 !important;
    clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%);
}
.error-box__retry-now {
    color: ${ACC} !important;
    text-decoration: underline;
    cursor: pointer;
}

/* ============================================================
   FAVORITE TOGGLER
   ============================================================ */
.favorite-toggler {
    background-image: unset;
    background-color: rgba(255, 255, 255, .45);
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%3Cpath%20d%3D%22M9.00001%200H7.00001L5.51292%204.57681L0.700554%204.57682L0.0825195%206.47893L3.97581%209.30756L2.48873%2013.8843L4.10677%2015.0599L8.00002%2012.2313L11.8933%2015.0599L13.5113%2013.8843L12.0242%209.30754L15.9175%206.47892L15.2994%204.57681L10.4871%204.57681L9.00001%200Z%22%20fill%3D%22%23000000%22%2F%3E%0A%3C%2Fsvg%3E");
    filter: contrast(0.5) saturate(3);
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
}
.favorite-toggler:hover { filter: grayscale(0) brightness(1) !important; }
.favorite-toggler_is-favorite {
    background: unset;
    background-color: gold;
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%3Cpath%20d%3D%22M9.00001%200H7.00001L5.51292%204.57681L0.700554%204.57682L0.0825195%206.47893L3.97581%209.30756L2.48873%2013.8843L4.10677%2015.0599L8.00002%2012.2313L11.8933%2015.0599L13.5113%2013.8843L12.0242%209.30754L15.9175%206.47892L15.2994%204.57681L10.4871%204.57681L9.00001%200Z%22%20fill%3D%22%23000000%22%2F%3E%0A%3C%2Fsvg%3E");
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
}

/* ============================================================
   RANK ICONS
   ============================================================ */
.rank-icon-small {
    filter: saturate(0.5) brightness(0.8) !important;
    transition: filter 0.12s !important;
}
.leaderboard__entry:hover .rank-icon-small {
    filter: saturate(1) brightness(1) !important;
}

/* ============================================================
   SPINNER
   ============================================================ */
.spinner {
    animation-duration: 1.4s;
    border: 0.5em solid;
    border-color: rgba(${ACC_RGB}, 0.4) rgba(${ACC_RGB}, 0.4) rgba(${ACC_RGB}, 0.4) rgba(${ACC_RGB}, 1) !important;
    border-top-color: ${ACC} !important;
}

/* ============================================================
   SCROLLBARS — Tactical trim
   ============================================================ */
::-webkit-scrollbar { width: 5px; height: 5px; background: rgba(6, 9, 5, 0.8); }
::-webkit-scrollbar-thumb { background: rgba(${ACC_RGB}, 0.35); border-radius: 0; }
::-webkit-scrollbar-thumb:hover { background: rgba(${ACC_RGB}, 0.6); }
::-webkit-scrollbar-track { background: rgba(6, 9, 5, 0.9); }

/* ============================================================
   SELECTION — Target lock highlight
   ============================================================ */
::selection {
    background: rgba(${ACC_RGB}, 0.4) !important;
    color: #0a0e0a !important;
}

/* ============================================================
   SCANLINE TEXTURE — CRT operations room overlay
   ============================================================ */
body::after {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.06) 2px,
        rgba(0, 0, 0, 0.06) 4px
    );
}

/* ============================================================
   ICON TICK — Completed indicator
   ============================================================ */
.icon-tick {
    background-image: unset;
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%3Cpath%20d%3D%22M9%2019.5L0%2010.5H4.5L9%2015L19.5%204.5H24L9%2019.5Z%22%20fill%3D%22%2376FF33%22%2F%3E%0A%3C%2Fsvg%3E");
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
}

/* ============================================================
   FORM ELEMENT BASE
   ============================================================ */
.form-element {
    background-color: rgba(5, 8, 4, 0.95) !important;
    border-color: rgba(${ACC_RGB}, 0.25) !important;
    color: #c8cfc0 !important;
    border-radius: 0 8px 0 8px / 0 8px 0 8px;
    box-shadow: none !important;
}
.form-element:focus,
.form-element:active {
    border-color: rgba(${ACC_RGB}, 0.7) !important;
    box-shadow: 0 0 6px rgba(${ACC_RGB}, 0.2) !important;
}

/* ============================================================
   MY FAVORITES ICONS
   ============================================================ */
.my-favorites__icon-favorite {
    background: unset;
    background-color: rgba(${ACC_RGB}, 0.6);
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%3Cpath%20d%3D%22M9.00001%200H7.00001L5.51292%204.57681L0.700554%204.57682L0.0825195%206.47893L3.97581%209.30756L2.48873%2013.8843L4.10677%2015.0599L8.00002%2012.2313L11.8933%2015.0599L13.5113%2013.8843L12.0242%209.30754L15.9175%206.47892L15.2994%204.57681L10.4871%204.57681L9.00001%200Z%22%20fill%3D%22%23000000%22%2F%3E%0A%3C%2Fsvg%3E");
    mask-position: center;
    mask-repeat: no-repeat;
    mask-size: contain;
}
.my-favorites__button-delete {
    background: url(https://tankionline.com/play/static/images/close.fabb8b86.svg);
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
}

/* ============================================================
   STATS PANEL ACHIEVEMENTS ICON — custom medal SVG
   ============================================================ */
.stats-panel__achievements-icon {
    background: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2062%22%20width%3D%2280%22%20height%3D%2262%22%3E%3C!--%20Ribbon%20bar%20--%3E%3Crect%20x%3D%2220%22%20y%3D%220%22%20width%3D%2240%22%20height%3D%2214%22%20fill%3D%22%231a2510%22%2F%3E%3Crect%20x%3D%2220%22%20y%3D%220%22%20width%3D%228%22%20height%3D%2214%22%20fill%3D%22%232a3a18%22%2F%3E%3Crect%20x%3D%2228%22%20y%3D%220%22%20width%3D%224%22%20height%3D%2214%22%20fill%3D%22%23d2781e%22%20fill-opacity%3D%220.7%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%220%22%20width%3D%224%22%20height%3D%2214%22%20fill%3D%22%23d2781e%22%20fill-opacity%3D%220.7%22%2F%3E%3Crect%20x%3D%2252%22%20y%3D%220%22%20width%3D%228%22%20height%3D%2214%22%20fill%3D%22%232a3a18%22%2F%3E%3C!--%20Ribbon%20border%20--%3E%3Crect%20x%3D%2220%22%20y%3D%220%22%20width%3D%2240%22%20height%3D%2214%22%20fill%3D%22none%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%220.75%22%20stroke-opacity%3D%220.5%22%2F%3E%3C!--%20Suspension%20bar%20--%3E%3Crect%20x%3D%2216%22%20y%3D%2213%22%20width%3D%2248%22%20height%3D%225%22%20rx%3D%220%22%20fill%3D%22%231e2a14%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%220.75%22%20stroke-opacity%3D%220.6%22%2F%3E%3C!--%20Suspension%20ring%20--%3E%3Crect%20x%3D%2237%22%20y%3D%2217%22%20width%3D%226%22%20height%3D%228%22%20fill%3D%22%231a2510%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%220.75%22%20stroke-opacity%3D%220.5%22%2F%3E%3C!--%20Medal%20body%20--%3E%3Cpolygon%20points%3D%2240%2C24%2054%2C28%2060%2C40%2056%2C54%2040%2C60%2024%2C54%2020%2C40%2026%2C28%22%20fill%3D%22%230f1a0a%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%221.5%22%2F%3E%3C!--%20Inner%20ring%20--%3E%3Cpolygon%20points%3D%2240%2C27%2052%2C30.5%2057%2C40%2053.5%2C51%2040%2C55%2026.5%2C51%2023%2C40%2028%2C30.5%22%20fill%3D%22none%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%220.5%22%20stroke-opacity%3D%220.4%22%2F%3E%3C!--%20Crossed%20rifles%20--%3E%3Cline%20x1%3D%2228%22%20y1%3D%2234%22%20x2%3D%2252%22%20y2%3D%2246%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2252%22%20y1%3D%2234%22%20x2%3D%2228%22%20y2%3D%2246%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%221.8%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2228%22%20y1%3D%2234%22%20x2%3D%2225%22%20y2%3D%2231%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2252%22%20y1%3D%2234%22%20x2%3D%2255%22%20y2%3D%2231%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%222.5%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2228%22%20y1%3D%2246%22%20x2%3D%2225%22%20y2%3D%2249%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%2F%3E%3Cline%20x1%3D%2252%22%20y1%3D%2246%22%20x2%3D%2255%22%20y2%3D%2249%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%221%22%20stroke-linecap%3D%22round%22%2F%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%223.5%22%20fill%3D%22%230f1a0a%22%20stroke%3D%22%23d2781e%22%20stroke-width%3D%221%22%2F%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%221.5%22%20fill%3D%22%23d2781e%22%20fill-opacity%3D%220.6%22%2F%3E%3Crect%20x%3D%2237.5%22%20y%3D%2225.5%22%20width%3D%225%22%20height%3D%221%22%20fill%3D%22%23d2781e%22%20fill-opacity%3D%220.5%22%2F%3E%3Crect%20x%3D%2237.5%22%20y%3D%2255.5%22%20width%3D%225%22%20height%3D%221%22%20fill%3D%22%23d2781e%22%20fill-opacity%3D%220.5%22%2F%3E%3Crect%20x%3D%2221%22%20y%3D%2238.5%22%20width%3D%221%22%20height%3D%223%22%20fill%3D%22%23d2781e%22%20fill-opacity%3D%220.5%22%2F%3E%3Crect%20x%3D%2258%22%20y%3D%2238.5%22%20width%3D%221%22%20height%3D%223%22%20fill%3D%22%23d2781e%22%20fill-opacity%3D%220.5%22%2F%3E%3C%2Fsvg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
}

/* ============================================================
   ARROW BUTTON
   ============================================================ */
.arrow-button {
    display: block;
    width: 52px;
    height: 68px;
    cursor: pointer;
    background-image: unset;
    background-color: ${ACC};
    mask: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2228%22%20height%3D%2232%22%20viewBox%3D%220%200%2028%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%2024L8%2016L0%208V0L16%2016L0%2032V24Z%22%20fill%3D%22%23001926%22%2F%3E%0A%3Cpath%20d%3D%22M12%2032V24L20%2016L12%208V0L28%2016L12%2032Z%22%20fill%3D%22%23001926%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    -webkit-transform: rotateY(180deg) !important;
    transform: rotate(180deg);
    mask-repeat: no-repeat;
    mask-position: center;
    transition: 0.3s;
    filter: brightness(0.7);
}
.arrow-button_inverted {
    transition: 0.3s;
    -webkit-transform: rotateY(0deg) !important;
    transform: rotate(0deg);
}
.arrow-button:hover {
    background-position: center;
    filter: brightness(1.2) drop-shadow(0px 0px 6px rgba(${ACC_RGB}, 0.6));
    transition: 0.2s ease-in;
}
.arrow-button_disabled {
    filter: brightness(0.25) !important;
    opacity: 0.4 !important;
    cursor: not-allowed !important;
}

/* ============================================================
   NAV ICONS — Custom SVG masks
   ============================================================ */
.portal-navigation__icon_game,
.portal-navigation__icon_media,
.portal-navigation__icon_esports,
.portal-navigation__icon_forum,
.portal-navigation__icon_wiki,
.portal-navigation__icon_ratings {
    background-image: unset;
    background-color: white;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
}
.portal-navigation__icon_game {
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22256%22%20height%3D%22248%22%20viewBox%3D%220%200%20256%20248%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%09%3Cpath%20d%3D%22M189.387%2037.2267L151.677%20112.647L141.438%20106.248L163.434%2018.2646L189.387%2037.2267Z%22%20fill%3D%22white%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22M152.48%20127.3C153.465%20127.915%20154.368%20128.628%20155.18%20129.422C156.418%20130.631%20157.445%20132.027%20158.228%20133.55C159.248%20135.533%20159.856%20137.732%20159.977%20140.014C159.992%20140.298%20160%20140.582%20160%20140.868V148.133C159.988%20149.908%20158.117%20151.058%20156.527%20150.262L112.001%20128.001L111.999%20115.999C111.999%20113.822%20113.738%20112.052%20115.902%20112H123.411C126.41%20112%20129.348%20112.843%20131.891%20114.432L152.48%20127.3Z%22%0A%09%09fill%3D%22white%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22M81.3518%20112.676L93.3088%20104.704C97.9085%20101.637%20103.313%20100%20108.842%20100H123.411C126.985%20100%20130.51%20100.684%20133.8%20101.999L143.594%204.06108C132.782%20-1.98301%20119.317%20-1.28056%20109.122%206.16845L13.2415%2076.2222C1.98472%2084.4468%20-2.72557%2099.0252%201.57413%20112.333L38.1972%20225.682C42.4969%20238.99%2054.8286%20248%2068.7427%20248H187.257C201.171%20248%20213.503%20238.99%20217.803%20225.682L246.611%20136.522L184%20140L254.323%20112.652L254.426%20112.333C257.621%20102.444%20255.841%2091.8535%20250.096%2083.6898L170.922%20133.173C171.629%20135.644%20172%20138.231%20172%20140.868V148H175.072C177.514%20148%20179.923%20148.559%20182.115%20149.633L201.476%20159.124C213.977%20165.252%20220.077%20179.633%20215.794%20192.88L207.224%20219.384C204.022%20229.289%20194.798%20236%20184.388%20236H162.898C159.541%20236%20156.21%20235.396%20153.066%20234.217L125.824%20224H114.486C109.366%20231.351%20100.874%20236%2091.505%20236H68.7034C60.0255%20236%2052.3377%20230.404%2049.6711%20222.146L34.4584%20175.035C31.9859%20167.378%2035.5842%20159.076%2042.8625%20155.646L67.9999%20143.797V128L18.3238%20105.073C16.9072%20104.419%2016%20103.001%2016%20101.441V90.4721C16%2088.957%2016.856%2087.572%2018.2111%2086.8944L22.2111%2084.8944C23.3373%2084.3314%2024.6627%2084.3314%2025.7889%2084.8944L81.3518%20112.676Z%22%0A%09%09fill%3D%22white%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22M80%20144L80.0022%20147.147C80.0026%20147.762%2080.3548%20148.322%2080.9085%20148.588L82.7203%20149.46C85.8637%20150.972%2087.6647%20154.347%2087.1714%20157.8L80.7543%20202.72C80.2647%20206.147%2078.6766%20209.323%2076.2284%20211.771L66.0476%20221.951C65.5925%20222.407%2065.6054%20223.056%2065.921%20223.501C66.794%20223.825%2067.7332%20224%2068.7034%20224H91.505C93.8921%20224%2096.1797%20223.472%2098.2412%20222.514C102.52%20220.526%20105.825%20216.688%20107.027%20211.881L116.642%20173.431C118.512%20165.705%20114.424%20157.769%20107.033%20154.812L80%20144Z%22%0A%09%09fill%3D%22white%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22M168.064%20224H184.388C189.593%20224%20194.205%20220.644%20195.806%20215.692L204.376%20189.188C206.823%20181.619%20203.338%20173.401%20196.194%20169.899L176.833%20160.408C176.566%20160.278%20176.287%20160.177%20176%20160.109V163.01C176%20163.616%20176.342%20164.17%20176.884%20164.441L177.794%20164.896C181.355%20166.677%20183.065%20170.804%20181.806%20174.581L168.597%20214.207C168.204%20215.386%20167.543%20216.456%20166.665%20217.334L162.049%20221.951C161.293%20222.706%20161.828%20223.999%20162.897%20223.999H168L168.064%20224Z%22%0A%09%09fill%3D%22white%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22M163.158%20120.447C164.781%20121.97%20166.207%20123.672%20167.414%20125.513L232.398%2068.6521L218.333%2058.3758L163.158%20120.447Z%22%0A%09%09fill%3D%22white%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22M128%20160L160.732%20173.093C164.772%20174.708%20166.779%20179.256%20165.252%20183.329L157.947%20202.809C156.776%20205.931%20153.791%20208%20150.456%20208H120L128%20176C129.314%20170.747%20129.314%20165.252%20128%20160Z%22%0A%09%09fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    mask-position: center; mask-repeat: no-repeat; mask-size: contain;
}
.portal-navigation__icon_media {
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%0A%09%09%20%20d%3D%22M12%200H20L24%204H30L32%206V26L30%2028H2L0%2026V6L2%204H8L12%200ZM16%2010L10%2016L16%2022L22%2016L16%2010Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    mask-position: center; mask-repeat: no-repeat; mask-size: contain;
}
.portal-navigation__icon_esports {
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2296%22%20height%3D%2296%22%20viewBox%3D%220%200%2096%2096%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%0A%09%09%20%20d%3D%22M18.0001%2030L30%2041.9999L65.9999%200H95.9999L96%2030L53.9999%2065.9998L65.9999%2077.9998L59.9999%2083.9999L12%2036L18.0001%2030ZM49.7447%2061.7447L90%2027.2403V5.99999L41.9999%2053.9999L49.7447%2061.7447Z%22%0A%09%09%20%20fill%3D%22white%22%2F%3E%0A%09%3Cpath%0A%09%09d%3D%22M23.9998%2059.9999L35.9998%2071.9999L24.0001%2083.9997V89.9998L18%2095.9998L0%2077.9998L5.99999%2071.9997H12.0001L23.9998%2059.9999Z%22%0A%09%09fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    mask-position: center; mask-repeat: no-repeat; mask-size: contain;
}
.portal-navigation__icon_forum {
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H28C30.2091%200%2032%201.79086%2032%204V20C32%2022.2091%2030.2091%2024%2028%2024H20L12%2032V24H4C1.79086%2024%200%2022.2091%200%2020V4ZM19%2012C19%2013.6569%2017.6569%2015%2016%2015C14.3431%2015%2013%2013.6569%2013%2012C13%2010.3431%2014.3431%209%2016%209C17.6569%209%2019%2010.3431%2019%2012ZM11%2012C11%2013.6569%209.65685%2015%208%2015C6.34315%2015%205%2013.6569%205%2012C5%2010.3431%206.34315%209%208%209C9.65685%209%2011%2010.3431%2011%2012ZM24%2015C25.6569%2015%2027%2013.6569%2027%2012C27%2010.3431%2025.6569%209%2024%209C22.3431%209%2021%2010.3431%2021%2012C21%2013.6569%2022.3431%2015%2024%2015Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    mask-position: center; mask-repeat: no-repeat; mask-size: contain;
}
.portal-navigation__icon_wiki {
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%200C2.89543%200%202%200.895431%202%202V30C2%2031.1046%202.89543%2032%204%2032H20C22.2091%2032%2024%2030.2091%2024%2028V27C24%2026.4477%2024.4477%2026%2025%2026H26C28.2091%2026%2030%2024.2091%2030%2022V2C30%200.895431%2029.1046%200%2028%200H4ZM9%206C8.44772%206%208%206.44772%208%207V9C8%209.55229%208.44772%2010%209%2010H23C23.5523%2010%2024%209.55229%2024%209V7C24%206.44772%2023.5523%206%2023%206H9ZM8%2013C8%2012.4477%208.44772%2012%209%2012H23C23.5523%2012%2024%2012.4477%2024%2013V15C24%2015.5523%2023.5523%2016%2023%2016H9C8.44772%2016%208%2015.5523%208%2015V13ZM9%2018C8.44772%2018%208%2018.4477%208%2019V21C8%2021.5523%208.44772%2022%209%2022H15C15.5523%2022%2016%2021.5523%2016%2021V19C16%2018.4477%2015.5523%2018%2015%2018H9Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    mask-position: center; mask-repeat: no-repeat; mask-size: contain;
}
.portal-navigation__icon_ratings {
    mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%09%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%0A%09%09%20%20d%3D%22M4%200H12V2H16C16%202.33866%2015.979%202.67241%2015.9381%203C15.4663%206.78387%2012.3519%209.7471%208.5%209.98463V13H10.5C10.7761%2013%2011%2013.2239%2011%2013.5V14.5C11%2014.7761%2011.2239%2015%2011.5%2015H11.75C11.8881%2015%2012%2015.1119%2012%2015.25V16H4V15.25C4%2015.1119%204.11193%2015%204.25%2015H4.5C4.77614%2015%205%2014.7761%205%2014.5V13.5C5%2013.2239%205.22386%2013%205.5%2013H7.5V9.98463C3.64812%209.7471%200.533736%206.78387%200.0618938%203C0.0210433%202.67241%200%202.33866%200%202H4V0ZM1.07089%203C1.35148%204.96163%202.44536%206.66091%204%207.74531V3H1.07089ZM12%207.74531C13.5546%206.66091%2014.6485%204.96163%2014.9291%203H12V7.74531Z%22%0A%09%09%20%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E%0A");
    mask-position: center; mask-repeat: no-repeat; mask-size: contain;
}

/* Active/hover state — recolor icon to accent */
.portal-navigation__link.active .portal-navigation__icon_game,
.portal-navigation__link:active .portal-navigation__icon_game,
.portal-navigation__link:hover .portal-navigation__icon_game,
.portal-navigation__link.active .portal-navigation__icon_media,
.portal-navigation__link:active .portal-navigation__icon_media,
.portal-navigation__link:hover .portal-navigation__icon_media,
.portal-navigation__link.active .portal-navigation__icon_esports,
.portal-navigation__link:active .portal-navigation__icon_esports,
.portal-navigation__link:hover .portal-navigation__icon_esports,
.portal-navigation__link.active .portal-navigation__icon_forum,
.portal-navigation__link:active .portal-navigation__icon_forum,
.portal-navigation__link:hover .portal-navigation__icon_forum,
.portal-navigation__link.active .portal-navigation__icon_wiki,
.portal-navigation__link:active .portal-navigation__icon_wiki,
.portal-navigation__link:hover .portal-navigation__icon_wiki,
.portal-navigation__link.active .portal-navigation__icon_ratings,
.portal-navigation__link:active .portal-navigation__icon_ratings,
.portal-navigation__link:hover .portal-navigation__icon_ratings {
    background-position: 0;
    background-color: ${ACC};
}

/* ============================================================
   ANIMATIONS — Sped up
   ============================================================ */
.user-profile .slider__items-wrapper {
    -webkit-animation-duration: .1s;
    animation-duration: 10ms;
}
.leaderboards .slider__items-wrapper {
    -webkit-animation-duration: .05s;
    animation-duration: 50ms;
}

/* ============================================================
   GAME-MODE ICON REPLACEMENTS (from snowcats NUI+)
   ============================================================ */
img.profile-entity-image__img:is([src*="dm"],[src*="ctf"],[src*="cp"],[src*="as"],[src*="rgb"],[src*="jgr"]) {
    width: 0px; height: 0px; padding: 3rem;
}
img.profile-entity-image__img[src*="/dm"] {
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2296%22%20height%3D%2296%22%20viewBox%3D%220%200%2096%2096%22%20fill%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M88%2044L96%2060L84%2072H76H68V84L60%2092L48%2096L36%2092L28%2084V72H20H12L0%2060L8%2044H12V48C12%2056.8366%2019.1634%2064%2028%2064H32L40%2056V52L8%2036V24C8%2012%2028%200%2048%200C68%200%2088%2012%2088%2024V36L56%2052V56L64%2064H68C76.8366%2064%2084%2056.8366%2084%2048V44H88ZM48%2060L36%2072L42%2078L48%2072L54%2078L60%2072L48%2060Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E") center / 5rem no-repeat;
}
img.profile-entity-image__img[src*="tdm"] {
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2294%22%20height%3D%2296%22%20viewBox%3D%220%200%2094%2096%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M6.99949%2024C6.99949%2012%2026.9995%200%2046.9991%200V6C38.1098%206.00008%2029.1739%208.69249%2022.5865%2012.645C15.6001%2016.8368%2012.9995%2021.2713%2012.9995%2024V45.4165L6.30005%2058.8149L6.29835%2058.8193L6.29695%2058.8243L6.29396%2058.8397C6.29045%2058.8627%206.28673%2058.9107%206.29681%2058.984C6.31852%2059.142%206.39629%2059.3527%206.55114%2059.5494C7.61929%2060.9066%208.67037%2062.3462%209.65265%2063.6964L9.84212%2063.9569C10.7761%2065.241%2011.6486%2066.4405%2012.5147%2067.5625C13.1253%2068.3536%2014.2959%2069%2015.9711%2069H30.4998V81.5147L35.7408%2086.7558L46.9991%2089.6753V96L32.4998%2092L26.2571%2085.7574C25.1319%2084.6321%2024.4998%2083.106%2024.4998%2081.5147V75H15.9711C12.7876%2075%209.71033%2073.7488%207.76511%2071.2288C6.84438%2070.036%205.92345%2068.7697%205.00264%2067.5037C3.94726%2066.0526%202.8917%2064.6012%201.83625%2063.2602C0.238862%2061.2305%20-0.221595%2058.4417%200.933517%2056.1315L6.99949%2044V24Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M93.0655%2056.132L86.9995%2044H82.9995V48C82.9995%2056.8366%2075.836%2064%2066.9995%2064H62.9995L54.9995%2056V52L86.9995%2036V24C86.9995%2012%2066.9991%200%2046.9991%200L46.9995%2060L58.9995%2072L52.9995%2078L46.9995%2072L46.9991%2096L58.9995%2092L65.2421%2085.7574C66.3673%2084.6321%2066.9995%2083.106%2066.9995%2081.5147V72H79.2715C81.6585%2072%2083.9477%2071.0518%2085.6355%2069.364L91.9415%2063.0579C93.7677%2061.2318%2094.2204%2058.4419%2093.0655%2056.132Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E") center / 5rem no-repeat;
}
img.profile-entity-image__img[src*="ctf"] {
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2296%22%20height%3D%2290%22%20viewBox%3D%220%200%2096%2090%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M48%200H96L66.0001%2090H58L70%2054H46L43.8234%2060.5298C42.7345%2063.7966%2039.6774%2066%2036.2339%2066H0L18%2012H30V54L48%200Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E") center / 5rem no-repeat;
}
img.profile-entity-image__img[src*="cp"] {
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2296%22%20height%3D%2296%22%20viewBox%3D%220%200%2096%2096%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M48%200L66%2018H30L48%200Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M72%2048C72%2061.2548%2061.2548%2072%2048%2072C34.7452%2072%2024%2061.2548%2024%2048C24%2034.7452%2034.7452%2024%2048%2024C61.2548%2024%2072%2034.7452%2072%2048Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M0%2048L18%2030V66L0%2048Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M78%2030L96%2048L78%2066V30Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M66%2078L48%2096L30%2078H66Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E") center / 5rem no-repeat;
}
img.profile-entity-image__img[src*="/as."] {
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M22.5%2012C22.5%2021%2012.0002%2024%2012.0002%2024C12.0002%2024%201.5%2021%201.5%2012V3H6.00024L12.0002%200L18.0002%203H22.5V12ZM6.35435%204.5H3V12C3%2015.8284%205.20907%2018.4309%207.62197%2020.1544C8.82362%2021.0127%2010.035%2021.6196%2010.9504%2022.0119C11.3826%2022.1971%2011.7438%2022.3324%2012%2022.4222L12%204.19263L17.1148%206.75H21V4.5H17.6461L12.0002%201.67705L6.35435%204.5Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E") center / 5rem no-repeat;
}
img.profile-entity-image__img[src*="rgb"] {
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2296%22%20height%3D%2296%22%20viewBox%3D%220%200%2096%2096%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M91.3137%2019.3137L76.6863%204.68629C73.6857%201.68571%2069.616%200%2065.3726%200H42L96%2054V30.6274C96%2026.384%2094.3143%2022.3143%2091.3137%2019.3137Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M30.6274%2096H54L0%2042V65.3726C0%2069.616%201.68571%2073.6857%204.68629%2076.6863L19.3137%2091.3137C22.3143%2094.3143%2026.3839%2096%2030.6274%2096Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M42.3431%2029.6569L29.6569%2042.3431C26.5327%2045.4673%2026.5327%2050.5327%2029.6569%2053.6569L42.3431%2066.3431C45.4673%2069.4673%2050.5327%2069.4673%2053.6569%2066.3431L66.3431%2053.6569C69.4673%2050.5327%2069.4673%2045.4673%2066.3431%2042.3431L53.6569%2029.6569C50.5327%2026.5327%2045.4673%2026.5327%2042.3431%2029.6569Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M59.6569%2072.3431L72.3431%2059.6568C75.4673%2056.5327%2080.5327%2056.5327%2083.6569%2059.6569L88%2064L64%2088L59.6569%2083.6568C56.5327%2080.5327%2056.5327%2075.4673%2059.6569%2072.3431Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M32%208L8%2032L12.3431%2036.3431C15.4673%2039.4673%2020.5327%2039.4673%2023.6569%2036.3431L36.3431%2023.6569C39.4673%2020.5327%2039.4673%2015.4673%2036.3431%2012.3431L32%208Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E") center / 5rem no-repeat;
}
img.profile-entity-image__img[src*="jgr"] {
    background-color: ${ACC};
    mask: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2296%22%20height%3D%2296%22%20viewBox%3D%220%200%2096%2096%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M56%2046L66%2048L72%2066L60%2072V66H36V72L24.0004%2066L30%2048L40%2046V42L21.1269%2031.7056C19.1993%2030.6542%2018%2028.6339%2018%2026.4382V6.00016C26%202%2036%20-8.41836e-05%2048%202.65754e-09C60%208.41942e-05%2072%202%2078%206.00009V26.4382C78%2028.6339%2076.8007%2030.6542%2074.8731%2031.7056L56%2042V46Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M77.185%2061.8267L72%2048L84%2042V12.0001C90%2016%2096%2024%2096%2036V50.4696C96%2052.6486%2094.8186%2054.6563%2092.9139%2055.7145L80.029%2062.8728C78.9605%2063.4664%2077.6142%2062.9712%2077.185%2061.8267Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M12%2042L24%2048L18.815%2061.8267C18.3858%2062.9712%2017.0395%2063.4664%2015.971%2062.8728L3.08614%2055.7145C1.18135%2054.6563%200%2052.6486%200%2050.4696V36C0%2024%206%2016%2012%2012.0001V42Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3Cpath%20d%3D%22M24%2078L24.0004%2084C24.0004%2090%2030%2096%2036%2096H60C66%2096%2072%2090%2072%2084V78L60%2084L54%2078L48%2084L42%2078L36%2084L24%2078Z%22%20fill%3D%22%23FFFFFF%22%2F%3E%3C%2Fsvg%3E") center / 5rem no-repeat;
}
`;
    }

    // ── SKIN SWAPS (XT) ─────────────────────────────────────────────────────
    function buildSkinSwapCSS() {
        return `
/* ============================================================
   TANK / GUN SKIN SWAPS  (XT enabled)
   ============================================================ */
img.profile-entity-image__img:is(
  [src*="/566/70102/323/360/27316026215470/"],
  [src*="/574/114025/235/321/27623005403276/"],
  [src*="/573/71447/126/60/27602130071361/"],
  [src*="/600/67532/1/65/30015726400661/"],
  [src*="/564/5207/367/317/27221401743427/"],
  [src*="/567/167060/364/47/27375614310446/"],
  [src*="/571/121327/171/265/27464265736706/"],
  [src*="/566/43504/240/22/27310721145267/"],
  [src*="/562/161140/123/251/27157463264311/"],
  [src*="/602/61754/171/47/30114373154622/"],
  [src*="/606/26070/125/145/30305416163507/"],
  [src*="/622/43505/151/101/31110721265007/"],
  [src*="/611/61722/256/267/30454367266373/"],
  [src*="/632/23036/322/273/31504607631061/"],
  [src*="/601/112676/250/233/30062557707304/"],
  [src*="/626/176502/177/71/31337521147306/"],
  [src*="/567/105205/202/144/27361241363510/"],
  [src*="/566/114246/64/16/27323052543056/"],
  [src*="/601/17263/233/51/30043654742567/"],
  [src*="/575/72153/171/306/27656433310704/"],
  [src*="/611/147301/37/346/30471660553063/"],
  [src*="/571/164753/344/273/31254566614710/"],
  [src*="/605/12650/335/51/30242554322574/"],
  [src*="/603/146215/116/130/30171443247472/"],
  [src*="/0/114/134/163/27571212744112/"],
  [src*="/575/156205/46/235/27673441764603/"],
  [src*="/622/115017/367/224/31123203774154/"]
) { width: 200px; height: 0px; padding: 4.5em; }

/* hornet */
img.profile-entity-image__img[src*="/566/70102/323/360/27316026215470/"] {
    background: url("https://s.eu.tankionline.com/623/132270/76/254/31166456253644/image.webp") center/contain no-repeat;
}
/* wasp */
img.profile-entity-image__img[src*="/574/114025/235/321/27623005403276/"] {
    background: url("https://s.eu.tankionline.com/630/157767/151/316/31433775743511/image.webp") center/contain no-repeat;
}
/* paladin */
img.profile-entity-image__img[src*="/573/71447/126/60/27602130071361/"] {
    background: url("https://s.eu.tankionline.com/573/71447/126/37/27602130032301/image.webp") center/contain no-repeat;
}
/* mammoth */
img.profile-entity-image__img[src*="/600/67532/1/65/30015726400661/"] {
    background: url("https://s.eu.tankionline.com/617/166341/256/13/30775470330175/image.webp") center/contain no-repeat;
}
/* hopper */
img.profile-entity-image__img[src*="/564/5207/367/317/27221401743427/"] {
    background: url("https://s.eu.tankionline.com/564/111272/25/147/27222256430152/image.webp") center/contain no-repeat;
}
/* hunter */
img.profile-entity-image__img[src*="/567/167060/364/47/27375614310446/"] {
    background: url("https://s.eu.tankionline.com/632/72364/102/227/31516475423716/image.webp") center/contain no-repeat;
}
/* viking */
img.profile-entity-image__img[src*="/571/121327/171/265/27464265736706/"] {
    background: url("https://s.eu.tankionline.com/606/162165/343/3/30334435362646/image.webp") center/contain no-repeat;
}
/* crusader */
img.profile-entity-image__img[src*="/566/43504/240/22/27310721145267/"] {
    background: url("https://s.eu.tankionline.com/566/40735/240/67/27310167345113/image.webp") center/contain no-repeat;
}
/* ares */
img.profile-entity-image__img[src*="/562/161140/123/251/27157463264311/"] {
    background: url("https://s.eu.tankionline.com/562/161156/242/234/31331074061754/image.webp") center/contain no-repeat;
}
/* dictator */
img.profile-entity-image__img[src*="/602/61754/171/47/30114373154622/"] {
    background: url("https://s.eu.tankionline.com/621/140410/154/251/31070103077064/image.webp") center/contain no-repeat;
}
/* titan */
img.profile-entity-image__img[src*="/606/26070/125/145/30305416163507/"] {
    background: url("https://s.eu.tankionline.com/606/26070/125/145/30305416163507/image.webp") center/contain no-repeat;
}
/* shaft */
img.profile-entity-image__img[src*="/622/43505/151/101/31110721265007/"] {
    background: url("https://s.eu.tankionline.com/622/43505/151/101/31110721265007/image.webp") center/contain no-repeat;
}
/* gauss */
img.profile-entity-image__img[src*="/611/61722/256/267/30454367266373/"] {
    background: url("https://s.eu.tankionline.com/560/166470/223/123/27035516206046/image.webp") center/contain no-repeat;
}
/* magnum */
img.profile-entity-image__img[src*="/632/23036/322/273/31504607631061/"] {
    background: url("https://s.eu.tankionline.com/632/23036/322/273/31504607631061/image.webp") center/contain no-repeat;
}
/* thunder */
img.profile-entity-image__img[src*="/601/112676/250/233/30062557707304/"] {
    background: url("https://s.eu.tankionline.com/617/134472/113/230/30767117003724/image.webp") center/contain no-repeat;
}
/* striker */
img.profile-entity-image__img[src*="/626/176502/177/71/31337521147306/"] {
    background: url("https://s.eu.tankionline.com/626/144362/322/210/31331074604612/image.webp") center/contain no-repeat;
}
/* railgun */
img.profile-entity-image__img[src*="/567/105205/202/144/27361241363510/"] {
    background: url("https://s.eu.tankionline.com/557/14216/302/47/27006222235365/image.webp") center/contain no-repeat;
}
/* smoky */
img.profile-entity-image__img[src*="/566/114246/64/16/27323052543056/"] {
    background: url("https://s.eu.tankionline.com/630/157767/375/215/31435247467005/image.webp") center/contain no-repeat;
}
/* scorpion */
img.profile-entity-image__img[src*="/601/17263/233/51/30043654742567/"] {
    background: url("https://s.eu.tankionline.com/602/142236/225/135/30131263063453/image.webp") center/contain no-repeat;
}
/* twins */
img.profile-entity-image__img[src*="/575/72153/171/306/27656433310704/"] {
    background: url("https://s.eu.tankionline.com/575/72153/171/306/27656433310704/image.webp") center/contain no-repeat;
}
/* hammer */
img.profile-entity-image__img[src*="/611/147301/37/346/30471660553063/"] {
    background: url("https://s.eu.tankionline.com/627/73466/221/246/31356720510241/image.webp") center/contain no-repeat;
}
/* tesla */
img.profile-entity-image__img[src*="/571/164753/344/273/31254566614710/"] {
    background: url("https://s.eu.tankionline.com/571/164753/344/275/27475173126262/image.webp") center/contain no-repeat;
}
/* isida */
img.profile-entity-image__img[src*="/605/12650/335/51/30242554322574/"] {
    background: url("https://s.eu.tankionline.com/631/164030/223/154/31475006414111/image.webp") center/contain no-repeat;
}
/* ricochet */
img.profile-entity-image__img[src*="/603/146215/116/130/30171443247472/"] {
    background: url("https://s.eu.tankionline.com/603/146215/116/130/30171443247472/image.webp") center/contain no-repeat;
}
/* firebird */
img.profile-entity-image__img[src*="/0/114/134/163/27571212744112/"] {
    background: url("https://s.eu.tankionline.com/574/111735/366/251/27623012454350/image.webp") center/contain no-repeat;
}
/* freeze */
img.profile-entity-image__img[src*="/575/156205/46/235/27673441764603/"] {
    background: url("https://s.eu.tankionline.com/607/136170/201/132/30367436101741/image.webp") center/contain no-repeat;
}
/* vulcan */
img.profile-entity-image__img[src*="/622/115017/367/224/31123203774154/"] {
    background: url("https://s.eu.tankionline.com/622/115017/367/224/31123203774154/image.webp") center/contain no-repeat;
}

/* Special items */
img.profile-entity-image__img:is(
  [src*="/624/150661/265/135/31232702052237/"],
  [src*="/622/134025/132/11/31127005742647/"],
  [src*="/623/154605/377/111/31173606023676/"]
) { width: 80px; height: 0px; padding: 4.5em; }

/* mortar */
.profile-entity-image__img[src*="/624/150661/265/135/31232702052237/"] {
    background-image: url(https://s.eu.tankionline.com/624/150661/265/135/31232702052237/image.tnk);
    background-position: top; background-size: contain; background-repeat: no-repeat; font-size: 12px;
}
/* pumpkin */
.profile-entity-image__img[src*="/622/134025/132/11/31127005742647/"] {
    background-image: url(https://s.eu.tankionline.com/622/134025/132/11/31127005742647/image.tnk);
    background-position: top; background-size: contain; background-repeat: no-repeat; font-size: 12px;
}
.profile-entity-image__img[src*="/623/154605/377/111/31173606023676/"] {
    background-image: url(https://s.eu.tankionline.com/623/154605/377/111/31173606023676/image.tnk);
    background-position: top; background-size: contain; background-repeat: no-repeat; font-size: 12px;
}
`;
    }

    // ── INJECT ───────────────────────────────────────────────────────────────
    function injectStyle(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    function init() {
        injectFonts();
        injectStyle(buildCSS());
        if (XT) injectStyle(buildSkinSwapCSS());
    }

    // Run as early as possible; fall back to DOMContentLoaded if head not ready
    if (document.head) {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();
