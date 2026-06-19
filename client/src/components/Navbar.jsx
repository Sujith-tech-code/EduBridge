import { Link, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/',          label: 'Home' },
    { path: '/schools',   label: 'Schools' },
    { path: '/resources', label: 'Resources' },
    { path: '/volunteer', label: 'Volunteer Hub' },
    { path: '/contact',   label: 'Contact' },
    { path: '/admin',     label: 'Admin' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-edu">Edu</span>
        <span className="brand-bridge">Bridge</span>
        <span className="brand-sdg">SDG 4</span>
      </div>
      <ul className="navbar-links">
        {links.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar