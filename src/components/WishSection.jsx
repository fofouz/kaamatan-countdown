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
            <p className="modal-thanks-msg">Terima kasih! Keinginan anda telah dihantar.</p>
            <p className="modal-thanks-gold">Kopivosian Tadau Kaamatan! 🎉</p>
          </div>
        ) : (
          <>
            <h2 className="modal-title">Make a Wish 🌾</h2>
            <div className="wish-question">
              Apa keinginan anda sepanjang bulan Kaamatan?
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
              placeholder="Kongsikan keinginan, harapan, atau ucapan anda untuk Kaamatan..."
              value={wish}
              onChange={e => setWish(e.target.value)}
              rows={5}
            />

            {error && <p className="form-error">Sila tulis keinginan anda dahulu.</p>}

            <button className="submit-btn" onClick={handleSubmit}>
              Hantar Keinginan 🌾
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
    fetch('https://your-backened.onrender.com/wishes')
    .then(res => res.json())
    .then(data => setWishes(data))
    .catch(() => setWishes(SAMPLE_WISHES));
  }, []);

  const handleSubmit = async ({ name, wish }) => {
    const newWish = { id: Date.now(), name, wish };

    // TODO: connect to Python FastAPI backend
    await fetch('https://your-backend.onrender.com/submit-wish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, wish }),
    });

    setWishes(prev => [newWish, ...prev]);
    setNewId(newWish.id);
    setTimeout(() => setNewId(null), 1000);
  };

  return (
    <section className="wish-section" id="wish">

      {/* Section header */}
      <div className="wish-section-header">
        <div>
          <h2 className="section-title">Keinginan Semua 🌾</h2>
          <p className="section-sub">Apa keinginan anda untuk Kaamatan tahun ini?</p>
        </div>
        <div className="wish-header-right">
          <span className="wish-wall-count">{wishes.length} keinginan</span>
          <button className="wish-open-btn" onClick={() => setShowModal(true)}>
            + Make a Wish
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