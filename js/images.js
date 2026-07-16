/* ============================================================
   GOL-STORE — generator grafik produktowych (SVG)
   Każdy typ produktu ma własny rysunek parametryzowany kolorami.
   ============================================================ */

function svgWrap(inner, bg) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img">
    <rect width="400" height="400" fill="${bg || "#f4f4f5"}"/>
    ${inner}
  </svg>`;
}

const SVG_DRAWERS = {
  boot(c) {
    return `
    <g>
      <ellipse cx="200" cy="330" rx="150" ry="14" fill="rgba(0,0,0,.08)"/>
      <path d="M70 265 C75 220 110 205 140 195 C175 183 195 150 205 120 C212 100 228 92 245 98
               C262 104 268 118 266 138 L262 200 C300 215 340 235 342 265 L342 285 L70 285 Z"
            fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <path d="M205 120 C212 100 228 92 245 98 C262 104 268 118 266 138 L264 170 C240 168 218 150 205 120 Z"
            fill="${c.c2}"/>
      <path d="M70 265 C75 240 95 226 120 216 L128 285 L70 285 Z" fill="${c.c2}" opacity=".85"/>
      <path d="M150 192 C190 205 260 208 262 200 L260 232 C220 240 170 232 146 214 Z" fill="${c.c3}" opacity=".9"/>
      <rect x="66" y="283" width="280" height="14" rx="7" fill="#181818"/>
      <g fill="#181818">
        <rect x="88"  y="297" width="14" height="22" rx="4"/>
        <rect x="130" y="297" width="14" height="22" rx="4"/>
        <rect x="172" y="297" width="14" height="22" rx="4"/>
        <rect x="256" y="297" width="14" height="22" rx="4"/>
        <rect x="300" y="297" width="14" height="22" rx="4"/>
      </g>
      <g stroke="${c.c3}" stroke-width="5" stroke-linecap="round" opacity=".95">
        <line x1="196" y1="150" x2="222" y2="142"/>
        <line x1="190" y1="168" x2="220" y2="160"/>
        <line x1="184" y1="186" x2="216" y2="178"/>
      </g>
      <path d="M300 226 C320 236 336 250 340 264" stroke="${c.c2}" stroke-width="8" fill="none" stroke-linecap="round"/>
    </g>`;
  },

  shirt(c) {
    return `
    <g>
      <ellipse cx="200" cy="352" rx="130" ry="10" fill="rgba(0,0,0,.07)"/>
      <path d="M140 80 L100 100 L60 170 L110 200 L120 175 L120 340 L280 340 L280 175 L290 200 L340 170 L300 100 L260 80
               C245 102 220 112 200 112 C180 112 155 102 140 80 Z"
            fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <path d="M140 80 C155 102 180 112 200 112 C220 112 245 102 260 80 L245 72 C233 88 217 96 200 96 C183 96 167 88 155 72 Z"
            fill="${c.c2}"/>
      <path d="M60 170 L110 200 L120 175 L120 150 L84 128 Z" fill="${c.c2}" opacity=".85"/>
      <path d="M340 170 L290 200 L280 175 L280 150 L316 128 Z" fill="${c.c2}" opacity=".85"/>
      <rect x="120" y="300" width="160" height="14" fill="${c.c2}"/>
      <circle cx="200" cy="200" r="34" fill="none" stroke="${c.c3}" stroke-width="6"/>
      <text x="200" y="212" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold"
            font-size="34" fill="${c.c3}">10</text>
    </g>`;
  },

  glove(c) {
    return `
    <g>
      <ellipse cx="200" cy="350" rx="120" ry="10" fill="rgba(0,0,0,.07)"/>
      <path d="M150 340 L150 210 C150 200 143 196 132 200 L108 210 C96 214 88 206 92 194 L120 130
               C126 116 138 110 152 110 L156 92 C158 74 172 64 188 64 L232 64 C248 64 260 76 260 92
               L264 190 C266 250 268 300 250 340 Z"
            fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <g fill="${c.c2}">
        <rect x="160" y="64" width="18" height="60" rx="9"/>
        <rect x="184" y="58" width="18" height="66" rx="9"/>
        <rect x="208" y="60" width="18" height="64" rx="9"/>
        <rect x="232" y="66" width="18" height="58" rx="9"/>
      </g>
      <path d="M150 250 L250 250 L252 290 L150 290 Z" fill="${c.c2}"/>
      <rect x="150" y="296" width="104" height="20" rx="10" fill="${c.c3}"/>
      <circle cx="200" cy="190" r="26" fill="none" stroke="${c.c3}" stroke-width="5"/>
      <path d="M100 196 L124 140" stroke="${c.c2}" stroke-width="8" stroke-linecap="round" fill="none"/>
    </g>`;
  },

  ball(c) {
    return `
    <g>
      <ellipse cx="200" cy="345" rx="110" ry="12" fill="rgba(0,0,0,.08)"/>
      <circle cx="200" cy="205" r="130" fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <polygon points="200,140 240,168 225,215 175,215 160,168" fill="${c.c2}"/>
      <polygon points="200,75 232,95 224,130 176,130 168,95" fill="${c.c3}" opacity=".9"/>
      <polygon points="310,170 322,210 300,245 268,228 278,185" fill="${c.c3}" opacity=".9"/>
      <polygon points="90,170 112,185 122,228 90,245 78,210" fill="${c.c3}" opacity=".9"/>
      <polygon points="150,300 190,290 230,300 218,330 162,330" fill="${c.c3}" opacity=".9"/>
      <g stroke="${c.c2}" stroke-width="4" fill="none" opacity=".7">
        <path d="M200 140 L200 130"/><path d="M240 168 L268 155"/><path d="M225 215 L240 250"/>
        <path d="M175 215 L160 250"/><path d="M160 168 L132 155"/>
      </g>
      <path d="M110 130 A120 120 0 0 1 180 82" stroke="#ffffff" stroke-width="10" fill="none"
            stroke-linecap="round" opacity=".45"/>
    </g>`;
  },

  shorts(c) {
    return `
    <g>
      <ellipse cx="200" cy="345" rx="120" ry="10" fill="rgba(0,0,0,.07)"/>
      <path d="M110 90 L290 90 L310 300 L230 312 L200 200 L170 312 L90 300 Z"
            fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <rect x="110" y="90" width="180" height="26" fill="${c.c2}"/>
      <path d="M290 240 L310 300 L230 312 L222 260 Z" fill="${c.c2}" opacity=".8"/>
      <path d="M110 240 L90 300 L170 312 L178 260 Z" fill="${c.c2}" opacity=".8"/>
      <circle cx="150" cy="160" r="16" fill="none" stroke="${c.c3}" stroke-width="4"/>
      <path d="M186 96 L214 96" stroke="${c.c3}" stroke-width="6" stroke-linecap="round"/>
    </g>`;
  },

  socks(c) {
    return `
    <g>
      <ellipse cx="205" cy="350" rx="110" ry="10" fill="rgba(0,0,0,.07)"/>
      <path d="M150 60 L250 60 L250 220 C250 240 262 252 280 262 C304 274 312 300 298 322
               C284 342 254 348 232 334 L160 290 C152 284 150 276 150 266 Z"
            fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <rect x="150" y="60" width="100" height="34" fill="${c.c2}"/>
      <rect x="150" y="104" width="100" height="12" fill="${c.c3}"/>
      <rect x="150" y="126" width="100" height="12" fill="${c.c3}"/>
      <path d="M232 334 C254 348 284 342 298 322 C306 308 306 294 298 282 L262 306 Z" fill="${c.c2}"/>
    </g>`;
  },

  bag(c) {
    return `
    <g>
      <ellipse cx="200" cy="340" rx="140" ry="12" fill="rgba(0,0,0,.08)"/>
      <rect x="60" y="170" width="280" height="150" rx="28" fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <path d="M120 170 C120 120 150 96 200 96 C250 96 280 120 280 170" fill="none"
            stroke="${c.c2}" stroke-width="14" stroke-linecap="round"/>
      <rect x="60" y="210" width="280" height="34" fill="${c.c2}"/>
      <rect x="150" y="200" width="100" height="54" rx="10" fill="${c.c3}"/>
      <text x="200" y="236" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold"
            font-size="22" fill="${c.c1}">GOL</text>
      <rect x="84" y="284" width="90" height="12" rx="6" fill="${c.c3}" opacity=".7"/>
    </g>`;
  },

  shin(c) {
    return `
    <g>
      <ellipse cx="200" cy="345" rx="110" ry="10" fill="rgba(0,0,0,.07)"/>
      <path d="M130 80 C170 60 230 60 270 80 C280 130 280 220 255 300 C240 330 160 330 145 300 C120 220 120 130 130 80 Z"
            fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <path d="M148 96 C180 82 220 82 252 96 C258 136 258 210 240 276 C230 296 170 296 160 276 C142 210 142 136 148 96 Z"
            fill="${c.c2}" opacity=".9"/>
      <g stroke="${c.c3}" stroke-width="5" fill="none" opacity=".85">
        <path d="M160 130 C186 120 214 120 240 130"/>
        <path d="M158 170 C186 160 214 160 242 170"/>
        <path d="M160 210 C186 200 214 200 240 210"/>
      </g>
      <rect x="150" y="52" width="100" height="18" rx="9" fill="${c.c3}"/>
    </g>`;
  },

  cone(c) {
    return `
    <g>
      <ellipse cx="200" cy="345" rx="130" ry="12" fill="rgba(0,0,0,.08)"/>
      <path d="M200 70 L280 310 L120 310 Z" fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <path d="M172 154 L228 154 L242 196 L158 196 Z" fill="#ffffff"/>
      <path d="M148 226 L252 226 L266 268 L134 268 Z" fill="#ffffff"/>
      <rect x="96" y="306" width="208" height="24" rx="10" fill="${c.c2}"/>
      <circle cx="330" cy="290" r="34" fill="${c.c3}" stroke="#0002" stroke-width="2"/>
      <path d="M310 280 A26 26 0 0 1 344 274" stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".6"/>
    </g>`;
  },

  tracksuit(c) {
    return `
    <g>
      <ellipse cx="200" cy="352" rx="130" ry="10" fill="rgba(0,0,0,.07)"/>
      <path d="M150 70 L120 84 L84 150 L122 172 L130 152 L130 330 L270 330 L270 152 L278 172 L316 150 L280 84 L250 70
               C238 88 218 96 200 96 C182 96 162 88 150 70 Z"
            fill="${c.c1}" stroke="#0002" stroke-width="2"/>
      <path d="M150 70 C162 88 182 96 200 96 C218 96 238 88 250 70 L236 62 C226 74 214 80 200 80 C186 80 174 74 164 62 Z"
            fill="${c.c2}"/>
      <path d="M198 96 L198 330 L202 330 L202 96 Z" fill="${c.c2}"/>
      <circle cx="200" cy="96" r="7" fill="${c.c3}"/>
      <path d="M84 150 L122 172 L130 152 L130 128 L102 110 Z" fill="${c.c2}" opacity=".85"/>
      <path d="M316 150 L278 172 L270 152 L270 128 L298 110 Z" fill="${c.c2}" opacity=".85"/>
      <rect x="152" y="182" width="34" height="8" rx="4" fill="${c.c3}"/>
      <rect x="152" y="198" width="34" height="8" rx="4" fill="${c.c3}"/>
    </g>`;
  }
};

function productSVG(p, bg) {
  const drawer = SVG_DRAWERS[p.type] || SVG_DRAWERS.ball;
  return svgWrap(drawer(p.img), bg);
}

function productImgSrc(p, bg) {
  return "data:image/svg+xml," + encodeURIComponent(productSVG(p, bg));
}

/* Ikony kategorii do mega-menu / kafli */
const CAT_ICONS = {
  boot: `<path d="M3 16c.2-2.4 2-3.2 3.6-3.8 1.9-.7 3-2.4 3.5-4 .4-1.1 1.3-1.5 2.2-1.2.9.3 1.2 1 1.1 2.1l-.2 3.3c2 .8 4.2 1.9 4.3 3.5V17H3Z M3 18h18v1.4H3Z" fill="currentColor"/>`,
  shirt: `<path d="M8 3 5.5 4.2 3 8.5l3 1.8.7-1.5V20h10.6V8.8l.7 1.5 3-1.8-2.5-4.3L16 3c-.9 1.3-2.4 2-4 2s-3.1-.7-4-2Z" fill="currentColor"/>`,
  glove: `<path d="M9 21v-7c0-.6-.4-.8-1-.6l-1.4.6c-.7.3-1.2-.2-1-.9l1.7-3.8C7.7 8.5 8.4 8 9.2 8l.2-1.1C9.5 5.8 10.3 5 11.3 5h2.6c1 0 1.7.7 1.7 1.7l.2 5.9c.1 3.4.2 6-1 8.4Z" fill="currentColor"/>`,
  ball: `<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.5 2.9 2.1-1.1 3.4H10.2L9.1 8.6Zm-7 5.2 2.6-1.9 2 1.5-.8 3.2H5.9A8 8 0 0 1 5 11.7Zm4.2 7.6 1-2.9h3.6l1 2.9a8 8 0 0 1-5.6 0Zm8.9-4.8h-2.9l-.8-3.2 2-1.5 2.6 1.9a8 8 0 0 1-.9 2.8Z" fill="currentColor"/>`,
  bag: `<path d="M4 9h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2Zm4 0c0-2.8 1.6-4.5 4-4.5S16 6.2 16 9h-1.8c0-1.9-.9-2.8-2.2-2.8S9.8 7.1 9.8 9Zm-6 3.5h20V15H2Z" fill="currentColor"/>`,
  sale: `<path d="m20.6 12.7-8-8A2 2 0 0 0 11.2 4H5a1 1 0 0 0-1 1v6.2c0 .5.2 1 .6 1.4l8 8a2 2 0 0 0 2.8 0l5.2-5.2a2 2 0 0 0 0-2.7ZM8 9.5A1.5 1.5 0 1 1 9.5 8 1.5 1.5 0 0 1 8 9.5Z" fill="currentColor"/>`
};
