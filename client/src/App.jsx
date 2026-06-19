import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SchoolProfile from './pages/SchoolProfile'
import LearningResources from './pages/LearningResources'
import VolunteerHub from './pages/VolunteerHub'
import Contact from './pages/Contact'

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/schools" element={<SchoolProfile />} />
          <Route path="/resources" element={<LearningResources />} />
          <Route path="/volunteer" element={<VolunteerHub />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App