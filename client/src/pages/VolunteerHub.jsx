import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/VolunteerHub.css'

function VolunteerHub() {
  const [volunteers, setVolunteers]     = useState([])
  const [donations, setDonations]       = useState([])
  const [tutorForm, setTutorForm]       = useState({ name: '', phone: '', email: '', subject: '', availability: '', mode: 'both' })
  const [donateForm, setDonateForm]     = useState({ donorName: '', phone: '', bookTitle: '', quantity: 1, condition: 'good', preferredSchool: '' })
  const [tutorMsg, setTutorMsg]         = useState('')
  const [donateMsg, setDonateMsg]       = useState('')
  const [newTrackingId, setNewTrackingId] = useState('')
  const [trackInput, setTrackInput]     = useState('')
  const [trackResult, setTrackResult]   = useState(null)
  const [trackError, setTrackError]     = useState('')
  const [trackLoading, setTrackLoading] = useState(false)
  const [copied, setCopied]             = useState(false)

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
      setNewTrackingId(res.data.trackingId)
      setDonateMsg('')
      setDonateForm({ donorName: '', phone: '', bookTitle: '', quantity: 1, condition: 'good', preferredSchool: '' })
    } catch (err) {
      setDonateMsg(err.response?.data?.message || '❌ Something went wrong. Please try again.')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(newTrackingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTrack = async (e) => {
    e.preventDefault()
    setTrackLoading(true)
    setTrackError('')
    setTrackResult(null)
    try {
      const res = await axios.get(`http://localhost:5000/api/donations/track/${trackInput.trim()}`)
      setTrackResult(res.data)
    } catch (err) {
      setTrackError(err.response?.data?.message || '❌ Tracking ID not found.')
    } finally {
      setTrackLoading(false)
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

          {/* Tracking ID shown after successful donation */}
          {newTrackingId && (
            <div className="tracking-success">
              <p>🎉 Donation request submitted!</p>
              <p>Your Tracking ID:</p>
              <div className="tracking-id-box">
                <span>{newTrackingId}</span>
                <button onClick={handleCopy}>{copied ? '✅ Copied!' : 'Copy'}</button>
              </div>
              <p className="tracking-note">Save this ID to track your donation status anytime.</p>
            </div>
          )}

          {!newTrackingId && (
            <form className="hub-form" onSubmit={handleDonateSubmit}>
              <input placeholder="Your Name *" value={donateForm.donorName} onChange={e => setDonateForm({...donateForm, donorName: e.target.value})} required />
              <input placeholder="Phone Number *" value={donateForm.phone} onChange={e => setDonateForm({...donateForm, phone: e.target.value})} required />
              <input placeholder="Book Title *" value={donateForm.bookTitle} onChange={e => setDonateForm({...donateForm, bookTitle: e.target.value})} required />
              <input type="number" placeholder="Quantity" min="1" value={donateForm.quantity} onChange={e => setDonateForm({...donateForm, quantity: e.target.value})} required />
              <select value={donateForm.condition} onChange={e => setDonateForm({...donateForm, condition: e.target.value})}>
                <option value="new">New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
              <input placeholder="Preferred School (optional)" value={donateForm.preferredSchool} onChange={e => setDonateForm({...donateForm, preferredSchool: e.target.value})} />
              <button type="submit">Submit Donation</button>
              {donateMsg && <p className="form-msg">{donateMsg}</p>}
            </form>
          )}

          {newTrackingId && (
            <button className="donate-again-btn" onClick={() => setNewTrackingId('')}>
              + Donate Another Book
            </button>
          )}

          <div className="donations-list">
            <h3>Recent Donations ({donations.length})</h3>
            {donations.length === 0 && <p className="empty">No donations yet. Be the first!</p>}
            {donations.map(d => (
              <div className="volunteer-card" key={d._id}>
                <strong>{d.donorName}</strong>
                <span>{d.bookTitle} × {d.quantity}</span>
                <span className={`status-tag ${d.status}`}>
                  {d.status === 'pending' ? '⏳ Pending' : '✅ Received'}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Track Donation Section */}
      <section className="track-section">
        <h2>🔍 Track My Donation</h2>
        <p>Enter your Tracking ID to check the status of your book donation.</p>
        <form className="track-form" onSubmit={handleTrack}>
          <input
            placeholder="Enter Tracking ID (e.g. EDU-482910)"
            value={trackInput}
            onChange={e => setTrackInput(e.target.value)}
            required
          />
          <button type="submit">{trackLoading ? 'Tracking...' : 'Track'}</button>
        </form>

        {trackError && <p className="track-error">{trackError}</p>}

        {trackResult && (
          <div className="track-result">
            <h3>Donation Status</h3>
            <div className="track-info">
              <p><strong>Tracking ID:</strong> {trackResult.trackingId}</p>
              <p><strong>Donor:</strong> {trackResult.donorName}</p>
              <p><strong>Book:</strong> {trackResult.bookTitle} × {trackResult.quantity}</p>
              <p><strong>Submitted:</strong> {new Date(trackResult.createdAt).toLocaleDateString()}</p>
              <div className={`track-status ${trackResult.status}`}>
                {trackResult.status === 'pending'
                  ? '⏳ Pending — Our team will collect your books soon.'
                  : '✅ Received — Thank you! Your books have been collected.'}
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  )
}

export default VolunteerHub