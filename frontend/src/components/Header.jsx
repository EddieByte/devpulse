function Header({ connected, activePage, setActivePage }) {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'memory', label: 'Memory' },
    { id: 'threads', label: 'Threads' },
    { id: 'system', label: 'System Info' }
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <span className="logo">DevPulse</span>
          <span className={connected ? 'badge connected' : 'badge disconnected'}>
            {connected ? 'LIVE' : 'CONNECTING...'}
          </span>
        </div>
        <nav className="nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={activePage === item.id ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Header
