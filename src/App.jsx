
import './App.css'
import Experience from './pages/experience'
import Landing from './pages/landing'
import Country from './pages/country'
import ChooseTemplate from './pages/chooseTemplate'
// import API from './pages/Api'
// import UserProfile from './pages/userProfile'
import { ResumeProvider } from './components/ResumeContext';
import Form from './pages/form'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
 

  return (
    <>
      
      <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Experience" element={<Experience />} />
          <Route path="/Country" element={<Country />} />
          <Route path="/chooseTemplate" element={<ChooseTemplate />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>
    </ResumeProvider>
    </>
  )
}

export default App
