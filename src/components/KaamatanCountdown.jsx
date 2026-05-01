import { useEffect, useRef, useState } from 'react';
import './KaamatanCountdown.css';

/* ─── Custom hook: countdown logic ──────────────────────────── */
function useCountdown() {
  const [time, setTime]   = useState(null);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const targetDate = new Date('2026-05-30T00:00:00+08:00');
    const endDate    = new Date('2026-06-01T00:00:00+08:00');

    const tick = () => {
      const now  = new Date();
      if (now >= endDate)    return setPhase('ended');
      if (now >= targetDate) return setPhase('celebrating');

      const diff  = targetDate - now;
      const total = Math.floor(diff / 1000);
      setTime({
        days:  Math.floor(total / 86400),
        hours: Math.floor((total % 86400) / 3600),
        mins:  Math.floor((total % 3600) / 60),
        secs:  total % 60,
      });
      setPhase('counting');
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, phase };
}

/* ─── FlipUnit ───────────────────────────────────────────────── */
function FlipUnit({ value, label, pad = 2 }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 180);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  const formatted = String(display ?? 0).padStart(pad, '0');

  return (
    <div className="flip-unit">
      <div className={`flip-card ${flipping ? 'flipping' : ''}`}>
        {/* Top half */}
        <div className="flip-half flip-top">
          <span className="flip-num">{formatted}</span>
        </div>
        {/* Bottom half */}
        <div className="flip-half flip-bottom">
          <span className="flip-num">{formatted}</span>
        </div>
        {/* Center divider */}
        <div className="flip-divider" />
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}

/* ─── Mountain SVG ───────────────────────────────────────────── */
function Mountains() {
  return (
    <svg
      className="mountains"
      viewBox="0 0 1200 500"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mtnBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5a3010" />
          <stop offset="60%"  stopColor="#3d2008" />
          <stop offset="100%" stopColor="#2a1505" />
        </linearGradient>
        <linearGradient id="mtnMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#7a4515" />
          <stop offset="50%"  stopColor="#4a2a08" />
          <stop offset="100%" stopColor="#2e1a04" />
        </linearGradient>
        <linearGradient id="mtnMain" x1="0.3" y1="0" x2="0.6" y2="1">
          <stop offset="0%"   stopColor="#e8a040" />
          <stop offset="20%"  stopColor="#c07020" />
          <stop offset="55%"  stopColor="#7a4010" />
          <stop offset="100%" stopColor="#3a1e06" />
        </linearGradient>
        <linearGradient id="mtnLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#a06020" />
          <stop offset="60%"  stopColor="#5a3010" />
          <stop offset="100%" stopColor="#2e1a04" />
        </linearGradient>
        <linearGradient id="mtnRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#904a10" />
          <stop offset="60%"  stopColor="#4a2808" />
          <stop offset="100%" stopColor="#2a1404" />
        </linearGradient>
        <linearGradient id="valleyGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3a5e18" />
          <stop offset="100%" stopColor="#1e3208" />
        </linearGradient>
        <linearGradient id="peakGlow" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%"   stopColor="#fff0c0" stopOpacity="0.9" />
          <stop offset="40%"  stopColor="#f5c050" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c07020" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Far background range */}
      <polygon
        points="0,500 0,280 80,200 160,260 240,180 320,240 400,160 480,220 560,140 640,200 720,120 800,180 880,240 960,160 1040,220 1120,180 1200,240 1200,500"
        fill="url(#mtnBack)"
        opacity="0.6"
      />

      {/* Mid left */}
      <polygon
        points="0,500 0,340 100,260 200,320 300,240 400,300 500,260 600,320 650,500"
        fill="url(#mtnMid)"
        opacity="0.75"
      />

      {/* Mid right */}
      <polygon
        points="550,500 600,280 700,340 800,260 900,320 1000,260 1100,320 1200,280 1200,500"
        fill="url(#mtnRight)"
        opacity="0.75"
      />

      {/* Main Kinabalu peak — warm golden-orange */}
      <polygon
        points="300,500 380,350 420,300 450,240 480,180 510,120 530,60 540,20 550,60 560,100 580,160 610,220 640,280 670,340 710,400 750,500"
        fill="url(#mtnMain)"
      />

      {/* Sun hitting the summit */}
      <polygon
        points="510,120 530,60 540,20 550,60 560,100 580,160 610,220 560,200 540,150 520,160 510,120"
        fill="url(#peakGlow)"
        opacity="0.6"
      />

      {/* Rocky ridge lines */}
      <polyline
        points="480,180 500,155 520,140 540,20 560,140 580,155 610,220"
        fill="none"
        stroke="rgba(255,200,80,0.12)"
        strokeWidth="1"
      />
      <polyline
        points="450,240 470,210 500,195 530,60 560,195 590,210 640,280"
        fill="none"
        stroke="rgba(180,100,20,0.15)"
        strokeWidth="0.8"
      />

      {/* Left mountain */}
      <polygon
        points="0,500 50,400 120,320 180,260 230,200 260,240 290,280 320,340 350,400 380,500"
        fill="url(#mtnLeft)"
        opacity="0.9"
      />

      {/* Right mountain */}
      <polygon
        points="820,500 860,400 920,320 980,260 1040,310 1100,370 1150,430 1200,500"
        fill="url(#mtnRight)"
        opacity="0.9"
      />

      {/* Green valley / paddy fields */}
      <polygon
        points="0,500 0,430 80,400 160,380 250,360 350,370 430,380 500,390 550,400 600,410 700,400 800,380 900,390 1000,400 1100,390 1200,400 1200,500"
        fill="url(#valleyGreen)"
      />
      <polygon
        points="0,500 0,460 100,440 200,430 300,450 400,460 500,455 600,450 700,460 800,450 900,440 1000,455 1100,450 1200,460 1200,500"
        fill="#1e3208"
        opacity="0.8"
      />
    </svg>
  );
}

/* ─── Rice Stalk SVG ─────────────────────────────────────────── */
function RiceStalks() {
  const stalks = [
    { x: 30,   delay: 0,    height: 130, scale: 1 },
    { x: 75,   delay: 1,    height: 110, scale: 0.85 },
    { x: 120,  delay: 0.5,  height: 140, scale: 1.1 },
    { x: 160,  delay: 1.5,  height: 100, scale: 0.8 },
    { x: 200,  delay: 0.8,  height: 125, scale: 0.95 },
    // Right side (mirrored x from 1200)
    { x: 1000, delay: 0.3,  height: 125, scale: 0.95 },
    { x: 1045, delay: 1.2,  height: 140, scale: 1.1 },
    { x: 1090, delay: 0.7,  height: 110, scale: 0.85 },
    { x: 1130, delay: 1.8,  height: 130, scale: 1 },
    { x: 1168, delay: 0.4,  height: 100, scale: 0.8 },
  ];

  return (
    <svg
      className="rice-field"
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMax meet"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {stalks.map((s, i) => {
        const h = s.height;
        const grains = [
          { cx: -12, cy: -h * 0.68, rx: 7, ry: 14, rot: -25, color: '#d4a820' },
          { cx:  12, cy: -h * 0.60, rx: 7, ry: 14, rot:  25, color: '#c49018' },
          { cx:  -8, cy: -h * 0.82, rx: 6, ry: 12, rot: -20, color: '#e0b830' },
          { cx:   8, cy: -h * 0.75, rx: 6, ry: 12, rot:  20, color: '#d4a820' },
          { cx:   0, cy: -h * 0.97, rx: 5, ry: 10, rot:   0, color: '#c49018' },
        ];
        return (
          <g
            key={i}
            transform={`translate(${s.x}, 600)`}
            style={{ animation: `sway ${3.5 + s.delay * 0.4}s ease-in-out ${s.delay}s infinite` }}
          >
            <line x1="0" y1="0" x2="0" y2={-h} stroke="#4a7a20" strokeWidth={1.8 * s.scale} />
            {grains.map((g, j) => (
              <ellipse
                key={j}
                cx={g.cx * s.scale}
                cy={g.cy}
                rx={g.rx * s.scale}
                ry={g.ry * s.scale}
                fill={g.color}
                transform={`rotate(${g.rot}, ${g.cx * s.scale}, ${g.cy})`}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Feedback Modal ─────────────────────────────────────────── */
function FeedbackModal({ onClose }) {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!wish.trim()) return;
    setSent(true);
    setTimeout(onClose, 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        {sent ? (
          <div className="modal-thanks">
            <div className="modal-thanks-icon">🌾</div>
            <p>Terima kasih! Keinginan anda telah dihantar.</p>
            <p className="modal-thanks-sub">Kopivosian Tadau Kaamatan! 🎉</p>
          </div>
        ) : (
          <>
            <div className="modal-icon">🌾</div>
            <h2 className="modal-title">Keinginan Kaamatan</h2>
            <p className="modal-question">
              Apa keinginan anda sepanjang bulan Kaamatan?
            </p>
            <input
              className="modal-input"
              type="text"
              placeholder="Nama anda (tidak wajib)"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <textarea
              className="modal-textarea"
              placeholder="Kongsikan keinginan, harapan, atau ucapan anda untuk Kaamatan..."
              value={wish}
              onChange={e => setWish(e.target.value)}
              rows={4}
            />
            <button className="modal-submit" onClick={handleSubmit}>
              Hantar Keinginan 🌾
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function KaamatanCountdown() {
  const { time, phase } = useCountdown();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="kmt-scene">
      {/* Sky background */}
      <div className="kmt-sky" />
      <div className="kmt-sun-glow" />

      {/* Clouds */}
      <div className="cloud cloud-1" />
      <div className="cloud cloud-2" />
      <div className="cloud cloud-3" />
      <div className="cloud cloud-4" />

      {/* Mount Kinabalu */}
      <Mountains />

      {/* Rice stalks */}
      <RiceStalks />

      {/* Content */}
      <main className="kmt-content">
        <p className="kmt-tag">Sabah, Malaysia</p>

        <h1 className="kmt-title">
          <span className="kmt-title-small">Countdown</span>
          <span className="kmt-title-big">Kaamatan Day</span>
        </h1>

        <p className="kmt-date">30 &amp; 31 May 2026</p>

        {phase === 'loading' && (
          <div className="kmt-loading">Loading...</div>
        )}

        {phase === 'counting' && time && (
          <div className="kmt-clock">
            <FlipUnit value={time.days}  label="Days" pad={3} />
            <span className="kmt-colon">:</span>
            <FlipUnit value={time.hours} label="Hrs"  />
            <span className="kmt-colon">:</span>
            <FlipUnit value={time.mins}  label="Mins" />
            <span className="kmt-colon">:</span>
            <FlipUnit value={time.secs}  label="Secs" />
          </div>
        )}

        {phase === 'celebrating' && (
          <div className="kmt-celebrate">
            <p className="kmt-celebrate-icon">🌾</p>
            <h2>Selamat Menyambut Tadau Kaamatan!</h2>
            <p>Kopivosian! The harvest festival is here.</p>
          </div>
        )}

        {phase === 'ended' && (
          <div className="kmt-celebrate">
            <p className="kmt-celebrate-icon">🌾</p>
            <h2>Kopivosian!</h2>
            <p>Until Kaamatan 2027 — see you next harvest.</p>
          </div>
        )}

        <button
          className="kmt-btn"
          onClick={() => setShowModal(true)}
        >
          Feedback / Comment
        </button>
      </main>

      {/* Feedback Modal */}
      {showModal && <FeedbackModal onClose={() => setShowModal(false)} />}
    </div>
  );
}