
import '../styles/Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-edu">Edu</span>
          <span className="brand-bridge">Bridge</span>
          <p>Empowering Education, Enabling Communities</p>
        </div>
        <div className="footer-links">
          <p>Aligned with <strong>UN SDG 4 – Quality Education</strong></p>
          <p>Volunteer contact via WhatsApp / Call after registration</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 EduBridge. Built for community impact.</p>
      </div>
    </footer>
  )
}

export default Footer