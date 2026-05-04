import { useState, useEffect, useRef } from 'react';
import './FlipClock.css';

const TARGET = new Date('2026-05-30T00:00:00+08:00');
const END    = new Date('2026-06-01T00:00:00+08:00');

function pad(n, len = 2) {
  return String(n).padStart(len, '0');
}

function useCountdown() {
  const [time, setTime]   = useState(null);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const tick = () => {
      const now  = new Date();
      if (now >= END)    return setPhase('ended');
      if (now >= TARGET) return setPhase('celebrating');

      const total = Math.floor((TARGET - now) / 1000);
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

function FlipUnit({ value, label, padLen = 2 }) {
  const [display, setDisplay] = useState(value ?? 0);
  const [flipping, setFlipping] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (value !== undefined && prev.current !== value) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 180);
      prev.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <div className="flip-unit">
      <div className={`flip-box ${flipping ? 'flipping' : ''}`}>
        <div className="flip-top" />
        <div className="flip-bottom" />
        <div className="flip-line" />
        <span className="flip-num">{pad(display, padLen)}</span>
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}

export default function FlipClock() {
  const { time, phase } = useCountdown();

  if (phase === 'loading') {
    return <div className="clock-loading">Loading...</div>;
  }

  if (phase === 'celebrating') {
    return (
      <div className="clock-celebrate">
        <p className="celebrate-icon">🌾</p>
        <h2>Selamat Menyambut Tadau Kaamatan!</h2>
        <p>Kopivosian! The harvest festival is here.</p>
      </div>
    );
  }

  if (phase === 'ended') {
    return (
      <div className="clock-celebrate">
        <p className="celebrate-icon">🌾</p>
        <h2>Kopivosian!</h2>
        <p>Until Kaamatan 2027 — see you next harvest.</p>
      </div>
    );
  }

  return (
    <div className="clock-wrap">
      <FlipUnit value={time.days}  label="Days"  padLen={2} />
      <span className="colon">:</span>
      <FlipUnit value={time.hours} label="Hours" />
      <span className="colon">:</span>
      <FlipUnit value={time.mins}  label="Min"   />
      <span className="colon">:</span>
      <FlipUnit value={time.secs}  label="Sec"   />
    </div>
  );
}