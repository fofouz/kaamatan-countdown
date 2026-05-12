import { useState } from 'react';
import './FeedbackSection.css';

const RATING_LABELS = ['', 'Kurang memuaskan', 'Boleh ditambah baik', 'Sederhana', 'Bagus!', 'Sangat bagus!'];

export default function FeedbackSection() {
  const [rating, setRating]   = useState(0);
  const [hovered, setHovered] = useState(0);
  const [name, setName]       = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() && !rating) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    // TODO: connect to Python FastAPI backend
    await fetch('https://your-backend.onrender.com/submit-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message, rating }),
    });
    
    setSent(true);
  };

  const activeRating = hovered || rating;

  return (
    <section className="feedback-section" id="feedback">
      <div className="section-inner">
        <h2 className="section-title">Feedback</h2>
        <p className="section-sub">Bantu kami menambah baik laman ini</p>

        {sent ? (
          <div className="thanks-box">
            <div className="thanks-icon">🙏</div>
            <p className="thanks-msg">Terima kasih atas maklum balas anda!</p>
            <p className="thanks-gold">Ia amat bermakna bagi kami.</p>
          </div>
        ) : (
          <div className="feedback-form">
            {/* Star rating */}
            <div className="stars-wrap">
              <div className="stars">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    className={`star ${n <= activeRating ? 'active' : ''}`}
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="rating-label">
                {activeRating ? RATING_LABELS[activeRating] : 'Beri penilaian anda'}
              </p>
            </div>

            <input
              className="form-input"
              type="text"
              placeholder="Nama anda (tidak wajib)"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <textarea
              className={`form-textarea ${error ? 'error' : ''}`}
              placeholder="Cadangan atau komen anda tentang laman ini..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
            />

            {error && (
              <p className="form-error">Sila beri penilaian atau tulis komen dahulu.</p>
            )}

            <button className="submit-btn" onClick={handleSubmit}>
              Hantar Maklum Balas
            </button>
          </div>
        )}
      </div>
    </section>
  );
}