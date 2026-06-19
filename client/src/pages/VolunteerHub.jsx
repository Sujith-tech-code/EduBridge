import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/VolunteerHub.css'

function VolunteerHub() {
  const [volunteers, setVolunteers] = useState([])
  const [donations, setDonations]   = useState([])
  const [tutorForm, setTutorForm]   = useState({ name: '', phone: '', email: '', subject: '', availability: '', mode: 'both' })
  const [donateForm, setDonateForm] = useState({ donorName: '', phone: '', bookTitle: '', quantity: 1, condition: 'good', preferredSchool: '' })
  const [tutorMsg, setTutorMsg]     = useState('')
  const [donateMsg, setDonateMsg]   = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/api/volunteers').then(res => setVolunteers(res.data))
    axios.get('http://localhost:5000/api/donations').then(res => setDonations(res.data))
  }, [])

  const handleTutorSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/volunteers', tutorForm)
      setVolunteers(prev => [res.data, ...prev])
      setTutorMsg('✅ Registered! We will contact you via WhatsApp/Call.')
      setTutorForm({ name: '', phone: '', email: '', subject: '', availability: '', mode: 'both' })
    } catch {
      setTutorMsg('❌ Something went wrong. Please try again.')
    }
  }

  const handleDonateSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/donations', donateForm)
      setDonations(prev => [res.data, ...prev])
      setDonateMsg('✅ Thank you for your donation! We will get in touch.')
      setDonateForm({ donorName: '', phone: '', bookTitle: '', quantity: 1, condition: 'good', preferredSchool: '' })
    } catch {
      setDonateMsg('❌ Something went wrong. Please try again.')
    }
  }

  return (
    <div className="volunteer-page">
      <div className="volunteer-header">
        <h1>Volunteer Hub</h1>
        <p>Join our community — register as a tutor or donate books to support students.</p>
      </div>

      <div className="hub-grid">

        {/* Tutor Registration */}
        <section className="hub-section">
          <h2>📚 Register as a Tutor</h2>
          <form className="hub-form" onSubmit={handleTutorSubmit}>
            <input placeholder="Full Name *" value={tutorForm.name} onChange={e => setTutorForm({...tutorForm, name: e.target.value})} required />
            <input placeholder="Phone Number *" value={tutorForm.phone} onChange={e => setTutorForm({...tutorForm, phone: e.target.value})} required />
            <input placeholder="Email (optional)" value={tutorForm.email} onChange={e => setTutorForm({...tutorForm, email: e.target.value})} />
            <input placeholder="Subject you can teach *" value={tutorForm.subject} onChange={e => setTutorForm({...tutorForm, subject: e.target.value})} required />
            <input placeholder="Availability (e.g. Weekends)" value={tutorForm.availability} onChange={e => setTutorForm({...tutorForm, availability: e.target.value})} />
            <select value={tutorForm.mode} onChange={e => setTutorForm({...tutorForm, mode: e.target.value})}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="both">Both</option>
            </select>
            <button type="submit">Register as Tutor</button>
            {tutorMsg && <p className="form-msg">{tutorMsg}</p>}
          </form>

          <div className="volunteers-list">
            <h3>Registered Tutors ({volunteers.length})</h3>
            {volunteers.length === 0 && <p className="empty">No tutors yet. Be the first!</p>}
            {volunteers.map(v => (
              <div className="volunteer-card" key={v._id}>
                <strong>{v.name}</strong>
                <span>{v.subject}</span>
                <span className="tag">{v.mode}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Book Donation */}
        <section className="hub-section">
          <h2>📖 Donate Books</h2>
          <form className="hub-form" onSubmit={handleDonateSubmit}>
            <input placeholder="Your Name *" value={donateForm.donorName} onChange={e => setDonateForm({...donateForm, donorName: e.target.value})} required />
            <input placeholder="Phone Number *" value={donateForm.phone} onChange={e => setDonateForm({...donateForm, phone: e.target.value})} required />
            <input placeholder="Book Title" value={donateForm.bookTitle} onChange={e => setDonateForm({...donateForm, bookTitle: e.target.value})} />
            <input type="number" placeholder="Quantity" min="1" value={donateForm.quantity} onChange={e => setDonateForm({...donateForm, quantity: e.target.value})} />
            <select value={donateForm.condition} onChange={e => setDonateForm({...donateForm, condition: e.target.value})}>
              <option value="new">New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </select>
            <input placeholder="Preferred School (optional)" value={donateForm.preferredSchool} onChange={e => setDonateForm({...donateForm, preferredSchool: e.target.value})} />
            <button type="submit">Submit Donation</button>
            {donateMsg && <p className="form-msg">{donateMsg}</p>}
          </form>

          <div className="donations-list">
            <h3>Recent Donations ({donations.length})</h3>
            {donations.length === 0 && <p className="empty">No donations yet. Be the first!</p>}
            {donations.map(d => (
              <div className="volunteer-card" key={d._id}>
                <strong>{d.donorName}</strong>
                <span>{d.bookTitle || 'Books'} × {d.quantity}</span>
                <span className="tag">{d.condition}</span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default VolunteerHub