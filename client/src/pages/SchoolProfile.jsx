import { useState, useEffect } from 'react'
import axios from 'axios'
import '../styles/SchoolProfile.css'

const API = import.meta.env.VITE_API_URL

function SchoolProfile() {
  const [schools, setSchools]       = useState([])
  const [selected, setSelected]     = useState(null)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    axios.get(`${API}/schools`)
      .then(res => { setSchools(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const handleSelect = (e) => {
    const school = schools.find(s => s._id === e.target.value)
    setSelected(school || null)
  }

  return (
    <div className="school-page">
      <div className="school-header">
        <h1>Affiliated Schools</h1>
        <p>Select a school to view its profile, facilities, and principal's message.</p>
        <select className="school-dropdown" onChange={handleSelect} defaultValue="">
          <option value="" disabled>-- Select a School --</option>
          {schools.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>

      {loading && <p className="loading">Loading schools...</p>}

      {!loading && schools.length === 0 && (
        <p className="empty">No schools added yet. Check back soon!</p>
      )}

      {selected && (
        <div className="school-profile">
          <div className="profile-top">
            <h2>{selected.name}</h2>
            <span className="location-tag">📍 {selected.location}</span>
          </div>

          <div className="profile-grid">
            <div className="profile-card">
              <h3>Overview</h3>
              <p>{selected.overview || 'No overview available.'}</p>
            </div>

            <div className="profile-card">
              <h3>Facilities</h3>
              {selected.facilities?.length > 0 ? (
                <ul>
                  {selected.facilities.map((f, i) => <li key={i}>✅ {f}</li>)}
                </ul>
              ) : <p>No facilities listed.</p>}
            </div>

            <div className="profile-card principal">
              <h3>Principal's Message</h3>
              <p className="principal-name">— {selected.principalName}</p>
              <p className="principal-msg">"{selected.principalMessage || 'No message available.'}"</p>
            </div>

            {selected.gallery?.length > 0 && (
              <div className="profile-card gallery">
                <h3>Gallery</h3>
                <div className="gallery-grid">
                  {selected.gallery.map((url, i) => (
                    <img key={i} src={url} alt={`Gallery ${i+1}`} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SchoolProfile