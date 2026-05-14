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
    try {
      const res = await fetch('https://kaamatan-backend.onrender.com/submit-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, rating }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
    } catch (err) {
      console.error('Feedback error:', err);
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const activeRating = hovered || rating;

  return (
    <section className="feedback-section" id="feedback">
      <div className="section-inner">
        <h2 className="section-title">Feedback</h2>
        <p className="section-sub">Help us improve this site</p>

        {sent ? (
          <div className="thanks-box">
            <div className="thanks-icon">🙏</div>
            <p className="thanks-msg">Thank you for your feedback!</p>
            <p className="thanks-gold">It means a lot to us.</p>
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
                {activeRating ? RATING_LABELS[activeRating] : 'Rate your experience'}
              </p>
            </div>

            <input
              className="form-input"
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />

            <textarea
              className={`form-textarea ${error ? 'error' : ''}`}
              placeholder="Suggestions or comments about this site..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
            />

            {error && (
              <p className="form-error">Please rate your experience or write a comment first.</p>
            )}

            <button className="submit-btn" onClick={handleSubmit}>
              Submit Feedback
            </button>
          </div>
        )}
      </div>
    </section>
  );
}