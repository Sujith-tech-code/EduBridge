import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">UN Sustainable Development Goal 4</span>
          <h1>Bridging the Gap in <span className="highlight">Quality Education</span></h1>
          <p>EduBridge connects government schools with volunteers, resources, and community support — making education accessible for every child.</p>
          <div className="hero-btns">
            <Link to="/volunteer" className="btn-primary">Become a Volunteer</Link>
            <Link to="/schools" className="btn-outline">Explore Schools</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <h2>10+</h2>
            <p>Schools Supported</p>
          </div>
          <div className="stat-card">
            <h2>200+</h2>
            <p>Volunteers Registered</p>
          </div>
          <div className="stat-card">
            <h2>500+</h2>
            <p>Books Donated</p>
          </div>
          <div className="stat-card">
            <h2>1000+</h2>
            <p>Students Impacted</p>
          </div>
        </div>
      </section>

      {/* About SDG 4 */}
      <section className="sdg-section">
        <div className="sdg-content">
          <div className="sdg-badge">SDG 4</div>
          <h2>What is SDG 4?</h2>
          <p>
            SDG 4 — Quality Education is one of the 17 Sustainable Development Goals set by the United Nations.
            It aims to ensure inclusive and equitable quality education and promote lifelong learning opportunities for all by 2030.
          </p>
          <p>
            EduBridge is our community-driven response — connecting underserved government schools with tutors,
            books, and digital learning resources.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="how-section">
        <h2>How EduBridge Works</h2>
        <div className="how-grid">
          <div className="how-card">
            <div className="how-icon">📝</div>
            <h3>Register</h3>
            <p>Volunteers sign up as tutors or book donors through simple forms — no account needed.</p>
          </div>
          <div className="how-card">
            <div className="how-icon">📞</div>
            <h3>We Connect</h3>
            <p>Our admin team reaches out via WhatsApp or phone call to coordinate next steps.</p>
          </div>
          <div className="how-card">
            <div className="how-icon">🎓</div>
            <h3>Teaching Happens</h3>
            <p>Volunteers teach students online or offline, making a direct impact in their community.</p>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home