import { useState } from 'react'
import axios from 'axios'
import '../styles/Contact.css'

const API = import.meta.env.VITE_API_URL

function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', message: '', rating: 5 })
  const [msg, setMsg]     = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${API}/feedback`, form)
      setMsg('✅ Feedback submitted! Thank you.')
      setForm({ name: '', email: '', message: '', rating: 5 })
    } catch {
      setMsg('❌ Something went wrong. Please try again.')
    }
  }

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact & Feedback</h1>
        <p>Get in touch with us or share your experience with EduBridge.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Contact Details</h2>
          <div className="info-card">
            <p>📧 <strong>Email:</strong> edubridge@gmail.com</p>
            <p>📞 <strong>Phone:</strong> +91 98765 43210</p>
            <p>📍 <strong>Location:</strong> Visakhapatnam, Andhra Pradesh</p>
            <p>🕒 <strong>Hours:</strong> Mon–Sat, 9 AM – 6 PM</p>
          </div>
          <div className="info-card">
            <h3>Volunteer Coordination</h3>
            <p>After form submission, our team will contact you within 24–48 hours via WhatsApp or phone call.</p>
          </div>
        </div>

        <div className="feedback-form">
          <h2>Share Your Feedback</h2>
          <form onSubmit={handleSubmit}>
            <input placeholder="Your Name *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input placeholder="Email (optional)" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            <textarea placeholder="Your message or feedback *" rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
            <div className="rating-row">
              <label>Rating:</label>
              <select value={form.rating} onChange={e => setForm({...form, rating: e.target.value})}>
                <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                <option value={4}>⭐⭐⭐⭐ Good</option>
                <option value={3}>⭐⭐⭐ Average</option>
                <option value={2}>⭐⭐ Poor</option>
                <option value={1}>⭐ Very Poor</option>
              </select>
            </div>
            <button type="submit">Submit Feedback</button>
            {msg && <p className="form-msg">{msg}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact