// 2. STATIC GAME ASSETS DEFINITION
const AVATARS = [
  { id: 'trainer_leo', name: 'Leo', desc: '¡Gira con valentía!', img: '👦' },
  { id: 'trainer_chloe', name: 'Chloe', desc: '¡Matemáticas y velocidad!', img: '👧' },
  { id: 'trainer_kael', name: 'Kael', desc: 'El estratega de fuego.', img: '🧒' },
  { id: 'trainer_yuki', name: 'Yuki', desc: 'Concentración y calma.', img: '🧒' }
];

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM AVATAR OPTION DEFINITIONS
// Each piece is an SVG fragment drawn into a 100×100 viewBox.
// Layer order (bottom→top): neck, back-hair, head, ears, face-shading,
//   expression (brows+eyes+nose+mouth+blush), front-hair, hat, glasses
// ─────────────────────────────────────────────────────────────────────────────
const AVATAR_OPTIONS = {

  // ── EXPRESSIONS ──────────────────────────────────────────────────────────
  expression: [
    {
      id: 'alegre', name: 'Alegre', icon: '😄',
      // Eyebrows gentle arc, large sparkling eyes, big smile, rosy cheeks
      svg: `
        <!-- Eyebrows – gentle upward arch -->
        <path d="M33,36 Q38,33 43,36" fill="none" stroke="#5a3a1a" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M57,36 Q62,33 67,36" fill="none" stroke="#5a3a1a" stroke-width="2.2" stroke-linecap="round"/>
        <!-- Eye whites -->
        <ellipse cx="38" cy="44" rx="6" ry="6.5" fill="#fff"/>
        <ellipse cx="62" cy="44" rx="6" ry="6.5" fill="#fff"/>
        <!-- Iris gradient left -->
        <defs>
          <radialGradient id="iris-l-al" cx="40%" cy="35%">
            <stop offset="0%" stop-color="#6ee7f7"/>
            <stop offset="55%" stop-color="#0ea5e9"/>
            <stop offset="100%" stop-color="#0369a1"/>
          </radialGradient>
          <radialGradient id="iris-r-al" cx="40%" cy="35%">
            <stop offset="0%" stop-color="#6ee7f7"/>
            <stop offset="55%" stop-color="#0ea5e9"/>
            <stop offset="100%" stop-color="#0369a1"/>
          </radialGradient>
        </defs>
        <ellipse cx="38" cy="44.5" rx="4.5" ry="5" fill="url(#iris-l-al)"/>
        <ellipse cx="62" cy="44.5" rx="4.5" ry="5" fill="url(#iris-r-al)"/>
        <!-- Pupils -->
        <ellipse cx="38.5" cy="45" rx="2.2" ry="2.8" fill="#0a0a0a"/>
        <ellipse cx="62.5" cy="45" rx="2.2" ry="2.8" fill="#0a0a0a"/>
        <!-- Specular highlights -->
        <ellipse cx="36.5" cy="42.5" rx="1.3" ry="1.6" fill="rgba(255,255,255,0.9)"/>
        <ellipse cx="60.5" cy="42.5" rx="1.3" ry="1.6" fill="rgba(255,255,255,0.9)"/>
        <ellipse cx="40" cy="47" rx="0.6" ry="0.7" fill="rgba(255,255,255,0.5)"/>
        <ellipse cx="64" cy="47" rx="0.6" ry="0.7" fill="rgba(255,255,255,0.5)"/>
        <!-- Upper eyelid shadow -->
        <path d="M32,41 Q38,39 44,41" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M56,41 Q62,39 68,41" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Lower lashes -->
        <path d="M32,47 Q38,49.5 44,47" fill="none" stroke="#333" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M56,47 Q62,49.5 68,47" fill="none" stroke="#333" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Rosy cheeks -->
        <ellipse cx="30" cy="54" rx="5" ry="3.5" fill="#ff6b9d" opacity="0.28"/>
        <ellipse cx="70" cy="54" rx="5" ry="3.5" fill="#ff6b9d" opacity="0.28"/>
        <!-- Nose -->
        <path d="M48,50 Q50,53 52,50" fill="none" stroke="#c68642" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
        <!-- Big happy smile -->
        <path d="M40,58 Q50,67 60,58" fill="none" stroke="#333" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M40,58 Q50,64 60,58" fill="#ff8fab" opacity="0.4"/>
        <!-- Teeth hint -->
        <path d="M43,58.5 Q50,64 57,58.5" fill="#fff" opacity="0.8"/>
      `
    },
    {
      id: 'serio', name: 'Serio', icon: '😐',
      svg: `
        <!-- Eyebrows – flat determined -->
        <path d="M32,35 L43,36" fill="none" stroke="#4a2e0a" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M57,36 L68,35" fill="none" stroke="#4a2e0a" stroke-width="2.5" stroke-linecap="round"/>
        <!-- Eye whites narrower -->
        <ellipse cx="38" cy="44" rx="5.5" ry="5" fill="#fff"/>
        <ellipse cx="62" cy="44" rx="5.5" ry="5" fill="#fff"/>
        <defs>
          <radialGradient id="iris-l-ser" cx="40%" cy="35%">
            <stop offset="0%" stop-color="#86efac"/>
            <stop offset="55%" stop-color="#16a34a"/>
            <stop offset="100%" stop-color="#064e3b"/>
          </radialGradient>
          <radialGradient id="iris-r-ser" cx="40%" cy="35%">
            <stop offset="0%" stop-color="#86efac"/>
            <stop offset="55%" stop-color="#16a34a"/>
            <stop offset="100%" stop-color="#064e3b"/>
          </radialGradient>
        </defs>
        <ellipse cx="38" cy="44.5" rx="4" ry="4.5" fill="url(#iris-l-ser)"/>
        <ellipse cx="62" cy="44.5" rx="4" ry="4.5" fill="url(#iris-r-ser)"/>
        <ellipse cx="38.5" cy="45" rx="2" ry="2.5" fill="#050505"/>
        <ellipse cx="62.5" cy="45" rx="2" ry="2.5" fill="#050505"/>
        <ellipse cx="37" cy="43" rx="1.2" ry="1.5" fill="rgba(255,255,255,0.9)"/>
        <ellipse cx="61" cy="43" rx="1.2" ry="1.5" fill="rgba(255,255,255,0.9)"/>
        <!-- Upper eyelid half-lid serious look -->
        <path d="M32.5,41.5 Q38,38.5 43.5,41.5" fill="rgba(50,30,10,0.18)" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
        <path d="M56.5,41.5 Q62,38.5 67.5,41.5" fill="rgba(50,30,10,0.18)" stroke="rgba(0,0,0,0.15)" stroke-width="1.5"/>
        <!-- Lower lashes -->
        <path d="M32.5,47 Q38,49 43.5,47" fill="none" stroke="#333" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M56.5,47 Q62,49 67.5,47" fill="none" stroke="#333" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Nose -->
        <path d="M48,50 Q50,53 52,50" fill="none" stroke="#c68642" stroke-width="1.4" stroke-linecap="round" opacity="0.6"/>
        <!-- Flat mouth -->
        <path d="M42,59 L58,59" stroke="#444" stroke-width="2.2" stroke-linecap="round"/>
      `
    },
    {
      id: 'retador', name: 'Retador', icon: '😏',
      svg: `
        <!-- Left brow: arched up (confident), Right brow: raised high (wink) -->
        <path d="M32,34 Q38,30 43,34" fill="none" stroke="#3d2408" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M57,31 Q62,28 67,32" fill="none" stroke="#3d2408" stroke-width="2.3" stroke-linecap="round"/>
        <!-- Left eye open strong -->
        <ellipse cx="38" cy="44" rx="6" ry="6" fill="#fff"/>
        <defs>
          <radialGradient id="iris-l-ret" cx="38%" cy="32%">
            <stop offset="0%" stop-color="#fde68a"/>
            <stop offset="50%" stop-color="#d97706"/>
            <stop offset="100%" stop-color="#7c2d12"/>
          </radialGradient>
        </defs>
        <ellipse cx="38" cy="44.5" rx="4.5" ry="5" fill="url(#iris-l-ret)"/>
        <ellipse cx="38.5" cy="45" rx="2.2" ry="2.8" fill="#090909"/>
        <ellipse cx="36.8" cy="42.5" rx="1.3" ry="1.6" fill="rgba(255,255,255,0.9)"/>
        <ellipse cx="40" cy="47" rx="0.55" ry="0.65" fill="rgba(255,255,255,0.5)"/>
        <!-- Upper eyelid left -->
        <path d="M32,41 Q38,38.5 44,41" fill="rgba(50,20,0,0.15)" stroke="rgba(0,0,0,0.13)" stroke-width="1.5"/>
        <!-- Winking right eye – shut with curve -->
        <path d="M56,44 Q62,40 68,44" fill="none" stroke="#333" stroke-width="3" stroke-linecap="round"/>
        <path d="M57,45.5 Q62,47 67,45.5" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>
        <!-- Lower lashes left -->
        <path d="M32,47 Q38,49.5 44,47" fill="none" stroke="#333" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Rosy blush left only (cocky look) -->
        <ellipse cx="29" cy="53" rx="4.5" ry="3" fill="#ff6b9d" opacity="0.22"/>
        <!-- Nose -->
        <path d="M48,50 Q50,53 52,50" fill="none" stroke="#c68642" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
        <!-- Smirk – asymmetric smile right side higher -->
        <path d="M42,60 Q52,56 60,61" fill="none" stroke="#333" stroke-width="2.2" stroke-linecap="round"/>
      `
    },
    {
      id: 'timido', name: 'Tímido', icon: '😳',
      svg: `
        <!-- Eyebrows – tilted inward nervously -->
        <path d="M33,37 Q37,35 42,37.5" fill="none" stroke="#5a3a1a" stroke-width="2" stroke-linecap="round"/>
        <path d="M58,37.5 Q63,35 67,37" fill="none" stroke="#5a3a1a" stroke-width="2" stroke-linecap="round"/>
        <!-- Wide round surprised eyes -->
        <ellipse cx="38" cy="45" rx="7" ry="7" fill="#fff"/>
        <ellipse cx="62" cy="45" rx="7" ry="7" fill="#fff"/>
        <defs>
          <radialGradient id="iris-l-tim" cx="40%" cy="35%">
            <stop offset="0%" stop-color="#f0abfc"/>
            <stop offset="50%" stop-color="#a855f7"/>
            <stop offset="100%" stop-color="#581c87"/>
          </radialGradient>
          <radialGradient id="iris-r-tim" cx="40%" cy="35%">
            <stop offset="0%" stop-color="#f0abfc"/>
            <stop offset="50%" stop-color="#a855f7"/>
            <stop offset="100%" stop-color="#581c87"/>
          </radialGradient>
        </defs>
        <ellipse cx="38" cy="45" rx="5.5" ry="5.5" fill="url(#iris-l-tim)"/>
        <ellipse cx="62" cy="45" rx="5.5" ry="5.5" fill="url(#iris-r-tim)"/>
        <ellipse cx="38" cy="45" rx="2.8" ry="3.2" fill="#060606"/>
        <ellipse cx="62" cy="45" rx="2.8" ry="3.2" fill="#060606"/>
        <!-- Large double highlights -->
        <ellipse cx="35.8" cy="42.5" rx="1.8" ry="2.2" fill="rgba(255,255,255,0.95)"/>
        <ellipse cx="59.8" cy="42.5" rx="1.8" ry="2.2" fill="rgba(255,255,255,0.95)"/>
        <ellipse cx="40.5" cy="47.5" rx="0.9" ry="1" fill="rgba(255,255,255,0.55)"/>
        <ellipse cx="64.5" cy="47.5" rx="0.9" ry="1" fill="rgba(255,255,255,0.55)"/>
        <!-- Heavy blush both sides -->
        <ellipse cx="26" cy="55" rx="7" ry="4.5" fill="#ff4d8d" opacity="0.38"/>
        <ellipse cx="74" cy="55" rx="7" ry="4.5" fill="#ff4d8d" opacity="0.38"/>
        <!-- Small shine lines on blush -->
        <line x1="21" y1="53.5" x2="22.5" y2="55" stroke="rgba(255,255,255,0.45)" stroke-width="1" stroke-linecap="round"/>
        <line x1="23" y1="56.5" x2="24" y2="57.8" stroke="rgba(255,255,255,0.35)" stroke-width="0.8" stroke-linecap="round"/>
        <!-- Nose -->
        <path d="M48,52 Q50,55 52,52" fill="none" stroke="#c68642" stroke-width="1.4" stroke-linecap="round" opacity="0.7"/>
        <!-- Nervous wavy small mouth -->
        <path d="M44,61 Q47,59 50,61 Q53,63 56,61" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round"/>
      `
    }
  ],

  // ── HAIR STYLES ──────────────────────────────────────────────────────────
  hairStyle: [
    {
      id: 'puntiagudo', name: 'Puntiagudo', icon: '⚡',
      // Spiky anime hair – multiple sharp spikes radiating outward, glossy
      path: (color) => {
        // Derive a darker shade for shadow and lighter for highlight
        return `
          <defs>
            <linearGradient id="hair-spike" x1="0%" y1="0%" x2="60%" y2="100%">
              <stop offset="0%" stop-color="${_lighten(color, 0.45)}"/>
              <stop offset="40%" stop-color="${color}"/>
              <stop offset="100%" stop-color="${_darken(color, 0.45)}"/>
            </linearGradient>
          </defs>
          <!-- Main spike crown – drawn as a star-like path with thick base -->
          <path d="M50,8 L56,22 L65,12 L60,27 L73,18 L64,32 L78,29 L67,40 L80,42
                   L70,48 L74,62 L63,50 L62,65 L55,50 L50,68 L45,50 L38,65 L37,50
                   L26,62 L30,48 L20,42 L33,40 L22,29 L36,32 L27,18 L40,27 L35,12
                   L44,22 Z"
                fill="url(#hair-spike)" stroke="${_darken(color,0.5)}" stroke-width="1.5" stroke-linejoin="round"/>
          <!-- Specular gloss ring on top spike -->
          <ellipse cx="50" cy="18" rx="4.5" ry="2.5" fill="rgba(255,255,255,0.45)" transform="rotate(-15,50,18)"/>
          <!-- Secondary highlight streak -->
          <path d="M44,14 Q47,10 50,13" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="1.8" stroke-linecap="round"/>
        `;
      }
    },
    {
      id: 'melena', name: 'Melena', icon: '💇',
      // Long flowing hair, layered bangs, side locks, back volume
      path: (color) => `
        <defs>
          <linearGradient id="hair-mel" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stop-color="${_lighten(color, 0.4)}"/>
            <stop offset="35%" stop-color="${color}"/>
            <stop offset="100%" stop-color="${_darken(color, 0.5)}"/>
          </linearGradient>
        </defs>
        <!-- Back volume (rendered behind head) -->
        <path d="M24,35 Q16,15 50,12 Q84,15 76,35 L82,85 L70,80 L68,60 L65,40
                 L60,28 L40,28 L35,40 L32,60 L30,80 L18,85 Z"
              fill="url(#hair-mel)" stroke="${_darken(color,0.45)}" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Side wisps -->
        <path d="M19,75 Q10,82 14,92 Q20,88 24,78" fill="${_darken(color,0.3)}" stroke="${_darken(color,0.5)}" stroke-width="1"/>
        <path d="M81,75 Q90,82 86,92 Q80,88 76,78" fill="${_darken(color,0.3)}" stroke="${_darken(color,0.5)}" stroke-width="1"/>
        <!-- Gloss -->
        <ellipse cx="50" cy="16" rx="12" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-5,50,16)"/>
        <path d="M40,14 Q50,10 60,14" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2" stroke-linecap="round"/>
      `
    },
    {
      id: 'corto', name: 'Corto', icon: '🧒',
      path: (color) => `
        <defs>
          <linearGradient id="hair-cor" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stop-color="${_lighten(color, 0.4)}"/>
            <stop offset="45%" stop-color="${color}"/>
            <stop offset="100%" stop-color="${_darken(color, 0.45)}"/>
          </linearGradient>
        </defs>
        <!-- Main cap -->
        <path d="M26,36 Q26,13 50,13 Q74,13 74,36 L76,48 L68,45 L70,36
                 L65,24 L50,21 L35,24 L30,36 L32,45 L24,48 Z"
              fill="url(#hair-cor)" stroke="${_darken(color,0.45)}" stroke-width="1.8" stroke-linejoin="round"/>
        <!-- Front bangs overlapping forehead -->
        <path d="M30,35 Q33,27 40,31 Q44,24 50,28 Q56,24 60,31 Q67,27 70,35
                 L68,38 Q60,30 55,34 Q52,28 50,31 Q48,28 45,34 Q40,30 32,38 Z"
              fill="${_darken(color,0.12)}" stroke="${_darken(color,0.5)}" stroke-width="1.2"/>
        <!-- Gloss -->
        <ellipse cx="50" cy="18" rx="10" ry="4" fill="rgba(255,255,255,0.32)" transform="rotate(-3,50,18)"/>
        <path d="M42,15 Q50,11 58,15" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="1.8" stroke-linecap="round"/>
      `
    },
    {
      id: 'coletas', name: 'Coletas', icon: '👧',
      path: (color) => `
        <defs>
          <linearGradient id="hair-col" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stop-color="${_lighten(color, 0.4)}"/>
            <stop offset="40%" stop-color="${color}"/>
            <stop offset="100%" stop-color="${_darken(color, 0.5)}"/>
          </linearGradient>
          <radialGradient id="hair-col-bun" cx="50%" cy="30%">
            <stop offset="0%" stop-color="${_lighten(color, 0.35)}"/>
            <stop offset="100%" stop-color="${_darken(color, 0.35)}"/>
          </radialGradient>
        </defs>
        <!-- Top cap -->
        <path d="M30,34 Q30,16 50,16 Q70,16 70,34 L72,42 L64,40 L66,34 L62,26
                 L38,26 L34,34 L36,40 L28,42 Z"
              fill="url(#hair-col)" stroke="${_darken(color,0.45)}" stroke-width="1.8"/>
        <!-- Left bun -->
        <ellipse cx="19" cy="37" rx="11" ry="12" fill="url(#hair-col-bun)" stroke="${_darken(color,0.5)}" stroke-width="1.5"/>
        <ellipse cx="17" cy="33" rx="3.5" ry="4.5" fill="rgba(255,255,255,0.28)"/>
        <!-- Right bun -->
        <ellipse cx="81" cy="37" rx="11" ry="12" fill="url(#hair-col-bun)" stroke="${_darken(color,0.5)}" stroke-width="1.5"/>
        <ellipse cx="79" cy="33" rx="3.5" ry="4.5" fill="rgba(255,255,255,0.28)"/>
        <!-- Bangs -->
        <path d="M30,34 Q34,26 42,30 Q46,24 50,28 Q54,24 58,30 Q66,26 70,34
                 L68,37 Q61,29 57,33 Q53,27 50,30 Q47,27 43,33 Q39,29 32,37 Z"
              fill="${_darken(color,0.15)}" stroke="${_darken(color,0.5)}" stroke-width="1.2"/>
        <!-- Gloss cap -->
        <ellipse cx="50" cy="20" rx="9" ry="4" fill="rgba(255,255,255,0.3)" transform="rotate(-4,50,20)"/>
      `
    }
  ],

  // ── HAIR COLORS ───────────────────────────────────────────────────────────
  hairColor: [
    { id: 'cyan',   name: 'Cian',     icon: '🔵', code: '#00e5ff' },
    { id: 'pink',   name: 'Fucsia',   icon: '🔴', code: '#f72585' },
    { id: 'yellow', name: 'Dorado',   icon: '🟡', code: '#f5c400' },
    { id: 'green',  name: 'Esmeralda',icon: '🟢', code: '#00e676' },
    { id: 'purple', name: 'Violeta',  icon: '🟣', code: '#9c27b0' }
  ],

  // ── HATS ─────────────────────────────────────────────────────────────────
  hat: [
    { id: 'ninguno', name: 'Sin Gorra', icon: '❌', svg: '' },
    {
      id: 'gorra', name: 'Gorra Spin', icon: '🧢',
      svg: `
        <defs>
          <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#e11d48"/>
            <stop offset="100%" stop-color="#9f1239"/>
          </linearGradient>
        </defs>
        <!-- Crown -->
        <path d="M26,31 Q28,14 50,14 Q72,14 74,31 L76,40 L68,37 L70,30
                 L64,21 L50,19 L36,21 L30,30 L32,37 L24,40 Z"
              fill="url(#cap-grad)" stroke="#7f1d1d" stroke-width="1.5"/>
        <!-- Brim (visor) -->
        <path d="M24,39 L76,39 L82,47 L18,47 Z"
              fill="#be123c" stroke="#7f1d1d" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Brim underside shadow -->
        <path d="M18,47 L82,47 L80,50 L20,50 Z" fill="rgba(0,0,0,0.25)"/>
        <!-- Crown button -->
        <circle cx="50" cy="17" r="3" fill="#fbbf24" stroke="#92400e" stroke-width="1"/>
        <!-- Logo circle on front panel -->
        <circle cx="50" cy="32" r="5.5" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
        <text x="50" y="35" text-anchor="middle" font-size="5" font-weight="bold" fill="#fbbf24" font-family="sans-serif">SA</text>
        <!-- Shine -->
        <path d="M35,21 Q45,15 55,20" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.8" stroke-linecap="round"/>
      `
    },
    {
      id: 'visera', name: 'Visera Neon', icon: '☀️',
      svg: `
        <defs>
          <linearGradient id="visor-gl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="rgba(0,240,255,0.75)"/>
            <stop offset="100%" stop-color="rgba(0,120,200,0.4)"/>
          </linearGradient>
        </defs>
        <!-- Headband base -->
        <rect x="26" y="28" width="48" height="8" rx="4" fill="#0f172a" stroke="#00e5ff" stroke-width="1.5"/>
        <!-- Brim transparent panel -->
        <path d="M22,36 L78,36 L83,45 L17,45 Z" fill="url(#visor-gl)" stroke="#00e5ff" stroke-width="1.5"/>
        <!-- Neon edge glow -->
        <path d="M17,45 L83,45" stroke="#00e5ff" stroke-width="1.5" filter="url(#neon-blur)"/>
        <!-- Inner shine on brim -->
        <path d="M25,38 L75,38" stroke="rgba(255,255,255,0.45)" stroke-width="1" stroke-linecap="round"/>
        <!-- Band side detail -->
        <circle cx="30" cy="32" r="2" fill="#00e5ff" opacity="0.7"/>
        <circle cx="70" cy="32" r="2" fill="#00e5ff" opacity="0.7"/>
        <rect x="32" y="30" width="36" height="4" rx="2" fill="rgba(255,255,255,0.08)"/>
      `
    },
    {
      id: 'banda', name: 'Banda Ninja', icon: '🥋',
      svg: `
        <!-- Main headband -->
        <rect x="24" y="30" width="52" height="9" rx="3" fill="#1e293b" stroke="#e2e8f0" stroke-width="1.5"/>
        <!-- Red accent stripe -->
        <rect x="24" y="33.5" width="52" height="2.5" fill="#ef4444" opacity="0.8"/>
        <!-- Center metal plate -->
        <rect x="42" y="28" width="16" height="12" rx="2" fill="#94a3b8" stroke="#64748b" stroke-width="1.2"/>
        <rect x="43" y="29" width="14" height="10" rx="1.5" fill="rgba(255,255,255,0.15)"/>
        <!-- Engraved spiral symbol -->
        <path d="M50,31 Q54,32 53,35 Q52,38 49,37 Q46,36 47,33 Q48,31 50,31"
              fill="none" stroke="#1e293b" stroke-width="1.2" stroke-linecap="round"/>
        <!-- Trailing knot ribbons -->
        <path d="M76,33 Q84,30 88,37 Q84,42 80,38 L78,36" fill="#1e293b" stroke="#e2e8f0" stroke-width="1"/>
        <path d="M76,37 Q85,43 82,50 Q78,48 79,43" fill="#1e293b" stroke="#e2e8f0" stroke-width="1"/>
        <!-- Shine -->
        <path d="M28,31.5 Q50,29 72,31.5" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" stroke-linecap="round"/>
      `
    }
  ],

  // ── GLASSES ───────────────────────────────────────────────────────────────
  glasses: [
    { id: 'ningunas', name: 'Sin Gafas', icon: '❌', svg: '' },
    {
      id: 'combate', name: 'Visor Táctico', icon: '🕶️',
      svg: `
        <defs>
          <filter id="neon-glow-c" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- Full-width visor lens -->
        <rect x="26" y="41" width="48" height="10" rx="3"
              fill="rgba(0,229,255,0.22)" stroke="#00e5ff" stroke-width="1.5"
              filter="url(#neon-glow-c)"/>
        <!-- Inner lens gradient shine -->
        <rect x="27" y="42" width="46" height="4" rx="2" fill="rgba(255,255,255,0.18)"/>
        <!-- Vertical bridge -->
        <rect x="48.5" y="41" width="3" height="10" fill="#00e5ff" opacity="0.4"/>
        <!-- Side arms -->
        <line x1="26" y1="46" x2="18" y2="45" stroke="#00e5ff" stroke-width="2" stroke-linecap="round"/>
        <line x1="74" y1="46" x2="82" y2="45" stroke="#00e5ff" stroke-width="2" stroke-linecap="round"/>
        <!-- Scan line effect -->
        <line x1="27" y1="47" x2="73" y2="47" stroke="rgba(255,255,255,0.2)" stroke-width="0.8" stroke-dasharray="4 3"/>
        <!-- Corner details -->
        <rect x="26" y="41" width="4" height="4" rx="1" fill="none" stroke="#00e5ff" stroke-width="1"/>
        <rect x="70" y="41" width="4" height="4" rx="1" fill="none" stroke="#00e5ff" stroke-width="1"/>
      `
    },
    {
      id: 'visor', name: 'Monóculo Holo', icon: '👁️',
      svg: `
        <defs>
          <radialGradient id="mono-grd" cx="45%" cy="40%">
            <stop offset="0%" stop-color="rgba(255,0,100,0.55)"/>
            <stop offset="100%" stop-color="rgba(200,0,80,0.15)"/>
          </radialGradient>
          <filter id="neon-glow-m" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- Monocle circle right eye -->
        <circle cx="62" cy="44" r="10" fill="url(#mono-grd)"
                stroke="#f43f5e" stroke-width="2" filter="url(#neon-glow-m)"/>
        <!-- Inner lens shine -->
        <ellipse cx="59" cy="41" rx="3.5" ry="3" fill="rgba(255,255,255,0.3)" transform="rotate(-15,59,41)"/>
        <!-- Holographic scan lines -->
        <line x1="53" y1="44" x2="71" y2="44" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>
        <line x1="53" y1="46" x2="71" y2="46" stroke="rgba(255,255,255,0.15)" stroke-width="0.6"/>
        <!-- Frame bridge from left to monocle -->
        <path d="M44,44 Q53,44 52,44" stroke="#f43f5e" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- Temple arm right -->
        <line x1="72" y1="44" x2="82" y2="43" stroke="#f43f5e" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Tiny tech corner screws -->
        <circle cx="54" cy="36" r="1" fill="#f43f5e"/>
        <circle cx="70" cy="36" r="1" fill="#f43f5e"/>
        <circle cx="54" cy="52" r="1" fill="#f43f5e"/>
        <circle cx="70" cy="52" r="1" fill="#f43f5e"/>
      `
    },
    {
      id: 'sol', name: 'Gafas Sport', icon: '🕶️',
      svg: `
        <!-- Left lens: sporty trapezoidal -->
        <path d="M28,41 L46,41 Q47,41 47,43 L44,50 Q43,51 42,51 L30,51 Q28,51 27,49 Z"
              fill="rgba(15,15,30,0.88)" stroke="#e2e8f0" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Right lens -->
        <path d="M54,41 L72,41 Q74,41 73,49 L71,51 Q70,51 58,51 Q57,51 56,50 L53,43 Q53,41 54,41 Z"
              fill="rgba(15,15,30,0.88)" stroke="#e2e8f0" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Bridge -->
        <path d="M47,44 L53,44" stroke="#e2e8f0" stroke-width="1.8" stroke-linecap="round"/>
        <!-- Lens shine left -->
        <path d="M31,43 Q35,41.5 43,43" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-linecap="round"/>
        <!-- Lens shine right -->
        <path d="M56,43 Q60,41.5 70,43" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.4" stroke-linecap="round"/>
        <!-- Frame arms -->
        <line x1="27" y1="45" x2="18" y2="44" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
        <line x1="73" y1="45" x2="82" y2="44" stroke="#cbd5e1" stroke-width="2" stroke-linecap="round"/>
        <!-- Neon accent strips on top frame -->
        <line x1="28" y1="41" x2="46" y2="41" stroke="#22d3ee" stroke-width="1.2" opacity="0.7"/>
        <line x1="54" y1="41" x2="72" y2="41" stroke="#22d3ee" stroke-width="1.2" opacity="0.7"/>
      `
    }
  ]
};

// ─────────────────────────────────────────────────────────────────────────────
// COLOUR UTILITY HELPERS (inline – no external library needed)
// ─────────────────────────────────────────────────────────────────────────────
function _hexToRgb(hex) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function _rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(v => Math.min(255, Math.max(0, Math.round(v))).toString(16).padStart(2, '0')).join('');
}
function _lighten(hex, amount) {
  const [r, g, b] = _hexToRgb(hex);
  return _rgbToHex(r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount);
}
function _darken(hex, amount) {
  const [r, g, b] = _hexToRgb(hex);
  return _rgbToHex(r * (1 - amount), g * (1 - amount), b * (1 - amount));
}

// ─────────────────────────────────────────────────────────────────────────────
// PREMIUM AVATAR SVG ASSEMBLER
// ─────────────────────────────────────────────────────────────────────────────
function generateAvatarSVG(opts) {
  const defaults = { expression: 'alegre', hairStyle: 'corto', hairColor: 'cyan', hat: 'ninguno', glasses: 'ningunas' };
  const cfg = Object.assign({}, defaults, opts || {});

  const exprObj  = AVATAR_OPTIONS.expression.find(e => e.id === cfg.expression)  || AVATAR_OPTIONS.expression[0];
  const hairObj  = AVATAR_OPTIONS.hairStyle.find(h => h.id === cfg.hairStyle)    || AVATAR_OPTIONS.hairStyle[2];
  const colorObj = AVATAR_OPTIONS.hairColor.find(c => c.id === cfg.hairColor)    || AVATAR_OPTIONS.hairColor[0];
  const hatObj   = AVATAR_OPTIONS.hat.find(h => h.id === cfg.hat)                || AVATAR_OPTIONS.hat[0];
  const glassObj = AVATAR_OPTIONS.glasses.find(g => g.id === cfg.glasses)        || AVATAR_OPTIONS.glasses[0];

  const skinBase  = '#fde7c9';
  const skinShade = '#f5c89a';
  const skinDeep  = '#e8a878';

  // For long hair, back volume is rendered before the head
  const isLongHair = cfg.hairStyle === 'melena';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" style="overflow:visible">
  <defs>
    <!-- Skin face gradient -->
    <radialGradient id="av-face" cx="45%" cy="38%">
      <stop offset="0%"   stop-color="${skinBase}"/>
      <stop offset="70%"  stop-color="${skinShade}"/>
      <stop offset="100%" stop-color="${skinDeep}"/>
    </radialGradient>
    <!-- Skin ear gradient -->
    <radialGradient id="av-ear" cx="40%" cy="40%">
      <stop offset="0%"   stop-color="${skinShade}"/>
      <stop offset="100%" stop-color="${skinDeep}"/>
    </radialGradient>
    <!-- Neck gradient -->
    <linearGradient id="av-neck" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${skinDeep}"/>
      <stop offset="40%"  stop-color="${skinShade}"/>
      <stop offset="100%" stop-color="${skinDeep}"/>
    </linearGradient>
    <!-- Shirt collar gradient -->
    <linearGradient id="av-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%"   stop-color="#1e1b4b"/>
      <stop offset="100%" stop-color="#0f0d2e"/>
    </linearGradient>
    <!-- Ambient glow ring -->
    <radialGradient id="av-glow" cx="50%" cy="50%">
      <stop offset="60%"  stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(0,229,255,0.18)"/>
    </radialGradient>
  </defs>

  <!-- ── Ambient glow ── -->
  <circle cx="50" cy="54" r="46" fill="url(#av-glow)"/>

  <!-- ── Shirt / collar ── -->
  <path d="M30,88 Q30,78 42,75 L50,78 L58,75 Q70,78 70,88 Q60,95 50,96 Q40,95 30,88 Z"
        fill="url(#av-shirt)" stroke="#312e81" stroke-width="1.2"/>
  <!-- Collar V-line -->
  <path d="M44,76 L50,82 L56,76" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-linejoin="round"/>

  <!-- ── Neck ── -->
  <rect x="43" y="67" width="14" height="14" rx="4" fill="url(#av-neck)" stroke="${skinDeep}" stroke-width="1"/>
  <!-- Neck shadow line -->
  <line x1="43" y1="72" x2="57" y2="72" stroke="${skinDeep}" stroke-width="1.5" opacity="0.5"/>

  <!-- ── Back hair (long styles only, rendered behind head) ── -->
  ${isLongHair ? hairObj.path(colorObj.code) : ''}

  <!-- ── Ears ── -->
  <ellipse cx="27" cy="50" rx="5" ry="6.5" fill="url(#av-ear)" stroke="${skinDeep}" stroke-width="1.2"/>
  <path d="M28,46 Q30,50 28,54" fill="none" stroke="${skinDeep}" stroke-width="1" opacity="0.6"/>
  <ellipse cx="73" cy="50" rx="5" ry="6.5" fill="url(#av-ear)" stroke="${skinDeep}" stroke-width="1.2"/>
  <path d="M72,46 Q70,50 72,54" fill="none" stroke="${skinDeep}" stroke-width="1" opacity="0.6"/>

  <!-- ── Face circle ── -->
  <circle cx="50" cy="50" r="24" fill="url(#av-face)" stroke="${skinDeep}" stroke-width="1.5"/>

  <!-- ── Face ambient shading ── -->
  <!-- Jaw shadow -->
  <ellipse cx="50" cy="69" rx="16" ry="5" fill="rgba(0,0,0,0.07)"/>
  <!-- Forehead subtle highlight -->
  <ellipse cx="50" cy="34" rx="11" ry="5" fill="rgba(255,255,255,0.18)"/>

  <!-- ── Expression (brows + eyes + nose + mouth + blush) ── -->
  ${exprObj.svg}

  <!-- ── Front / top hair ── -->
  ${!isLongHair ? hairObj.path(colorObj.code) : ''}

  <!-- ── Hat accessory ── -->
  ${hatObj.svg}

  <!-- ── Glasses accessory ── -->
  ${glassObj.svg}
</svg>`;
}


// ─────────────────────────────────────────────────────────────────────────────
// WEEKS, ATTACK NAMES & CUSTOM PARTS (unchanged)
// ─────────────────────────────────────────────────────────────────────────────
const WEEKS = [
  { week: 1,  name: "Arena de Pruebas",      detail: "Entrenamiento Básico",      rival: "Kael",        rivalImg: "🧒", target: "Concepto de multiplicación y sumas dobles" },
  { week: 2,  name: "Arena del Estanque",    detail: "Liga del 2",                rival: "Marina",      rivalImg: "🏄‍♀️", target: "Tabla del 2 y series de 2 en 2" },
  { week: 3,  name: "Arena Forestal",        detail: "Liga del 3",                rival: "Leo",         rivalImg: "👦", target: "Tabla del 3 y series de 3 en 3" },
  { week: 4,  name: "Arena del Volcán",      detail: "Liga del 4",                rival: "Ignis",       rivalImg: "🔥", target: "Tabla del 4 y cálculo de dobles" },
  { week: 5,  name: "Arena del Rayo",        detail: "Liga del 5",                rival: "Sparky",      rivalImg: "⚡", target: "Tabla del 5 y multiplicaciones por 10" },
  { week: 6,  name: "Arena Helada",          detail: "Liga del 6",                rival: "Yuki",        rivalImg: "❄️", target: "Tabla del 6 y series lógicas" },
  { week: 7,  name: "Arena del Desierto",    detail: "Liga del 7",                rival: "Samir",       rivalImg: "🐪", target: "Tabla del 7 y problemas sencillos" },
  { week: 8,  name: "Arena del Viento",      detail: "Liga del 8",                rival: "Zephyr",      rivalImg: "💨", target: "Tabla del 8 y series numéricas" },
  { week: 9,  name: "Arena de las Sombras",  detail: "Liga del 9",                rival: "Eclipse",     rivalImg: "🌑", target: "Tabla del 9 y trucos rápidos" },
  { week: 10, name: "Arena del Templo",      detail: "Tablas Mezcladas",          rival: "Master Shin", rivalImg: "🥋", target: "Tablas del 2 al 9 combinadas" },
  { week: 11, name: "Arena Tecnológica",     detail: "Desafío de Problemas",      rival: "Ada",         rivalImg: "⚙️", target: "Problemas prácticos de matemáticas" },
  { week: 12, name: "Arena Astral",          detail: "Gran Torneo Final",         rival: "Helios",      rivalImg: "👑", target: "Repaso integral de todo el verano" }
];

const ATTACK_NAMES = [
  "Giro Relámpago", "Torbellino Turbo", "Impacto Cometa", "Defensa Centella", "Espiral Dragón",
  "Ráfaga Solar", "Choque Meteoro", "Giro Fantasma", "Turbo Eclipse", "Explosión Estelar"
];

const BEYBLADE_ASSETS = {
  torre: "assets/torre/torre_x_del_conocimiento.png",
  personajesDir: "assets/personajes/",
  peonzasDir: "assets/peonzas/",
  estadiosDir: "assets/estadios/",
  estadiosFichasDir: "assets/estadios_fichas/"
};

function renderAssetFallback(type, expectedPath) {
  return `<div class="asset-fallback">Imagen pendiente: coloca ${expectedPath || type}</div>`;
}

function renderManagedAsset(path, altText, className) {
  return `<img class="${className || "managed-asset"}" src="${path}" alt="${altText || ""}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'asset-fallback',textContent:'Imagen pendiente: coloca ${path}'}))">`;
}

function renderAssetImage(path, altText, className = "asset-image") {
  return `<img class="${className}" src="${path}" alt="${altText || ""}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'asset-fallback',textContent:'Imagen pendiente: coloca ${path}'}))">`;
}

const BEYBLADE_CHARACTERS = [
  ["jaxonCross", "Jaxon Cross / Blader X", "Team Persona", "Rival de velocidad", "alta", "Sword Dran", "Matematicas", "#00f0ff", "assets/personajes/01_jaxon_cross_blader_x.png"],
  ["robinKazami", "Robin Kazami", "Team Persona", "Guia inicial", "baja", "Scythe Incendio", "Matematicas", "#f97316", "assets/personajes/02_robin_kazami.png"],
  ["multiNanairo", "Multi Nana-iro", "Team Persona", "Guia de estrategia", "media", "Arrow Wizard", "Lengua", "#ffea00", "assets/personajes/03_multi_nana_iro.png"],
  ["tenkaShiroboshi", "Tenka Shiroboshi", "Pendragon", "Guia de laboratorio", "alta", "Samurai Saber", "Medio", "#36f78e", "assets/personajes/04_tenka_shiroboshi.png"],
  ["khromeRyugu", "Khrome Ryugu", "Pendragon", "Rival final", "legendaria", "Cobalt Drake", "Retos mixtos", "#8b5cf6", "assets/personajes/05_khrome_ryugu.png"],
  ["sigridNanairo", "Sigrid Nana-iro", "Equipo Nanairo", "Precision", "media", "Unicorn Sting", "Ingles", "#22d3ee", "assets/personajes/06_sigrid_nana_iro.png"],
  ["cielKaminari", "Ciel Kaminari", "Zooganic", "Logica y problemas", "media", "Shark Edge", "Matematicas", "#38bdf8", "assets/personajes/07_ciel_kaminari.png"],
  ["burnFujiwara", "Burn Fujiwara", "Liga X", "Ataque tecnico", "alta", "Soar Phoenix", "Matematicas", "#f97316", "assets/personajes/08_burn_fujiwara.png"],
  ["yuniNanase", "Yuni Nanase", "Liga X", "Analisis", "media", "Rhino Horn", "Lengua", "#a78bfa", "assets/personajes/09_yuni_nanase.png"],
  ["takumiIshiyama", "Takumi Ishiyama", "Liga X", "Tecnica", "media", "Lance Knight", "Ingles", "#0ea5e9", "assets/personajes/10_takumi_ishiyama.png"],
  ["meiden", "Meiden", "Liga X", "Entrenadora", "media", "Wand Wizard", "Medio", "#14b8a6", "assets/personajes/11_meiden.png"],
  ["omegaShiroboshi", "Omega Shiroboshi", "Pendragon", "Prueba mixta", "legendaria", "Aero Pegasus", "Retos mixtos", "#eab308", "assets/personajes/12_omega_shiroboshi.png"],
  ["blazeFujiwara", "Blaze Fujiwara", "Liga X", "Impulso", "alta", "Impact Drake", "Matematicas", "#fb7185", "assets/personajes/13_blaze_fujiwara.png"],
  ["rexJura", "Rex Jura", "Zooganic", "Resistencia", "alta", "Tyranno Beat", "Movimiento", "#ef4444", "assets/personajes/14_rex_jura.png"],
  ["quinnManju", "Quinn Manju", "Liga X", "Concentracion", "media", "Viper Tail", "Lectura", "#ec4899", "assets/personajes/15_quinn_manju.png"],
  ["packun", "Packun", "Mascota", "Feedback infantil", "baja", "Arrow Wizard", "Habitos", "#22c55e", "assets/personajes/16_packun.png"],
  ["yokoKyubi", "Yoko Kyubi", "Zooganic", "Inferencias", "media", "Leon Claw", "Lengua", "#c084fc", "assets/personajes/17_yoko_kyubi.png"],
  ["ryuIsshin", "Ryu Isshin", "Liga X", "Disciplina", "media", "Shelter Drake", "Medio", "#60a5fa", "assets/personajes/18_ryu_isshin.png"],
  ["engaFugazaru", "Enga Fugazaru", "Liga X", "Agilidad", "media", "Rhino Horn", "Movimiento", "#84cc16", "assets/personajes/19_enga_fugazaru.png"],
  ["lantzRoji", "Lantz Roji", "Liga X", "Control", "media", "Silver Wolf", "Ingles", "#94a3b8", "assets/personajes/20_lantz_roji.png"],
  ["kadovar", "Kadovar", "Liga X", "Estrategia", "alta", "Cobalt Dragoon", "Retos mixtos", "#06b6d4", "assets/personajes/21_kadovar.png"],
  ["toguroOkunaga", "Toguro Okunaga", "Liga X", "Constancia", "media", "Helm Knight", "Matematicas", "#64748b", "assets/personajes/22_toguro_okunaga.png"],
  ["zonamos", "Zonamos", "Liga X", "Patrones", "media", "Chain Incendio", "Medio", "#facc15", "assets/personajes/23_zonamos.png"],
  ["niko", "Niko", "Liga X", "Apoyo y curiosidad", "baja", "Arrow Wizard", "Habitos", "#38bdf8", "assets/personajes/24_niko.png"]
].map(([id, nombre, equipo, rol, dificultad, beyAsociado, materiaRecomendada, colorPrincipal, image]) => ({
  id, nombre, equipo, rol, dificultad,
  fraseEntrada: "Responde, acelera y conquista la arena.",
  fraseVictoria: "Tu giro mental ha sido brutal.",
  fraseDerrota: "Buen intento. Recalibra y vuelve a lanzar.",
  beyAsociado, materiaRecomendada, colorPrincipal, image
}));

const BEYBLADE_X_CHARACTERS = BEYBLADE_CHARACTERS;

const BEYBLADE_BEYS = [
  ["swordDran", "Sword Dran", "ataque", "comun", 90, 45, 50, 95, 1, "Xtreme Slash", "Un Bey rapido para lanzar ataques potentes.", "Jaxon Cross / Blader X", "#00f0ff", "#ff0055", "assets/peonzas/01_sword_dran.png"],
  ["daggerDran", "Dagger Dran", "ataque", "rara", 86, 50, 55, 92, 11, "Dagger Rush", "Acelera con cortes precisos.", "Jaxon Cross / Blader X", "#38bdf8", "#f43f5e", "assets/peonzas/02_dagger_dran.png"],
  ["busterDran", "Buster Dran", "ataque", "epica", 96, 58, 54, 90, 25, "Buster Impact", "Golpea fuerte en duelos de ascenso.", "Jaxon Cross / Blader X", "#0ea5e9", "#f97316", "assets/peonzas/03_buster_dran.png"],
  ["scytheIncendio", "Scythe Incendio", "balance", "comun", 70, 65, 72, 72, 1, "Scythe Guard", "Equilibrado para aprender con calma.", "Robin Kazami", "#f97316", "#fde047", "assets/peonzas/04_scythe_incendio.png"],
  ["chainIncendio", "Chain Incendio", "defensa", "rara", 66, 80, 66, 64, 12, "Chain Wall", "Aguanta errores y permite remontar.", "Robin Kazami", "#fb923c", "#60a5fa", "assets/peonzas/05_chain_incendio.png"],
  ["hammerIncendio", "Hammer Incendio", "ataque", "epica", 92, 68, 58, 74, 28, "Hammer Burst", "Perfecto para problemas mixtos.", "Robin Kazami", "#ef4444", "#facc15", "assets/peonzas/06_hammer_incendio.png"],
  ["arrowWizard", "Arrow Wizard", "estamina", "comun", 52, 58, 92, 70, 1, "Arrow Focus", "Gira durante mas tiempo en repasos.", "Multi Nana-iro", "#22c55e", "#a3e635", "assets/peonzas/07_arrow_wizard.png"],
  ["wandWizard", "Wand Wizard", "estamina", "rara", 58, 62, 90, 70, 14, "Wand Spell", "Mantiene el foco en lectura e ingles.", "Multi Nana-iro", "#84cc16", "#22d3ee", "assets/peonzas/08_wand_wizard.png"],
  ["helmKnight", "Helm Knight", "defensa", "comun", 48, 92, 70, 55, 1, "Knight Shield", "Defensa estable para empezar.", "Multi Nana-iro", "#2563eb", "#93c5fd", "assets/peonzas/09_helm_knight.png"],
  ["lanceKnight", "Lance Knight", "defensa", "rara", 64, 88, 68, 66, 16, "Lance Guard", "Controla duelos tecnicos.", "Multi Nana-iro", "#1d4ed8", "#f8fafc", "assets/peonzas/10_lance_knight.png"],
  ["soarPhoenix", "Soar Phoenix", "balance", "epica", 85, 72, 72, 84, 24, "Phoenix Rise", "Recupera energia al encadenar aciertos.", "Burn Fujiwara", "#f97316", "#fde047", "assets/peonzas/11_soar_phoenix.png"],
  ["sharkEdge", "Shark Edge", "ataque", "rara", 88, 48, 52, 90, 21, "Edge Bite", "Ideal para calculo rapido.", "Ciel Kaminari", "#06b6d4", "#e0f2fe", "assets/peonzas/12_shark_edge.png"],
  ["leonClaw", "Leon Claw", "balance", "rara", 78, 74, 70, 72, 23, "Claw Roar", "Ayuda en inferencias y retos de lectura.", "Yoko Kyubi", "#f59e0b", "#7c2d12", "assets/peonzas/13_leon_claw.png"],
  ["viperTail", "Viper Tail", "estamina", "rara", 62, 66, 88, 78, 31, "Viper Curve", "Mantiene combos largos.", "Quinn Manju", "#a855f7", "#22c55e", "assets/peonzas/14_viper_tail.png"],
  ["unicornSting", "Unicorn Sting", "balance", "epica", 82, 76, 78, 82, 34, "Sting Focus", "Precision para ingles y concentracion.", "Sigrid Nana-iro", "#f0abfc", "#38bdf8", "assets/peonzas/15_unicorn_sting.png"],
  ["rhinoHorn", "Rhino Horn", "defensa", "rara", 70, 90, 62, 60, 36, "Horn Guard", "Resiste duelos largos.", "Enga Fugazaru", "#64748b", "#facc15", "assets/peonzas/16_rhino_horn.png"],
  ["tyrannoBeat", "Tyranno Beat", "ataque", "epica", 94, 70, 62, 82, 38, "Tyranno Beat", "Potencia para jefes intermedios.", "Rex Jura", "#ef4444", "#f97316", "assets/peonzas/17_tyranno_beat.png"],
  ["samuraiSaber", "Samurai Saber", "balance", "epica", 86, 78, 76, 80, 40, "Saber Focus", "Buen control en proyectos y medio.", "Tenka Shiroboshi", "#38bdf8", "#facc15", "assets/peonzas/18_samurai_saber.png"],
  ["cobaltDragoon", "Cobalt Dragoon", "ataque", "legendaria", 98, 82, 74, 96, 42, "Dragoon X", "Ataque legendario de tramo final.", "Kadovar", "#22d3ee", "#1e3a8a", "assets/peonzas/19_cobalt_dragoon.png"],
  ["cobaltDrake", "Cobalt Drake", "balance", "legendaria", 96, 88, 82, 90, 45, "Drake Over", "Control total para rivales finales.", "Khrome Ryugu", "#3b82f6", "#8b5cf6", "assets/peonzas/20_cobalt_drake.png"],
  ["shelterDrake", "Shelter Drake", "defensa", "legendaria", 78, 98, 86, 74, 46, "Shelter Wall", "Protege combos de repaso.", "Ryu Isshin", "#60a5fa", "#f8fafc", "assets/peonzas/21_shelter_drake.png"],
  ["impactDrake", "Impact Drake", "ataque", "legendaria", 99, 84, 74, 94, 47, "Impact Rush", "Carga final para problemas mixtos.", "Blaze Fujiwara", "#ef4444", "#38bdf8", "assets/peonzas/22_impact_drake.png"],
  ["aeroPegasus", "Aero Pegasus", "estamina", "legendaria", 84, 82, 98, 96, 49, "Aero Rise", "Giro sostenido hasta la cima.", "Omega Shiroboshi", "#e0f2fe", "#facc15", "assets/peonzas/23_aero_pegasus.png"],
  ["silverWolf", "Silver Wolf", "balance", "legendaria", 90, 90, 90, 88, 50, "Wolf Finish", "Recompensa de dominio de la X Tower.", "Lantz Roji", "#cbd5e1", "#8b5cf6", "assets/peonzas/24_silver_wolf.png"]
].map(([id, nombre, tipo, rareza, ataque, defensa, estamina, velocidad, nivelRequerido, habilidad, descripcion, personajeAsociado, colorPrincipal, colorSecundario, image]) => ({
  id, nombre, tipo, rareza, ataque, defensa, estamina, velocidad, nivelRequerido, habilidad, descripcion,
  personajeAsociado, colorPrincipal, colorSecundario, image
}));

const BEYBLADE_X_BEYS = BEYBLADE_BEYS;

const NEW_AVATAR_FILES = [
  "Arce.png",
  "Bariki jinnai.png",
  "Blaze Fujiwara.png",
  "ChatGPT Image 19 jun 2026, 15_25_21 (10).png",
  "ChatGPT Image 19 jun 2026, 15_25_21 (8).png",
  "ChatGPT Image 19 jun 2026, 15_25_21 (9).png",
  "ChatGPT Image 19 jun 2026, 15_25_35 (1).png",
  "ChatGPT Image 19 jun 2026, 15_25_35 (2).png",
  "Ciel Kaminiari.png",
  "eight cross.png",
  "Enga Fugazaru.png",
  "Five cross.png",
  "Four cross.png",
  "Genri sayo.png",
  "Ginro.png",
  "iwao gogo.png",
  "Jaxon cross.png",
  "Jian strong.png",
  "karla konjiki.png",
  "Khrome Ryugu.png",
  "Kiwami Miyazukae.png",
  "Lantz Roji.png",
  "Meiko myoden.png",
  "millon mizu.png",
  "multi nanairo.png",
  "nanase.png",
  "Nine Cross.png",
  "Number One.png",
  "Numero Zero.png",
  "Nunmber two.png",
  "Omega Shiroboshi.png",
  "One cross.png",
  "Packun.png",
  "reiyu kuwabara.png",
  "Robin kazami.png",
  "Ryu isshin.png",
  "Seven cross.png",
  "Shiguru Nanairo.png",
  "Six cross.png",
  "Suzaki.png",
  "Takumi ishiyama.png",
  "tenka shiroboshi.png",
  "Three cross.png",
  "tisho sushiya.png",
  "Titus Manju.png",
  "Toguro Okunaga.png",
  "Tsuru.png",
  "Two cross.png",
  "Warden.png",
  "yoko kyubi.png",
  "Zero Cross.png",
  "zonamos nekoyama.png"
];

const NEW_BEY_FILES = [
  "blackshell 4.png",
  "cobaltdragon 2.png",
  "dranbuster 1.png",
  "dranbuster.png",
  "drandagger 4 gor.png",
  "drandagger 4.png",
  "dransword 3.png",
  "hellschain 5.png",
  "hellshammer 3.png",
  "hellssythe 4.png",
  "knightlance 4.png",
  "knightshield 3.png",
  "leonclaw 5.png",
  "phenixrudder 9.png",
  "poenixwing 9.png",
  "rhinohorn 3.png",
  "samuraisaber.png",
  "sharkedge 3.png",
  "vipertail 5.png",
  "wizardarrow 4.png",
  "wizardrod.png",
  "wyverngale 5.png"
];

function cleanAssetName(fileName) {
  const baseName = String(fileName || '')
    .replace(/\.[^.]+$/, '')
    .trim();
  const generatedAvatarMatch = baseName.match(/^ChatGPT Image.*\((\d+)\)$/i);
  if (generatedAvatarMatch) return `Blader Especial ${generatedAvatarMatch[1]}`;
  return baseName
    .replace(/\bpoenix\b/i, 'phenix')
    .replace(/\bNunmber\b/i, 'Number')
    .replace(/\s+\d+\s*gor$/i, ' Gold')
    .replace(/\s+\d+$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function titleCaseAssetName(value) {
  return cleanAssetName(value)
    .split(' ')
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function camelAssetId(value) {
  const words = cleanAssetName(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'asset';
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function camelRawId(value) {
  const words = String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'asset';
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      return index === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

function statProfile(index, style = 'balance', base = 58) {
  const spread = [
    { attack: 12, defense: -2, stamina: -4, speed: 10, focus: 0 },
    { attack: -3, defense: 12, stamina: 6, speed: -4, focus: 3 },
    { attack: -5, defense: 4, stamina: 14, speed: 0, focus: 6 },
    { attack: 6, defense: 6, stamina: 6, speed: 6, focus: 5 }
  ][index % 4];
  const tier = Math.floor(index / 8) * 3;
  const styleBoost = style === 'ataque'
    ? { attack: 10, speed: 7, defense: -3, stamina: -2, focus: 0 }
    : style === 'defensa'
      ? { attack: -4, speed: -2, defense: 12, stamina: 6, focus: 2 }
      : style === 'estamina'
        ? { attack: -3, speed: 2, defense: 4, stamina: 13, focus: 4 }
        : { attack: 4, speed: 4, defense: 4, stamina: 4, focus: 4 };
  return {
    attack: Math.max(35, Math.min(99, base + spread.attack + styleBoost.attack + tier)),
    defense: Math.max(35, Math.min(99, base + spread.defense + styleBoost.defense + tier)),
    stamina: Math.max(35, Math.min(99, base + spread.stamina + styleBoost.stamina + tier)),
    speed: Math.max(35, Math.min(99, base + spread.speed + styleBoost.speed + tier)),
    focus: Math.max(35, Math.min(99, base + spread.focus + styleBoost.focus + tier))
  };
}

function getBeyStyleFromName(name, index) {
  const key = name.toLowerCase();
  if (key.includes('shield') || key.includes('shell') || key.includes('chain')) return 'defensa';
  if (key.includes('wizard') || key.includes('rod') || key.includes('tail') || key.includes('gale')) return 'estamina';
  if (key.includes('buster') || key.includes('sword') || key.includes('dagger') || key.includes('shark') || key.includes('hammer')) return 'ataque';
  return ['ataque', 'defensa', 'estamina', 'balance'][index % 4];
}

function getCharacterStyleFromName(name, index) {
  const key = name.toLowerCase();
  if (key.includes('blaze') || key.includes('khrome') || key.includes('cross') || key.includes('ryu')) return 'ataque';
  if (key.includes('warden') || key.includes('strong') || key.includes('iwao') || key.includes('titus')) return 'defensa';
  if (key.includes('meiko') || key.includes('nanairo') || key.includes('sayo') || key.includes('yoko')) return 'estamina';
  return ['ataque', 'defensa', 'estamina', 'balance'][index % 4];
}

function getCharacterSpecialStats(id, stats) {
  const specialStats = {
    omegaShiroboshi: { attack: 88, defense: 84, stamina: 86, speed: 87, focus: 90 },
    khromeRyugu: { attack: 96, defense: 89, stamina: 91, speed: 94, focus: 95 }
  };
  return specialStats[id] || stats;
}

function buildAvatarCharactersFromFiles() {
  const teams = ['X Tower', 'Team Persona', 'Pendragon', 'Zooganic', 'Liga Escolar'];
  const subjects = ['Matematicas', 'Lengua', 'Ingles', 'Medio', 'Arte', 'Movimiento', 'Retos mixtos'];
  const beys = NEW_BEY_FILES.map(file => titleCaseAssetName(file));
  return NEW_AVATAR_FILES.map((file, index) => {
    const name = titleCaseAssetName(file);
    const id = camelAssetId(file);
    const style = getCharacterStyleFromName(name, index);
    const stats = getCharacterSpecialStats(id, statProfile(index, style, 56));
    const difficulty = id === 'khromeRyugu' || id === 'omegaShiroboshi' ? 'legendaria' : index < 8 ? 'baja' : index < 22 ? 'media' : index < 40 ? 'alta' : 'legendaria';
    return {
      id,
      nombre: name,
      equipo: teams[index % teams.length],
      rol: style === 'ataque' ? 'Rival ofensivo' : style === 'defensa' ? 'Muro tactico' : style === 'estamina' ? 'Especialista de resistencia' : 'Blader equilibrado',
      dificultad: difficulty,
      fraseEntrada: 'Mi avatar tambien tiene nivel. Demuestra lo que sabes.',
      fraseVictoria: 'Tu personaje ha subido un poco mas.',
      fraseDerrota: 'Aprende del choque y vuelve a lanzar.',
      beyAsociado: beys[index % beys.length],
      materiaRecomendada: subjects[index % subjects.length],
      colorPrincipal: ['#00f0ff', '#ff0055', '#ffea00', '#00ff66', '#8b5cf6', '#f97316'][index % 6],
      image: `imagenes_limpias/avatares/${file}`,
      style,
      stats
    };
  });
}

function buildBeysFromFiles() {
  const owners = NEW_AVATAR_FILES.map(file => titleCaseAssetName(file));
  const nameCounts = NEW_BEY_FILES.reduce((acc, file) => {
    const name = titleCaseAssetName(file);
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
  const nameIndexes = {};
  return NEW_BEY_FILES.map((file, index) => {
    const baseName = titleCaseAssetName(file);
    nameIndexes[baseName] = (nameIndexes[baseName] || 0) + 1;
    const name = nameCounts[baseName] > 1 ? `${baseName} ${nameIndexes[baseName]}` : baseName;
    const style = getBeyStyleFromName(name, index);
    const stats = statProfile(index, style, 54);
    const id = name.toLowerCase().includes('dransword') ? 'swordDran' : camelRawId(name);
    const rarity = index < 5 ? 'comun' : index < 11 ? 'rara' : index < 17 ? 'epica' : 'legendaria';
    return {
      id,
      nombre: name,
      tipo: style,
      rareza: rarity,
      ataque: stats.attack,
      defensa: stats.defense,
      estamina: stats.stamina,
      velocidad: stats.speed,
      nivelRequerido: Math.max(1, Math.min(50, 1 + index * 2)),
      habilidad: style === 'ataque' ? 'X Impact' : style === 'defensa' ? 'Guard Rail' : style === 'estamina' ? 'Long Spin' : 'Balance Shift',
      descripcion: `Peonza ${style} con estadisticas reales para combate.`,
      personajeAsociado: owners[index % owners.length],
      colorPrincipal: ['#00f0ff', '#ff0055', '#ffea00', '#00ff66', '#8b5cf6', '#f97316'][index % 6],
      colorSecundario: ['#ffffff', '#111827', '#f8fafc', '#0f172a'][index % 4],
      image: `imagenes_limpias/peonzas/${file}`
    };
  });
}

BEYBLADE_CHARACTERS.splice(0, BEYBLADE_CHARACTERS.length, ...buildAvatarCharactersFromFiles());
BEYBLADE_BEYS.splice(0, BEYBLADE_BEYS.length, ...buildBeysFromFiles());
const STARTER_BEY_IDS = BEYBLADE_X_BEYS.slice(0, 4).map(bey => bey.id);

function getCharacterBaseStats(character) {
  return character?.stats || { attack: 55, defense: 55, stamina: 55, speed: 55, focus: 55 };
}

function getCharacterProgress(state, characterId) {
  if (!state.player.characterProgress || typeof state.player.characterProgress !== 'object') {
    state.player.characterProgress = {};
  }
  if (!state.player.characterProgress[characterId]) {
    state.player.characterProgress[characterId] = { wins: 0, losses: 0, xp: 0, level: 1 };
  }
  const progress = state.player.characterProgress[characterId];
  progress.wins = Math.max(0, parseInt(progress.wins, 10) || 0);
  progress.losses = Math.max(0, parseInt(progress.losses, 10) || 0);
  progress.xp = Math.max(0, parseInt(progress.xp, 10) || 0);
  progress.level = Math.max(1, Math.min(30, parseInt(progress.level, 10) || (1 + Math.floor(progress.xp / 120))));
  return progress;
}

function getEffectiveCharacterStats(character, state = null, isPlayer = false) {
  const base = getCharacterBaseStats(character);
  const progress = isPlayer && state ? getCharacterProgress(state, character.id) : null;
  const levelBonus = progress ? Math.min(24, Math.floor(progress.xp / 120) + Math.floor(progress.wins / 3)) : 0;
  return {
    attack: Math.min(125, base.attack + levelBonus),
    defense: Math.min(125, base.defense + levelBonus),
    stamina: Math.min(125, base.stamina + levelBonus),
    speed: Math.min(125, base.speed + levelBonus),
    focus: Math.min(125, base.focus + levelBonus),
    level: progress ? Math.max(1, 1 + levelBonus) : 1
  };
}

function recordCharacterBattleResult(state, characterId, won, rewardXp = 0) {
  const progress = getCharacterProgress(state, characterId);
  if (won) progress.wins += 1;
  else progress.losses += 1;
  progress.xp += Math.max(10, Math.round(rewardXp || 20));
  progress.level = Math.max(1, Math.min(30, 1 + Math.floor(progress.xp / 120) + Math.floor(progress.wins / 3)));
  return progress;
}

const BEY_TYPES = [
  { id: "ataque", name: "Ataque", description: "Golpea fuerte y rapido.", example: "Sword Dran", color: "#f97316" },
  { id: "defensa", name: "Defensa", description: "Aguanta mejor los impactos.", example: "Helm Knight", color: "#38bdf8" },
  { id: "estamina", name: "Estamina", description: "Gira durante mas tiempo.", example: "Arrow Wizard", color: "#22c55e" },
  { id: "balance", name: "Balance", description: "Hace un poco de todo.", example: "Scythe Incendio", color: "#a855f7" }
];

const BEYBLADE_STADIUMS = [
  {
    id: "training",
    nombre: "Estadio de Entrenamiento",
    tramo: "Plantas 1-10",
    descripcion: "Ideal para los primeros retos de la X Tower.",
    dificultad: "baja",
    colorPrincipal: "#00f0ff",
    image: "assets/estadios/01_estadio_de_entrenamiento.png",
    fichaImage: "assets/estadios/01_estadio_de_entrenamiento.png"
  },
  {
    id: "standard",
    nombre: "Estadio Estandar",
    tramo: "Plantas 11-20",
    descripcion: "Tecnica, comprension y vocabulario para subir con control.",
    dificultad: "media",
    colorPrincipal: "#ffea00",
    image: "assets/estadios/02_estadio_est_ndar.png",
    fichaImage: "assets/estadios/02_estadio_est_ndar.png"
  },
  {
    id: "advanced",
    nombre: "Estadio Xtreme Dash",
    tramo: "Plantas 21-40",
    descripcion: "Retos rapidos, jefes intermedios y calculo con presion amable.",
    dificultad: "alta",
    colorPrincipal: "#ff0055",
    image: "assets/estadios/03_estadio_xtreme_dash.png",
    fichaImage: "assets/estadios/03_estadio_xtreme_dash.png"
  },
  {
    id: "final",
    nombre: "Estadio Final",
    tramo: "Plantas 41-50",
    descripcion: "La cima de la X Tower para retos mixtos y precision.",
    dificultad: "legendaria",
    colorPrincipal: "#8b5cf6",
    image: "assets/estadios/04_estadio_final.png",
    fichaImage: "assets/estadios/04_estadio_final.png"
  }
];

const BEYBLADE_X_STADIUMS = BEYBLADE_STADIUMS;

const X_TOWER_BLOCKS = [
  { min: 1, max: 10, name: "Base de Entrenamiento", focus: "diagnostico, sumas, restas, lectura basica y rutina inicial", stadiumId: "training" },
  { min: 11, max: 20, name: "Zona de Tecnica", focus: "problemas, comprension lectora, ingles y tablas iniciales", stadiumId: "standard" },
  { min: 21, max: 30, name: "Zona Xtreme Dash", focus: "multiplicaciones, calculo rapido, inferencias y ciencias", stadiumId: "advanced" },
  { min: 31, max: 40, name: "Liga Avanzada", focus: "divisiones sencillas, problemas mixtos, medio, ingles y proyectos", stadiumId: "advanced" },
  { min: 41, max: 50, name: "La Cima de la X Tower", focus: "retos mixtos, repaso espaciado, precision y constancia", stadiumId: "final" }
];

const TOWER_SUBJECTS = ["math", "language", "english", "science", "art", "movement"];
const TOWER_SUBJECT_NAMES = {
  diagnostic: "Calibracion inicial",
  math: "Arena Numerica",
  language: "Biblioteca Estrategica",
  english: "Puerto Internacional",
  science: "Laboratorio Elemental",
  art: "Forja Creativa",
  movement: "Gimnasio de Estamina",
  mixed: "Duelo mixto"
};

function getCharacterPowerScore(character) {
  const stats = character && character.stats ? character.stats : {};
  const attack = Number(stats.attack) || 0;
  const defense = Number(stats.defense) || 0;
  const stamina = Number(stats.stamina) || 0;
  const speed = Number(stats.speed) || 0;
  const focus = Number(stats.focus) || 0;
  return Math.round(((attack * 1.08) + defense + stamina + speed + (focus * 0.92)) / 5);
}

function buildTowerRivalPlan() {
  const towerSize = 50;
  const finalBoss = BEYBLADE_X_CHARACTERS.find(character => character.id === "khromeRyugu")
    || BEYBLADE_X_CHARACTERS[BEYBLADE_X_CHARACTERS.length - 1];
  const sortedRivals = BEYBLADE_X_CHARACTERS
    .filter(character => character && (!finalBoss || character.id !== finalBoss.id))
    .sort((a, b) => {
      const powerDiff = getCharacterPowerScore(a) - getCharacterPowerScore(b);
      if (powerDiff !== 0) return powerDiff;
      return a.nombre.localeCompare(b.nombre);
    });
  const plan = sortedRivals.slice(-(towerSize - 1));
  if (finalBoss) plan.push(finalBoss);
  return plan.slice(0, towerSize);
}

const TOWER_RIVAL_PLAN = buildTowerRivalPlan();
const TOWER_RIVALS = TOWER_RIVAL_PLAN.map(character => character.id);

function getTowerBlockForFloor(floorNumber) {
  return X_TOWER_BLOCKS.find(block => floorNumber >= block.min && floorNumber <= block.max) || X_TOWER_BLOCKS[0];
}

function getFloorStadium(floorNumber) {
  const stadiumId = getTowerBlockForFloor(floorNumber).stadiumId;
  return BEYBLADE_X_STADIUMS.find(stadium => stadium.id === stadiumId) || BEYBLADE_X_STADIUMS[0];
}

function getFloorRival(floorNumber) {
  const floorIndex = Math.max(0, Math.min(49, (Number(floorNumber) || 1) - 1));
  return TOWER_RIVAL_PLAN[floorIndex] || BEYBLADE_X_CHARACTERS[0];
}

function getFloorBattleType(floorNumber) {
  if (floorNumber === 1) return "calibration-battle";
  if (floorNumber === 50) return "final-boss";
  if (floorNumber % 10 === 0) return "tower-boss";
  if (floorNumber % 5 === 0) return "ascension-battle";
  return "rival-battle";
}

function getFloorLegacyType(floorNumber) {
  if (floorNumber === 1) return "diagnostic";
  if (floorNumber === 50) return "final";
  if (floorNumber % 10 === 0) return "tower-rival";
  if (floorNumber % 5 === 0) return "ascension";
  return "training";
}

function getFloorDifficultyTier(floorNumber) {
  if (floorNumber <= 10) return "baja";
  if (floorNumber <= 20) return "media";
  if (floorNumber <= 35) return "alta";
  if (floorNumber <= 45) return "experta";
  return "legendaria";
}

function getFloorDifficulty(floorNumber) {
  const milestoneBonus = floorNumber % 10 === 0 ? 2 : floorNumber % 5 === 0 ? 1 : 0;
  return Math.min(10, Math.max(1, Math.ceil(floorNumber / 6) + milestoneBonus));
}

function getFloorTargetAccuracy(floorNumber) {
  const milestoneBonus = floorNumber % 10 === 0 ? 4 : floorNumber % 5 === 0 ? 2 : 0;
  return Math.min(95, 62 + Math.floor((floorNumber - 1) / 2) + milestoneBonus);
}

function getFloorMotivationalLabel(floorNumber) {
  if (floorNumber === 1) return "Primer lanzamiento";
  if (floorNumber === 50) return "Cima de la X Tower";
  if (floorNumber % 10 === 0) return "Rival de Torre";
  if (floorNumber % 5 === 0) return "Duelo de ascenso";
  if (floorNumber >= 41) return "Sprint final";
  if (floorNumber >= 31) return "Racha avanzada";
  if (floorNumber >= 21) return "Xtreme Dash";
  if (floorNumber >= 11) return "Control tecnico";
  return "Entrenamiento base";
}

function getFloorRivalStrategy(floorNumber, rival, rivalBey) {
  const styleByType = {
    ataque: "presiona con ataques rapidos y castiga las dudas",
    defensa: "resiste impactos y gana si pierdes precision",
    estamina: "alarga el duelo y premia las rachas de aciertos",
    balance: "cambia de ritmo entre ataque, defensa y estamina"
  };
  const tier = getFloorDifficultyTier(floorNumber);
  return `${rival.nombre} usa ${rivalBey.nombre}: ${styleByType[rivalBey.tipo] || "mantiene una estrategia equilibrada"} en dificultad ${tier}.`;
}

function getFloorObjectives(floorNumber, subject, rival) {
  const subjectLabel = TOWER_SUBJECT_NAMES[subject] || "Duelo mixto";
  const primaryObjective = floorNumber === 1
    ? "Completa la calibracion de combate para ajustar la torre a tu nivel."
    : floorNumber === 50
      ? `Derrota a ${rival.nombre} en el duelo final de la X Tower.`
      : floorNumber % 10 === 0
        ? `Vence a ${rival.nombre} para cerrar el bloque de la torre.`
        : floorNumber % 5 === 0
          ? `Gana el duelo de ascenso contra ${rival.nombre}.`
          : `Supera un combate de ${subjectLabel} contra ${rival.nombre}.`;
  const secondaryBySubject = {
    diagnostic: "Responde sin prisa y deja que el sistema mida tu punto de partida.",
    math: "Encadena 3 aciertos para cargar el ataque X.",
    language: "Lee con atencion antes de lanzar el golpe final.",
    english: "Reconoce las palabras clave para mantener la ventaja.",
    science: "Relaciona pistas y conceptos para bloquear el contraataque.",
    art: "Explica o elige con criterio para mejorar el combo creativo.",
    movement: "Mantente activo y constante durante todo el reto.",
    mixed: "Combina materias y evita dos fallos seguidos."
  };
  return {
    primaryObjective,
    secondaryObjective: secondaryBySubject[subject] || secondaryBySubject.mixed
  };
}

function getFloorReward(floorNumber) {
  const bey = BEYBLADE_X_BEYS.find(item => item.nivelRequerido === floorNumber) || null;
  const difficulty = getFloorDifficulty(floorNumber);
  const rewardCoins = floorNumber % 10 === 0 ? 90 + difficulty * 8 : floorNumber % 5 === 0 ? 55 + difficulty * 6 : 18 + difficulty * 4;
  const rewardXP = floorNumber % 10 === 0 ? 120 + difficulty * 10 : floorNumber % 5 === 0 ? 75 + difficulty * 8 : 28 + difficulty * 5;
  return {
    chips: floorNumber % 10 === 0 ? 40 : floorNumber % 5 === 0 ? 25 : 8,
    spinPoints: floorNumber % 10 === 0 ? 90 : floorNumber % 5 === 0 ? 55 : 18,
    coins: rewardCoins,
    xp: rewardXP,
    beyId: bey ? bey.id : null,
    label: bey ? bey.nombre : "Capsula de piezas"
  };
}

function weekForTowerFloor(floorNumber) {
  if (floorNumber <= 6) return 1;
  if (floorNumber <= 12) return 2;
  if (floorNumber <= 18) return 3;
  if (floorNumber <= 25) return 4;
  if (floorNumber <= 31) return 5;
  if (floorNumber <= 37) return 6;
  if (floorNumber <= 44) return 7;
  return 8;
}

const X_TOWER_FLOORS = Array.from({ length: 50 }, (_, index) => {
  const floor = index + 1;
  const block = getTowerBlockForFloor(floor);
  const subject = floor === 1 ? "diagnostic" : floor % 10 === 0 || floor % 5 === 0 ? "mixed" : TOWER_SUBJECTS[(floor - 2) % TOWER_SUBJECTS.length];
  const rival = getFloorRival(floor);
  const reward = getFloorReward(floor);
  const stadium = getFloorStadium(floor);
  const rivalBey = BEYBLADE_X_BEYS.find(bey => bey.nombre === rival.beyAsociado) || BEYBLADE_X_BEYS[0];
  const difficulty = getFloorDifficulty(floor);
  const battleType = getFloorBattleType(floor);
  const objectives = getFloorObjectives(floor, subject, rival);
  return {
    floor,
    title: floor === 1 ? "Calibracion inicial" : floor === 50 ? "Duelo final de la X Tower" : floor % 10 === 0 ? "Rival de Torre" : floor % 5 === 0 ? "Duelo de Ascenso" : `${TOWER_SUBJECT_NAMES[subject]} ${floor}`,
    subject,
    arenaName: TOWER_SUBJECT_NAMES[subject],
    blockName: block.name,
    focus: block.focus,
    rivalId: rival.id,
    rivalName: rival.nombre,
    rivalBeyId: rivalBey.id,
    rivalBeyName: rivalBey.nombre,
    stadiumId: stadium.id,
    stadiumName: stadium.nombre,
    battleType,
    difficulty,
    difficultyTier: getFloorDifficultyTier(floor),
    targetAccuracy: getFloorTargetAccuracy(floor),
    rewardCoins: reward.coins,
    rewardXP: reward.xp,
    objective: objectives.primaryObjective,
    primaryObjective: objectives.primaryObjective,
    secondaryObjective: objectives.secondaryObjective,
    rivalStrategy: getFloorRivalStrategy(floor, rival, rivalBey),
    motivationalLabel: getFloorMotivationalLabel(floor),
    combat: {
      battleType,
      targetAccuracy: getFloorTargetAccuracy(floor),
      rewardCoins: reward.coins,
      rewardXP: reward.xp,
      rivalStrategy: getFloorRivalStrategy(floor, rival, rivalBey),
      objective: objectives.primaryObjective,
      secondaryObjective: objectives.secondaryObjective
    },
    reward,
    week: weekForTowerFloor(floor),
    type: getFloorLegacyType(floor)
  };
});

function getTowerFloorData(floorNumber) {
  return X_TOWER_FLOORS.find(floor => floor.floor === floorNumber) || X_TOWER_FLOORS[0];
}

function getCurrentTowerFloor(state) {
  const towerFloor = parseInt(state?.progress?.tower?.highestUnlockedFloor, 10);
  if (Number.isFinite(towerFloor) && towerFloor > 0) return Math.max(1, Math.min(50, towerFloor));
  return 1;
}

function getUnlockedTowerFloors(state) {
  return Array.from({ length: getCurrentTowerFloor(state) }, (_, index) => index + 1);
}

function getBeyById(id) {
  return BEYBLADE_X_BEYS.find(bey => bey.id === id) || BEYBLADE_X_BEYS[0];
}

function getEquippedBey(state) {
  const id = state?.player?.equippedBeyId || STARTER_BEY_IDS[0] || "swordDran";
  return getBeyById(id);
}

function isBeyUnlocked(state, bey) {
  if (!bey) return false;
  const unlocked = state?.inventory?.beys || [];
  return STARTER_BEY_IDS.includes(bey.id) || unlocked.includes(bey.id);
}

const CUSTOM_PARTS = {
  core: [
    { id: 'core_wood',   name: 'Núcleo Roble',       rarity: 'comun',      stat: { stamina: 10, attack: 5 },  svg: `<circle cx="40" cy="40" r="10" fill="#b45309" stroke="#fff" stroke-width="1.5"/><circle cx="40" cy="40" r="4" fill="#78350f"/>` },
    { id: 'core_aqua',   name: 'Núcleo del Estanque', rarity: 'raro',       stat: { stamina: 25, defense: 10 },svg: `<circle cx="40" cy="40" r="12" fill="#0284c7" stroke="#00f0ff" stroke-width="1.5" filter="drop-shadow(0 0 4px #00f0ff)"/><circle cx="40" cy="40" r="5" fill="#e0f2fe"/>` },
    { id: 'core_fire',   name: 'Núcleo Ígneo',        rarity: 'epico',      stat: { attack: 30, stamina: 10 }, svg: `<circle cx="40" cy="40" r="12" fill="#ef4444" stroke="#eab308" stroke-width="1.5" filter="drop-shadow(0 0 6px #ef4444)"/><polygon points="40,34 43,40 40,43 37,40" fill="#ffea00"/>` },
    { id: 'core_cyber',  name: 'Ciber-Núcleo',        rarity: 'legendario', stat: { defense: 35, attack: 15 }, svg: `<rect x="30" y="30" width="20" height="20" rx="4" fill="#a855f7" stroke="#00f0ff" stroke-width="2" filter="drop-shadow(0 0 8px #a855f7)"/><circle cx="40" cy="40" r="4" fill="#fff"/>` },
    { id: 'core_astral', name: 'Núcleo Solaris',      rarity: 'cosmico',    stat: { attack: 45, stamina: 30 }, svg: `<path d="M40,25 L43,35 L53,35 L45,41 L48,51 L40,45 L32,51 L35,41 L27,35 L37,35 Z" fill="#ffea00" stroke="#ff0055" stroke-width="1.5" filter="drop-shadow(0 0 10px #ffea00)"/>` }
  ],
  ring: [
    { id: 'ring_wood',    name: 'Anillo de Ramas',    rarity: 'comun',      stat: { defense: 10, attack: 5 },  svg: `<circle cx="40" cy="40" r="30" fill="none" stroke="#854d0e" stroke-width="6" stroke-dasharray="10 5"/>` },
    { id: 'ring_dentado', name: 'Chasis Dentado',     rarity: 'raro',       stat: { attack: 25, defense: 5 },  svg: `<path d="M40,5 L45,15 L55,10 L50,20 L60,20 L52,28 L60,35 L50,38 L53,48 L43,45 L40,55 L37,45 L27,48 L30,38 L20,35 L28,28 L20,20 L30,20 L25,10 L35,15 Z" fill="none" stroke="#cbd5e1" stroke-width="5"/>` },
    { id: 'ring_wings',   name: 'Anillo Ala Viento',  rarity: 'epico',      stat: { stamina: 30, defense: 15 },svg: `<circle cx="40" cy="40" r="30" fill="none" stroke="#22d3ee" stroke-width="6" stroke-dasharray="25 6 10 6"/>` },
    { id: 'ring_iron',    name: 'Corona de Hierro',   rarity: 'legendario', stat: { defense: 45, attack: 15 }, svg: `<circle cx="40" cy="40" r="28" fill="none" stroke="#475569" stroke-width="8"/><circle cx="40" cy="40" r="32" fill="none" stroke="#94a3b8" stroke-width="2"/>` },
    { id: 'ring_nova',    name: 'Halo de Supernova',  rarity: 'cosmico',    stat: { attack: 50, stamina: 25 }, svg: `<circle cx="40" cy="40" r="29" fill="none" stroke="#f43f5e" stroke-width="8" stroke-dasharray="1 8" stroke-linecap="round"/>` }
  ],
  driver: [
    { id: 'driver_wood',    name: 'Punta de Tiza',      rarity: 'comun',      stat: { stamina: 10 },            svg: `<circle cx="40" cy="40" r="38" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1.5"/>` },
    { id: 'driver_speed',   name: 'Punta de Metal',     rarity: 'raro',       stat: { stamina: 25, attack: 5 }, svg: `<circle cx="40" cy="40" r="38" fill="none" stroke="#00f0ff" stroke-width="1.5" stroke-dasharray="4 8"/>` },
    { id: 'driver_defense', name: 'Punta de Bola',      rarity: 'epico',      stat: { defense: 30 },            svg: `<circle cx="40" cy="40" r="38" fill="none" stroke="#a855f7" stroke-width="2" stroke-dasharray="15 15"/>` },
    { id: 'driver_rubber',  name: 'Punta Adherente',    rarity: 'legendario', stat: { defense: 35, stamina: 15},svg: `<circle cx="40" cy="40" r="38" fill="none" stroke="#ffea00" stroke-width="2.5" stroke-dasharray="40 10"/>` },
    { id: 'driver_cosmic',  name: 'Punta Magnética',    rarity: 'cosmico',    stat: { stamina: 50 },            svg: `<circle cx="40" cy="40" r="38" fill="none" stroke="#ff0055" stroke-width="3" stroke-dasharray="2 2"/>` }
  ],
  color: [
    { id: 'col_cyan',    name: 'Energía Cian',          rarity: 'comun',      code: '#00f0ff' },
    { id: 'col_pink',    name: 'Fuerza Fucsia',          rarity: 'raro',       code: '#ff0055' },
    { id: 'col_yellow',  name: 'Trueno Amarillo',        rarity: 'epico',      code: '#ffea00' },
    { id: 'col_emerald', name: 'Naturaleza Esmeralda',   rarity: 'legendario', code: '#00ff66' },
    { id: 'col_purple',  name: 'Materia Oscura',         rarity: 'cosmico',    code: '#8b5cf6' }
  ]
};

const WORKSHOP_PART_FILES = {
  core: [
    "ChatGPT Image 19 jun 2026, 15_37_34 (1).png",
    "ChatGPT Image 19 jun 2026, 15_37_34 (2).png",
    "ChatGPT Image 19 jun 2026, 15_37_35 (3).png",
    "ChatGPT Image 19 jun 2026, 15_37_35 (4).png",
    "ChatGPT Image 19 jun 2026, 15_37_35 (5).png",
    "ChatGPT Image 19 jun 2026, 15_37_35 (6).png",
    "ChatGPT Image 19 jun 2026, 15_37_35 (7).png",
    "ChatGPT Image 19 jun 2026, 15_37_36 (8).png",
    "ChatGPT Image 19 jun 2026, 15_37_36 (9).png",
    "ChatGPT Image 19 jun 2026, 15_37_36 (10).png"
  ],
  ring: [
    "ChatGPT Image 19 jun 2026, 15_36_44 (1).png",
    "ChatGPT Image 19 jun 2026, 15_36_44 (2).png",
    "ChatGPT Image 19 jun 2026, 15_36_45 (3).png",
    "ChatGPT Image 19 jun 2026, 15_36_45 (4).png",
    "ChatGPT Image 19 jun 2026, 15_36_45 (5).png",
    "ChatGPT Image 19 jun 2026, 15_36_45 (6).png",
    "ChatGPT Image 19 jun 2026, 15_36_46 (7).png",
    "ChatGPT Image 19 jun 2026, 15_36_46 (8).png",
    "ChatGPT Image 19 jun 2026, 15_36_46 (9).png",
    "ChatGPT Image 19 jun 2026, 15_36_47 (10).png",
    "ChatGPT Image 19 jun 2026, 15_36_54 (1).png",
    "ChatGPT Image 19 jun 2026, 15_36_54 (2).png",
    "ChatGPT Image 19 jun 2026, 15_36_54 (3).png",
    "ChatGPT Image 19 jun 2026, 15_36_54 (4).png",
    "ChatGPT Image 19 jun 2026, 15_36_55 (5).png",
    "ChatGPT Image 19 jun 2026, 15_36_55 (6).png",
    "ChatGPT Image 19 jun 2026, 15_36_55 (7).png",
    "ChatGPT Image 19 jun 2026, 15_36_55 (8).png",
    "ChatGPT Image 19 jun 2026, 15_36_56 (9).png",
    "ChatGPT Image 19 jun 2026, 15_36_56 (10).png"
  ],
  driver: [
    "ChatGPT Image 19 jun 2026, 15_40_57 (1).png",
    "ChatGPT Image 19 jun 2026, 15_40_57 (2).png",
    "ChatGPT Image 19 jun 2026, 15_40_57 (3).png",
    "ChatGPT Image 19 jun 2026, 15_40_58 (4).png",
    "ChatGPT Image 19 jun 2026, 15_40_58 (5).png",
    "ChatGPT Image 19 jun 2026, 15_40_58 (6).png",
    "ChatGPT Image 19 jun 2026, 15_40_58 (7).png",
    "ChatGPT Image 19 jun 2026, 15_40_59 (8).png",
    "ChatGPT Image 19 jun 2026, 15_40_59 (9).png",
    "ChatGPT Image 19 jun 2026, 15_40_59 (10).png",
    "ChatGPT Image 19 jun 2026, 15_42_54 (1).png",
    "ChatGPT Image 19 jun 2026, 15_42_54 (2).png",
    "ChatGPT Image 19 jun 2026, 15_42_55 (3).png",
    "ChatGPT Image 19 jun 2026, 15_42_55 (4).png",
    "ChatGPT Image 19 jun 2026, 15_42_55 (5).png",
    "ChatGPT Image 19 jun 2026, 15_42_55 (6).png",
    "ChatGPT Image 19 jun 2026, 15_42_56 (7).png",
    "ChatGPT Image 19 jun 2026, 15_42_56 (8).png",
    "ChatGPT Image 19 jun 2026, 15_42_56 (9).png",
    "ChatGPT Image 19 jun 2026, 15_42_56 (10).png"
  ]
};

function buildWorkshopParts(type, files) {
  const folder = type === 'core' ? 'Nucleo' : type === 'ring' ? 'Anillo' : 'Punta';
  const prefix = type === 'core' ? 'Nucleo' : type === 'ring' ? 'Anillo' : 'Punta';
  const rarityByIndex = ['comun', 'comun', 'raro', 'raro', 'epico', 'epico', 'legendario', 'legendario', 'cosmico', 'cosmico'];
  return files.map((file, index) => {
    const number = index + 1;
    const id = type === 'core' && index === 0
      ? 'core_wood'
      : type === 'ring' && index === 0
        ? 'ring_wood'
        : type === 'driver' && index === 0
          ? 'driver_wood'
          : `${type}_${number}`;
    const style = type === 'core' ? ['stamina', 'defense', 'attack'][index % 3] : type === 'ring' ? ['attack', 'defense', 'stamina'][index % 3] : ['speed', 'stamina', 'defense'][index % 3];
    const value = 10 + Math.min(45, index * 3);
    const stat = style === 'attack' || style === 'speed'
      ? { attack: value, stamina: Math.round(value / 3) }
      : style === 'defense'
        ? { defense: value, stamina: Math.round(value / 4) }
        : { stamina: value, defense: Math.round(value / 4) };
    return {
      id,
      name: `${prefix} X-${String(number).padStart(2, '0')}`,
      rarity: rarityByIndex[Math.min(rarityByIndex.length - 1, Math.floor(index / Math.max(1, files.length / rarityByIndex.length)))],
      stat,
      image: `imagenes_limpias/Taller/${folder}/${file}`,
      svg: ''
    };
  });
}

CUSTOM_PARTS.core.splice(0, CUSTOM_PARTS.core.length, ...buildWorkshopParts('core', WORKSHOP_PART_FILES.core));
CUSTOM_PARTS.ring.splice(0, CUSTOM_PARTS.ring.length, ...buildWorkshopParts('ring', WORKSHOP_PART_FILES.ring));
CUSTOM_PARTS.driver.splice(0, CUSTOM_PARTS.driver.length, ...buildWorkshopParts('driver', WORKSHOP_PART_FILES.driver));
CUSTOM_PARTS.color.splice(0, CUSTOM_PARTS.color.length,
  { id: 'col_cyan', name: 'Energia Cian', rarity: 'comun', code: '#00f0ff' },
  { id: 'col_pink', name: 'Fuerza Fucsia', rarity: 'raro', code: '#ff0055' },
  { id: 'col_yellow', name: 'Trueno Amarillo', rarity: 'epico', code: '#ffea00' },
  { id: 'col_emerald', name: 'Naturaleza Esmeralda', rarity: 'legendario', code: '#00ff66' },
  { id: 'col_purple', name: 'Materia Oscura', rarity: 'cosmico', code: '#8b5cf6' }
);

// DYNAMIC SVG TOP DRAWING UTILITY
// ----------------------------------------------------
function generateTopSVG(coreId, ringId, driverId, colorId) {
  const colorObj  = CUSTOM_PARTS.color.find(c => c.id === colorId)   || CUSTOM_PARTS.color[0];
  const coreObj   = CUSTOM_PARTS.core.find(c => c.id === coreId)     || CUSTOM_PARTS.core[0];
  const ringObj   = CUSTOM_PARTS.ring.find(r => r.id === ringId)     || CUSTOM_PARTS.ring[0];
  const driverObj = CUSTOM_PARTS.driver.find(d => d.id === driverId) || CUSTOM_PARTS.driver[0];

  const strokeColor = colorObj.code;

  if (coreObj.image || ringObj.image || driverObj.image) {
    return `
      <div class="custom-top-image-stack" style="--top-accent:${strokeColor}">
        <img class="custom-top-part custom-top-driver" src="${driverObj.image || ''}" alt="${driverObj.name}">
        <img class="custom-top-part custom-top-ring" src="${ringObj.image || ''}" alt="${ringObj.name}">
        <img class="custom-top-part custom-top-core" src="${coreObj.image || ''}" alt="${coreObj.name}">
      </div>
    `;
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="100%" height="100%">
      <defs>
        <radialGradient id="grad-active" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stop-color="#fff"         stop-opacity="1" />
          <stop offset="60%"  stop-color="${strokeColor}" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0a0f1d"       stop-opacity="0" />
        </radialGradient>
      </defs>
      <!-- Energy Aura behind top -->
      <circle cx="40" cy="40" r="38" fill="url(#grad-active)" opacity="0.45" filter="blur(2px)"/>
      <!-- Driver rings -->
      ${driverObj.svg}
      <!-- Outer attack ring -->
      ${ringObj.svg}
      <!-- Core center gem -->
      ${coreObj.svg}
      <!-- Decorative details -->
      <circle cx="40" cy="40" r="3" fill="#fff"/>
    </svg>
  `;
}
