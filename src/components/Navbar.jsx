import './Navbar.css';

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <button className="nav-link" onClick={() => scrollTo('home')}>Home</button>
      <button className="nav-link" onClick={() => scrollTo('wish')}>Make a Wish</button>
      <button className="nav-link" onClick={() => scrollTo('about')}>About</button>
      <button className="nav-link" onClick={() => scrollTo('feedback')}>Feedback</button>
    </nav>
  );
}