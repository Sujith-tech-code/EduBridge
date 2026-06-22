import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/Admin.css'

const API = import.meta.env.VITE_API_URL

function Admin() {
  const [password, setPassword]     = useState('')
  const [isAuth, setIsAuth]         = useState(false)
  const [error, setError]           = useState('')
  const [loading, setLoading]       = useState(false)
  const [activeTab, setActiveTab]   = useState('donations')
  const [donations, setDonations]   = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [feedbacks, setFeedbacks]   = useState([])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await axios.post(`${API}/admin/login`, { password })
      setIsAuth(true)
    } catch (err) {
      setError(err.response?.data?.message || '❌ Incorrect password. Try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuth) {
      axios.get(`${API}/donations`).then(res => setDonations(res.data))
      axios.get(`${API}/volunteers`).then(res => setVolunteers(res.data))
      axios.get(`${API}/feedback`).then(res => setFeedbacks(res.data))
    }
  }, [isAuth])

  const markAsReceived = async (id) => {
    try {
      const res = await axios.put(`${API}/donations/${id}/status`, { status: 'received' })
      setDonations(prev => prev.map(d => d._id === id ? res.data : d))
    } catch {
      alert('Failed to update status.')
    }
  }

  const markAsPending = async (id) => {
    try {
      const res = await axios.put(`${API}/donations/${id}/status`, { status: 'pending' })
      setDonations(prev => prev.map(d => d._id === id ? res.data : d))
    } catch {
      alert('Failed to update status.')
    }
  }

  const updateVolunteerStatus = async (id, status) => {
    try {
      const res = await axios.put(`${API}/volunteers/${id}/status`, { status })
      setVolunteers(prev => prev.map(v => v._id === id ? res.data : v))
    } catch {
      alert('Failed to update status.')
    }
  }

  if (!isAuth) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <h2>🔐 Admin Access</h2>
          <p>Enter the admin password to continue.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Checking...' : 'Login'}
            </button>
            {error && <p className="login-error">{error}</p>}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>🛠️ Admin Panel</h1>
        <p>Manage donations, volunteers, and feedback.</p>
        <button className="logout-btn" onClick={() => setIsAuth(false)}>Logout</button>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'donations'  ? 'tab active' : 'tab'} onClick={() => setActiveTab('donations')}>
          📦 Donations ({donations.length})
        </button>
        <button className={activeTab === 'volunteers' ? 'tab active' : 'tab'} onClick={() => setActiveTab('volunteers')}>
          👨‍🏫 Volunteers ({volunteers.length})
        </button>
        <button className={activeTab === 'feedback'   ? 'tab active' : 'tab'} onClick={() => setActiveTab('feedback')}>
          💬 Feedback ({feedbacks.length})
        </button>
      </div>

      {activeTab === 'donations' && (
        <div className="admin-section">
          {donations.length === 0 && <p className="empty">No donations yet.</p>}
          {donations.map(d => (
            <div className="admin-card" key={d._id}>
              <div className="admin-card-info">
                <strong>{d.donorName}</strong>
                <span>📞 {d.phone}</span>
                <span>📚 {d.bookTitle} × {d.quantity}</span>
                <span>Condition: {d.condition}</span>
                <span>🔖 {d.trackingId}</span>
                {d.preferredSchool && <span>🏫 {d.preferredSchool}</span>}
              </div>
              <div className="admin-card-actions">
                <span className={`status-badge ${d.status}`}>
                  {d.status === 'pending' ? '⏳ Pending' : '✅ Received'}
                </span>
                {d.status === 'pending' ? (
                  <button className="btn-receive" onClick={() => markAsReceived(d._id)}>
                    Mark as Received
                  </button>
                ) : (
                  <button className="btn-pending" onClick={() => markAsPending(d._id)}>
                    Mark as Pending
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'volunteers' && (
        <div className="admin-section">
          {volunteers.length === 0 && <p className="empty">No volunteers yet.</p>}
          {volunteers.map(v => (
            <div className="admin-card" key={v._id}>
              <div className="admin-card-info">
                <strong>{v.name}</strong>
                <span>📞 {v.phone}</span>
                {v.email && <span>📧 {v.email}</span>}
                <span>📖 {v.subject}</span>
                {v.availability && <span>🕒 {v.availability}</span>}
                <span className="tag">{v.mode}</span>
                <span>🔖 {v.trackingId}</span>
              </div>
              <div className="admin-card-actions">
                <span className={`status-badge ${v.status}`}>
                  {v.status === 'pending' ? '⏳ Pending' : v.status === 'approved' ? '✅ Approved' : '❌ Rejected'}
                </span>
                {v.status === 'pending' && (
                  <>
                    <button className="btn-receive" onClick={() => updateVolunteerStatus(v._id, 'approved')}>
                      Approve
                    </button>
                    <button className="btn-reject" onClick={() => updateVolunteerStatus(v._id, 'rejected')}>
                      Reject
                    </button>
                  </>
                )}
                {v.status !== 'pending' && (
                  <button className="btn-pending" onClick={() => updateVolunteerStatus(v._id, 'pending')}>
                    Reset to Pending
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'feedback' && (
        <div className="admin-section">
          {feedbacks.length === 0 && <p className="empty">No feedback yet.</p>}
          {feedbacks.map(f => (
            <div className="admin-card" key={f._id}>
              <div className="admin-card-info">
                <strong>{f.name}</strong>
                {f.email && <span>📧 {f.email}</span>}
                <span>💬 {f.message}</span>
                <span>⭐ Rating: {f.rating}/5</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Admin