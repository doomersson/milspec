(function () {
    'use strict';

    // ── MILSPEC PALETTE ──────────────────────────────────────────────────────
    // bg:          #080c0a  (near-black tactical green-black)
    // surface:     rgba(8, 18, 10, 0.88)
    // border:      rgba(60, 160, 60, 0.30)
    // accent:      rgba(80, 200, 80, 0.55)
    // text:        rgba(180, 220, 170, 0.90)
    // row hover:   rgba(0, 50, 15, 0.70)
    // blue team:   rgba(40, 130, 255, 0.55)
    // red team:    rgba(220, 50, 30, 0.55)
    // ─────────────────────────────────────────────────────────────────────────

    function styleSheet() {
        const elements = [

            // ── KILL BOARD TABLE CONTAINER ──────────────────────────────────

            {
                selector: '.BattleKillBoardComponentStyle-tableContainer table',
                style: `
                    align-items: center !important;
                    height: 42em !important;
                    width: 100em !important;
                    background-color: rgba(8, 14, 10, 0.92) !important;
                    border: 1px solid rgba(60, 160, 60, 0.28) !important;
                    border-left: 2px solid rgba(80, 200, 80, 0.45) !important;
                    box-shadow: 0 0 0 1px rgba(80, 200, 80, 0.08), inset 0 0 30px rgba(0,0,0,0.5) !important;
                    font-family: 'Share Tech Mono', monospace !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table) td, :is(.BattleKillBoardComponentStyle-tableContainer table) th',
                style: `
                    box-sizing: border-box !important;
                    flex-shrink: 0 !important;
                    margin: 0 !important;
                    max-width: unset !important;
                    min-width: unset !important;
                    color: rgba(180, 220, 170, 0.88) !important;
                    font-family: 'Share Tech Mono', monospace !important;
                    letter-spacing: 0.05em !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table) tr',
                style: `
                    width: 49.5em !important;
                    border-bottom: 1px solid rgba(60, 160, 60, 0.10) !important;
                    transition: background-color 0.15s ease !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table) tr:hover',
                style: `
                    background-color: rgba(0, 50, 15, 0.70) !important;
                    border-left: 2px solid rgba(80, 200, 80, 0.60) !important;
                `
            },

            {
                selector: ':is(:is(.BattleKillBoardComponentStyle-tableContainer table) tr) > *',
                style: `
                    width: 9.28% !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleKillBoardComponentStyle-tableContainer table) tr) > *) > *',
                style: `
                    margin: 0 !important;
                `
            },

            {
                selector: ':is(:is(.BattleKillBoardComponentStyle-tableContainer table) tr) > :first-child',
                style: `
                    width: 35% !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table) > thead',
                style: `
                    padding-right: 1em !important;
                    background: linear-gradient(90deg, rgba(0, 50, 15, 0.80) 0%, rgba(8, 14, 10, 0.50) 100%) !important;
                    border-bottom: 1px solid rgba(80, 200, 80, 0.35) !important;
                `
            },

            {
                selector: ':is(:is(.BattleKillBoardComponentStyle-tableContainer table) > thead) > tr',
                style: `
                    pointer-events: none !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleKillBoardComponentStyle-tableContainer table) > thead) > tr) > :first-child',
                style: `
                    padding-left: .75em !important;
                    font-family: \'Rajdhani\', sans-serif !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.12em !important;
                    color: rgba(160, 230, 150, 0.90) !important;
                    text-shadow: 0 0 8px rgba(80, 255, 80, 0.35) !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleKillBoardComponentStyle-tableContainer table) > thead) > tr) > th > :nth-child(2)',
                style: `
                    display: none !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table) > tbody',
                style: `
                    display: grid !important;
                    gap: .3em 1em !important;
                    grid-auto-flow: column !important;
                    grid-auto-rows: min-content !important;
                    grid-template-columns: 1fr 1fr !important;
                    padding-right: 1em !important;
                    width: 100% !important;
                `
            },

            {
                selector: ':is(:is(.BattleKillBoardComponentStyle-tableContainer table) > tbody) > tr',
                style: `
                    grid-column: 1/2 !important;
                    height: 2.5em !important;
                    background-color: rgba(8, 16, 10, 0.60) !important;
                `
            },

            {
                selector: '#enemyCommand:is(:is(:is(.BattleKillBoardComponentStyle-tableContainer table) > tbody) > tr)',
                style: `
                    grid-column: 2/3 !important;
                `
            },

            {
                selector: '#rowSpace:is(:is(:is(.BattleKillBoardComponentStyle-tableContainer table) > tbody) > tr), #teamRowSpace:is(:is(:is(.BattleKillBoardComponentStyle-tableContainer table) > tbody) > tr)',
                style: `
                    display: none !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table):not(:has(>tbody>#teamRowSpace))',
                style: `
                    width: 50em !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table):not(:has(>tbody>#teamRowSpace)) tr',
                style: `
                    grid-column: 1/2 !important;
                    width: 50em !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table):not(:has(>tbody>#teamRowSpace)) > thead > :nth-child(2)',
                style: `
                    display: none !important;
                `
            },

            {
                selector: ':is(.BattleKillBoardComponentStyle-tableContainer table):not(:has(>tbody>#teamRowSpace)) > tbody',
                style: `
                    grid-template-columns: 1fr !important;
                `
            },

            // ── NEXT/LEAVE BUTTON ────────────────────────────────────────────

            {
                selector: '.BattleResultNavigationComponentStyle-commonBlockButtonNextLeave',
                style: `
                    flex-direction: row !important;
                    height: 8.125em !important;
                    width: 17em !important;
                    background-color: rgba(8, 20, 12, 0.90) !important;
                    border: 1px solid rgba(80, 200, 80, 0.30) !important;
                    border-left: 2px solid rgba(80, 200, 80, 0.55) !important;
                    box-shadow: 0 0 12px rgba(0, 0, 0, 0.50) !important;
                    transition: background-color 0.15s ease !important;
                `
            },

            {
                selector: '.BattleResultNavigationComponentStyle-commonBlockButtonNextLeave:hover',
                style: `
                    background-color: rgba(0, 50, 15, 0.85) !important;
                    border-left-color: rgba(80, 255, 80, 0.75) !important;
                `
            },

            {
                selector: '.BattleResultNavigationComponentStyle-commonBlockButtonNextLeave > :first-child',
                style: `
                    margin-bottom: 0 !important;
                    margin-right: .5em !important;
                `
            },

            // ── STAT TAB SCROLL / CONTAINER ──────────────────────────────────

            {
                selector: '.BattleTabStatisticComponentStyle-container > :first-child',
                style: `
                    max-height: unset !important;
                `
            },

            {
                selector: '.BattleTabStatisticComponentStyle-commonContainerIconOptions',
                style: `
                    right: 1em !important;
                `
            },

            {
                selector: '.BattleTabStatisticComponentStyle-commonBlockScroll',
                style: `
                    margin: 3em 0 0 !important;
                    max-height: 42em !important;
                    padding: 0 0 .3em !important;
                `
            },

            {
                selector: '.BattleTabStatisticComponentStyle-containerInsideResults',
                style: `
                    width: 56.75em !important;
                    background-color: rgba(8, 14, 10, 0.90) !important;
                    border: 1px solid rgba(60, 160, 60, 0.25) !important;
                    border-left: 2px solid rgba(80, 200, 80, 0.45) !important;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.55) !important;
                `
            },

            {
                selector: '.BattleTabStatisticComponentStyle-containerInsideResults > .BattleTabStatisticComponentStyle-commonBlockScroll',
                style: `
                    width: calc(100% - .9em) !important;
                `
            },

            // ── STAT TAB TABLE ───────────────────────────────────────────────

            {
                selector: '.BattleTabStatisticComponentStyle-container table',
                style: `
                    border-spacing: 0 !important;
                    margin: 0 !important;
                    padding-bottom: 0 !important;
                    font-family: 'Share Tech Mono', monospace !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container table) td, :is(.BattleTabStatisticComponentStyle-container table) th',
                style: `
                    box-sizing: border-box !important;
                    flex-shrink: 0 !important;
                    margin: 0 !important;
                    max-width: unset !important;
                    min-width: unset !important;
                    color: rgba(180, 220, 170, 0.88) !important;
                    font-family: 'Share Tech Mono', monospace !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container table) > thead',
                style: `
                    top: 3.5em !important;
                    background: linear-gradient(90deg, rgba(0, 50, 15, 0.75) 0%, transparent 100%) !important;
                    border-bottom: 1px solid rgba(80, 200, 80, 0.30) !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > thead > tr) > *',
                style: `
                    width: 10% !important;
                    font-family: 'Rajdhani', sans-serif !important;
                    font-weight: 700 !important;
                    text-transform: uppercase !important;
                    letter-spacing: 0.10em !important;
                    color: rgba(160, 230, 150, 0.90) !important;
                    text-shadow: 0 0 6px rgba(80, 255, 80, 0.30) !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > thead > tr) > :first-child',
                style: `
                    width: 35% !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > thead > tr) > :nth-child(3)',
                style: `
                    align-items: center !important;
                    display: flex !important;
                    justify-content: center !important;
                    width: 15% !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleTabStatisticComponentStyle-container table) > thead > tr) > :nth-child(3)) > :first-child',
                style: `
                    height: 1em !important;
                    width: 1.5em !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container table) > tbody > tr',
                style: `
                    margin-top: .3em !important;
                    background-color: rgba(8, 16, 10, 0.58) !important;
                    border-bottom: 1px solid rgba(60, 160, 60, 0.09) !important;
                    transition: background-color 0.15s ease !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container table) > tbody > tr:hover',
                style: `
                    background-color: rgba(0, 50, 15, 0.72) !important;
                    border-left: 2px solid rgba(80, 200, 80, 0.55) !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > *',
                style: `
                    visibility: visible !important;
                    width: 10% !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :first-child',
                style: `
                    order: -2 !important;
                    width: 35% !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :nth-child(2)',
                style: `
                    order: 0 !important;
                    width: 15% !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :nth-child(3)',
                style: `
                    order: -1 !important;
                `
            },

            {
                selector: '.BattleTabStatisticComponentStyle-container table > tbody > tr',
                style: `
                    cursor: unset !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)',
                style: `
                    height: max-content !important;
                    justify-content: space-evenly !important;
                `
            },

            // ── COMPACT CELLS / DEFENCE LABELS ──────────────────────────────

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) > .tt-compact-cell',
                style: `
                    align-items: center !important;
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    justify-content: space-evenly !important;
                    justify-items: center !important;
                    padding: 0 .3em !important;
                    width: 100% !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel',
                style: `
                    align-items: center !important;
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    height: 1.5em !important;
                    justify-content: space-evenly !important;
                    justify-items: center !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 2.5em !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):not(:has(>div+h3))',
                style: `
                    grid-template-columns: 1fr !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel) > *',
                style: `
                    margin: 0 !important;
                    padding: 0 !important;
                `
            },

            {
                selector: ':is(:is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel) > *):nth-child(2)',
                style: `
                    justify-self: start !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):has(>div+h3)',
                style: `
                    --tt-default-color: rgba(180, 220, 170, 0.90);
                    --tt-highlight-color: #ff5050;
                    --tt-gray-out-color: rgba(180, 220, 170, 0.90);
                    --tt-current-color: var(--tt-default-color);
                `
            },

            {
                selector: '.tt-protecting:is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):has(>div+h3)',
                style: `
                    --tt-default-color: #ff5050;
                `
            },

            {
                selector: '.tt-spectrum:is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):has(>div+h3)',
                style: `
                    --tt-default-color: #32dac0;
                `
            },

            {
                selector: '.tt-highlighted:is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):has(>div+h3)',
                style: `
                    --tt-current-color: var(--tt-highlight-color);
                `
            },

            {
                selector: '.tt-grayed-out:is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):has(>div+h3)',
                style: `
                    --tt-current-color: var(--tt-gray-out-color);
                `
            },

            {
                selector: '.tt-marked:is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):has(>div+h3) > :first-child',
                style: `
                    background-color: var(--tt-current-color) !important;
                `
            },

            {
                selector: '.tt-marked:is(:is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel):has(>div+h3) > :nth-child(2)',
                style: `
                    color: var(--tt-current-color) !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) > .tt-protecting, :is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) > .tt-spectrum',
                style: `
                    order: -1 !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)) > :not(.tt-compact-cell)',
                style: `
                    display: none !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)):is(:hover,.tt-expanded)',
                style: `
                    cursor: pointer !important;
                    width: 35% !important;
                    background-color: rgba(0, 60, 18, 0.85) !important;
                    border: 1px solid rgba(80, 200, 80, 0.40) !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)):is(:hover,.tt-expanded) > .tt-compact-cell',
                style: `
                    display: none !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :nth-child(2)):is(:hover,.tt-expanded) > :not(.tt-compact-cell)',
                style: `
                    display: grid !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container table > tbody > tr):has(>:nth-child(2):is(:hover,.tt-expanded)) > :nth-child(4), :is(.BattleTabStatisticComponentStyle-container table > tbody > tr):has(>:nth-child(2):is(:hover,.tt-expanded)) > :nth-child(5)',
                style: `
                    display: none;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :is(:nth-child(4),:nth-child(5)) > :first-child) > :hover',
                style: `
                    cursor: pointer !important;
                `
            },

            // ── TOOLTIP ──────────────────────────────────────────────────────

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table > tbody > tr) > :is(:nth-child(4),:nth-child(5)) > :first-child) > .tt-tooltip',
                style: `
                    backdrop-filter: blur(.313em) !important;
                    background-color: rgba(8, 20, 12, 0.95) !important;
                    border: .063em solid rgba(80, 200, 80, 0.35) !important;
                    border-radius: 0 !important;
                    color: rgba(180, 220, 170, 0.92) !important;
                    font-family: 'Share Tech Mono', monospace !important;
                    font-size: 1em !important;
                    padding: 1em !important;
                    text-wrap: nowrap !important;
                    transform: translate(.5em,.5em) !important;
                    z-index: 4 !important;
                    box-shadow: 0 0 10px rgba(0,0,0,0.60) !important;
                `
            },

            // ── TBODY ROW SHADOW / SECOND CELL ───────────────────────────────

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container table) > tbody > tr',
                style: `
                    box-shadow: unset !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :nth-child(2)',
                style: `
                    backdrop-filter: grayscale(100%) !important;
                    background-color: rgba(3, 20, 10, 0.75) !important;
                    border: .06em solid rgba(80, 200, 80, 0.22) !important;
                    border-radius: 0 !important;
                    padding: .3em 0 !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel',
                style: `
                    --tt-highlight-color: #ff5050 !important;
                `
            },

            {
                selector: '.tt-protecting:is(:is(:is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :nth-child(2)) .BattleTabStatisticComponentStyle-defenceLabel)',
                style: `
                    --tt-default-color: #ff5050 !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :nth-child(3)) > .GearScoreStyle-bestGsLight',
                style: `
                    display: none !important;
                `
            },

            {
                selector: ':is(:is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :is(:nth-child(4),:nth-child(5)) > :first-child) > .tt-tooltip',
                style: `
                    background-color: rgba(8, 20, 12, 0.95) !important;
                    border-radius: 0 !important;
                    border: 1px solid rgba(80, 200, 80, 0.28) !important;
                    box-shadow: 0 0 .2em rgba(0,0,0,.5) !important;
                    padding: .3em .7em !important;
                    transform: translate(-50%,-3em) !important;
                    color: rgba(180, 220, 170, 0.90) !important;
                    font-family: 'Share Tech Mono', monospace !important;
                `
            },

            {
                selector: ':is(:is(:is(:is(.BattleTabStatisticComponentStyle-container table) > tbody > tr) > :is(:nth-child(4),:nth-child(5)) > :first-child) > .tt-tooltip):before',
                style: `
                    border: .6em solid transparent !important;
                    border-top-color: rgba(8, 20, 12, 0.95) !important;
                    content: "" !important;
                    height: 0 !important;
                    left: 50% !important;
                    position: absolute !important;
                    top: calc(100% - 1px) !important;
                    transform: translateX(-50%) !important;
                    width: 0 !important;
                `
            },

            // ── EXPANDED TABLE WIDTHS ────────────────────────────────────────

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container.tt-expanded table > thead > tr) > *',
                style: `
                    width: 8.33% !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container.tt-expanded table > thead > tr) > :first-child',
                style: `
                    width: 29.16% !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container.tt-expanded table > thead > tr) > :nth-child(3)',
                style: `
                    width: 29.16% !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container.tt-expanded table > tbody > tr) > *',
                style: `
                    width: 8.33% !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container.tt-expanded table > tbody > tr) > :first-child',
                style: `
                    width: 29.16% !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container.tt-expanded table > tbody > tr) > :nth-child(2)',
                style: `
                    width: 29.16% !important;
                `
            },

            {
                selector: ':is(.BattleTabStatisticComponentStyle-container.tt-expanded table > tbody > tr) > :nth-child(2)',
                style: `
                    cursor: unset !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container.tt-expanded table > tbody > tr) > :nth-child(2)) > .tt-compact-cell',
                style: `
                    display: none !important;
                `
            },

            {
                selector: ':is(:is(.BattleTabStatisticComponentStyle-container.tt-expanded table > tbody > tr) > :nth-child(2)) > :not(.tt-compact-cell)',
                style: `
                    display: grid !important;
                `
            },

            // ── FONT IMPORT (injected as a @import rule) ─────────────────────

            {
                selector: '@import',
                style: `url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@500;700&display=swap')`
            },

        ];

        // Build and inject stylesheet
        const styleEl = document.createElement('style');
        styleEl.id = 'milspec-theme';

        let css = "@import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@500;700&display=swap');\n\n";

        elements.forEach(entry => {
            if (entry.selector === '@import') return; // handled above
            css += `${entry.selector} { ${entry.style} }\n`;
        });

        styleEl.textContent = css;
        (document.head || document.documentElement).appendChild(styleEl);
    }

    if (document.head || document.documentElement) {
        styleSheet();
    } else {
        document.addEventListener('DOMContentLoaded', styleSheet);
    }

})();
