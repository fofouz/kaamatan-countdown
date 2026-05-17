import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="about-inner">

        {/* Badge */}
        <div className="about-badge">🌾 About This Website</div>

        {/* Main message */}
        <h2 className="about-title">
          Built with <span className="about-heart">❤️</span> by Sabahan
        </h2>

        <p className="about-desc">
          This website is the <strong>first simple website I ever built</strong> after completing 
          my upskilling in <strong>Full-Stack AI Development</strong>. A little about me, I had 
          absolutely no coding background throughout my Diploma and Degree studies. When I discovered
          this upskilling programme, I honestly thought it would be overwhelming. But surprisingly, 
          it turned out to be one of the most enjoyable learning experiences I've had.
        </p>

        <p className="about-desc">
          As my first project, I decided to build something meaningful which is a simple webstie
          dedicated to celebrating <strong>Tadau Kaamatan 2026</strong>, the harvest festival celebrated
          with great joy across Sabah, Malaysia. The main goal is simple: to gather the wishes and 
          hopes of the community during the Kaamatan season, and to share their enjoyful together with no
          matter where you are. <strong>Semoga Kaamatan tahun ini lebih meriah. Kopivosian!</strong> 🌾
        </p>

        <p className="about-credit">
          Developed by <span className="about-credit-name">Fofouz</span>
        </p>

        {/* Quote */}
        <blockquote className="about-quote">
          "Kopivosian Tadau Kaamatan — Selamat Menyambut Hari Menuai"
        </blockquote>

      </div>
    </section>
  );
}