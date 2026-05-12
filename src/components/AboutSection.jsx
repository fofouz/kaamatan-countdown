import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">

        {/* Badge */}
        <div className="about-badge">🌾 Tentang Laman Web Ini</div>

        {/* Main message */}
        <h2 className="about-title">
          Dibina dengan <span className="about-heart">❤️</span> oleh anak Sabah
        </h2>

        <p className="about-desc">
          Laman web ini merupakan <strong>projek pertama</strong> saya selepas menamatkan 
          pengajian dalam bidang <strong>Full-Stack AI Development</strong>. Ia dibina khas 
          untuk meraikan <strong>Tadau Kaamatan 2026</strong> — perayaan menuai yang 
          disambut meriah di negeri Sabah, Malaysia.
        </p>

        <p className="about-desc">
          Matlamat utama laman web ini adalah untuk mengumpulkan keinginan dan harapan 
          masyarakat sempena bulan Kaamatan, serta berkongsi semangat perayaan bersama 
          komuniti — di mana sahaja anda berada.
        </p>

        {/* Divider */}
        <div className="about-divider">
          <span>🌾</span>
          <div className="about-divider-line" />
          <span>🌾</span>
        </div>

        {/* Stats */}
        <div className="about-stats">
          <div className="about-stat">
            <span className="stat-num">01</span>
            <span className="stat-label">Projek Pertama</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="stat-num">2026</span>
            <span className="stat-label">Tahun Dibina</span>
          </div>
          <div className="about-stat-divider" />
          <div className="about-stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Dibina dengan Semangat</span>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="about-quote">
          "Kopivosian Tadau Kaamatan — Selamat Menyambut Hari Menuai"
        </blockquote>

      </div>
    </section>
  );
}