import Navbar from './Navbar';
import kinabaluPhoto from '../assets/mount-kinabalu-silhouette-at-sunset.jpg';
import FlipClock from './FlipClock';
import WishSection from './WishSection';
import FeedbackSection from './FeedbackSection';
import AboutSection from './AboutSection';
import './KaamatanApp.css';

/* ── Mount Kinabalu Photo Background ─────────────── */
function KinabaluBg() {
  return (
    <>
      <div
        className="kinabalu-photo"
        style={{ backgroundImage: `url(${kinabaluPhoto})` }}
        aria-hidden="true"
      />
      <div className="kinabalu-overlay" aria-hidden="true" />
    </>
  );
}

/* ── Coconut Tree SVG ────────────────────────────── */
function CoconutTree({ position }) {
  return (
    <svg
      className={`coconut-tree coconut-tree--${position}`}
      viewBox="0 0 90 260"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M50,260 Q48,200 44,160 Q40,120 38,80 Q36,50 40,20" fill="none" stroke="#2a1a08" strokeWidth="6" strokeLinecap="round" />
      <ellipse cx="40" cy="22" rx="28" ry="10" fill="#1e4010" transform="rotate(-30,40,22)" />
      <ellipse cx="40" cy="22" rx="26" ry="9"  fill="#2a5818" transform="rotate(15,40,22)" />
      <ellipse cx="40" cy="22" rx="24" ry="8"  fill="#1e4010" transform="rotate(-60,40,22)" />
      <ellipse cx="40" cy="22" rx="22" ry="8"  fill="#2a5818" transform="rotate(45,40,22)" />
      <ellipse cx="40" cy="22" rx="20" ry="7"  fill="#1e4010" transform="rotate(-15,40,22)" />
      <circle cx="40" cy="30" r="5" fill="#c8a020" />
      <circle cx="34" cy="35" r="4" fill="#b89018" />
      <circle cx="46" cy="33" r="4" fill="#c8a020" />
    </svg>
  );
}

// /* ── Rice Stalks SVG — big artistic golden style ─── */
// function RiceStalks() {
//   // Each stalk: x position, stem height, lean angle, scale, delay, duration
//   const leftStalks = [
//     { x: -3,  y: 100, h: 35, lean: 3,  scale: 1.4, delay: 0,   dur: 4.0 },
//     { x: 3,   y: 100, h: 28, lean: 2,  scale: 1.2, delay: 0.8, dur: 5.0 },
//     { x: 8,   y: 100, h: 38, lean: 4,  scale: 1.5, delay: 0.3, dur: 3.8 },
//     { x: 13,  y: 100, h: 25, lean: 2,  scale: 1.1, delay: 1.2, dur: 4.5 },
//     { x: 18,  y: 100, h: 32, lean: 3,  scale: 1.3, delay: 0.6, dur: 4.2 },
//     { x: 22,  y: 100, h: 22, lean: 2,  scale: 1.0, delay: 1.8, dur: 3.6 },
//   ];

//   const rightStalks = [
//     { x: 103, y: 100, h: 35, lean: -3, scale: 1.4, delay: 0.4, dur: 4.1 },
//     { x: 97,  y: 100, h: 28, lean: -2, scale: 1.2, delay: 1.0, dur: 5.2 },
//     { x: 92,  y: 100, h: 38, lean: -4, scale: 1.5, delay: 0.2, dur: 3.9 },
//     { x: 87,  y: 100, h: 25, lean: -2, scale: 1.1, delay: 1.5, dur: 4.4 },
//     { x: 82,  y: 100, h: 32, lean: -3, scale: 1.3, delay: 0.7, dur: 4.0 },
//     { x: 78,  y: 100, h: 22, lean: -2, scale: 1.0, delay: 2.0, dur: 3.7 },
//   ];

//   // Draw one full rice stalk with stem + leaves + grain head
//   const drawStalk = (s, i) => {
//     const sc = s.scale;
//     const h  = s.h * sc;
//     const lx = Math.sin((s.lean * Math.PI) / 180) * h;

//     // Grain head — drooping cluster at the top
//     const grains = [
//       { ox: 0,         oy: 0,         rx: 2.2 * sc, ry: 5.5 * sc, rot: s.lean - 10 },
//       { ox: -3 * sc,   oy: 3 * sc,    rx: 2.0 * sc, ry: 5.0 * sc, rot: s.lean - 30 },
//       { ox: 3 * sc,    oy: 3 * sc,    rx: 2.0 * sc, ry: 5.0 * sc, rot: s.lean + 10 },
//       { ox: -5.5 * sc, oy: 7 * sc,    rx: 1.8 * sc, ry: 4.5 * sc, rot: s.lean - 45 },
//       { ox: 5.5 * sc,  oy: 7 * sc,    rx: 1.8 * sc, ry: 4.5 * sc, rot: s.lean + 25 },
//       { ox: -2 * sc,   oy: 10 * sc,   rx: 1.6 * sc, ry: 4.0 * sc, rot: s.lean - 55 },
//       { ox: 2 * sc,    oy: 10 * sc,   rx: 1.6 * sc, ry: 4.0 * sc, rot: s.lean + 35 },
//       { ox: -7 * sc,   oy: 12 * sc,   rx: 1.4 * sc, ry: 3.5 * sc, rot: s.lean - 60 },
//       { ox: 7 * sc,    oy: 12 * sc,   rx: 1.4 * sc, ry: 3.5 * sc, rot: s.lean + 40 },
//     ];

//     // Side leaves along the stem
//     const leaves = [
//       { pos: 0.35, side: 1,  len: 14 * sc, width: 2.5 * sc },
//       { pos: 0.55, side: -1, len: 12 * sc, width: 2.2 * sc },
//       { pos: 0.70, side: 1,  len: 10 * sc, width: 2.0 * sc },
//     ];

//     const tipX = s.x + lx;
//     const tipY = s.y - h;

//     return (
//       <g
//         key={i}
//         style={{
//           animation: `sway ${s.dur}s ease-in-out ${s.delay}s infinite`,
//           transformOrigin: `${s.x}% 100%`,
//         }}
//       >
//         {/* Main stem */}
//         <line
//           x1={`${s.x}%`} y1={`${s.y}%`}
//           x2={`${tipX}%`} y2={`${tipY}%`}
//           stroke="#3a7010"
//           strokeWidth={1.8 * sc}
//           strokeLinecap="round"
//         />

//         {/* Side leaves */}
//         {leaves.map((lf, li) => {
//           const lsx = s.x + lx * lf.pos;
//           const lsy = s.y - h * lf.pos;
//           const lAngle = s.lean + lf.side * 45;
//           const lex = lsx + Math.sin((lAngle * Math.PI) / 180) * lf.len;
//           const ley = lsy - Math.cos((lAngle * Math.PI) / 180) * lf.len;
//           return (
//             <line
//               key={li}
//               x1={`${lsx}%`} y1={`${lsy}%`}
//               x2={`${lex}%`} y2={`${ley}%`}
//               stroke="#4a8820"
//               strokeWidth={lf.width}
//               strokeLinecap="round"
//               opacity="0.9"
//             />
//           );
//         })}

//         {/* Grain cluster at tip */}
//         {grains.map((g, gi) => (
//           <ellipse
//             key={gi}
//             cx={`${tipX + g.ox}%`}
//             cy={`${tipY + g.oy}%`}
//             rx={`${g.rx}%`}
//             ry={`${g.ry}%`}
//             fill={gi % 2 === 0 ? '#f0c020' : '#d4980c'}
//             transform={`rotate(${g.rot}, ${tipX + g.ox}%, ${tipY + g.oy}%)`}
//             opacity="0.95"
//           />
//         ))}
//       </g>
//     );
//   };

//   return (
//     <svg
//       className="rice-field"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="xMidYMax meet"
//       xmlns="http://www.w3.org/2000/svg"
//       aria-hidden="true"
//     >
//       {leftStalks.map((s, i)  => drawStalk(s, i))}
//       {rightStalks.map((s, i) => drawStalk(s, i + 10))}
//     </svg>
//   );
// }

/* ── Main App ─────────────────────────────────────── */
export default function KaamatanApp() {
  return (
    <div className="kmt-app">
      {/* Clouds */}
      <div className="cloud c1" />
      <div className="cloud c2" />
      <div className="cloud c3" />
      <div className="cloud c4" />

      {/* Scene elements */}
      <KinabaluBg />

      {/* Coconut trees */}
      <CoconutTree position="right-1" />
      <CoconutTree position="right-2" />
      <CoconutTree position="left-1" />

      {/* Rice stalks */}
      {/* <RiceStalks /> */}

      {/* Navigation */}
      <Navbar />

      {/* Hero section */}
      <section className="hero" id="home">
        <p className="hero-tag">Sabah, Malaysia</p>

        <h1 className="hero-title">
          <span className="hero-title-small">Countdown</span>
          <span className="hero-title-big">Kaamatan Day</span>
        </h1>

        <p className="hero-date">30 &amp; 31 May 2026</p>

        <FlipClock />

        <button
          className="hero-wish-btn"
          onClick={() => document.getElementById('wish')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Make a Wish
        </button>
      </section>

      {/* Sections */}
      <WishSection />
      <AboutSection />
      <FeedbackSection />

      {/* Footer */}
      <footer className="kmt-footer">
        <p>Perayaan Tadau Kaamatan di negeri Sabah &nbsp;·&nbsp; <span className="footer-gold">Kopivosian Tadau Kaamatan 2026</span></p>
        <p className="footer-credit">Built with ❤️ by a proud Sabahan developer</p>
      </footer>
    </div>
  );
}