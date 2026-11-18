export default function Header() {
  const today = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return (
    <header className="app-header">
      <a className="brand" href="./" aria-label="Daylight home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 36 36" fill="none">
            <path d="M18 5v4M18 27v4M5 18h4m18 0h4M8.8 8.8l2.9 2.9m12.6 12.6 2.9 2.9m0-18.4-2.9 2.9m-12.6 12.6-2.9 2.9" />
            <circle cx="18" cy="18" r="7" />
          </svg>
        </span>
        <span className="brand-name">daylight<span>.</span></span>
      </a>
      <p className="today-label">{today}</p>
    </header>
  );
}
