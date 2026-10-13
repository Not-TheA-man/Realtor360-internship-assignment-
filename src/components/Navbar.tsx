import { useEffect, useRef, useState } from 'react'

const pages = ['Home', 'Developments', 'Buildings', 'Units', 'Leads', 'Companies', 'Contacts', 'Deals', 'Activities', 'Attorney Firms']

const notifications = [
  { title: 'Follow-Ups', detail: '15 leads need to be followed up.', time: 'Today', type: 'Reminder' },
  { title: 'Submit Final Offer- Villa Deal', detail: 'Finalize and send offer documents.', time: '10:30 AM', type: 'Reminder' },
  { title: 'Review Contract with Legal', detail: 'Apartment deal contract needs review today.', time: '11:45 AM', type: 'Task' },
  { title: 'Jessica Chen replied', detail: 'New feedback after the Angel Plaza site visit.', time: '9:12 AM', type: 'Lead update' },
]

interface NavbarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [navScroll, setNavScroll] = useState({ left: false, right: false })
  const profileRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  function updateNavScroll() {
    const nav = navRef.current
    if (!nav) return
    setNavScroll({ left: nav.scrollLeft > 1, right: nav.scrollLeft + nav.clientWidth < nav.scrollWidth - 1 })
  }

  function scrollNavigation(direction: number) {
    navRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' })
  }

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSearchOpen(false)
        setNotificationsOpen(false)
        setProfileOpen(false)
      }
    }
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!profileRef.current?.contains(event.target as Node)) setProfileOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOnOutsideClick)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOnOutsideClick)
    }
  }, [])

  useEffect(() => {
    updateNavScroll()
    window.addEventListener('resize', updateNavScroll)
    return () => window.removeEventListener('resize', updateNavScroll)
  }, [])

  function toggleSearch() {
    setSearchOpen((open) => !open)
    setNotificationsOpen(false)
    setProfileOpen(false)
    if (searchOpen) onSearchChange('')
  }

  return (
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Realtor360 home">
        <span className="brand-icon" aria-hidden="true"><i /></span>
        <span>REALTOR360</span>
      </a>
      <div className="nav-wrap">
        <button className="nav-scroll-button left" type="button" aria-label="Scroll navigation left" disabled={!navScroll.left} onClick={() => scrollNavigation(-1)}><span /></button>
        <nav className="main-nav" aria-label="Main navigation" ref={navRef} tabIndex={0} onScroll={updateNavScroll}>
          {pages.map((page, index) => (
            <a className={index === 0 ? 'nav-link active' : 'nav-link'} href={`#${page.toLowerCase().replaceAll(' ', '-')}`} key={page}>
              {page}
            </a>
          ))}
        </nav>
        <button className="nav-scroll-button right" type="button" aria-label="Scroll navigation right" disabled={!navScroll.right} onClick={() => scrollNavigation(1)}><span /></button>
      </div>
      <div className="top-actions">
        <div className="header-search-wrap">
          {searchOpen && <input className="header-search-input" type="search" aria-label="Search dashboard" placeholder="Search properties, leads, reminders" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} />}
          <button className="top-action" type="button" aria-label={searchOpen ? 'Close search' : 'Search'} aria-expanded={searchOpen} onClick={toggleSearch}><span className="search-icon" /></button>
        </div>
        <div className="notification-wrap">
          <button className="top-action" type="button" aria-label="Notifications and reminders" aria-expanded={notificationsOpen} onClick={() => { setNotificationsOpen((open) => !open); setSearchOpen(false); setProfileOpen(false) }}><span className="bell-icon" /><span className="notification-dot" /></button>
          {notificationsOpen && (
            <section className="notification-menu" aria-label="Notifications and reminders">
              <div className="notification-menu-heading"><h2>Notifications</h2><span>4 new</span></div>
              <div className="notification-items">
                {notifications.map((notification) => (
                  <article className="notification-item" key={notification.title}>
                    <span className="notification-type">{notification.type}</span>
                    <strong>{notification.title}</strong>
                    <p>{notification.detail}</p>
                    <time>{notification.time}</time>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
        <div className="profile-wrap" ref={profileRef}>
          <button className="profile-button" type="button" aria-label="Profile menu" aria-expanded={profileOpen} aria-controls="profile-menu" onClick={() => { setProfileOpen((open) => !open); setSearchOpen(false); setNotificationsOpen(false) }}><span className="profile-avatar">JD</span><span className="chevron" /></button>
          {profileOpen && (
            <section className="profile-menu" id="profile-menu" aria-label="Profile menu">
              <div className="profile-summary">
                <span className="profile-avatar">JD</span>
                <span><strong>John Doe</strong><small>john.doe@email.com</small></span>
              </div>
              <div className="profile-menu-items">
                <button type="button" onClick={() => setProfileOpen(false)}>My Profile</button>
                <button type="button" onClick={() => setProfileOpen(false)}>Account Settings</button>
                <button type="button" onClick={() => setProfileOpen(false)}>Help &amp; Support</button>
              </div>
              <button className="profile-signout" type="button" onClick={() => setProfileOpen(false)}>Sign Out</button>
            </section>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
