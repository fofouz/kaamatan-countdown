import { useState, useEffect } from 'react';
import './WishSection.css';

function SkeletonCard() {
  return (
    <div className="wish-card skeleton-card">
      <div className="wish-card-header">
        <div className="skel skel-avatar" />
        <div className="skel skel-name" />
      </div>
      <div className="skel skel-line" />
      <div className="skel  skel-line skel-line--short" />
    </div>
  
  )
}

function WishCard({ item, isNew }) {
  return (
    <div className={`wish-card ${isNew ? 'wish-card--new' : ''}`}>
      <div className="wish-card-header">
        <div className="wish-card-avatar">
          {item.name ? item.name.charAt(0).toUpperCase() : '🌾'}
        </div>
        <span className="wish-card-name">{item.name || 'Tetamu'}</span>
      </div>
      <p className="wish-card-text">"{item.wish}"</p>
    </div>
  );
}

function WishModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!wish.trim()) {
      setError(true);
      setTimeout(() => setError(false), 2000);
      return;
    }
    onSubmit({ name: name.trim(), wish: wish.trim() });
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setWish('');
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="wish-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        {sent ? (
          <div className="modal-thanks">
            <div className="modal-thanks-icon">🌾</div>
            <p className="modal-thanks-msg">Thank you! Your wish has been submitted.</p>
            <p className="modal-thanks-gold">Kopivosian Tadau Kaamatan! 🎉</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Make a Wish 🌾</h2>
            <div className="wish-question">
              What are your wishes for the entire month of Kaamatan?
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
              placeholder="Share your wishes, hopes, or messages for Kaamatan... Think carefully! Once submitted, your sentences cannot be deleted after they are submitted. Write from the heart! 😊"
              value={wish}
              onChange={e => setWish(e.target.value)}
              rows={5}
            />

            {error && <p className="form-error">Please write your wish first.</p>}

            <button className="submit-btn" onClick={handleSubmit}>
              Submit Wish 🌾
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function WishSection() {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newId, setNewId]   = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("https://kaamatan-backend.onrender.com/wishes")
      .then(res => res.json())
      .then(data => {
        setWishes(data);
        setLoading(false);
      })
      .catch(() => {
        setWishes([]);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async ({ name, wish }) => {

    await fetch('https://kaamatan-backend.onrender.com/submit-wish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, wish }),
    });

    // Reload all wishes from database after submitting
    const res = await fetch('https://kaamatan-backend.onrender.com/wishes');
    const data = await res.json();
    setWishes(data);
    setNewId(data[0]?.id);
    setTimeout(() => setNewId(null), 1000);
  };

  return (
    <section className={`wish-section ${showModal ? 'modal-active' : ''}`} id="wish">

      {/* Section header */}
      <div className="wish-section-header">
        <div>
          <h2 className="section-title">Make a Wish🌾</h2>
          <p className="section-sub">What do you wish for and celebrate during Kaamatan 2026?</p>
        </div>
        <div className="wish-header-right">
          <span className="wish-wall-count">{wishes.length} Wishes</span>
          <button className="wish-open-btn" onClick={() => setShowModal(true)}>
            + Post
          </button>
        </div>
      </div>

      {/* Wish wall — full width grid */}
      <div className="wish-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : wishes.length === 0 ? (
          <div className="wish-empty">
            <p>🌾 Belum ada keinginan lagi.</p>
            <p>Jadilah yang pertama!</p>
          </div>
        ) : (
          wishes.map(item => (
            <WishCard
              key={item.id}
              item={item}
              isNew={item.id === newId}
            />
          ))
        )}
      </div>

      {/* Modal popup */}
      {showModal && (
        <WishModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )}
    </section>
  );
}