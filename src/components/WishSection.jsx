import { useState, useEffect } from 'react';
import './WishSection.css';

const SAMPLE_WISHES = [
  { id: 1, name: 'Siti', wish: 'Semoga tahun ini Kaamatan lebih meriah dan penuh dengan kesyukuran bersama keluarga tercinta!' },
  { id: 2, name: 'Jeffry', wish: 'Kopivosian! Harap dapat balik kampung dan celebrate bersama ibu bapa.' },
  { id: 3, name: 'Noreen', wish: 'Mahu makan hinava dan bambangan sepuasnya tahun ini. Selamat Kaamatan semua!' },
  { id: 4, name: 'Ramlah', wish: 'Harap tahun ini dapat kumpul semua adik beradik. Lama sudah tidak jumpa!' },
  { id: 5, name: 'Daniel', wish: 'Kopivosian kepada semua kaum Kadazan-Dusun di mana sahaja anda berada. 🌾' },
];

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
  const [wishes, setWishes] = useState(SAMPLE_WISHES);
  const [newId, setNewId]   = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('https://kaamatan-backend.onrender.com/wishes')
    .then(res => res.json())
    .then(data => setWishes(data))
    .catch(() => setWishes(SAMPLE_WISHES));
  }, []);

  const handleSubmit = async ({ name, wish }) => {
    const newWish = { id: Date.now(), name, wish };

    // TODO: connect to Python FastAPI backend
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
    <section className="wish-section" id="wish">

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
        {wishes.map(item => (
          <WishCard
            key={item.id}
            item={item}
            isNew={item.id === newId}
          />
        ))}
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