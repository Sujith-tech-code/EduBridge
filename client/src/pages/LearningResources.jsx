import '../styles/LearningResources.css'

const materials = [
  { title: 'Class 6-8 Science Notes', type: 'PDF', link: '#' },
  { title: 'Class 9-10 Maths Workbook', type: 'PDF', link: '#' },
  { title: 'English Grammar Guide', type: 'PDF', link: '#' },
]

const videos = [
  { title: 'Introduction to Algebra', channel: 'Khan Academy', link: 'https://www.khanacademy.org' },
  { title: 'Basic Science Experiments', channel: 'NCERT', link: 'https://www.ncert.nic.in' },
  { title: 'English Speaking Practice', channel: 'BBC Learning', link: 'https://www.bbc.co.uk/learningenglish' },
]

const usefulLinks = [
  { title: 'NCERT Official Website', link: 'https://www.ncert.nic.in' },
  { title: 'Khan Academy', link: 'https://www.khanacademy.org' },
  { title: 'Diksha Platform', link: 'https://diksha.gov.in' },
  { title: 'ePathshala', link: 'https://epathshala.nic.in' },
]

function LearningResources() {
  return (
    <div className="resources-page">
      <div className="resources-header">
        <h1>Learning Resources</h1>
        <p>Free study materials, videos, and links curated for government school students.</p>
      </div>

      <section className="resources-section">
        <h2>📄 Study Materials</h2>
        <div className="resources-grid">
          {materials.map((m, i) => (
            <div className="resource-card" key={i}>
              <span className="resource-type">{m.type}</span>
              <h3>{m.title}</h3>
              <a href={m.link} className="btn-resource">Download</a>
            </div>
          ))}
        </div>
      </section>

      <section className="resources-section">
        <h2>🎥 Educational Videos</h2>
        <div className="resources-grid">
          {videos.map((v, i) => (
            <div className="resource-card" key={i}>
              <span className="resource-type">VIDEO</span>
              <h3>{v.title}</h3>
              <p className="resource-channel">{v.channel}</p>
              <a href={v.link} target="_blank" rel="noreferrer" className="btn-resource">Watch</a>
            </div>
          ))}
        </div>
      </section>

      <section className="resources-section">
        <h2>🔗 Useful Links</h2>
        <div className="links-list">
          {usefulLinks.map((l, i) => (
            <a key={i} href={l.link} target="_blank" rel="noreferrer" className="useful-link">
              {l.title} →
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LearningResources